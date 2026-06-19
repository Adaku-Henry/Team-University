/* =========================================================
   MAIN APPLICATION - Views, Forms, Validation, Dashboard, Admin
   ========================================================= */

const App = (() => {
  // ============= STATE =============
  const APPS_KEY = 'bbc_applications';
  const FORM_DRAFT_KEY = 'bbc_form_draft';

  // Programme catalogue
  const PROGRAMMES = [
    { code: 'DIP-BA', name: 'Diploma in Business Administration', school: 'business', duration: '2 years' },
    { code: 'DIP-ACC', name: 'Diploma in Accounting & Finance', school: 'business', duration: '2 years' },
    { code: 'DIP-MKT', name: 'Diploma in Marketing', school: 'business', duration: '2 years' },
    { code: 'DIP-HRM', name: 'Diploma in Human Resource Management', school: 'management', duration: '2 years' },
    { code: 'DIP-PRO', name: 'Diploma in Procurement & Logistics', school: 'management', duration: '2 years' },
    { code: 'DIP-ICT', name: 'Diploma in Information & Communication Technology', school: 'computing', duration: '2 years' },
    { code: 'DIP-CS', name: 'Diploma in Computer Science', school: 'computing', duration: '2 years' },
    { code: 'CERT-WD', name: 'Certificate in Web Development', school: 'computing', duration: '6 months' },
    { code: 'DIP-NET', name: 'Diploma in Network Administration', school: 'computing', duration: '2 years' },
    { code: 'DIP-EE', name: 'Diploma in Electrical Engineering', school: 'technical', duration: '2 years' },
    { code: 'DIP-CV', name: 'Diploma in Civil Engineering', school: 'technical', duration: '2 years' },
    { code: 'DIP-MEC', name: 'Diploma in Mechanical Engineering', school: 'technical', duration: '2 years' },
    { code: 'CERT-HM', name: 'Certificate in Hotel Management', school: 'hospitality', duration: '1 year' },
    { code: 'DIP-TT', name: 'Diploma in Tourism & Travel', school: 'hospitality', duration: '2 years' },
    { code: 'DIP-CUL', name: 'Diploma in Culinary Arts', school: 'hospitality', duration: '2 years' },
    { code: 'BED-EC', name: 'Bachelor of Education (Early Childhood)', school: 'education', duration: '3 years' },
    { code: 'BED-SEC', name: 'Bachelor of Education (Secondary)', school: 'education', duration: '3 years' },
    { code: 'BBIT', name: 'Bachelor of Business Information Technology', school: 'business', duration: '3 years' },
    { code: 'BCS', name: 'Bachelor of Computer Science', school: 'computing', duration: '3 years' },
    { code: 'BBA', name: 'Bachelor of Business Administration', school: 'business', duration: '3 years' },
    { code: 'MBA', name: 'Master of Business Administration', school: 'management', duration: '2 years' },
    { code: 'MSC-CS', name: 'Master of Science in Computer Science', school: 'computing', duration: '2 years' }
  ];

  // Stage names
  const STAGE_NAMES = [
    'Applicant Category',
    'Personal & Contact',
    'Programme Selection',
    'Academic Records',
    'Supporting Documents',
    'Referees & Statement',
    'Review & Submit'
  ];

  let currentStep = 1;
  const totalSteps = 7;
  let formDraft = {};
  let uploadedFiles = {};

  // ============= STORAGE =============
  function getApplications() {
    return JSON.parse(localStorage.getItem(APPS_KEY) || '[]');
  }
  function saveApplications(apps) {
    localStorage.setItem(APPS_KEY, JSON.stringify(apps));
  }
  function saveDraft(data) {
    formDraft = { ...formDraft, ...data };
    localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(formDraft));
  }
  function loadDraft() {
    formDraft = JSON.parse(localStorage.getItem(FORM_DRAFT_KEY) || '{}');
    return formDraft;
  }
  function clearDraft() {
    formDraft = {};
    localStorage.removeItem(FORM_DRAFT_KEY);
  }

  // ============= UTILITIES =============
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }
  function toast(message, type = 'info', duration = 3500) {
    const container = $('#toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = message;
    container.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => t.remove(), 300);
    }, duration);
  }
  function setMessage(elId, text, type) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = text;
    el.className = 'message ' + (type || '');
  }
  function clearFieldErrors() {
    $$('.form-group small.error').forEach(el => { el.textContent = ''; });
    $$('.form-group input.error, .form-group select.error, .form-group textarea.error')
      .forEach(el => el.classList.remove('error'));
  }
  function setFieldError(fieldId, message) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    el.classList.add('error');
    const errEl = document.querySelector(`[data-for="${fieldId}"]`);
    if (errEl) errEl.textContent = message;
  }
  function getVal(id) {
    const el = document.getElementById(id);
    if (!el) return '';
    return el.value ? el.value.trim() : '';
  }
  function isChecked(id) {
    const el = document.getElementById(id);
    return el ? el.checked : false;
  }

  // ============= VIEW SWITCHING =============
  function switchView(viewName) {
    $$('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewName);
    if (target) {
      target.classList.add('active');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    $$('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.viewTarget === viewName);
    });
    // Update hash
    if (history.pushState) history.pushState(null, '', '#' + viewName);
    if (viewName === 'admin') renderAdmin();
    if (viewName === 'dashboard') {
      // Auto-load if logged in
      const user = AUTH.currentUser();
      if (user) {
        const userApp = getApplications().find(a => a.userId === user.id);
        if (userApp) {
          $('#dashboardSearch').value = userApp.appId;
          loadDashboard(userApp.appId);
        }
      }
    }
  }

  // ============= STEP NAVIGATION =============
  function showStep(step) {
    $$('.form-step').forEach(s => s.classList.remove('active'));
    const target = document.querySelector(`.form-step[data-step="${step}"]`);
    if (target) target.classList.add('active');
    currentStep = step;
    $('#currentStepText').textContent = step;
    $('#totalStepsText').textContent = totalSteps;
    $('#stageName').textContent = STAGE_NAMES[step - 1];
    const pct = (step / totalSteps) * 100;
    $('#progressBar').style.width = pct + '%';
    // Update dots
    $$('#stepDots .dot').forEach((d, i) => {
      d.classList.remove('active', 'complete');
      if (i + 1 < step) d.classList.add('complete');
      else if (i + 1 === step) d.classList.add('active');
    });
    // Save draft & scroll
    saveCurrentStepData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function nextStep() {
    if (!validateStep(currentStep)) {
      toast('Please complete all required fields.', 'error');
      return;
    }
    saveCurrentStepData();
    if (currentStep < totalSteps) showStep(currentStep + 1);
  }
  function prevStep() {
    saveCurrentStepData();
    if (currentStep > 1) showStep(currentStep - 1);
  }

  function saveCurrentStepData() {
    const allInputs = document.querySelectorAll(`.form-step[data-step="${currentStep}"] input, .form-step[data-step="${currentStep}"] select, .form-step[data-step="${currentStep}"] textarea`);
    allInputs.forEach(input => {
      if (input.id && input.type !== 'file' && input.type !== 'checkbox') {
        formDraft[input.id] = input.value;
      } else if (input.type === 'checkbox') {
        formDraft[input.id] = input.checked;
      }
    });
    formDraft.docs = uploadedFiles;
    localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(formDraft));
  }

  function loadDraftIntoForm() {
    const draft = loadDraft();
    Object.keys(draft).forEach(key => {
      if (key === 'docs') {
        uploadedFiles = draft.docs || {};
        // Update file preview labels
        Object.keys(uploadedFiles).forEach(docId => {
          const preview = document.getElementById('prev' + docId.replace('doc', ''));
          if (preview) {
            preview.textContent = '✓ ' + (uploadedFiles[docId].name || 'File uploaded');
            preview.parentElement.classList.add('has-file');
          }
        });
        return;
      }
      const el = document.getElementById(key);
      if (el) {
        if (el.type === 'checkbox') el.checked = draft[key];
        else el.value = draft[key];
      }
    });
  }

  // ============= VALIDATION =============
  function validateStep(step) {
    clearFieldErrors();
    let valid = true;

    if (step === 1) {
      ['applicationType', 'intake', 'studyMode', 'sponsorship', 'campus'].forEach(f => {
        if (!getVal(f)) { setFieldError(f, 'This field is required.'); valid = false; }
      });
    }
    if (step === 2) {
      ['surname', 'firstName', 'gender', 'dob', 'placeOfBirth', 'nationality', 'nin',
       'maritalStatus', 'religion', 'disability', 'email', 'phone', 'country', 'district',
       'address', 'kinName', 'relationship', 'kinPhone'].forEach(f => {
        if (!getVal(f)) { setFieldError(f, 'This field is required.'); valid = false; }
      });
      if (getVal('email') && !AUTH.validateEmail(getVal('email'))) {
        setFieldError('email', 'Enter a valid email.'); valid = false;
      }
      if (getVal('phone') && !AUTH.validatePhone(getVal('phone'))) {
        setFieldError('phone', 'Enter a valid phone number.'); valid = false;
      }
      if (getVal('kinEmail') && !AUTH.validateEmail(getVal('kinEmail'))) {
        setFieldError('kinEmail', 'Enter a valid email.'); valid = false;
      }
    }
    if (step === 3) {
      if (!getVal('firstChoice')) { setFieldError('firstChoice', 'Select your first choice.'); valid = false; }
      if (!getVal('secondChoice')) { setFieldError('secondChoice', 'Select your second choice.'); valid = false; }
      if (getVal('firstChoice') && getVal('firstChoice') === getVal('secondChoice')) {
        setFieldError('secondChoice', 'Second choice must differ from first.'); valid = false;
      }
    }
    if (step === 4) {
      ['uceSchool', 'uceIndex', 'uceYear', 'uceBody', 'englishGrade', 'mathGrade'].forEach(f => {
        if (!getVal(f)) { setFieldError(f, 'This field is required.'); valid = false; }
      });
    }
    if (step === 5) {
      ['docPassport', 'docNIN', 'docOlevel'].forEach(f => {
        const el = document.getElementById(f);
        if (el && el.required && !uploadedFiles[f.replace('doc', '').toLowerCase()]) {
          // Skip - we don't actually require file (storage issue)
        }
      });
    }
    if (step === 6) {
      ['ref1Name', 'ref1Title', 'ref1Phone', 'ref2Name', 'ref2Title', 'ref2Phone'].forEach(f => {
        if (!getVal(f)) { setFieldError(f, 'This field is required.'); valid = false; }
      });
      const stmt = getVal('statement');
      if (!stmt) { setFieldError('statement', 'Statement of purpose is required.'); valid = false; }
      else if (stmt.split(/\s+/).length < 50) {
        setFieldError('statement', 'Please write at least 50 words.'); valid = false;
      }
      ['paymentMethod', 'paymentReference', 'paymentDate', 'paymentAmount'].forEach(f => {
        if (!getVal(f)) { setFieldError(f, 'This field is required.'); valid = false; }
      });
      if (!isChecked('declaration')) {
        setFieldError('declaration', 'You must accept the declaration.'); valid = false;
      }
    }
    return valid;
  }

  // ============= PROGRAMME UI =============
  function renderProgrammes(filter = 'all', search = '') {
    const container = $('#programmeContainer');
    const filtered = PROGRAMMES.filter(p => {
      if (filter !== 'all' && p.school !== filter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    container.innerHTML = filtered.length ? filtered.map(p => `
      <div class="programme-card" data-code="${p.code}">
        <h4>${p.name}</h4>
        <p>${p.school.charAt(0).toUpperCase() + p.school.slice(1)} • ${p.duration}</p>
        <span class="badge">${p.code}</span>
      </div>
    `).join('') : '<p class="muted">No programmes match your search.</p>';

    // Click handler
    container.querySelectorAll('.programme-card').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.dataset.code;
        const fc = $('#firstChoice');
        const sc = $('#secondChoice');
        if (!fc.value) fc.value = code;
        else if (!sc.value && sc.value !== fc.value) sc.value = code;
        container.querySelectorAll('.programme-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        toast('Programme selected: ' + card.querySelector('h4').textContent, 'success', 2000);
      });
    });
  }

  function populateProgrammeDropdowns() {
    const fc = $('#firstChoice');
    const sc = $('#secondChoice');
    [fc, sc].forEach(sel => {
      const first = sel.firstElementChild;
      sel.innerHTML = '';
      sel.appendChild(first);
      PROGRAMMES.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.code;
        opt.textContent = `${p.name} (${p.code})`;
        sel.appendChild(opt);
      });
    });
  }

  // ============= FILE UPLOAD HANDLING =============
  function handleFileUpload(input) {
    const id = input.id;
    const file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast('File too large. Maximum 5MB.', 'error');
      input.value = '';
      return;
    }
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast('Invalid file type. Use PDF, JPG or PNG.', 'error');
      input.value = '';
      return;
    }
    const key = id.replace('doc', '').toLowerCase();
    uploadedFiles[key] = { name: file.name, size: file.size, type: file.type };
    formDraft.docs = uploadedFiles;
    localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(formDraft));
    const card = input.closest('.upload-card');
    const preview = card.querySelector('.file-preview');
    preview.textContent = `✓ ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    card.classList.add('has-file');
    toast('File uploaded: ' + file.name, 'success', 2000);
  }

  // ============= STATEMENT WORD COUNT =============
  function updateWordCount() {
    const text = $('#statement').value.trim();
    const count = text ? text.split(/\s+/).length : 0;
    $('#wordCounter').textContent = `${count} word${count !== 1 ? 's' : ''}`;
    if (count < 50) $('#wordCounter').style.color = 'var(--danger)';
    else $('#wordCounter').style.color = 'var(--success)';
  }

  // ============= REVIEW =============
  function renderReview() {
    const data = loadDraft();
    const sections = [
      {
        title: 'Applicant Category',
        fields: [
          ['Application Type', data.applicationType],
          ['Intake', data.intake],
          ['Study Mode', data.studyMode],
          ['Sponsorship', data.sponsorship],
          ['Preferred Campus', data.campus],
          ['Referred By', data.referralSource]
        ]
      },
      {
        title: 'Personal Information',
        fields: [
          ['Full Name', `${data.firstName} ${data.otherNames || ''} ${data.surname}`.trim()],
          ['Gender', data.gender],
          ['Date of Birth', data.dob],
          ['Place of Birth', data.placeOfBirth],
          ['Nationality', data.nationality],
          ['National ID', data.nin],
          ['Marital Status', data.maritalStatus],
          ['Religion', data.religion],
          ['Disability', data.disability]
        ]
      },
      {
        title: 'Contact Information',
        fields: [
          ['Email', data.email],
          ['Phone', data.phone],
          ['Country', data.country],
          ['District', data.district],
          ['Address', data.address]
        ]
      },
      {
        title: 'Next of Kin',
        fields: [
          ['Name', data.kinName],
          ['Relationship', data.relationship],
          ['Phone', data.kinPhone],
          ['Email', data.kinEmail]
        ]
      },
      {
        title: 'Programme Selection',
        fields: [
          ['First Choice', data.firstChoice],
          ['Second Choice', data.secondChoice]
        ]
      },
      {
        title: 'Academic Records',
        fields: [
          ['UCE School', data.uceSchool],
          ['UCE Index', data.uceIndex],
          ['UCE Year', data.uceYear],
          ['English', data.englishGrade],
          ['Mathematics', data.mathGrade],
          ['Higher Institution', data.higherInstitution],
          ['Higher Qualification', data.higherQualification]
        ]
      },
      {
        title: 'Referees',
        fields: [
          ['Referee 1', `${data.ref1Name} - ${data.ref1Phone}`],
          ['Referee 2', `${data.ref2Name} - ${data.ref2Phone}`]
        ]
      },
      {
        title: 'Payment',
        fields: [
          ['Method', data.paymentMethod],
          ['Reference', data.paymentReference],
          ['Amount', data.paymentAmount ? 'UGX ' + Number(data.paymentAmount).toLocaleString() : '']
        ]
      }
    ];
    $('#reviewSection').innerHTML = sections.map(s => `
      <div class="review-section">
        <h3>${s.title}</h3>
        <div class="review-grid">
          ${s.fields.map(([l, v]) => `
            <div class="review-item">
              <span class="review-label">${l}</span>
              <span class="review-value">${v || '—'}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // ============= SUBMIT APPLICATION =============
  function submitApplication() {
    // Save current step data (stage 7 has nothing to save, but ensure latest draft)
    saveCurrentStepData();
    if (!validateStep(6)) {
      toast('Please complete payment & declaration first.', 'error');
      showStep(6);
      return;
    }
    // Validate all previous steps
    for (let s = 1; s <= 6; s++) {
      if (!validateStep(s)) {
        toast(`Please complete Stage ${s}: ${STAGE_NAMES[s-1]}.`, 'error');
        showStep(s);
        return;
      }
    }
    const data = loadDraft();
    const user = AUTH.currentUser();
    if (!user) {
      toast('Please log in or register first.', 'error');
      switchView('portal');
      return;
    }
    const appId = 'BBC-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 90000) + 10000);
    const app = {
      appId,
      userId: user.id,
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      ...data
    };
    const apps = getApplications();
    // If user already has an app, update it instead of creating new
    const existingIdx = apps.findIndex(a => a.userId === user.id);
    if (existingIdx !== -1) {
      apps[existingIdx] = { ...apps[existingIdx], ...app, appId: apps[existingIdx].appId };
    } else {
      apps.push(app);
    }
    saveApplications(apps);
    clearDraft();
    // Show success
    $('#loggedUserBanner').style.display = 'none';
    $('#applicationForm').style.display = 'none';
    $('.progress-wrapper').style.display = 'none';
    $('#successScreen').style.display = 'block';
    renderApplicationSlip(existingIdx !== -1 ? apps[existingIdx] : app);
    toast('Application submitted successfully!', 'success', 5000);
    // Auto scroll
    $('#successScreen').scrollIntoView({ behavior: 'smooth' });
  }

  function renderApplicationSlip(app) {
    const html = `
      <div class="slip-header">
        <img src="assets/logo.svg" alt="Logo" class="slip-logo">
        <div>
          <h3>BENCHMARK BUSINESS COLLEGE</h3>
          <p>Application Acknowledgement Slip</p>
        </div>
      </div>
      <div class="slip-row"><span class="label">Applicant:</span><span class="value">${app.firstName} ${app.surname}</span></div>
      <div class="slip-row"><span class="label">Email:</span><span class="value">${app.email}</span></div>
      <div class="slip-row"><span class="label">Phone:</span><span class="value">${app.phone}</span></div>
      <div class="slip-row"><span class="label">Programme:</span><span class="value">${app.firstChoice || '—'}</span></div>
      <div class="slip-row"><span class="label">Intake:</span><span class="value">${app.intake}</span></div>
      <div class="slip-row"><span class="label">Status:</span><span class="value"><span class="badge info">${app.status}</span></span></div>
      <div class="slip-row"><span class="label">Submitted:</span><span class="value">${new Date(app.submittedAt).toLocaleString()}</span></div>
      <div class="slip-id">${app.appId}</div>
      <p class="muted small" style="text-align:center; margin-top:10px;">
        Keep this ID safe. You can check status, print your full PDF, or download it anytime from the dashboard.
      </p>
    `;
    $('#applicationSlip').innerHTML = html;
  }

  function generateAndDownloadPdf() {
    const data = loadDraft();
    // Find latest application
    const apps = getApplications();
    const user = AUTH.currentUser();
    const app = user ? apps.find(a => a.userId === user.id) || apps[apps.length - 1] : apps[apps.length - 1];
    if (!app) {
      toast('No application to download. Submit first.', 'error');
      return;
    }
    try {
      const doc = PDFGen.generateApplicationPDF(app);
      PDFGen.downloadPdf(doc, `BBC_Application_${app.appId}.pdf`);
      toast('PDF downloaded successfully.', 'success');
    } catch (e) {
      console.error(e);
      toast('Error generating PDF: ' + e.message, 'error');
    }
  }

  // ============= DASHBOARD =============
  function loadDashboard(searchValue) {
    const value = (searchValue || $('#dashboardSearch').value).trim();
    if (!value) {
      setMessage('dashboardMessage', 'Enter an Application ID or email.', 'error');
      return;
    }
    const apps = getApplications();
    const app = apps.find(a =>
      a.appId === value || (a.email && a.email.toLowerCase() === value.toLowerCase())
    );
    if (!app) {
      setMessage('dashboardMessage', 'No application found with that ID or email.', 'error');
      return;
    }
    setMessage('dashboardMessage', 'Application loaded.', 'success');
    renderStudentPanels(app);
  }

  function renderStudentPanels(app) {
    $('#studentPanels').style.display = 'block';
    // Overview
    $('#studentOverview').innerHTML = `
      <div class="review-grid">
        <div class="review-item"><span class="review-label">Application ID</span><span class="review-value">${app.appId}</span></div>
        <div class="review-item"><span class="review-label">Status</span><span class="review-value"><span class="badge info">${app.status}</span></span></div>
        <div class="review-item"><span class="review-label">Name</span><span class="review-value">${app.firstName} ${app.surname}</span></div>
        <div class="review-item"><span class="review-label">Programme</span><span class="review-value">${app.firstChoice || '—'}</span></div>
        <div class="review-item"><span class="review-label">Intake</span><span class="review-value">${app.intake}</span></div>
        <div class="review-item"><span class="review-label">Campus</span><span class="review-value">${app.campus}</span></div>
        <div class="review-item"><span class="review-label">Study Mode</span><span class="review-value">${app.studyMode}</span></div>
        <div class="review-item"><span class="review-label">Submitted</span><span class="review-value">${new Date(app.submittedAt).toLocaleDateString()}</span></div>
      </div>
    `;
    // Progress
    const stages = [
      { name: 'Submitted', complete: true },
      { name: 'Document Verification', complete: ['Document Verification', 'Department Review', 'Approved', 'Rejected'].includes(app.status) },
      { name: 'Department Review', complete: ['Department Review', 'Approved', 'Rejected'].includes(app.status) },
      { name: 'Final Decision', complete: ['Approved', 'Rejected'].includes(app.status) }
    ];
    $('#studentProgress').innerHTML = `
      <div class="progress-tracker">
        <div class="progress-line" style="width: ${stages.filter(s => s.complete).length > 1 ? ((stages.filter(s => s.complete).length - 1) / (stages.length - 1) * 100) : 0}%;"></div>
        ${stages.map((s, i) => `
          <div class="tracker-step ${s.complete ? 'complete' : (i === stages.findIndex(x => !x.complete) ? 'active' : '')}">
            <div class="circle">${s.complete ? '✓' : i + 1}</div>
            <span class="label">${s.name}</span>
          </div>
        `).join('')}
      </div>
    `;
    // Documents
    const docs = app.docs || {};
    const docList = [
      ['Passport Photo', docs.passport],
      ['National ID', docs.nin],
      ['O-Level Results', docs.olevel],
      ['A-Level / Diploma', docs.higher],
      ['Recommendation', docs.recommendation],
      ['Birth Certificate', docs.birth]
    ];
    $('#studentDocuments').innerHTML = `
      <table class="results-table">
        <thead><tr><th>Document</th><th>Filename</th><th>Status</th></tr></thead>
        <tbody>
          ${docList.map(([n, d]) => `
            <tr>
              <td>${n}</td>
              <td>${d ? d.name : '—'}</td>
              <td><span class="badge ${d ? 'success' : 'warning'}">${d ? '✓ Uploaded' : 'Pending'}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    // Notifications
    const notes = [
      { type: 'success', title: 'Application Received', text: `Your application ${app.appId} has been received and assigned to the admissions team.`, date: app.submittedAt },
      { type: 'info', title: 'Document Verification', text: 'Your uploaded documents are being verified by the admissions office.', date: new Date().toISOString() },
      { type: 'warning', title: 'Keep Your Details Safe', text: 'Never share your application ID or password with anyone.', date: new Date().toISOString() }
    ];
    $('#studentNotifications').innerHTML = notes.map(n => `
      <li class="${n.type}">
        <strong>${n.title}</strong><br>${n.text}
        <small>${new Date(n.date).toLocaleString()}</small>
      </li>
    `).join('');
    // Profile
    $('#profileName').value = `${app.firstName} ${app.surname}`;
    $('#profileEmail').value = app.email;
    $('#profilePhone').value = app.phone;
  }

  // ============= ADMIN =============
  function renderAdmin() {
    const apps = getApplications();
    $('#totalApps').textContent = apps.length;
    $('#pendingApps').textContent = apps.filter(a => ['Submitted', 'Under Review', 'Document Verification', 'Department Review'].includes(a.status)).length;
    $('#approvedApps').textContent = apps.filter(a => a.status === 'Approved').length;
    $('#rejectedApps').textContent = apps.filter(a => a.status === 'Rejected').length;
    renderApplicationsTable(apps);
    renderAnalytics(apps);
    populateAdminFilters(apps);
  }

  function renderApplicationsTable(apps) {
    const search = $('#adminSearch').value.toLowerCase();
    const prog = $('#adminProgramFilter').value;
    const intake = $('#adminIntakeFilter').value;
    const status = $('#adminStatusFilter').value;
    const filtered = apps.filter(a => {
      if (search && !`${a.firstName} ${a.surname} ${a.email} ${a.appId}`.toLowerCase().includes(search)) return false;
      if (prog !== 'all' && a.firstChoice !== prog) return false;
      if (intake !== 'all' && a.intake !== intake) return false;
      if (status !== 'all' && a.status !== status) return false;
      return true;
    });
    const tbody = $('#applicationsTableBody');
    tbody.innerHTML = filtered.length ? filtered.map(a => `
      <tr>
        <td><strong>${a.appId}</strong></td>
        <td>${a.firstName} ${a.surname}<br><small class="muted">${a.email}</small></td>
        <td>${a.firstChoice || '—'}</td>
        <td>${a.intake || '—'}</td>
        <td><span class="badge ${getStatusBadgeClass(a.status)}">${a.status}</span></td>
        <td>${new Date(a.submittedAt).toLocaleDateString()}</td>
        <td>
          <div class="actions-cell">
            <button class="btn-mini btn-primary" onclick="App.viewApplication('${a.appId}')">View</button>
            <button class="btn-mini btn-secondary" onclick="App.approveApp('${a.appId}')">Approve</button>
            <button class="btn-mini btn-danger" onclick="App.rejectApp('${a.appId}')">Reject</button>
          </div>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="7" style="text-align:center; padding:30px;" class="muted">No applications match your filter.</td></tr>';
  }

  function getStatusBadgeClass(status) {
    if (status === 'Approved') return 'success';
    if (status === 'Rejected') return 'danger';
    if (status === 'Submitted') return 'info';
    return 'warning';
  }

  function populateAdminFilters(apps) {
    const progs = [...new Set(apps.map(a => a.firstChoice).filter(Boolean))];
    const intakes = [...new Set(apps.map(a => a.intake).filter(Boolean))];
    const progSel = $('#adminProgramFilter');
    const intakeSel = $('#adminIntakeFilter');
    const curProg = progSel.value;
    const curIntake = intakeSel.value;
    progSel.innerHTML = '<option value="all">All Programmes</option>' +
      progs.map(p => `<option value="${p}">${p}</option>`).join('');
    progSel.value = curProg || 'all';
    intakeSel.innerHTML = '<option value="all">All Intakes</option>' +
      intakes.map(i => `<option value="${i}">${i}</option>`).join('');
    intakeSel.value = curIntake || 'all';
  }

  function renderAnalytics(apps) {
    const total = apps.length;
    const byProgramme = {};
    const byGender = { Male: 0, Female: 0, Other: 0 };
    const byIntake = {};
    const bySponsorship = {};
    apps.forEach(a => {
      if (a.firstChoice) byProgramme[a.firstChoice] = (byProgramme[a.firstChoice] || 0) + 1;
      if (a.gender && byGender.hasOwnProperty(a.gender)) byGender[a.gender]++;
      if (a.intake) byIntake[a.intake] = (byIntake[a.intake] || 0) + 1;
      if (a.sponsorship) bySponsorship[a.sponsorship] = (bySponsorship[a.sponsorship] || 0) + 1;
    });
    const topProg = Object.entries(byProgramme).sort((a, b) => b[1] - a[1])[0];
    const topIntake = Object.entries(byIntake).sort((a, b) => b[1] - a[1])[0];
    $('#analyticsBox').innerHTML = `
      <div class="analytics-card">
        <h4>Top Programme</h4>
        <div class="big-num">${topProg ? topProg[1] : 0}</div>
        <div class="small-desc">${topProg ? topProg[0] : 'No data'}</div>
      </div>
      <div class="analytics-card">
        <h4>Top Intake</h4>
        <div class="big-num">${topIntake ? topIntake[1] : 0}</div>
        <div class="small-desc">${topIntake ? topIntake[0] : 'No data'}</div>
      </div>
      <div class="analytics-card">
        <h4>By Gender</h4>
        <div class="big-num">${byGender.Male + byGender.Female + byGender.Other}</div>
        <div class="small-desc">♂ ${byGender.Male} | ♀ ${byGender.Female}</div>
      </div>
      <div class="analytics-card">
        <h4>Sponsorship</h4>
        <div class="big-num">${Object.keys(bySponsorship).length}</div>
        <div class="small-desc">${Object.entries(bySponsorship).map(([k, v]) => `${k}: ${v}`).join(', ') || 'No data'}</div>
      </div>
    `;
  }

  function viewApplication(appId) {
    const app = getApplications().find(a => a.appId === appId);
    if (!app) return;
    const body = `
      <h2>${app.firstName} ${app.surname}</h2>
      <p class="muted">${app.appId} • ${app.status}</p>
      <div class="review-grid" style="margin-top:20px;">
        <div class="review-item"><span class="review-label">Email</span><span class="review-value">${app.email}</span></div>
        <div class="review-item"><span class="review-label">Phone</span><span class="review-value">${app.phone}</span></div>
        <div class="review-item"><span class="review-label">Programme</span><span class="review-value">${app.firstChoice}</span></div>
        <div class="review-item"><span class="review-label">Second Choice</span><span class="review-value">${app.secondChoice || '—'}</span></div>
        <div class="review-item"><span class="review-label">Intake</span><span class="review-value">${app.intake}</span></div>
        <div class="review-item"><span class="review-label">Campus</span><span class="review-value">${app.campus}</span></div>
        <div class="review-item"><span class="review-label">Sponsorship</span><span class="review-value">${app.sponsorship}</span></div>
        <div class="review-item"><span class="review-label">English</span><span class="review-value">${app.englishGrade || '—'}</span></div>
        <div class="review-item"><span class="review-label">Math</span><span class="review-value">${app.mathGrade || '—'}</span></div>
        <div class="review-item"><span class="review-label">National ID</span><span class="review-value">${app.nin}</span></div>
      </div>
      <div style="margin-top:24px; padding:16px; background:var(--gold-50); border-radius:8px;">
        <h3>Statement of Purpose</h3>
        <p style="margin-top:8px; font-style:italic;">${app.statement || '—'}</p>
      </div>
      <div style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn-secondary" onclick="App.downloadAppPdf('${app.appId}')">📄 Download PDF</button>
        <button class="btn-primary" onclick="App.approveApp('${app.appId}'); document.getElementById('modalCloseBtn').click();">Approve</button>
        <button class="btn-danger" onclick="App.rejectApp('${app.appId}'); document.getElementById('modalCloseBtn').click();">Reject</button>
      </div>
    `;
    $('#modalBody').innerHTML = body;
    $('#applicationModal').style.display = 'flex';
  }

  function updateStatus(appId, newStatus) {
    const apps = getApplications();
    const idx = apps.findIndex(a => a.appId === appId);
    if (idx === -1) return;
    apps[idx].status = newStatus;
    apps[idx].statusUpdatedAt = new Date().toISOString();
    saveApplications(apps);
    renderAdmin();
    toast(`Application ${appId} ${newStatus.toLowerCase()}.`, newStatus === 'Approved' ? 'success' : newStatus === 'Rejected' ? 'error' : 'info');
  }

  function downloadAppPdf(appId) {
    const app = getApplications().find(a => a.appId === appId);
    if (!app) return;
    const doc = PDFGen.generateApplicationPDF(app);
    PDFGen.downloadPdf(doc, `BBC_${app.appId}.pdf`);
    toast('PDF downloaded.', 'success');
  }

  function exportCsv() {
    const apps = getApplications();
    if (!apps.length) {
      toast('No data to export.', 'warning');
      return;
    }
    const headers = ['App ID', 'Surname', 'First Name', 'Email', 'Phone', 'Programme', 'Intake', 'Status', 'Date'];
    const rows = apps.map(a => [
      a.appId, a.surname, a.firstName, a.email, a.phone,
      a.firstChoice, a.intake, a.status, new Date(a.submittedAt).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${(c || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BBC_Applications_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast('CSV exported.', 'success');
  }

  // ============= DEMO DATA =============
  function seedDemoData() {
    const demoApps = [
      {
        appId: 'BBC-2026-70001',
        firstName: 'Sarah', surname: 'Nakato', otherNames: 'Grace',
        email: 'sarah.nakato@example.com', phone: '+256782123456',
        gender: 'Female', dob: '2002-05-14', placeOfBirth: 'Kampala',
        nationality: 'Ugandan', nin: 'CM0203456789A', maritalStatus: 'Single',
        religion: 'Christian', disability: 'No Disability',
        country: 'Uganda', district: 'Kampala', address: 'Plot 12, Ntinda Road, Kampala',
        village: 'Ntinda', subcounty: 'Kawempe Division',
        kinName: 'John Nakato', relationship: 'Father', kinPhone: '+256700111222', kinEmail: 'john@example.com',
        kinOccupation: 'Engineer', kinAddress: 'Kampala',
        applicationType: 'Diploma Programme', intake: 'August 2026 Intake',
        studyMode: 'Day', sponsorship: 'Private Sponsored', campus: 'Main Campus - Kampala',
        referralSource: 'Friend / Family',
        firstChoice: 'DIP-BA', secondChoice: 'BBA',
        uceSchool: 'Makerere College School', uceIndex: 'U0012/456', uceYear: '2019', uceBody: 'UNEB',
        englishGrade: 'C3', mathGrade: 'C4', biologyGrade: 'C5', chemistryGrade: 'C5',
        physicsGrade: 'C6', geographyGrade: 'C4', historyGrade: 'C5', economicsGrade: 'C3',
        entrepreneurshipGrade: 'C4', computerGrade: 'C3',
        higherInstitution: '', higherQualification: '', higherProgramme: '', higherYear: '', higherGrade: '', higherRegNo: '',
        employed: 'No', workYears: '0', employer: '',
        ref1Name: 'Mr. Ssempa Joseph', ref1Title: 'Head Teacher', ref1Org: 'Makerere College School',
        ref1Phone: '+256772334455', ref1Email: 'ssempa@mcs.ac.ug', ref1Relation: 'Former teacher',
        ref2Name: 'Ms. Achieng Olivia', ref2Title: 'Senior Accountant', ref2Org: 'Equity Bank',
        ref2Phone: '+256788556677', ref2Email: 'olivia@equity.co.ug', ref2Relation: 'Family friend',
        statement: 'I am writing to express my strong interest in the Diploma in Business Administration programme. Having completed my UCE with good grades and developed a passion for business through school leadership roles, I am eager to gain formal training in business management. I aspire to start my own enterprise in the fashion industry and believe this programme will give me the foundational knowledge I need to succeed.',
        paymentMethod: 'MTN Mobile Money', paymentReference: 'MTN-4567890',
        paymentDate: '2026-01-15', paymentAmount: '50000',
        docs: {
          passport: { name: 'sarah_passport.jpg', size: 245000 },
          nin: { name: 'sarah_nin.pdf', size: 380000 },
          olevel: { name: 'sarah_uce.pdf', size: 520000 },
          higher: null, recommendation: { name: 'sarah_recommendation.pdf', size: 180000 }, birth: null
        },
        status: 'Under Review', submittedAt: '2026-01-15T10:30:00Z'
      },
      {
        appId: 'BBC-2026-70002',
        firstName: 'David', surname: 'Mukasa', otherNames: 'Peter',
        email: 'david.mukasa@example.com', phone: '+256701987654',
        gender: 'Male', dob: '2000-11-22', placeOfBirth: 'Jinja',
        nationality: 'Ugandan', nin: 'CM0004561234B', maritalStatus: 'Single',
        religion: 'Christian', disability: 'No Disability',
        country: 'Uganda', district: 'Jinja', address: 'Plot 8, Main Street, Jinja',
        village: 'Bugembe', subcounty: 'Jinja Municipality',
        kinName: 'Mary Mukasa', relationship: 'Mother', kinPhone: '+256702333444',
        kinOccupation: 'Nurse', kinAddress: 'Jinja',
        applicationType: 'Undergraduate Direct Entry', intake: 'January 2026 Intake',
        studyMode: 'Evening', sponsorship: 'Government Sponsored', campus: 'Jinja Campus',
        firstChoice: 'BCS', secondChoice: 'DIP-ICT',
        uceSchool: 'Jinja College', uceIndex: 'U0089/234', uceYear: '2018', uceBody: 'UNEB',
        englishGrade: 'C4', mathGrade: 'C3', biologyGrade: 'C4', chemistryGrade: 'C3',
        physicsGrade: 'C3', geographyGrade: 'C5', historyGrade: 'C4', economicsGrade: 'C4',
        computerGrade: 'C3',
        higherInstitution: 'Jinja College', higherQualification: 'UACE (A-Level)',
        higherProgramme: 'PCM', higherYear: '2020', higherGrade: 'Principal Pass',
        employed: 'No', workYears: '0',
        ref1Name: 'Mrs. Nambi Grace', ref1Title: 'Principal', ref1Org: 'Jinja College',
        ref1Phone: '+256753221100', ref1Relation: 'Former principal',
        ref2Name: 'Dr. Okello Paul', ref2Title: 'Doctor', ref2Org: 'Jinja Hospital',
        ref2Phone: '+256788445566', ref2Relation: 'Family friend',
        statement: 'My passion for technology and computing began in secondary school where I excelled in computer studies. I have been self-teaching programming through online platforms and have built several web applications. I now want to formalize my skills with a Bachelor of Computer Science to prepare for a career in software engineering. I am committed to contributing to Uganda\'s growing tech ecosystem.',
        paymentMethod: 'Bank Transfer', paymentReference: 'DFCU-TRF-998877',
        paymentDate: '2026-01-10', paymentAmount: '50000',
        docs: {
          passport: { name: 'david_passport.jpg', size: 198000 },
          nin: { name: 'david_nin.pdf', size: 290000 },
          olevel: { name: 'david_uce.pdf', size: 480000 },
          higher: { name: 'david_uace.pdf', size: 420000 },
          recommendation: { name: 'david_recommendation.pdf', size: 220000 },
          birth: null
        },
        status: 'Approved', submittedAt: '2026-01-10T14:22:00Z', statusUpdatedAt: '2026-01-20T09:00:00Z'
      },
      {
        appId: 'BBC-2026-70003',
        firstName: 'Aisha', surname: 'Namugga', otherNames: 'Fatima',
        email: 'aisha.namugga@example.com', phone: '+256770456789',
        gender: 'Female', dob: '2001-08-30', placeOfBirth: 'Mbarara',
        nationality: 'Ugandan', nin: 'CM0109876543C', maritalStatus: 'Single',
        religion: 'Muslim', disability: 'No Disability',
        country: 'Uganda', district: 'Mbarara', address: 'Nkokonjeru, Mbarara',
        kinName: 'Hassan Namugga', relationship: 'Father', kinPhone: '+256778889900',
        kinOccupation: 'Businessman', kinAddress: 'Mbarara',
        applicationType: 'Diploma Programme', intake: 'August 2026 Intake',
        studyMode: 'Weekend', sponsorship: 'Private Sponsored', campus: 'Main Campus - Kampala',
        firstChoice: 'DIP-HRM', secondChoice: 'DIP-MKT',
        uceSchool: 'Mbarara High School', uceIndex: 'U0234/567', uceYear: '2019', uceBody: 'UNEB',
        englishGrade: 'C5', mathGrade: 'C6', biologyGrade: 'C6', chemistryGrade: 'C5',
        geographyGrade: 'C4', historyGrade: 'C5', economicsGrade: 'C3',
        entrepreneurshipGrade: 'C3', computerGrade: 'C4',
        higherInstitution: '', higherQualification: '', higherProgramme: '',
        employed: 'Yes', workYears: '2', employer: 'Mbarara Boutique - Sales Associate',
        ref1Name: 'Ms. Nakato Irene', ref1Title: 'Senior Teacher', ref1Org: 'Mbarara High School',
        ref1Phone: '+256755443322', ref1Relation: 'Former teacher',
        ref2Name: 'Mr. Kiggundu Brian', ref2Title: 'Boutique Owner', ref2Org: 'Mbarara Boutique',
        ref2Phone: '+256789001122', ref2Relation: 'Current employer',
        statement: 'After working in the retail industry for two years, I have developed a deep interest in human resource management. I want to understand how organizations can better support their employees while driving productivity. This diploma will provide me with the formal qualifications needed to transition from a sales role into an HR position. I am particularly drawn to Benchmark Business College because of its strong reputation in business education.',
        paymentMethod: 'Airtel Money', paymentReference: 'AIRT-7788990',
        paymentDate: '2026-01-12', paymentAmount: '50000',
        docs: {
          passport: { name: 'aisha_passport.jpg', size: 215000 },
          nin: { name: 'aisha_nin.pdf', size: 310000 },
          olevel: { name: 'aisha_uce.pdf', size: 495000 },
          higher: null, recommendation: { name: 'aisha_recommendation.pdf', size: 200000 },
          birth: { name: 'aisha_birth.pdf', size: 280000 }
        },
        status: 'Document Verification', submittedAt: '2026-01-12T11:45:00Z'
      }
    ];
    saveApplications(demoApps);
    toast('Demo data seeded: 3 applications.', 'success');
    renderAdmin();
  }

  // ============= EVENT WIRING =============
  function attachEventHandlers() {
    // Nav
    $$('[data-view-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(el.dataset.viewTarget);
      });
    });

    // Menu button
    $('#menuBtn').addEventListener('click', () => {
      $('#navLinks').classList.toggle('open');
    });

    // Registration
    $('#registerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      handleRegister();
    });
    // Login
    $('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin();
    });
    $('#goToLogin').addEventListener('click', (e) => {
      e.preventDefault();
      $('#loginEmail').focus();
      window.scrollTo({ top: $('#loginForm').offsetTop - 100, behavior: 'smooth' });
    });
    $('#forgotPasswordLink').addEventListener('click', (e) => {
      e.preventDefault();
      handleForgotPassword();
    });

    // Quick status
    $('#quickStatusBtn').addEventListener('click', () => {
      const value = $('#quickStatusInput').value.trim();
      if (!value) {
        setMessage('quickStatusResult', 'Enter an Application ID or email.', 'error');
        return;
      }
      const app = getApplications().find(a => a.appId === value || (a.email && a.email.toLowerCase() === value.toLowerCase()));
      if (!app) {
        setMessage('quickStatusResult', 'No application found.', 'error');
        return;
      }
      setMessage('quickStatusResult', `Found: ${app.firstName} ${app.surname} — Status: ${app.status}`, 'success');
    });

    // Step navigation
    $$('.next-step').forEach(b => b.addEventListener('click', nextStep));
    $$('.prev-step').forEach(b => b.addEventListener('click', prevStep));

    // Programme filter
    $('#facultyFilter').addEventListener('change', () => renderProgrammes($('#facultyFilter').value, $('#programmeSearch').value));
    $('#programmeSearch').addEventListener('input', () => renderProgrammes($('#facultyFilter').value, $('#programmeSearch').value));

    // File uploads
    ['docPassport', 'docNIN', 'docOlevel', 'docHigher', 'docRecommendation', 'docBirth'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => handleFileUpload(el));
    });

    // Statement word count
    $('#statement').addEventListener('input', updateWordCount);

    // Submit
    $('#submitApplicationBtn').addEventListener('click', submitApplication);

    // Print/Download slip
    $('#downloadSlipBtn').addEventListener('click', generateAndDownloadPdf);
    $('#printSlipBtn').addEventListener('click', () => window.print());
    const downloadSlipBtn2 = $('#downloadSlipBtn2');
    if (downloadSlipBtn2) downloadSlipBtn2.addEventListener('click', generateAndDownloadPdf);

    // Dashboard
    $('#loadDashboardBtn').addEventListener('click', () => loadDashboard());
    $('#refreshStatusBtn').addEventListener('click', () => loadDashboard());
    $('#updateProfileBtn').addEventListener('click', handleUpdateProfile);
    $('#changePasswordBtn').addEventListener('click', handleChangePassword);

    // Admin
    $('#applyAdminFilterBtn').addEventListener('click', () => renderApplicationsTable(getApplications()));
    $('#exportCsvBtn').addEventListener('click', exportCsv);
    $('#clearDemoBtn').addEventListener('click', () => {
      if (confirm('Clear ALL applications? This cannot be undone.')) {
        localStorage.removeItem(APPS_KEY);
        renderAdmin();
        toast('All applications cleared.', 'warning');
      }
    });
    $('#seedDemoBtn').addEventListener('click', seedDemoData);

    // Modal
    $('#modalCloseBtn').addEventListener('click', () => $('#applicationModal').style.display = 'none');

    // Hash routing
    window.addEventListener('hashchange', () => {
      const hash = location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) switchView(hash);
    });
  }

  // ============= AUTH HANDLERS =============
  function handleRegister() {
    clearFieldErrors();
    const name = getVal('regName');
    const email = getVal('regEmail');
    const phone = getVal('regPhone');
    const password = getVal('regPassword');
    const confirm = getVal('regConfirmPassword');
    let valid = true;
    if (!name) { setFieldError('regName', 'Required'); valid = false; }
    if (!email || !AUTH.validateEmail(email)) { setFieldError('regEmail', 'Valid email required'); valid = false; }
    if (!phone || !AUTH.validatePhone(phone)) { setFieldError('regPhone', 'Valid phone required (e.g. +256 7XX XXX XXX)'); valid = false; }
    if (!password || !AUTH.validatePassword(password)) { setFieldError('regPassword', 'Minimum 8 characters'); valid = false; }
    if (password !== confirm) { setFieldError('regConfirmPassword', 'Passwords do not match'); valid = false; }
    if (!isChecked('regTerms')) { setFieldError('regTerms', 'You must accept the terms'); valid = false; }
    if (!valid) return;
    try {
      const user = AUTH.register({ name, email, phone, password });
      setMessage('registerMessage', 'Account created! Sending verification code...', 'success');
      // Send SMS
      AUTH.sendSmsCode(phone, 'registration', (data) => {
        // Mark user as verified
        const users = AUTH.getUsers();
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) {
          users[idx].verified = true;
          users[idx].verifiedAt = new Date().toISOString();
          localStorage.setItem('bbc_users', JSON.stringify(users));
        }
        // Auto login
        AUTH.login({ email, password });
        setMessage('registerMessage', '✓ Phone verified! You are now logged in. Redirecting...', 'success');
        toast('Account verified! Welcome to BBC.', 'success');
        setTimeout(() => {
          switchView('apply');
          updateLoggedInBanner();
        }, 1500);
      });
    } catch (e) {
      setMessage('registerMessage', e.message, 'error');
    }
  }

  function handleLogin() {
    clearFieldErrors();
    const email = getVal('loginEmail');
    const password = getVal('loginPassword');
    let valid = true;
    if (!email) { setFieldError('loginEmail', 'Required'); valid = false; }
    if (!password) { setFieldError('loginPassword', 'Required'); valid = false; }
    if (!valid) return;
    try {
      const user = AUTH.login({ email, password });
      setMessage('loginMessage', `Welcome back, ${user.name}!`, 'success');
      toast(`Welcome, ${user.name}!`, 'success');
      setTimeout(() => {
        switchView('apply');
        updateLoggedInBanner();
      }, 1000);
    } catch (e) {
      setMessage('loginMessage', e.message, 'error');
    }
  }

  function handleForgotPassword() {
    const email = prompt('Enter your registered email:');
    if (!email) return;
    try {
      AUTH.requestPasswordReset(email).then(({ user, verified }) => {
        if (verified) {
          const newPwd = prompt('Enter your new password (min 8 characters):');
          if (newPwd && AUTH.validatePassword(newPwd)) {
            AUTH.resetPassword(email, newPwd);
            toast('Password reset successfully. You can now log in.', 'success');
          } else {
            toast('Password must be at least 8 characters.', 'error');
          }
        }
      });
    } catch (e) {
      toast(e.message, 'error');
    }
  }

  function handleUpdateProfile() {
    const user = AUTH.currentUser();
    if (!user) return;
    try {
      AUTH.updateProfile(user.email, {
        name: getVal('profileName'),
        email: getVal('profileEmail'),
        phone: getVal('profilePhone')
      });
      setMessage('profileMessage', 'Profile updated.', 'success');
      toast('Profile updated.', 'success');
    } catch (e) {
      setMessage('profileMessage', e.message, 'error');
    }
  }

  function handleChangePassword() {
    const user = AUTH.currentUser();
    if (!user) {
      setMessage('changePasswordMessage', 'Please log in first.', 'error');
      return;
    }
    const current = getVal('currentPassword');
    const newPwd = getVal('newPassword');
    const confirm = getVal('confirmNewPassword');
    if (current !== user.password) {
      setMessage('changePasswordMessage', 'Current password is incorrect.', 'error');
      return;
    }
    if (!AUTH.validatePassword(newPwd)) {
      setMessage('changePasswordMessage', 'New password must be at least 8 characters.', 'error');
      return;
    }
    if (newPwd !== confirm) {
      setMessage('changePasswordMessage', 'Passwords do not match.', 'error');
      return;
    }
    // Send SMS verification
    AUTH.sendSmsCode(user.phone, 'password_reset', () => {
      AUTH.resetPassword(user.email, newPwd);
      setMessage('changePasswordMessage', 'Password changed successfully.', 'success');
      toast('Password changed.', 'success');
      $('#currentPassword').value = '';
      $('#newPassword').value = '';
      $('#confirmNewPassword').value = '';
    });
  }

  function updateLoggedInBanner() {
    const user = AUTH.currentUser();
    const banner = $('#loggedUserBanner');
    if (user) {
      banner.innerHTML = `✓ Logged in as <strong>${user.name}</strong> (${user.email}). Your progress will be auto-saved.`;
      banner.className = 'alert success';
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  }

  // ============= INIT =============
  function init() {
    AUTH.init();
    attachEventHandlers();
    populateProgrammeDropdowns();
    renderProgrammes();
    // Restore from hash
    const hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) switchView(hash);
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    $$('.reveal').forEach(el => observer.observe(el));
    // Step dots
    const dotsHtml = Array.from({ length: totalSteps }, (_, i) => `<div class="dot ${i === 0 ? 'active' : ''}">${i + 1}</div>`).join('');
    $('#stepDots').innerHTML = dotsHtml;
  }

  // Expose for inline handlers
  return {
    init,
    switchView,
    viewApplication,
    approveApp: (id) => updateStatus(id, 'Approved'),
    rejectApp: (id) => updateStatus(id, 'Rejected'),
    downloadAppPdf,
    toast
  };
})();

window.App = App;

document.addEventListener('DOMContentLoaded', App.init);


