const STORAGE = {
    accounts: "bbtc_accounts",
    applications: "bbtc_applications",
    currentUser: "bbtc_current_user",
    seeded: "bbtc_seeded"
};

const programmes = [
    { name: "Diploma in Business Administration", school: "business", level: "Diploma" },
    { name: "Certificate in Business Administration", school: "business", level: "Certificate" },
    { name: "Diploma in Accounting and Finance", school: "business", level: "Diploma" },
    { name: "Certificate in Procurement and Logistics", school: "business", level: "Certificate" },
    { name: "Diploma in Information Technology", school: "computing", level: "Diploma" },
    { name: "Certificate in Computer Applications", school: "computing", level: "Certificate" },
    { name: "Diploma in Cyber Security", school: "computing", level: "Diploma" },
    { name: "Certificate in Web Design", school: "computing", level: "Certificate" },
    { name: "Diploma in Electrical Installation", school: "technical", level: "Diploma" },
    { name: "Certificate in Plumbing", school: "technical", level: "Certificate" },
    { name: "Certificate in Fashion and Design", school: "technical", level: "Certificate" },
    { name: "Diploma in Hotel and Institutional Catering", school: "hospitality", level: "Diploma" },
    { name: "Certificate in Catering and Hospitality", school: "hospitality", level: "Certificate" },
    { name: "Diploma in Human Resource Management", school: "management", level: "Diploma" },
    { name: "Diploma in Project Planning and Management", school: "management", level: "Diploma" }
];

let currentStep = 1;
const totalSteps = 7;
let activeDashboardAppId = null;
let lastSubmittedApplication = null;

document.addEventListener("DOMContentLoaded", () => {
    seedDemoApplications();
    initNavigation();
    initRegistration();
    initApplicationWizard();
    initDashboard();
    initAdmin();
    initModal();
    initRevealAnimations();
    populateProgrammeSelects();
    renderProgrammes();
    updateLoggedUserBanner();
    routeFromHash();
    renderAdmin();
});

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function getStorage(key, fallback = []) {
    try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
        return fallback;
    }
}

function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function statusClass(status) {
    return "status-" + String(status || "under-review").toLowerCase().replaceAll(" ", "-");
}

function makeStatusBadge(status) {
    return `<span class="status-badge ${statusClass(status)}">${escapeHTML(status)}</span>`;
}

function generateApplicationId() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `BBTC-${year}-${random}`;
}

function getCurrentUser() {
    return getStorage(STORAGE.currentUser, null);
}

function saveCurrentUser(user) {
    localStorage.setItem(STORAGE.currentUser, JSON.stringify(user));
}

function seedDemoApplications() {
    if (localStorage.getItem(STORAGE.seeded)) return;

    const demoApps = [
        {
            id: "BBTC-2026-10001",
            createdAt: new Date().toISOString(),
            status: "Under Review",
            applicationType: "Diploma Programme",
            intake: "January Intake",
            studyMode: "Day",
            sponsorship: "Private Sponsored",
            surname: "Okello",
            firstName: "John",
            otherNames: "Mark",
            fullName: "Okello John Mark",
            gender: "Male",
            dob: "2003-05-12",
            nationality: "Ugandan",
            nin: "CM123456789",
            disability: "No Disability",
            email: "john@example.com",
            phone: "+256700000000",
            country: "Uganda",
            district: "Kampala",
            address: "Kampala Central",
            kinName: "Mary Okello",
            relationship: "Mother",
            kinPhone: "+256701111111",
            firstChoice: "Diploma in Information Technology",
            secondChoice: "Diploma in Business Administration",
            uceSchool: "Benchmark High School",
            uceIndex: "U1234/001",
            uceYear: "2021",
            uceBody: "UNEB",
            englishGrade: "C3",
            mathGrade: "C4",
            documents: [
                { label: "Passport Photo", name: "passport.jpg", status: "Uploaded" },
                { label: "National ID / Passport Copy", name: "nin.pdf", status: "Uploaded" },
                { label: "O-Level Result Slip / Certificate", name: "uce.pdf", status: "Uploaded" }
            ],
            notifications: ["Application received successfully.", "Document verification is in progress."]
        },
        {
            id: "BBTC-2026-10002",
            createdAt: new Date().toISOString(),
            status: "Approved",
            applicationType: "Certificate Programme",
            intake: "May Intake",
            studyMode: "Weekend",
            sponsorship: "Private Sponsored",
            surname: "Auma",
            firstName: "Grace",
            otherNames: "",
            fullName: "Auma Grace",
            gender: "Female",
            dob: "2002-08-20",
            nationality: "Ugandan",
            nin: "CF987654321",
            disability: "No Disability",
            email: "grace@example.com",
            phone: "+256755000000",
            country: "Uganda",
            district: "Gulu",
            address: "Gulu Municipality",
            kinName: "Peter Auma",
            relationship: "Father",
            kinPhone: "+256755111111",
            firstChoice: "Certificate in Procurement and Logistics",
            secondChoice: "Certificate in Business Administration",
            uceSchool: "Gulu Secondary School",
            uceIndex: "U5678/010",
            uceYear: "2020",
            uceBody: "UNEB",
            englishGrade: "C4",
            mathGrade: "C5",
            documents: [
                { label: "Passport Photo", name: "photo.png", status: "Verified" },
                { label: "National ID / Passport Copy", name: "id.pdf", status: "Verified" },
                { label: "O-Level Result Slip / Certificate", name: "results.pdf", status: "Verified" }
            ],
            notifications: ["Application approved. Admission letter is available."]
        }
    ];

    setStorage(STORAGE.applications, demoApps);
    localStorage.setItem(STORAGE.seeded, "true");
}

function initNavigation() {
    qsa("[data-view-target]").forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault();
            const target = item.getAttribute("data-view-target");
            showView(target);
            history.replaceState(null, "", `#${target}`);
        });
    });

    const menuBtn = qs("#menuBtn");
    const navLinks = qs("#navLinks");

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    window.addEventListener("hashchange", routeFromHash);
}

function routeFromHash() {
    const hash = location.hash.replace("#", "");
    const valid = ["portal", "apply", "dashboard", "admin"];
    showView(valid.includes(hash) ? hash : "portal");
}

function showView(viewId) {
    qsa(".view").forEach(view => view.classList.remove("active"));
    qs(`#${viewId}`).classList.add("active");

    qsa(".nav-links a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("data-view-target") === viewId);
    });

    if (viewId === "admin") renderAdmin();
    if (viewId === "apply") updateLoggedUserBanner();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function initRegistration() {
    qs("#registerForm").addEventListener("submit", event => {
        event.preventDefault();

        const valid = [
            requireValue("regName", "Full name is required."),
            validateEmail("regEmail"),
            validatePhone("regPhone"),
            validatePassword("regPassword"),
            validateConfirmPassword("regPassword", "regConfirmPassword")
        ].every(Boolean);

        const message = qs("#registerMessage");

        if (!valid) {
            setMessage(message, "Please fix the highlighted registration errors.", false);
            return;
        }

        const accounts = getStorage(STORAGE.accounts);
        const email = val("regEmail").toLowerCase();

        if (accounts.some(acc => acc.email.toLowerCase() === email)) {
            setMessage(message, "This email is already registered. Please login instead.", false);
            return;
        }

        const user = {
            name: val("regName"),
            email,
            phone: val("regPhone"),
            password: val("regPassword"),
            createdAt: new Date().toISOString()
        };

        accounts.push(user);
        setStorage(STORAGE.accounts, accounts);
        saveCurrentUser({ name: user.name, email: user.email, phone: user.phone });

        setMessage(message, "Account created successfully. You can now apply online.", true);
        qs("#registerForm").reset();
        updateLoggedUserBanner();
        prefillFromCurrentUser();

        setTimeout(() => {
            showView("apply");
            history.replaceState(null, "", "#apply");
        }, 800);
    });

    qs("#loginForm").addEventListener("submit", event => {
        event.preventDefault();

        const valid = [
            validateEmail("loginEmail"),
            requireValue("loginPassword", "Password is required.")
        ].every(Boolean);

        const message = qs("#loginMessage");

        if (!valid) {
            setMessage(message, "Please enter valid login details.", false);
            return;
        }

        const accounts = getStorage(STORAGE.accounts);
        const user = accounts.find(acc =>
            acc.email.toLowerCase() === val("loginEmail").toLowerCase() &&
            acc.password === val("loginPassword")
        );

        if (!user) {
            setMessage(message, "Invalid email or password.", false);
            return;
        }

        saveCurrentUser({ name: user.name, email: user.email, phone: user.phone });
        setMessage(message, `Welcome back, ${user.name}.`, true);
        updateLoggedUserBanner();
        prefillFromCurrentUser();

        setTimeout(() => {
            showView("apply");
            history.replaceState(null, "", "#apply");
        }, 700);
    });

    qs("#quickStatusBtn").addEventListener("click", () => {
        const input = val("quickStatusInput");
        const result = qs("#quickStatusResult");

        if (!input) {
            result.textContent = "Please enter Application ID or Email.";
            result.style.color = "var(--red)";
            return;
        }

        const app = findApplication(input);

        if (!app) {
            result.textContent = "No application found.";
            result.style.color = "var(--red)";
            return;
        }

        result.innerHTML = `Application ${escapeHTML(app.id)} is ${makeStatusBadge(app.status)}`;
        result.style.color = "var(--navy)";
    });
}

function setMessage(element, text, success = true) {
    element.textContent = text;
    element.className = success ? "message success" : "message error-msg";
}

function updateLoggedUserBanner() {
    const banner = qs("#loggedUserBanner");
    const user = getCurrentUser();

    if (!user) {
        banner.innerHTML = "You are applying as a guest. You may register or login from the portal before applying.";
        return;
    }

    banner.innerHTML = `Logged in as <strong>${escapeHTML(user.name)}</strong> (${escapeHTML(user.email)}). Your details will be pre-filled where possible.`;
}

function prefillFromCurrentUser() {
    const user = getCurrentUser();
    if (!user) return;

    if (!val("email")) qs("#email").value = user.email;
    if (!val("phone")) qs("#phone").value = user.phone;

    const nameParts = user.name.split(" ");
    if (!val("surname") && nameParts[0]) qs("#surname").value = nameParts[0];
    if (!val("firstName") && nameParts[1]) qs("#firstName").value = nameParts.slice(1).join(" ");
}

function initApplicationWizard() {
    qs("#totalStepsText").textContent = totalSteps;

    qsa(".next-step").forEach(button => {
        button.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    });

    qsa(".prev-step").forEach(button => {
        button.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    qs("#programmeSearch").addEventListener("input", renderProgrammes);
    qs("#facultyFilter").addEventListener("change", renderProgrammes);
    qs("#statement").addEventListener("input", updateWordCounter);
    qs("#submitApplicationBtn").addEventListener("click", submitApplication);
    qs("#printSlipBtn").addEventListener("click", () => window.print());
    qs("#downloadSlipBtn").addEventListener("click", downloadSlip);

    prefillFromCurrentUser();
    showStep(1);
}

function showStep(step) {
    currentStep = step;

    qsa(".form-step").forEach(section => {
        section.classList.toggle("active", Number(section.dataset.step) === step);
    });

    qs("#currentStepText").textContent = step;
    qs("#progressBar").style.width = `${(step / totalSteps) * 100}%`;

    if (step === 3) {
        populateProgrammeSelects();
        renderProgrammes();
    }

    if (step === 7) {
        buildReview();
    }

    window.scrollTo({ top: qs("#apply").offsetTop, behavior: "smooth" });
}

function validateStep(step) {
    clearCurrentStepErrors();

    if (step === 1) {
        return [
            requireValue("applicationType", "Application type is required."),
            requireValue("intake", "Intake is required."),
            requireValue("studyMode", "Study mode is required."),
            requireValue("sponsorship", "Sponsorship is required.")
        ].every(Boolean);
    }

    if (step === 2) {
        return [
            requireValue("surname", "Surname is required."),
            requireValue("firstName", "First name is required."),
            requireValue("gender", "Gender is required."),
            validateDateOfBirth("dob"),
            requireValue("nationality", "Nationality is required."),
            requireValue("nin", "National ID or passport number is required."),
            requireValue("disability", "Disability status is required."),
            validateEmail("email"),
            validatePhone("phone"),
            requireValue("country", "Country is required."),
            requireValue("district", "District or city is required."),
            requireValue("address", "Physical address is required."),
            requireValue("kinName", "Next of kin name is required."),
            requireValue("relationship", "Relationship is required."),
            validatePhone("kinPhone")
        ].every(Boolean);
    }

    if (step === 3) {
        const first = requireValue("firstChoice", "First choice programme is required.");
        const second = requireValue("secondChoice", "Second choice programme is required.");

        if (first && second && val("firstChoice") === val("secondChoice")) {
            setError("secondChoice", "Second choice must be different from first choice.");
            return false;
        }

        return first && second;
    }

    if (step === 4) {
        return [
            requireValue("uceSchool", "O-Level school name is required."),
            requireValue("uceIndex", "O-Level index number is required."),
            validateYear("uceYear", "Enter a valid O-Level completion year."),
            requireValue("uceBody", "Examination body is required."),
            requireValue("englishGrade", "English grade is required."),
            requireValue("mathGrade", "Mathematics grade is required.")
        ].every(Boolean);
    }

    if (step === 5) {
        return [
            validateFile("docPassport", true, ["jpg", "jpeg", "png"], 5),
            validateFile("docNIN", true, ["pdf", "jpg", "jpeg", "png"], 5),
            validateFile("docOlevel", true, ["pdf", "jpg", "jpeg", "png"], 5),
            validateFile("docHigher", false, ["pdf", "jpg", "jpeg", "png"], 5),
            validateFile("docRecommendation", false, ["pdf", "jpg", "jpeg", "png"], 5),
            validateFile("docBirth", false, ["pdf", "jpg", "jpeg", "png"], 5)
        ].every(Boolean);
    }

    if (step === 6) {
        const words = countWords(val("statement"));

        const baseValid = [
            requireValue("ref1Name", "Referee 1 name is required."),
            validatePhone("ref1Phone"),
            requireValue("ref2Name", "Referee 2 name is required."),
            validatePhone("ref2Phone"),
            requireValue("paymentMethod", "Payment method is required."),
            requireValue("paymentReference", "Payment phone or transaction reference is required.")
        ].every(Boolean);

        let statementValid = true;
        if (words < 40) {
            setError("statement", "Statement of purpose must have at least 40 words.");
            statementValid = false;
        }

        let declarationValid = true;
        if (!qs("#declaration").checked) {
            setError("declaration", "You must confirm the declaration before submitting.");
            declarationValid = false;
        }

        return baseValid && statementValid && declarationValid;
    }

    return true;
}

function clearCurrentStepErrors() {
    const activeStep = qs(".form-step.active");
    if (!activeStep) return;

    activeStep.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
    activeStep.querySelectorAll(".error").forEach(el => el.textContent = "");
}

function val(id) {
    const element = qs(`#${id}`);
    if (!element) return "";
    return element.value.trim();
}

function setError(id, message) {
    const element = qs(`#${id}`);
    if (!element) return false;

    element.classList.add("invalid");

    const group = element.closest(".form-group") || element.parentElement;
    let error = group.querySelector(".error");

    if (!error) {
        error = document.createElement("small");
        error.className = "error";
        group.appendChild(error);
    }

    error.textContent = message;
    return false;
}

function clearError(id) {
    const element = qs(`#${id}`);
    if (!element) return;

    element.classList.remove("invalid");

    const group = element.closest(".form-group") || element.parentElement;
    const error = group.querySelector(".error");

    if (error) error.textContent = "";
}

function requireValue(id, message) {
    if (!val(id)) return setError(id, message);
    clearError(id);
    return true;
}

function validateEmail(id) {
    const email = val(id);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return setError(id, "Email address is required.");
    if (!regex.test(email)) return setError(id, "Enter a valid email address.");

    clearError(id);
    return true;
}

function validatePhone(id) {
    const phone = val(id);
    const regex = /^\+?[0-9\s-]{9,16}$/;

    if (!phone) return setError(id, "Phone number is required.");
    if (!regex.test(phone)) return setError(id, "Enter a valid phone number.");

    clearError(id);
    return true;
}

function validatePassword(id) {
    const password = val(id);

    if (!password) return setError(id, "Password is required.");
    if (password.length < 6) return setError(id, "Password must be at least 6 characters.");

    clearError(id);
    return true;
}

function validateConfirmPassword(passwordId, confirmId) {
    const password = val(passwordId);
    const confirm = val(confirmId);

    if (!confirm) return setError(confirmId, "Confirm your password.");
    if (password !== confirm) return setError(confirmId, "Passwords do not match.");

    clearError(confirmId);
    return true;
}

function validateDateOfBirth(id) {
    const date = val(id);

    if (!date) return setError(id, "Date of birth is required.");

    const dob = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 15) return setError(id, "Applicant must be at least 15 years old.");
    if (age > 100) return setError(id, "Enter a valid date of birth.");

    clearError(id);
    return true;
}

function validateYear(id, message) {
    const year = Number(val(id));
    const currentYear = new Date().getFullYear();

    if (!year) return setError(id, message);
    if (year < 1970 || year > currentYear) return setError(id, message);

    clearError(id);
    return true;
}

function validateFile(id, required, allowedExtensions, maxMb) {
    const input = qs(`#${id}`);
    const file = input.files[0];

    if (!file) {
        if (required) return setError(id, "This document is required.");
        clearError(id);
        return true;
    }

    const extension = file.name.split(".").pop().toLowerCase();
    const sizeMb = file.size / (1024 * 1024);

    if (!allowedExtensions.includes(extension)) {
        return setError(id, `Allowed file types: ${allowedExtensions.join(", ").toUpperCase()}.`);
    }

    if (sizeMb > maxMb) {
        return setError(id, `File must not exceed ${maxMb}MB.`);
    }

    clearError(id);
    return true;
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function updateWordCounter() {
    const words = countWords(val("statement"));
    qs("#wordCounter").textContent = `${words} words`;
    qs("#wordCounter").style.color = words >= 40 ? "var(--green)" : "var(--red)";
}

function populateProgrammeSelects() {
    const first = qs("#firstChoice");
    const second = qs("#secondChoice");
    const adminFilter = qs("#adminProgramFilter");

    const options = programmes
        .map(programme => `<option value="${escapeHTML(programme.name)}">${escapeHTML(programme.name)}</option>`)
        .join("");

    const currentFirst = first.value;
    const currentSecond = second.value;

    first.innerHTML = `<option value="">Select First Choice</option>${options}`;
    second.innerHTML = `<option value="">Select Second Choice</option>${options}`;

    first.value = currentFirst;
    second.value = currentSecond;

    if (adminFilter) {
        const currentAdmin = adminFilter.value;
        adminFilter.innerHTML = `<option value="all">All Programmes</option>${options}`;
        adminFilter.value = currentAdmin || "all";
    }
}

function renderProgrammes() {
    const container = qs("#programmeContainer");
    const search = val("programmeSearch").toLowerCase();
    const faculty = qs("#facultyFilter").value;

    const filtered = programmes.filter(programme => {
        const matchesSearch = programme.name.toLowerCase().includes(search);
        const matchesFaculty = faculty === "all" || programme.school === faculty;
        return matchesSearch && matchesFaculty;
    });

    if (!filtered.length) {
        container.innerHTML = `<p class="muted">No programme found. Try another search.</p>`;
        return;
    }

    container.innerHTML = filtered.map(programme => `
        <div class="programme-card">
            <h4>${escapeHTML(programme.name)}</h4>
            <p><strong>School:</strong> ${escapeHTML(capitalize(programme.school))}</p>
            <p><strong>Level:</strong> ${escapeHTML(programme.level)}</p>
            <button type="button" data-programme="${escapeHTML(programme.name)}">Choose Programme</button>
        </div>
    `).join("");

    container.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            const selected = button.dataset.programme;

            if (!qs("#firstChoice").value) {
                qs("#firstChoice").value = selected;
            } else if (!qs("#secondChoice").value && qs("#firstChoice").value !== selected) {
                qs("#secondChoice").value = selected;
            } else {
                qs("#firstChoice").value = selected;
            }
        });
    });
}

function capitalize(text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

function collectApplicationData() {
    const fullName = `${val("surname")} ${val("firstName")} ${val("otherNames")}`.replace(/\s+/g, " ").trim();

    return {
        id: generateApplicationId(),
        createdAt: new Date().toISOString(),
        status: "Under Review",
        applicationType: val("applicationType"),
        intake: val("intake"),
        studyMode: val("studyMode"),
        sponsorship: val("sponsorship"),
        surname: val("surname"),
        firstName: val("firstName"),
        otherNames: val("otherNames"),
        fullName,
        gender: val("gender"),
        dob: val("dob"),
        nationality: val("nationality"),
        nin: val("nin"),
        disability: val("disability"),
        email: val("email").toLowerCase(),
        phone: val("phone"),
        country: val("country"),
        district: val("district"),
        address: val("address"),
        kinName: val("kinName"),
        relationship: val("relationship"),
        kinPhone: val("kinPhone"),
        kinEmail: val("kinEmail"),
        firstChoice: val("firstChoice"),
        secondChoice: val("secondChoice"),
        uceSchool: val("uceSchool"),
        uceIndex: val("uceIndex"),
        uceYear: val("uceYear"),
        uceBody: val("uceBody"),
        englishGrade: val("englishGrade"),
        mathGrade: val("mathGrade"),
        biologyGrade: val("biologyGrade"),
        entrepreneurshipGrade: val("entrepreneurshipGrade"),
        higherInstitution: val("higherInstitution"),
        higherQualification: val("higherQualification"),
        higherProgramme: val("higherProgramme"),
        higherYear: val("higherYear"),
        ref1Name: val("ref1Name"),
        ref1Phone: val("ref1Phone"),
        ref2Name: val("ref2Name"),
        ref2Phone: val("ref2Phone"),
        statement: val("statement"),
        paymentMethod: val("paymentMethod"),
        paymentReference: val("paymentReference"),
        documents: collectDocuments(),
        notifications: [
            "Application submitted successfully.",
            "Your documents are pending verification.",
            "Please check your dashboard regularly for updates."
        ]
    };
}

function collectDocuments() {
    const docs = [
        ["docPassport", "Passport Photo"],
        ["docNIN", "National ID / Passport Copy"],
        ["docOlevel", "O-Level Result Slip / Certificate"],
        ["docHigher", "A-Level / Diploma / Transcript"],
        ["docRecommendation", "Recommendation Letter"],
        ["docBirth", "Birth Certificate"]
    ];

    return docs.map(([id, label]) => {
        const input = qs(`#${id}`);
        const file = input.files[0];

        return {
            label,
            name: file ? file.name : "Not Uploaded",
            size: file ? `${(file.size / (1024 * 1024)).toFixed(2)}MB` : "",
            status: file ? "Uploaded" : "Not Uploaded"
        };
    });
}

function buildReview() {
    const data = collectApplicationData();
    data.id = "Generated after submission";

    qs("#reviewSection").innerHTML = applicationDetailsHTML(data, false);
}

function submitApplication() {
    if (!validateStep(6)) {
        currentStep = 6;
        showStep(6);
        return;
    }

    const application = collectApplicationData();
    const applications = getStorage(STORAGE.applications);

    while (applications.some(app => app.id === application.id)) {
        application.id = generateApplicationId();
    }

    applications.unshift(application);
    setStorage(STORAGE.applications, applications);

    lastSubmittedApplication = application;
    activeDashboardAppId = application.id;

    qs("#applicationForm").classList.add("hidden");
    qs("#successScreen").classList.remove("hidden");
    qs("#applicationSlip").innerHTML = applicationSlipHTML(application);

    renderAdmin();
}

function applicationDetailsHTML(app, showStatus = true) {
    return `
        <table class="review-table">
            <tbody>
                ${showStatus ? `<tr><th>Status</th><td>${makeStatusBadge(app.status)}</td></tr>` : ""}
                <tr><th>Application ID</th><td>${escapeHTML(app.id)}</td></tr>
                <tr><th>Applicant Name</th><td>${escapeHTML(app.fullName)}</td></tr>
                <tr><th>Email</th><td>${escapeHTML(app.email)}</td></tr>
                <tr><th>Phone</th><td>${escapeHTML(app.phone)}</td></tr>
                <tr><th>Application Type</th><td>${escapeHTML(app.applicationType)}</td></tr>
                <tr><th>Intake</th><td>${escapeHTML(app.intake)}</td></tr>
                <tr><th>Study Mode</th><td>${escapeHTML(app.studyMode)}</td></tr>
                <tr><th>First Choice</th><td>${escapeHTML(app.firstChoice)}</td></tr>
                <tr><th>Second Choice</th><td>${escapeHTML(app.secondChoice)}</td></tr>
                <tr><th>O-Level School</th><td>${escapeHTML(app.uceSchool)}</td></tr>
                <tr><th>O-Level Index</th><td>${escapeHTML(app.uceIndex)}</td></tr>
                <tr><th>English / Math Grades</th><td>${escapeHTML(app.englishGrade)} / ${escapeHTML(app.mathGrade)}</td></tr>
                <tr><th>Payment Method</th><td>${escapeHTML(app.paymentMethod)}</td></tr>
                <tr><th>Payment Reference</th><td>${escapeHTML(app.paymentReference)}</td></tr>
            </tbody>
        </table>

        <h3>Uploaded Documents</h3>
        <ul class="doc-list">
            ${(app.documents || []).map(doc => `
                <li><strong>${escapeHTML(doc.label)}:</strong> ${escapeHTML(doc.name)} - ${escapeHTML(doc.status)}</li>
            `).join("")}
        </ul>
    `;
}

function applicationSlipHTML(app) {
    return `
        <h2 style="color:#002147;">Benchmark Business College</h2>
        <h3>Application Submission Slip</h3>
        <p><strong>Application ID:</strong> ${escapeHTML(app.id)}</p>
        <p><strong>Applicant Name:</strong> ${escapeHTML(app.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHTML(app.email)}</p>
        <p><strong>Phone:</strong> ${escapeHTML(app.phone)}</p>
        <p><strong>Programme:</strong> ${escapeHTML(app.firstChoice)}</p>
        <p><strong>Intake:</strong> ${escapeHTML(app.intake)}</p>
        <p><strong>Status:</strong> ${escapeHTML(app.status)}</p>
        <p><strong>Submitted:</strong> ${new Date(app.createdAt).toLocaleString()}</p>
        <hr>
        <p>Please keep this slip safely. Use your Application ID to check your admission status.</p>
    `;
}

function downloadSlip() {
    if (!lastSubmittedApplication) return;

    const content = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Application Slip</title></head>
        <body>${applicationSlipHTML(lastSubmittedApplication)}</body>
        </html>
    `;

    const blob = new Blob([content], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${lastSubmittedApplication.id}-application-slip.html`;
    link.click();
    URL.revokeObjectURL(link.href);
}

function findApplication(input) {
    const search = String(input || "").trim().toLowerCase();
    const applications = getStorage(STORAGE.applications);

    return applications.find(app =>
        app.id.toLowerCase() === search ||
        app.email.toLowerCase() === search
    );
}

function initDashboard() {
    qs("#loadDashboardBtn").addEventListener("click", () => {
        const input = val("dashboardSearch");
        const app = findApplication(input);
        const message = qs("#dashboardMessage");

        if (!input) {
            setMessage(message, "Please enter Application ID or Email.", false);
            return;
        }

        if (!app) {
            qs("#studentPanels").classList.add("hidden");
            setMessage(message, "No application found.", false);
            return;
        }

        activeDashboardAppId = app.id;
        renderStudentDashboard(app);
        setMessage(message, "Application loaded successfully.", true);
    });

    qs("#refreshStatusBtn").addEventListener("click", () => {
        if (!activeDashboardAppId) return;

        const app = getStorage(STORAGE.applications).find(item => item.id === activeDashboardAppId);

        if (app) {
            renderStudentDashboard(app);
            setMessage(qs("#dashboardMessage"), "Status refreshed.", true);
        }
    });

    qs("#updateProfileBtn").addEventListener("click", updateStudentProfile);
}

function renderStudentDashboard(app) {
    qs("#studentPanels").classList.remove("hidden");

    qs("#studentOverview").innerHTML = `
        <p><strong>Applicant Name:</strong> ${escapeHTML(app.fullName)}</p>
        <p><strong>Application ID:</strong> ${escapeHTML(app.id)}</p>
        <p><strong>Programme:</strong> ${escapeHTML(app.firstChoice)}</p>
        <p><strong>Intake:</strong> ${escapeHTML(app.intake)}</p>
        <p><strong>Current Status:</strong> ${makeStatusBadge(app.status)}</p>
    `;

    qs("#studentProgress").innerHTML = progressHTML(app.status);

    qs("#studentDocuments").innerHTML = `
        <ul class="doc-list">
            ${(app.documents || []).map(doc => `
                <li>📄 <strong>${escapeHTML(doc.label)}:</strong> ${escapeHTML(doc.status)} ${doc.name !== "Not Uploaded" ? `(${escapeHTML(doc.name)})` : ""}</li>
            `).join("")}
        </ul>
    `;

    qs("#studentNotifications").innerHTML = (app.notifications || [])
        .map(note => `<li>📢 ${escapeHTML(note)}</li>`)
        .join("");

    qs("#profileName").value = app.fullName || "";
    qs("#profileEmail").value = app.email || "";
    qs("#profilePhone").value = app.phone || "";
}

function progressHTML(status) {
    const stages = ["Submitted", "Document Verification", "Department Review", "Final Decision"];
    let currentIndex = 0;

    if (status === "Document Verification") currentIndex = 1;
    if (status === "Department Review") currentIndex = 2;
    if (["Approved", "Rejected"].includes(status)) currentIndex = 3;

    return `
        <div class="timeline">
            ${stages.map((stage, index) => {
                const className = index < currentIndex ? "done" : index === currentIndex ? "current" : "";
                const symbol = index < currentIndex ? "🟢" : index === currentIndex ? "🟡" : "⚪";
                const label = index === 3 && status === "Approved" ? "Final Decision: Approved" :
                              index === 3 && status === "Rejected" ? "Final Decision: Rejected" : stage;

                return `<div class="timeline-item ${className}">${symbol} ${escapeHTML(label)}</div>`;
            }).join("")}
        </div>
    `;
}

function updateStudentProfile() {
    if (!activeDashboardAppId) return;

    const applications = getStorage(STORAGE.applications);
    const app = applications.find(item => item.id === activeDashboardAppId);

    if (!app) return;

    app.fullName = val("profileName");
    app.email = val("profileEmail").toLowerCase();
    app.phone = val("profilePhone");
    app.notifications = app.notifications || [];
    app.notifications.unshift("Profile information updated successfully.");

    setStorage(STORAGE.applications, applications);
    renderStudentDashboard(app);
    renderAdmin();
    setMessage(qs("#profileMessage"), "Profile updated successfully.", true);
}

function initAdmin() {
    qs("#applyAdminFilterBtn").addEventListener("click", renderAdmin);
    qs("#adminSearch").addEventListener("input", renderAdmin);
    qs("#adminProgramFilter").addEventListener("change", renderAdmin);
    qs("#adminStatusFilter").addEventListener("change", renderAdmin);
    qs("#exportCsvBtn").addEventListener("click", exportCSV);

    qs("#clearDemoBtn").addEventListener("click", () => {
        const confirmed = confirm("Are you sure you want to clear all applications from this browser?");
        if (!confirmed) return;

        setStorage(STORAGE.applications, []);
        renderAdmin();
    });

    qs("#applicationsTableBody").addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.action;

        if (action === "view") viewApplication(id);
        if (action === "approve") updateApplicationStatus(id, "Approved");
        if (action === "reject") updateApplicationStatus(id, "Rejected");
        if (action === "verify") updateApplicationStatus(id, "Document Verification");
        if (action === "review") updateApplicationStatus(id, "Department Review");
    });
}

function renderAdmin() {
    populateProgrammeSelects();

    const applications = getFilteredApplications();
    const all = getStorage(STORAGE.applications);
    const tbody = qs("#applicationsTableBody");

    qs("#totalApps").textContent = all.length;
    qs("#pendingApps").textContent = all.filter(app => ["Under Review", "Document Verification", "Department Review"].includes(app.status)).length;
    qs("#approvedApps").textContent = all.filter(app => app.status === "Approved").length;
    qs("#rejectedApps").textContent = all.filter(app => app.status === "Rejected").length;

    if (!applications.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">No applications found.</td>
            </tr>
        `;
    } else {
        tbody.innerHTML = applications.map(app => `
            <tr>
                <td>${escapeHTML(app.id)}</td>
                <td>
                    <strong>${escapeHTML(app.fullName)}</strong><br>
                    <small>${escapeHTML(app.email)}</small>
                </td>
                <td>${escapeHTML(app.firstChoice)}</td>
                <td>${escapeHTML(app.intake)}</td>
                <td>${makeStatusBadge(app.status)}</td>
                <td>
                    <button class="view-btn" data-action="view" data-id="${escapeHTML(app.id)}">View</button>
                    <button class="verify-btn" data-action="verify" data-id="${escapeHTML(app.id)}">Verify</button>
                    <button class="verify-btn" data-action="review" data-id="${escapeHTML(app.id)}">Review</button>
                    <button class="approve-btn" data-action="approve" data-id="${escapeHTML(app.id)}">Approve</button>
                    <button class="reject-btn" data-action="reject" data-id="${escapeHTML(app.id)}">Reject</button>
                </td>
            </tr>
        `).join("");
    }

    renderAnalytics(all);
}

function getFilteredApplications() {
    const applications = getStorage(STORAGE.applications);
    const search = val("adminSearch").toLowerCase();
    const programme = qs("#adminProgramFilter") ? qs("#adminProgramFilter").value : "all";
    const status = qs("#adminStatusFilter") ? qs("#adminStatusFilter").value : "all";

    return applications.filter(app => {
        const matchesSearch =
            !search ||
            app.id.toLowerCase().includes(search) ||
            app.fullName.toLowerCase().includes(search) ||
            app.email.toLowerCase().includes(search);

        const matchesProgramme = programme === "all" || app.firstChoice === programme;
        const matchesStatus = status === "all" || app.status === status;

        return matchesSearch && matchesProgramme && matchesStatus;
    });
}

function viewApplication(id) {
    const app = getStorage(STORAGE.applications).find(item => item.id === id);
    if (!app) return;

    qs("#modalBody").innerHTML = `
        <h2 style="color:#002147;">Application Details</h2>
        ${applicationDetailsHTML(app, true)}
        <h3>Statement of Purpose</h3>
        <p>${escapeHTML(app.statement || "No statement submitted.")}</p>
    `;

    qs("#applicationModal").classList.remove("hidden");
}

function updateApplicationStatus(id, status) {
    const applications = getStorage(STORAGE.applications);
    const app = applications.find(item => item.id === id);

    if (!app) return;

    app.status = status;
    app.notifications = app.notifications || [];

    if (status === "Approved") {
        app.notifications.unshift("Congratulations! Your application has been approved.");
        app.documents = (app.documents || []).map(doc => ({ ...doc, status: doc.status === "Uploaded" ? "Verified" : doc.status }));
    } else if (status === "Rejected") {
        app.notifications.unshift("Your application has been rejected. Please contact admissions for more information.");
    } else if (status === "Document Verification") {
        app.notifications.unshift("Your documents are being verified by the admissions office.");
    } else if (status === "Department Review") {
        app.notifications.unshift("Your application has moved to department review.");
    }

    setStorage(STORAGE.applications, applications);
    renderAdmin();

    if (activeDashboardAppId === id) {
        renderStudentDashboard(app);
    }
}

function renderAnalytics(applications) {
    const total = applications.length;
    const approved = applications.filter(app => app.status === "Approved").length;
    const rejected = applications.filter(app => app.status === "Rejected").length;
    const underReview = applications.filter(app => ["Under Review", "Document Verification", "Department Review"].includes(app.status)).length;

    const programmeCounts = applications.reduce((acc, app) => {
        acc[app.firstChoice] = (acc[app.firstChoice] || 0) + 1;
        return acc;
    }, {});

    const mostApplied = Object.entries(programmeCounts).sort((a, b) => b[1] - a[1])[0];

    qs("#analyticsBox").innerHTML = `
        <p><strong>Total Applications:</strong> ${total}</p>
        <p><strong>Under Review:</strong> ${underReview}</p>
        <p><strong>Approved:</strong> ${approved}</p>
        <p><strong>Rejected:</strong> ${rejected}</p>
        <p><strong>Approval Rate:</strong> ${total ? Math.round((approved / total) * 100) : 0}%</p>
        <p><strong>Most Applied Programme:</strong> ${mostApplied ? escapeHTML(mostApplied[0]) : "No data yet"}</p>
    `;
}

function exportCSV() {
    const applications = getFilteredApplications();

    const headers = [
        "Application ID",
        "Applicant Name",
        "Email",
        "Phone",
        "Programme",
        "Intake",
        "Study Mode",
        "Status",
        "Submitted"
    ];

    const rows = applications.map(app => [
        app.id,
        app.fullName,
        app.email,
        app.phone,
        app.firstChoice,
        app.intake,
        app.studyMode,
        app.status,
        new Date(app.createdAt).toLocaleString()
    ]);

    const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${String(cell || "").replaceAll('"', '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "benchmark-admissions-report.csv";
    link.click();
    URL.revokeObjectURL(link.href);
}

function initModal() {
    qs("#modalCloseBtn").addEventListener("click", closeModal);

    qs("#applicationModal").addEventListener("click", event => {
        if (event.target.id === "applicationModal") closeModal();
    });
}

function closeModal() {
    qs("#applicationModal").classList.add("hidden");
}

function initRevealAnimations() {
    const reveals = qsa(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(item => observer.observe(item));
}