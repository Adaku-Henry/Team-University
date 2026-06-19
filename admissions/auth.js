/* =========================================================
   AUTH MODULE - Registration, Login, SMS Verification, Password Reset
   ========================================================= */

const AUTH = (() => {
  const STORAGE_KEY = 'bbc_users';
  const SESSION_KEY = 'bbc_session';
  const SMS_LOG_KEY = 'bbc_sms_log';
  const PWD_RESET_KEY = 'bbc_pwd_reset';

  // ----- Storage helpers -----
  function getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }
  function setSession(session) {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  // ----- Utility -----
  function generateCode(length = 6) {
    let code = '';
    for (let i = 0; i < length; i++) code += Math.floor(Math.random() * 10);
    return code;
  }
  function generateId() {
    return 'BBC-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 90000) + 10000);
  }
  function logSms(phone, code, purpose) {
    const log = JSON.parse(localStorage.getItem(SMS_LOG_KEY) || '[]');
    log.unshift({
      phone, code, purpose,
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    });
    // Keep last 50 SMS
    localStorage.setItem(SMS_LOG_KEY, JSON.stringify(log.slice(0, 50)));
  }

  // ----- Validation -----
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validatePhone(phone) {
    // Accept +256 format, 256 format, or 07XX format
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^(\+?256|0)?[7]\d{8}$/.test(cleaned);
  }
  function validatePassword(pwd) {
    return typeof pwd === 'string' && pwd.length >= 8;
  }

  // ----- Registration -----
  function register({ name, email, phone, password }) {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    if (users.find(u => u.phone === phone)) {
      throw new Error('An account with this phone number already exists.');
    }
    const user = {
      id: 'USR-' + Date.now(),
      name, email, phone,
      password, // In production, never store plain text - hash on server
      verified: false,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
    return user;
  }

  // ----- Login -----
  function login({ email, password }) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error('Invalid email or password.');
    setSession({ userId: user.id, email: user.email, name: user.name, loginAt: Date.now() });
    return user;
  }

  function logout() { setSession(null); }

  function currentUser() {
    const s = getSession();
    if (!s) return null;
    return getUsers().find(u => u.id === s.userId) || null;
  }

  // ----- SMS Verification (simulated) -----
  let smsTimer = null;
  let smsSecondsLeft = 600;
  let activeSmsContext = null; // { phone, purpose, onVerified, verifyId }

  function sendSmsCode(phone, purpose = 'verification', onShown) {
    const code = generateCode(6);
    const expiresAt = Date.now() + 10 * 60 * 1000;
    logSms(phone, code, purpose);

    // Store pending code (using a unique id rather than parsing phone)
    const verifyId = 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const pending = { code, expiresAt, attempts: 0, phone, purpose, verifyId };
    localStorage.setItem('bbc_pending_' + verifyId, JSON.stringify(pending));

    activeSmsContext = { phone, purpose, onVerified: onShown, verifyId };

    // Start countdown
    smsSecondsLeft = 600;
    if (smsTimer) clearInterval(smsTimer);
    smsTimer = setInterval(() => {
      smsSecondsLeft--;
      const el = document.getElementById('smsCountdown');
      if (el) {
        const m = Math.floor(smsSecondsLeft / 60).toString().padStart(2, '0');
        const s = (smsSecondsLeft % 60).toString().padStart(2, '0');
        el.textContent = `${m}:${s}`;
      }
      if (smsSecondsLeft <= 0) {
        clearInterval(smsTimer);
        if (activeSmsContext) localStorage.removeItem('bbc_pending_' + activeSmsContext.verifyId);
      }
    }, 1000);

    // Show the modal
    showSmsModal(phone, code, purpose, onShown);
    return code;
  }

  function verifySmsCode(code) {
    // Iterate pending codes, find match
    const keys = Object.keys(localStorage).filter(k => k.startsWith('bbc_pending_'));
    let matchedKey = null;
    let matched = null;
    for (const key of keys) {
      const data = JSON.parse(localStorage.getItem(key) || 'null');
      if (data && data.code === code) { matched = data; matchedKey = key; break; }
    }
    if (!matched) throw new Error('Invalid code.');
    if (Date.now() > matched.expiresAt) {
      localStorage.removeItem(matchedKey);
      throw new Error('Code has expired. Please request a new one.');
    }
    if (matched.attempts >= 5) {
      localStorage.removeItem(matchedKey);
      throw new Error('Too many failed attempts.');
    }
    if (matched.code !== code.trim()) {
      matched.attempts++;
      localStorage.setItem(matchedKey, JSON.stringify(matched));
      throw new Error(`Invalid code. ${5 - matched.attempts} attempts remaining.`);
    }
    localStorage.removeItem(matchedKey);
    return matched;
  }

  function showSmsModal(phone, code, purpose, onVerified) {
    const modal = document.getElementById('smsModal');
    const codeDisplay = document.getElementById('smsCodeDisplay');
    const phoneDisplay = document.getElementById('smsPhoneDisplay');
    const title = document.getElementById('smsTitle');
    const subtitle = document.getElementById('smsSubtitle');
    const input = document.getElementById('smsCodeInput');
    const message = document.getElementById('smsMessage');

    codeDisplay.textContent = code;
    phoneDisplay.textContent = `📱 Sent to: ${phone}`;
    input.value = '';
    message.textContent = '';
    message.className = 'message';

    if (purpose === 'registration') {
      title.textContent = 'Verify Your Phone Number';
      subtitle.textContent = 'Enter the code below to activate your account.';
    } else if (purpose === 'password_reset') {
      title.textContent = 'Password Reset Code';
      subtitle.textContent = 'Enter the code below to reset your password.';
    } else {
      title.textContent = 'SMS Verification';
      subtitle.textContent = 'Enter the 6-digit code sent to your phone.';
    }

    modal.style.display = 'flex';
    setTimeout(() => input.focus(), 200);
    // activeSmsContext is already set in sendSmsCode
  }

  function closeSmsModal() {
    document.getElementById('smsModal').style.display = 'none';
    if (smsTimer) { clearInterval(smsTimer); smsTimer = null; }
  }

  function attachSmsHandlers() {
    const closeBtn = document.getElementById('smsModalClose');
    const verifyBtn = document.getElementById('smsVerifyBtn');
    const resendBtn = document.getElementById('smsResendBtn');
    const input = document.getElementById('smsCodeInput');

    closeBtn.addEventListener('click', closeSmsModal);
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    });

    verifyBtn.addEventListener('click', () => {
      const code = input.value.trim();
      const message = document.getElementById('smsMessage');
      if (code.length !== 6) {
        message.textContent = 'Please enter the complete 6-digit code.';
        message.className = 'message error';
        return;
      }
      try {
        const matched = verifySmsCode(code);
        message.textContent = '✓ Code verified successfully!';
        message.className = 'message success';
        const ctx = activeSmsContext;
        setTimeout(() => {
          closeSmsModal();
          if (ctx && ctx.onVerified) ctx.onVerified({ phone: matched.phone, code, purpose: matched.purpose });
          activeSmsContext = null;
        }, 800);
      } catch (e) {
        message.textContent = e.message;
        message.className = 'message error';
      }
    });

    resendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!activeSmsContext) {
        document.getElementById('smsMessage').textContent = 'No active verification. Please start over.';
        document.getElementById('smsMessage').className = 'message error';
        return;
      }
      const { phone, purpose, onVerified } = activeSmsContext;
      // Clean up old pending
      const keys = Object.keys(localStorage).filter(k => k.startsWith('bbc_pending_'));
      keys.forEach(k => localStorage.removeItem(k));
      closeSmsModal();
      sendSmsCode(phone, purpose, onVerified);
      if (window.App && window.App.toast) window.App.toast('A new code has been sent.', 'info');
    });
  }

  // ----- Password Reset -----
  function requestPasswordReset(email) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('No account found with that email.');
    return new Promise((resolve) => {
      sendSmsCode(user.phone, 'password_reset', (data) => {
        // After verification, allow password change
        resolve({ user, verified: true });
      });
    });
  }

  function resetPassword(email, newPassword) {
    if (!validatePassword(newPassword)) throw new Error('Password must be at least 8 characters.');
    const users = getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) throw new Error('Account not found.');
    users[idx].password = newPassword;
    users[idx].passwordChangedAt = new Date().toISOString();
    saveUsers(users);
    return users[idx];
  }

  // ----- Profile Update -----
  function updateProfile(email, updates) {
    const users = getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) throw new Error('Account not found.');
    users[idx] = { ...users[idx], ...updates, updatedAt: new Date().toISOString() };
    saveUsers(users);
    return users[idx];
  }

  // ----- Init -----
  function init() {
    attachSmsHandlers();
  }

  return {
    init,
    register, login, logout, currentUser,
    sendSmsCode, verifySmsCode, closeSmsModal,
    requestPasswordReset, resetPassword, updateProfile,
    generateId, generateCode,
    validateEmail, validatePhone, validatePassword,
    getUsers
  };
})();

window.AUTH = AUTH;





