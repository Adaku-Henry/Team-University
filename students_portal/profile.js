const STORAGE_KEY = "premiumStudentProfile";

const defaultProfile = {
    firstName: "Adaku",
    lastName: "Henry",
    regNo: "TU/2026/001",
    gender: "Male",
    dob: "",
    nationality: "Ugandan",
    nin: "",
    maritalStatus: "Single",

    phone: "+256700000000",
    altPhone: "",
    email: "student@email.com",
    address: "",
    district: "",
    country: "Uganda",

    faculty: "Faculty of Technoscience",
    department: "Computer Science",
    programme: "Bachelor of Information Technology",
    yearOfStudy: "3",
    semester: "2",
    admissionYear: "2023",
    expectedGraduation: "2027",
    academicProgress: "82",
    currentGpa: "4.20",
    cgpa: "3.85",
    creditsEarned: "98",
    creditsRemaining: "22",

    professionalTitle: "",
    skills: "",
    whatsapp: "+256700000000",
    linkedin: "",
    facebook: "",
    website: "",
    bio: "",

    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    guardianOccupation: "",

    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",

    photo: "",
    cv: null,
    documents: [],

    privacy: {
        publicProfile: true,
        showPhone: true,
        showEmail: true,
        showSocials: true,
        protectDocuments: true
    },

    security: {
        twoFA: false,
        password: "student123"
    },

    activity: [
        "Profile page opened",
        "Logged into student portal"
    ],

    loginHistory: []
};

let profile = loadProfile();

document.addEventListener("DOMContentLoaded", () => {
    addLoginHistory();
    fillInputs();
    renderProfile();
    renderDocuments();
    renderCV();
    renderActivity();
    updateCompletion();
    bindAutoSavePreview();
});

function loadProfile() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return structuredClone(defaultProfile);
    }

    return {
        ...structuredClone(defaultProfile),
        ...JSON.parse(saved)
    };
}

function persistProfile() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function fillInputs() {
    document.querySelectorAll("[data-field]").forEach(input => {
        const key = input.dataset.field;

        if (profile[key] !== undefined) {
            input.value = profile[key];
        }
    });

    document.querySelectorAll("[data-privacy]").forEach(input => {
        const key = input.dataset.privacy;
        input.checked = Boolean(profile.privacy[key]);
    });

    if (profile.photo) {
        document.getElementById("studentPhoto").src = profile.photo;
    }
}

function collectInputs() {
    document.querySelectorAll("[data-field]").forEach(input => {
        const key = input.dataset.field;
        profile[key] = input.value.trim();
    });

    document.querySelectorAll("[data-privacy]").forEach(input => {
        const key = input.dataset.privacy;
        profile.privacy[key] = input.checked;
    });
}

function saveProfile() {
    collectInputs();
    addActivity("Profile information saved and updated");
    persistProfile();
    renderProfile();
    renderDocuments();
    renderCV();
    renderActivity();
    updateCompletion();
    showToast("Profile saved successfully");
}

function renderProfile() {
    const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Student Name";

    document.getElementById("displayName").textContent = fullName;
    document.getElementById("displayProgramme").textContent = profile.programme || "Programme not set";
    document.getElementById("displayRegNo").textContent = profile.regNo || "Not set";
    document.getElementById("displayFaculty").textContent = profile.faculty || "Not set";

    document.getElementById("displayEmail").textContent = profile.privacy.showEmail ? profile.email || "Not set" : "Private";
    document.getElementById("displayPhone").textContent = profile.privacy.showPhone ? profile.phone || "Not set" : "Private";

    document.querySelectorAll("[data-field-text]").forEach(item => {
        const key = item.dataset.fieldText;
        item.textContent = profile[key] || "0";
    });

    const progress = clampNumber(profile.academicProgress, 0, 100);
    document.getElementById("academicProgressBar").style.width = `${progress}%`;
    document.getElementById("academicProgressText").textContent = `${progress}%`;

    document.getElementById("qrText").textContent = profile.regNo || "Student Verification";

    updateSocialLinks();
}

function updateSocialLinks() {
    const whatsapp = document.getElementById("whatsappLink");
    const linkedin = document.getElementById("linkedinLink");
    const facebook = document.getElementById("facebookLink");
    const website = document.getElementById("websiteLink");
    const email = document.getElementById("emailLink");

    if (!profile.privacy.showSocials) {
        [whatsapp, linkedin, facebook, website, email].forEach(link => {
            link.style.display = "none";
        });
        return;
    }

    [whatsapp, linkedin, facebook, website, email].forEach(link => {
        link.style.display = "grid";
    });

    const whatsappNumber = cleanPhone(profile.whatsapp || profile.phone);

    whatsapp.href = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";
    linkedin.href = profile.linkedin || "#";
    facebook.href = profile.facebook || "#";
    website.href = profile.website || "#";
    email.href = profile.email ? `mailto:${profile.email}` : "#";
}

document.getElementById("photoUpload").addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        showToast("Please upload a valid image");
        return;
    }

    const reader = new FileReader();

    reader.onload = e => {
        profile.photo = e.target.result;
        document.getElementById("studentPhoto").src = profile.photo;
        addActivity("Profile photo uploaded");
        persistProfile();
        showToast("Photo uploaded successfully");
    };

    reader.readAsDataURL(file);
});

function uploadCV() {
    const input = document.getElementById("cvUpload");
    const file = input.files[0];

    if (!file) {
        showToast("Please select a CV file first");
        return;
    }

    saveFileAsBase64(file).then(savedFile => {
        profile.cv = savedFile;
        addActivity(`CV uploaded: ${file.name}`);
        persistProfile();
        renderCV();
        updateCompletion();
        input.value = "";
        showToast("CV saved successfully");
    });
}

function uploadDocuments() {
    const input = document.getElementById("documentUpload");
    const files = Array.from(input.files);

    if (files.length === 0) {
        showToast("Please choose at least one document");
        return;
    }

    Promise.all(files.map(saveFileAsBase64)).then(savedFiles => {
        profile.documents.push(...savedFiles);
        addActivity(`${savedFiles.length} document(s) uploaded`);
        persistProfile();
        renderDocuments();
        updateCompletion();
        input.value = "";
        showToast("Documents uploaded successfully");
    });
}

function saveFileAsBase64(file) {
    return new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = e => {
            resolve({
                id: Date.now() + Math.random().toString(16).slice(2),
                name: file.name,
                type: file.type || "application/octet-stream",
                size: file.size,
                data: e.target.result,
                uploadedAt: new Date().toLocaleString()
            });
        };

        reader.readAsDataURL(file);
    });
}

function renderCV() {
    const container = document.getElementById("cvDisplay");

    if (!profile.cv) {
        container.innerHTML = `<p class="muted-text">No CV uploaded yet.</p>`;
        return;
    }

    container.innerHTML = createFileHTML(profile.cv, "cv");
}

function renderDocuments() {
    const container = document.getElementById("documentsList");

    if (!profile.documents || profile.documents.length === 0) {
        container.innerHTML = `<p class="muted-text">No documents uploaded yet.</p>`;
        return;
    }

    container.innerHTML = profile.documents.map(file => createFileHTML(file, "document")).join("");
}

function createFileHTML(file, type) {
    return `
        <div class="file-item">
            <div class="file-info">
                <i class="fa fa-file"></i>
                <div>
                    <strong>${escapeHTML(file.name)}</strong>
                    <small>${formatBytes(file.size)} • ${file.uploadedAt}</small>
                </div>
            </div>

            <div class="file-actions">
                <button class="download-btn" onclick="downloadStoredFile('${file.id}', '${type}')">
                    <i class="fa fa-download"></i>
                </button>

                <button class="delete-btn" onclick="deleteStoredFile('${file.id}', '${type}')">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function downloadStoredFile(id, type) {
    const file = type === "cv" ? profile.cv : profile.documents.find(doc => doc.id === id);

    if (!file) {
        showToast("File not found");
        return;
    }

    const link = document.createElement("a");
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addActivity(`Downloaded file: ${file.name}`);
    persistProfile();
    renderActivity();
}

function deleteStoredFile(id, type) {
    if (!confirm("Are you sure you want to delete this file?")) return;

    if (type === "cv") {
        profile.cv = null;
        addActivity("CV deleted");
    } else {
        const file = profile.documents.find(doc => doc.id === id);
        profile.documents = profile.documents.filter(doc => doc.id !== id);
        addActivity(`Deleted document: ${file ? file.name : "Document"}`);
    }

    persistProfile();
    renderCV();
    renderDocuments();
    renderActivity();
    updateCompletion();
    showToast("File deleted");
}

function downloadTemplate(title) {
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();

    const content = `
        ${title}

        Student Name: ${fullName}
        Registration Number: ${profile.regNo}
        Programme: ${profile.programme}
        Faculty: ${profile.faculty}
        Department: ${profile.department}
        Year of Study: ${profile.yearOfStudy}
        Semester: ${profile.semester}
        Generated On: ${new Date().toLocaleString()}

        This is a system-generated ${title} from Team LMS.
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replaceAll(" ", "-")}-${profile.regNo || "student"}.txt`;
    link.click();

    URL.revokeObjectURL(url);

    addActivity(`Downloaded ${title}`);
    persistProfile();
    renderActivity();
}

function updateCompletion() {
    const requiredFields = [
        "firstName",
        "lastName",
        "regNo",
        "gender",
        "dob",
        "nationality",
        "phone",
        "email",
        "address",
        "district",
        "faculty",
        "department",
        "programme",
        "yearOfStudy",
        "guardianName",
        "guardianPhone",
        "emergencyName",
        "emergencyPhone",
        "professionalTitle",
        "skills",
        "bio"
    ];

    let completed = 0;

    requiredFields.forEach(field => {
        if (profile[field] && profile[field].trim() !== "") {
            completed++;
        }
    });

    if (profile.photo) completed++;
    if (profile.cv) completed++;

    const total = requiredFields.length + 2;
    const percent = Math.round((completed / total) * 100);

    document.getElementById("completionFill").style.width = `${percent}%`;
    document.getElementById("completionPercent").textContent = `${percent}%`;
}

function bindAutoSavePreview() {
    document.querySelectorAll("[data-field], [data-privacy]").forEach(input => {
        input.addEventListener("input", () => {
            collectInputs();
            renderProfile();
            updateCompletion();
        });

        input.addEventListener("change", () => {
            collectInputs();
            renderProfile();
            updateCompletion();
        });
    });
}

function openPasswordModal() {
    document.getElementById("passwordModal").classList.add("show");
}

function closePasswordModal() {
    document.getElementById("passwordModal").classList.remove("show");
}

function changePassword() {
    const current = document.getElementById("currentPassword").value;
    const next = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (current !== profile.security.password) {
        showToast("Current password is incorrect");
        return;
    }

    if (next.length < 8) {
        showToast("New password must be at least 8 characters");
        return;
    }

    if (next !== confirm) {
        showToast("Passwords do not match");
        return;
    }

    profile.security.password = next;
    addActivity("Password changed successfully");
    persistProfile();

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    closePasswordModal();
    renderActivity();
    showToast("Password updated");
}

function enable2FA() {
    profile.security.twoFA = !profile.security.twoFA;

    const message = profile.security.twoFA
        ? "Two-factor authentication enabled"
        : "Two-factor authentication disabled";

    document.getElementById("securityStatus").style.display = "block";
    document.getElementById("securityStatus").textContent = message;

    addActivity(message);
    persistProfile();
    renderActivity();
    showToast(message);
}

function viewLoginHistory() {
    const status = document.getElementById("securityStatus");

    if (!profile.loginHistory.length) {
        status.textContent = "No login activity found.";
    } else {
        status.innerHTML = `
            <strong>Recent Login Activity</strong>
            <ul style="margin-top:10px; padding-left:18px;">
                ${profile.loginHistory.slice(0, 5).map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;
    }

    status.style.display = "block";
}

function addLoginHistory() {
    const loginText = `Login from browser on ${new Date().toLocaleString()}`;

    if (!profile.loginHistory.includes(loginText)) {
        profile.loginHistory.unshift(loginText);
        profile.loginHistory = profile.loginHistory.slice(0, 10);
        persistProfile();
    }
}

function addActivity(text) {
    profile.activity.unshift(`${text} — ${new Date().toLocaleString()}`);
    profile.activity = profile.activity.slice(0, 12);
}

function renderActivity() {
    const log = document.getElementById("activityLog");

    log.innerHTML = profile.activity.map(item => `
        <li>
            <i class="fa fa-circle-dot"></i>
            ${escapeHTML(item)}
        </li>
    `).join("");
}

function exportProfileData() {
    collectInputs();

    const exportData = {
        ...profile,
        security: {
            twoFA: profile.security.twoFA,
            password: "Hidden for security"
        }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${profile.regNo || "student"}-profile-data.json`;
    link.click();

    URL.revokeObjectURL(url);

    addActivity("Exported profile data");
    persistProfile();
    renderActivity();
}

function printProfile() {
    collectInputs();
    persistProfile();
    window.print();
}

function resetProfile() {
    if (!confirm("This will clear saved demo profile data. Continue?")) return;

    localStorage.removeItem(STORAGE_KEY);
    profile = structuredClone(defaultProfile);
    location.reload();
}

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

function cleanPhone(phone) {
    if (!phone) return "";
    return phone.replace(/[^\d]/g, "");
}

function clampNumber(value, min, max) {
    const number = Number(value);

    if (Number.isNaN(number)) return min;

    return Math.min(Math.max(number, min), max);
}

function formatBytes(bytes) {
    if (!bytes) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}