/* ==========================================
   TEAM LMS DASHBOARD SYSTEM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadStudentProfile();
    loadDashboardStats();
    loadNotifications();
    loadRecentActivities();
    loadAcademicProgress();
    loadCurrentDate();

});

/* ==========================================
   LOAD PROFILE
========================================== */

function loadStudentProfile() {

    const profile =
        JSON.parse(
            localStorage.getItem("studentProfile")
        );

    if (!profile) return;

    const studentName =
        document.getElementById("studentName");

    if(studentName){

        studentName.innerHTML =
        `${profile.firstName || ""} ${profile.lastName || ""}`;

    }

}

/* ==========================================
   DASHBOARD STATS
========================================== */

function loadDashboardStats() {

    setText("currentGPA","4.20");
    setText("cgpa","3.85");
    setText("registeredCourses","8");
    setText("attendance","92%");
    setText("outstandingBalance","UGX 700,000");
    setText("earnedCredits","98");
    setText("remainingCredits","22");

}

/* ==========================================
   HELPER
========================================== */

function setText(id,value){

    const element =
        document.getElementById(id);

    if(element){

        element.innerHTML = value;

    }

}

/* ==========================================
   NOTIFICATIONS
========================================== */

function loadNotifications(){

    const notifications = [

        "📢 Course Registration Opened",
        "📚 New Course Material Uploaded",
        "📝 Assignment Due Tomorrow",
        "💰 Tuition Balance Reminder",
        "🎓 Results Released",
        "📅 Semester Exams Next Week"

    ];

    const list =
        document.getElementById("notificationList");

    if(!list) return;

    list.innerHTML = "";

    notifications.forEach(item => {

        const li =
            document.createElement("li");

        li.innerHTML = item;

        list.appendChild(li);

    });

}

/* ==========================================
   RECENT ACTIVITIES
========================================== */

function loadRecentActivities(){

    const activityBox =
        document.getElementById("activityTimeline");

    if(!activityBox) return;

    const activities = [

        "Registered BIT321 Web Development",
        "Downloaded Registration Slip",
        "Submitted Database Assignment",
        "Paid Tuition UGX 500,000",
        "Viewed Semester Results",
        "Updated Student Profile"

    ];

    activityBox.innerHTML = "";

    activities.forEach(activity=>{

        const item =
        document.createElement("div");

        item.className =
        "timeline-item";

        item.innerHTML =

        `
        <i class="fa fa-circle"></i>
        <span>${activity}</span>
        `;

        activityBox.appendChild(item);

    });

}

/* ==========================================
   ACADEMIC PROGRESS
========================================== */

function loadAcademicProgress(){

    const creditsRequired = 120;
    const creditsEarned = 98;

    const percentage =

    Math.round(
        (creditsEarned / creditsRequired)
        * 100
    );

    const progressBar =
        document.getElementById(
            "academicProgress"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );

    if(progressBar){

        progressBar.style.width =
            percentage + "%";

    }

    if(progressText){

        progressText.innerHTML =
            percentage + "% Completed";

    }

}

/* ==========================================
   GPA STATUS
========================================== */

function getAcademicStanding(gpa){

    if(gpa >= 4.5){

        return "Dean's List";

    }

    if(gpa >= 3.0){

        return "Good Standing";

    }

    if(gpa >= 2.0){

        return "Average Standing";

    }

    return "Probation";

}

/* ==========================================
   QUICK ACTIONS
========================================== */

function goToCourses(){

    window.location.href =
    "courses.html";

}

function goToResults(){

    window.location.href =
    "results.html";

}

function goToRegistration(){

    window.location.href =
    "registration.html";

}

function goToFinance(){

    window.location.href =
    "finance.html";

}

/* ==========================================
   GPA TREND
========================================== */

function loadGPATrend(){

    const semesters = [

        "Sem 1",
        "Sem 2",
        "Sem 3",
        "Sem 4"

    ];

    const gpa = [

        3.2,
        3.5,
        3.8,
        4.2

    ];

    console.log(
        semesters,
        gpa
    );

}

/* ==========================================
   ATTENDANCE TREND
========================================== */

function loadAttendanceTrend(){

    const attendance = {

        Jan:"95%",
        Feb:"90%",
        Mar:"92%",
        Apr:"94%"

    };

    console.log(attendance);

}

/* ==========================================
   FINANCE TREND
========================================== */

function loadFinanceTrend(){

    const payments = [

        "500,000",
        "300,000",
        "250,000"

    ];

    console.log(payments);

}

/* ==========================================
   CURRENT DATE
========================================== */

function loadCurrentDate(){

    const currentDate =
        document.getElementById(
            "currentDate"
        );

    if(currentDate){

        currentDate.innerHTML =

        new Date().toLocaleDateString(
            "en-UG",
            {

                weekday:"long",
                year:"numeric",
                month:"long",
                day:"numeric"

            }

        );

    }

}

/* ==========================================
   ANNOUNCEMENTS
========================================== */

function loadAnnouncements(){

    const announcements = [

        "Semester Two Registration Open",
        "Guild Elections Coming Soon",
        "Industrial Training Placement Available",
        "Research Proposal Submission Open"

    ];

    console.log(
        announcements
    );

}

/* ==========================================
   DASHBOARD SEARCH
========================================== */

function searchPortal(){

    const search =
        document.getElementById(
            "dashboardSearch"
        );

    if(!search) return;

    const keyword =
        search.value;

    alert(
        "Searching for: " +
        keyword
    );

}

/* ==========================================
   LOGOUT
========================================== */

function logout(){

    if(confirm(
        "Are you sure you want to logout?"
    )){

        window.location.href =
        "../index.html";

    }

}

/* ==========================================
   AUTO REFRESH NOTIFICATIONS
========================================== */

setInterval(()=>{

    const badge =
        document.getElementById(
            "notificationCount"
        );

    if(badge){

        let count =
        parseInt(
            badge.innerHTML || 12
        );

        badge.innerHTML = count;

    }

},10000);

/* ==========================================
   WELCOME MESSAGE
========================================== */

function welcomeStudent(){

    const hour =
        new Date().getHours();

    let greeting =
        "Welcome";

    if(hour < 12){

        greeting =
        "Good Morning";

    }

    else if(hour < 18){

        greeting =
        "Good Afternoon";

    }

    else{

        greeting =
        "Good Evening";

    }

    const welcome =
        document.getElementById(
            "welcomeMessage"
        );

    if(welcome){

        welcome.innerHTML =
            greeting;

    }

}

welcomeStudent();


/* ======================================
   TEAM LMS PROFILE SYSTEM
====================================== */

/* ============================
   LOAD PROFILE ON PAGE LOAD
============================ */

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    initializeButtons();

    calculateCompletion();

    addActivity("Student logged into portal");

});

/* ============================
   SAVE PROFILE
============================ */

function saveProfile() {

    const profileData = {

        firstName: getValue("firstName"),
        lastName: getValue("lastName"),
        gender: getValue("gender"),
        dob: getValue("dob"),
        nationality: getValue("nationality"),
        nin: getValue("nin"),

        phone: getValue("phone"),
        altPhone: getValue("altPhone"),
        email: getValue("email"),
        address: getValue("address"),
        district: getValue("district"),
        country: getValue("country"),

        guardianName: getValue("guardianName"),
        guardianRelationship: getValue("guardianRelationship"),
        guardianPhone: getValue("guardianPhone"),
        guardianOccupation: getValue("guardianOccupation"),

        emergencyName: getValue("emergencyName"),
        emergencyRelationship: getValue("emergencyRelationship"),
        emergencyPhone: getValue("emergencyPhone")

    };

    localStorage.setItem(
        "studentProfile",
        JSON.stringify(profileData)
    );

    addActivity("Updated profile information");

    calculateCompletion();

    alert("Profile saved successfully.");

}

/* ============================
   LOAD PROFILE
============================ */

function loadProfile() {

    const savedProfile =
        localStorage.getItem("studentProfile");

    if (!savedProfile) return;

    const data = JSON.parse(savedProfile);

    Object.keys(data).forEach(key => {

        const element =
            document.getElementById(key);

        if (element) {

            element.value = data[key];

        }

    });

}

/* ============================
   HELPER
============================ */

function getValue(id) {

    const element =
        document.getElementById(id);

    return element ? element.value : "";

}

/* ============================
   PROFILE PHOTO UPLOAD
============================ */

function uploadPhoto() {

    const fileInput =
        document.getElementById("photoUpload");

    const photo =
        document.getElementById("studentPhoto");

    if (!fileInput.files.length) {

        alert("Please choose an image.");

        return;

    }

    const file =
        fileInput.files[0];

    const reader =
        new FileReader();

    reader.onload = function(e) {

        photo.src = e.target.result;

        localStorage.setItem(
            "studentPhoto",
            e.target.result
        );

        addActivity("Uploaded a new profile photo");

    };

    reader.readAsDataURL(file);

}

/* ============================
   LOAD SAVED PHOTO
============================ */

window.addEventListener("load", () => {

    const savedPhoto =
        localStorage.getItem("studentPhoto");

    if (savedPhoto) {

        document.getElementById(
            "studentPhoto"
        ).src = savedPhoto;

    }

});

/* ============================
   ACTIVITY TIMELINE
============================ */

function addActivity(text) {

    const activityLog =
        document.getElementById("activityLog");

    if (!activityLog) return;

    const li =
        document.createElement("li");

    const now =
        new Date().toLocaleString();

    li.innerHTML =
        `<strong>${now}</strong><br>${text}`;

    activityLog.prepend(li);

    saveActivities();

}

/* ============================
   SAVE ACTIVITIES
============================ */

function saveActivities() {

    const items =
        document.querySelectorAll(
            "#activityLog li"
        );

    let activities = [];

    items.forEach(item => {

        activities.push(item.innerHTML);

    });

    localStorage.setItem(
        "activityLog",
        JSON.stringify(activities)
    );

}

/* ============================
   LOAD ACTIVITIES
============================ */

function loadActivities() {

    const saved =
        localStorage.getItem("activityLog");

    if (!saved) return;

    const activityLog =
        document.getElementById("activityLog");

    activityLog.innerHTML = "";

    JSON.parse(saved).forEach(item => {

        const li =
            document.createElement("li");

        li.innerHTML = item;

        activityLog.appendChild(li);

    });

}

loadActivities();

/* ============================
   PROFILE COMPLETION
============================ */

function calculateCompletion() {

    const fields = [

        "firstName",
        "lastName",
        "gender",
        "dob",
        "nationality",
        "nin",
        "phone",
        "email",
        "address",
        "district",
        "country",
        "guardianName",
        "guardianPhone",
        "emergencyName",
        "emergencyPhone"

    ];

    let completed = 0;

    fields.forEach(field => {

        const value =
            document.getElementById(field)?.value;

        if (value && value.trim() !== "") {

            completed++;

        }

    });

    const percent =
        Math.round(
            (completed / fields.length) * 100
        );

    const completionText =
        document.getElementById(
            "completionPercent"
        );

    const completionBar =
        document.getElementById(
            "completionFill"
        );

    if (completionText) {

        completionText.innerText =
            percent + "% Complete";

    }

    if (completionBar) {

        completionBar.style.width =
            percent + "%";

    }

}

/* ============================
   AUTO SAVE
============================ */

document.addEventListener("input", () => {

    calculateCompletion();

});

/* ============================
   GPA CALCULATOR
============================ */

function calculateAcademicProgress() {

    const creditsRequired = 120;

    const creditsEarned = 98;

    const percentage =
        Math.round(
            (creditsEarned /
            creditsRequired) * 100
        );

    const progressBar =
        document.getElementById(
            "progressBar"
        );

    if (progressBar) {

        progressBar.style.width =
            percentage + "%";

    }

}

calculateAcademicProgress();

/* ============================
   DOWNLOAD DOCUMENTS
============================ */

function downloadDocument(name) {

    addActivity(
        "Downloaded " + name
    );

    alert(
        name +
        " download will be connected to backend."
    );

}

/* ============================
   SECURITY SETTINGS
============================ */

function changePassword() {

    addActivity(
        "Requested password change"
    );

    alert(
        "Password change page coming soon."
    );

}

function enable2FA() {

    addActivity(
        "Enabled Two Factor Authentication"
    );

    alert(
        "2FA enabled successfully."
    );

}

function viewLoginHistory() {

    const history = JSON.parse(
        localStorage.getItem(
            "loginHistory"
        ) || "[]"
    );

    alert(
        history.join("\n\n")
    );

}

/* ============================
   LOGIN HISTORY
============================ */

function storeLoginHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                "loginHistory"
            ) || "[]"
        );

    history.unshift(
        "Login: " +
        new Date().toLocaleString()
    );

    if (history.length > 20) {

        history.pop();

    }

    localStorage.setItem(
        "loginHistory",
        JSON.stringify(history)
    );

}

storeLoginHistory();

/* ============================
   BUTTON EVENTS
============================ */

function initializeButtons() {

    document
        .querySelectorAll(
            ".documents-grid button"
        )
        .forEach(btn => {

            btn.addEventListener(
                "click",
                () => {

                    downloadDocument(
                        btn.innerText
                    );

                }
            );

        });

}

/* ============================
   PROFILE SUMMARY
============================ */

function updateHeaderName() {

    const first =
        getValue("firstName");

    const last =
        getValue("lastName");

    const title =
        document.getElementById(
            "studentName"
        );

    if (title) {

        title.innerText =
            first + " " + last;

    }

}

document.addEventListener(
    "input",
    updateHeaderName
);

updateHeaderName();

/* ============================
   DARK MODE READY
============================ */

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );

}

/* ============================
   STUDENT STATUS ENGINE
============================ */

function updateStudentStatus() {

    const gpa = 4.2;

    const badge =
        document.querySelector(
            ".status"
        );

    if (!badge) return;

    if (gpa >= 4.5) {

        badge.innerHTML =
            "Dean's List";

    }

    else if (gpa >= 2.0) {

        badge.innerHTML =
            "Active Student";

    }

    else {

        badge.innerHTML =
            "Probation";

    }

}

updateStudentStatus();


// ===============================
// FINANCE ERP SYSTEM - DYNAMIC JS
// ===============================

// Initial financial data (simulate backend)
let financeData = {
  totalFees: 2500000,
  totalPaid: 1800000,
  scholarship: 500000
};

// ===============================
// CALCULATE FINANCIAL STATUS
// ===============================
function calculateFinance() {
  let balance =
    financeData.totalFees -
    financeData.totalPaid -
    financeData.scholarship;

  let percent = ((financeData.totalPaid + financeData.scholarship) / financeData.totalFees) * 100;

  // Update UI
  document.getElementById("totalFees").innerText =
    "UGX " + financeData.totalFees.toLocaleString();

  document.getElementById("totalPaid").innerText =
    "UGX " + financeData.totalPaid.toLocaleString();

  document.getElementById("balance").innerText =
    "UGX " + balance.toLocaleString();

  document.getElementById("progress").style.width = percent + "%";
  document.getElementById("percent").innerText =
    percent.toFixed(1) + "% Paid";

  // Clearance Status
  let status = document.getElementById("statusBadge");

  if (balance <= 0) {
    status.innerText = "CLEARED";
    status.style.background = "#16a34a";
  } else if (percent >= 70) {
    status.innerText = "PARTIAL";
    status.style.background = "#f59e0b";
  } else {
    status.innerText = "PENDING";
    status.style.background = "#dc2626";
  }

  // Alert system
  let alertBox = document.getElementById("feeAlert");
  if (balance > 0) {
    alertBox.style.display = "block";
  } else {
    alertBox.style.display = "none";
  }
}

// ===============================
// PAYMENT SIMULATION (REAL ERP STYLE)
// ===============================
function makePayment() {
  let amount = parseInt(document.getElementById("payAmount").value);
  let method = document.getElementById("paymentMethod").value;

  if (!amount || amount <= 0) {
    alert("Enter a valid payment amount");
    return;
  }

  financeData.totalPaid += amount;

  // Generate reference code
  let ref = "TU-" + Math.floor(Math.random() * 90000 + 10000);

  document.getElementById("refCode").innerText =
    "Payment Successful | Ref: " + ref + " | Method: " + method;

  // Add transaction dynamically
  let txnList = document.getElementById("transactionList");

  let newTxn = document.createElement("div");
  newTxn.classList.add("txn");

  newTxn.innerHTML = `
    <span>${method}</span>
    <span>UGX ${amount.toLocaleString()}</span>
    <span>${new Date().toLocaleDateString()}</span>
  `;

  txnList.appendChild(newTxn);

  calculateFinance();
}

// ===============================
// SEARCH TRANSACTIONS
// ===============================
function searchTransactions() {
  let input = document.getElementById("searchTxn").value.toLowerCase();
  let txns = document.querySelectorAll(".txn");

  txns.forEach(txn => {
    let text = txn.innerText.toLowerCase();
    txn.style.display = text.includes(input) ? "flex" : "none";
  });
}

// ===============================
// EXPORT FUNCTIONS
// ===============================
function generateInvoice() {
  let ref = "INV-" + Date.now();
  alert("Invoice Generated: " + ref);
}

function downloadStatement() {
  alert("Statement downloading...");
}

function exportPDF() {
  alert("Exporting finance report as PDF...");
}

function printReceipt() {
  window.print();
}

// ===============================
// FILTER SYSTEM (YEAR / SEMESTER)
// ===============================
function loadFinanceData() {
  alert("Finance data refreshed for selected semester/year");
  calculateFinance();
}

// Initialize on load
window.onload = calculateFinance;

let currentStep = 1;

// Persistent course database
let courses = JSON.parse(localStorage.getItem("courses")) || [
  { code: "BIT321", name: "Web Development", credits: 4 },
  { code: "BIT322", name: "Database Systems", credits: 4 },
  { code: "BIT323", name: "Networking", credits: 3 }
];

let selectedCourses = [];

// =========================
// STEP NAVIGATION
// =========================
function nextStep(step) {

  // STEP SAFETY CHECK
  let steps = document.querySelectorAll(".step-box");

  if (!steps.length) {
    console.error("Step boxes not found!");
    return;
  }

  // Hide ALL steps first (VERY IMPORTANT FIX)
  steps.forEach(s => s.classList.add("hidden"));

  // Show target step
  let target = document.getElementById("step" + step);

  if (!target) {
    console.error("Step not found: step" + step);
    return;
  }

  target.classList.remove("hidden");

  // Update current step tracker
  currentStep = step;

  updateSteps();

  // Step-specific logic
  if (step === 3) renderCourses();
  if (step === 4) generateSummary();
  if (step === 5) completeRegistration();
}

// =========================
// SAVE TO LOCAL STORAGE
// =========================
function saveCourses() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

// =========================
// ADD COURSE (NEW FEATURE)
// =========================
function addCourse() {
  let code = document.getElementById("courseCode").value;
  let name = document.getElementById("courseName").value;
  let credits = parseInt(document.getElementById("courseCredits").value);

  if (!code || !name || !credits) {
    alert("Please fill all fields");
    return;
  }

  // add to array
  courses.push({
    code: code,
    name: name,
    credits: credits
  });

  // save if using storage
  localStorage.setItem("courses", JSON.stringify(courses));

  // refresh UI
  renderCourses();

  // clear inputs
  document.getElementById("courseCode").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("courseCredits").value = "";
}
console.log("JS loaded successfully");

// =========================
// REMOVE COURSE (NEW FEATURE)
// =========================
function removeCourse(index) {
  courses.splice(index, 1);
  saveCourses();
  renderCourses();
}

// =========================
// EDIT COURSE (NEW FEATURE)
// =========================
function editCourse(index) {
  let c = courses[index];

  let newName = prompt("Edit Course Name", c.name);
  let newCredits = prompt("Edit Credits", c.credits);

  if (newName && newCredits) {
    courses[index].name = newName;
    courses[index].credits = parseInt(newCredits);
    saveCourses();
    renderCourses();
  }
}

// =========================
// RENDER COURSES
// =========================
function renderCourses() {
  let container = document.getElementById("courseList");
  container.innerHTML = "";

  courses.forEach((c, index) => {
    let div = document.createElement("div");
    div.classList.add("course-item");

    div.innerHTML = `
      <div>
        <input type="checkbox" onchange="toggleCourse('${c.code}', ${c.credits})">
        ${c.code} - ${c.name} (${c.credits} CU)
      </div>

      <div class="course-actions">
        <button onclick="editCourse(${index})">Edit</button>
        <button onclick="removeCourse(${index})">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// =========================
// SELECT COURSE
// =========================
function toggleCourse(code, credits) {
  let i = selectedCourses.findIndex(c => c.code === code);

  if (i === -1) {
    selectedCourses.push({ code, credits });
  } else {
    selectedCourses.splice(i, 1);
  }

  updateCredits();
}

// =========================
// CREDIT ENGINE (ERP RULE)
// =========================
function updateCredits() {
  let total = selectedCourses.reduce((a, b) => a + b.credits, 0);

  document.getElementById("totalCredits").innerText = total;

  let warning = document.getElementById("warning");

  if (total > 24) {
    warning.innerText = "⚠ Credit overload! Maximum allowed is 24.";
  } else {
    warning.innerText = "";
  }
}
let MAX_CREDITS = 24;

// Prerequisites map (REAL ERP LOGIC)
let prerequisites = {
  "BIT321": ["BIT221"],
  "BIT322": ["BIT121"],
  "BIT324": ["BIT222"]
};

// Student record simulation
let studentRecord = {
  completedCourses: ["BIT121", "BIT221"],
  cgpa: 3.6,
  feesCleared: true
};

// Timetable (for clash detection)
let timetable = {
  "BIT321": "Mon 8-10",
  "BIT322": "Mon 8-10",
  "BIT323": "Tue 10-12",
  "BIT324": "Wed 2-4"
};
// =========================
// FILTER COURSES
// =========================
function filterCourses() {
  let input = document.getElementById("searchCourse").value.toLowerCase();
  let items = document.querySelectorAll(".course-item");

  items.forEach(item => {
    item.style.display =
      item.innerText.toLowerCase().includes(input) ? "flex" : "none";
  });
}

// =========================
// SUMMARY
// =========================
function generateSummary() {
  let summary = document.getElementById("summary");

  let total = selectedCourses.reduce((a, b) => a + b.credits, 0);

  summary.innerHTML = `
    <p>Year: ${document.getElementById("year").value}</p>
    <p>Semester: ${document.getElementById("semester").value}</p>
    <p>Type: ${document.getElementById("regType").value}</p>
    <p>Courses: ${selectedCourses.length}</p>
    <p>Credits: ${total}</p>
  `;
}

// =========================
// COMPLETE REGISTRATION
// =========================
function completeRegistration() {
  let ref = "REG-" + Math.floor(Math.random() * 90000 + 10000);

  document.getElementById("regSlip").innerText =
    "Registration Successful! Ref: " + ref;
}
console.log("Registration JS loaded ✔");

// =========================
// DOWNLOAD
// =========================
function downloadSlip() {
  window.print();
}

// INIT
window.onload = renderCourses;


console.log("Course Management System Loaded");

function submitRegistration(selectedCourses) {

  let result = validateCourseSelection(selectedCourses);

  if (!result.valid) {

    alert("REGISTRATION FAILED:\n\n" + result.errors.join("\n"));
    return;
  }

  let regRef = "REG-" + Date.now();

  alert(
    "Registration Successful!\nRef: " + regRef +
    "\nCredits: " + result.totalCredits
  );

  // Save approved registration
  localStorage.setItem("registration", JSON.stringify({
    ref: regRef,
    courses: selectedCourses,
    status: "APPROVED"
  }));
}

// =======================
// CORE DATA (ERP DATABASE)
// =======================
console.log("Course JS Loaded");

let availableCourses = [
  {
    code: "BIT321",
    name: "Web Development",
    lecturer: "Dr. Sarah N.",
    credits: 4,
    department: "Computer Science",
    semester: "Semester 1",
    status: "NORMAL"
  },
  {
    code: "BIT322",
    name: "Database Systems",
    lecturer: "Mr. John K.",
    credits: 4,
    department: "Computer Science",
    semester: "Semester 1",
    status: "RETAKE"
  }
];

let enrolledCourses = [];

window.onload = function () {
  console.log("Page Loaded");

  renderAvailableCourses();
  renderEnrolledCourses();
};

// Enrolled courses (persistent)
let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

// =======================
// INIT
// =======================
window.onload = function () {
  renderAvailableCourses();
  renderEnrolledCourses();
  updateStats();
};
alert("JS is working");
// =======================
// RENDER AVAILABLE COURSES
// =======================
function renderAvailableCourses(list = availableCourses) {
  let container = document.getElementById("availableCourses");
  container.innerHTML = "";

  list.forEach(course => {

    let div = document.createElement("div");
    div.classList.add("course-card");

    div.innerHTML = `
      <div>
        <strong>${course.code}</strong> - ${course.name}<br>
        👨‍🏫 ${course.lecturer} | ${course.credits} CU<br>
        🏢 ${course.department} | 📅 ${course.semester}<br>
        <span class="badge ${getBadge(course.status)}">${course.status}</span>
      </div>

      <div>
        <button onclick="enrollCourse('${course.code}')">Enroll</button>
        <button onclick="openModal('${course.code}')">View</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// =======================
// RENDER ENROLLED COURSES
// =======================
function renderEnrolledCourses() {
  let container = document.getElementById("enrolledCourses");
  container.innerHTML = "";

  enrolledCourses.forEach(course => {

    let div = document.createElement("div");
    div.classList.add("course-card");

    div.innerHTML = `
      <div>
        <strong>${course.code}</strong> - ${course.name}<br>
        📊 ${course.credits} CU
      </div>

      <div>
        <button onclick="openModal('${course.code}')">View</button>
        <button onclick="removeCourse('${course.code}')">Remove</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// =======================
// ENROLL COURSE
// =======================
function enrollCourse(code) {

  let course = availableCourses.find(c => c.code === code);

  if (!course) return;

  let exists = enrolledCourses.find(c => c.code === code);

  if (exists) {
    alert("Already enrolled in this course");
    return;
  }

  enrolledCourses.push(course);
  localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));

  renderEnrolledCourses();
  updateStats();
}

// =======================
// REMOVE COURSE
// =======================
function removeCourse(code) {

  enrolledCourses = enrolledCourses.filter(c => c.code !== code);

  localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));

  renderEnrolledCourses();
  updateStats();
}

// =======================
// SEARCH COURSES
// =======================
function searchCourses() {
  let value = document.getElementById("searchBox").value.toLowerCase();

  let filtered = availableCourses.filter(c =>
    c.name.toLowerCase().includes(value) ||
    c.code.toLowerCase().includes(value)
  );

  renderAvailableCourses(filtered);
}

// =======================
// FILTER COURSES
// =======================
function filterCourses() {

  let dept = document.getElementById("deptFilter").value;
  let semester = document.getElementById("semesterFilter").value;

  let filtered = availableCourses.filter(c => {

    let deptMatch = dept === "all" || c.department === dept;
    let semMatch = semester === "all" || c.semester === semester;

    return deptMatch && semMatch;
  });

  renderAvailableCourses(filtered);
}

// =======================
// MODAL SYSTEM
// =======================
let currentCourse = null;

function openModal(code) {

  let course =
    availableCourses.find(c => c.code === code) ||
    enrolledCourses.find(c => c.code === code);

  if (!course) return;

  currentCourse = course;

  document.getElementById("modalTitle").innerText =
    course.code + " - " + course.name;

  document.getElementById("modalLecturer").innerText =
    "Lecturer: " + course.lecturer;

  document.getElementById("modalDepartment").innerText =
    "Department: " + course.department;

  document.getElementById("modalCredits").innerText =
    "Credits: " + course.credits;

  document.getElementById("modalSemester").innerText =
    "Semester: " + course.semester;

  document.getElementById("courseModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("courseModal").classList.add("hidden");
}

// =======================
// MODAL ACTIONS
// =======================
function enrollFromModal() {
  if (currentCourse) {
    enrollCourse(currentCourse.code);
    closeModal();
  }
}

function removeFromModal() {
  if (currentCourse) {
    removeCourse(currentCourse.code);
    closeModal();
  }
}

// =======================
// STATS SYSTEM
// =======================
function updateStats() {

  document.getElementById("totalAvailable").innerText =
    availableCourses.length;

  document.getElementById("totalEnrolled").innerText =
    enrolledCourses.length;

  let totalCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);

  document.getElementById("totalCredits").innerText =
    totalCredits;
}

// =======================
// BADGE SYSTEM
// =======================
function getBadge(status) {
  if (status === "NORMAL") return "normal";
  if (status === "RETAKE") return "retake";
  if (status === "MISSING PAPER") return "missing";
  if (status === "SUPPLEMENTARY") return "supplementary";
  return "normal";
}

function validateCourseSelection(selectedCourses) {

  let errors = [];
  let totalCredits = 0;

  for (let course of selectedCourses) {

    // -------------------------
    // RULE 1: CREDIT LIMIT
    // -------------------------
    totalCredits += course.credits;

    if (totalCredits > MAX_CREDITS) {
      errors.push("Credit limit exceeded (Max " + MAX_CREDITS + ")");
      break;
    }

    // -------------------------
    // RULE 2: PREREQUISITES
    // -------------------------
    let reqs = prerequisites[course.code];

    if (reqs) {
      let missing = reqs.filter(r =>
        !studentRecord.completedCourses.includes(r)
      );

      if (missing.length > 0) {
        errors.push(
          course.code + " missing prerequisites: " + missing.join(", ")
        );
      }
    }

    // -------------------------
    // RULE 3: TIMETABLE CLASH
    // -------------------------
    for (let c of selectedCourses) {
      if (c.code !== course.code) {
        if (timetable[c.code] === timetable[course.code]) {
          errors.push(
            "Timetable clash between " + c.code + " and " + course.code
          );
        }
      }
    }

    // -------------------------
    // RULE 4: DUPLICATE CHECK
    // -------------------------
    let duplicates = selectedCourses.filter(
      c => c.code === course.code
    );

    if (duplicates.length > 1) {
      errors.push(course.code + " is duplicated");
    }

    // -------------------------
    // RULE 5: FEE CLEARANCE
    // -------------------------
    if (!studentRecord.feesCleared) {
      errors.push("Fees not cleared. Registration blocked.");
      break;
    }

    // -------------------------
    // RULE 6: GPA ELIGIBILITY (OPTIONAL)
    // -------------------------
    if (studentRecord.cgpa < 2.0) {
      errors.push("CGPA too low for registration");
      break;
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors,
    totalCredits: totalCredits
  };
}


// ================= DATA STORAGE =================
let results = JSON.parse(localStorage.getItem("results")) || [];

// ================= GPA SCALE =================
function gradePoint(mark) {
  if (mark >= 80) return { grade: "A", gp: 5.0 };
  if (mark >= 75) return { grade: "B+", gp: 4.5 };
  if (mark >= 70) return { grade: "B", gp: 4.0 };
  if (mark >= 65) return { grade: "C+", gp: 3.5 };
  if (mark >= 60) return { grade: "C", gp: 3.0 };
  if (mark >= 55) return { grade: "D+", gp: 2.5 };
  if (mark >= 50) return { grade: "D", gp: 2.0 };
  return { grade: "F", gp: 0.0 };
}

// ================= ADD RESULT (ADMIN) =================
function addResult() {

  const code = document.getElementById("code").value;
  const cat = Number(document.getElementById("cat").value);
  const exam = Number(document.getElementById("exam").value);

  const total = cat + exam;
  const gpData = gradePoint(total);

  const result = {
    code,
    cat,
    exam,
    total,
    grade: gpData.grade,
    gp: gpData.gp,
    credits: 3
  };

  results.push(result);
  localStorage.setItem("results", JSON.stringify(results));

  renderResults();
  calculateStats();
}

// ================= RENDER TABLE =================
function renderResults() {

  const table = document.getElementById("resultsTable");
  table.innerHTML = "";

  results.forEach(r => {

    let remark = "";

    if (r.total >= 50) remark = "PASS";
    else remark = "RETAKE";

    const row = `
      <tr>
        <td>${r.code}</td>
        <td>${r.cat}</td>
        <td>${r.exam}</td>
        <td>${r.total}</td>
        <td>${r.grade}</td>
        <td>${r.gp}</td>
        <td>${remark}</td>
      </tr>
    `;

    table.innerHTML += row;
  });
}

// ================= GPA + CGPA =================
function calculateStats() {

  let totalPoints = 0;
  let totalCredits = 0;

  results.forEach(r => {
    totalPoints += r.gp * r.credits;
    totalCredits += r.credits;
  });

  let gpa = totalPoints / totalCredits || 0;
  let cgpa = gpa; // simplified single semester model

  document.getElementById("gpa").innerText = gpa.toFixed(2);
  document.getElementById("cgpa").innerText = cgpa.toFixed(2);
  document.getElementById("credits").innerText = totalCredits;

  // Academic status
  let status = "";

  if (gpa >= 4.5) status = "Excellent";
  else if (gpa >= 3.5) status = "Good Standing";
  else if (gpa >= 2.0) status = "Warning";
  else status = "Probation";

  document.getElementById("status").innerText = status;
}

// ================= TRANSCRIPT =================
function printTranscript() {
  window.print();
}

// ================= INIT =================
renderResults();
calculateStats();





// ================= STORAGE =================
let timetable = JSON.parse(localStorage.getItem("timetable")) || [];

// ================= ADD SCHEDULE =================
function addSchedule() {

  const newClass = {
    id: Date.now(),
    courseCode: document.getElementById("courseCode").value,
    courseName: document.getElementById("courseName").value,
    lecturer: document.getElementById("lecturer").value,
    day: document.getElementById("day").value,
    start: document.getElementById("start").value,
    end: document.getElementById("end").value,
    venue: document.getElementById("venue").value,
    link: document.getElementById("link").value
  };

  // conflict check
  if (hasConflict(newClass)) {
    alert("❌ Schedule Conflict Detected!");
    return;
  }

  timetable.push(newClass);
  localStorage.setItem("timetable", JSON.stringify(timetable));

  renderTimetable();
}

// ================= CONFLICT DETECTION =================
function hasConflict(newClass) {

  return timetable.some(t =>
    t.day === newClass.day &&
    t.venue === newClass.venue &&
    (
      (newClass.start >= t.start && newClass.start < t.end) ||
      (newClass.end > t.start && newClass.end <= t.end)
    )
  );
}

// ================= RENDER TIMETABLE =================
function renderTimetable() {

  const container = document.getElementById("timetable");
  container.innerHTML = "";

  const filterDay = document.getElementById("dayFilter")?.value || "All";

  timetable.forEach(t => {

    if (filterDay !== "All" && t.day !== filterDay) return;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${t.courseCode} - ${t.courseName}</h3>
      <p><b>Lecturer:</b> ${t.lecturer}</p>
      <p><b>Day:</b> ${t.day}</p>
      <p><b>Time:</b> ${t.start} - ${t.end}</p>
      <p><b>Venue:</b> ${t.venue}</p>

      <button onclick="joinClass('${t.link}')">Join Class</button>
      <button onclick="deleteClass(${t.id})" style="background:red;">Delete</button>
    `;

    container.appendChild(div);
  });
}

// ================= JOIN CLASS =================
function joinClass(link) {
  if (!link) {
    alert("No link provided");
    return;
  }
  window.open(link, "_blank");
}

// ================= DELETE CLASS =================
function deleteClass(id) {

  timetable = timetable.filter(t => t.id !== id);

  localStorage.setItem("timetable", JSON.stringify(timetable));

  renderTimetable();
}

// ================= INIT =================
renderTimetable();



// ================= STORAGE =================
let timetable = JSON.parse(localStorage.getItem("timetable")) || [];
let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
let attendanceSessions = JSON.parse(localStorage.getItem("attendanceSessions")) || [];

// ================= INIT =================
initSystem();

// ================= INIT =================
function initSystem() {
  generateSessionsFromTimetable();
  renderSessions();
  updateDashboard();
  populateFilters();
}

// ================= POPULATE FILTERS =================
function populateFilters() {

  const courseFilter = document.getElementById("courseFilter");
  const myCourse = document.getElementById("myCourse");

  courseFilter.innerHTML = `<option value="ALL">All Courses</option>`;
  myCourse.innerHTML = "";

  timetable.forEach(t => {
    courseFilter.innerHTML += `<option value="${t.courseCode}">${t.courseCode}</option>`;
    myCourse.innerHTML += `<option value="${t.courseCode}">${t.courseCode}</option>`;
  });
}

// ================= AUTO TIMETABLE → ATTENDANCE =================
function generateSessionsFromTimetable() {

  const today = new Date().toISOString().split("T")[0];
  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  timetable.forEach(t => {

    if (t.day !== dayName) return;

    const exists = attendanceSessions.find(s =>
      s.courseCode === t.courseCode &&
      s.date === today
    );

    if (!exists) {

      attendanceSessions.push({
        sessionId: Date.now() + Math.random(),
        courseCode: t.courseCode,
        courseName: t.courseName,
        date: today,
        time: `${t.start} - ${t.end}`,
        locked: false,
        students: enrolled.map(s => ({
          studentId: s.id,
          status: "ABSENT"
        }))
      });
    }
  });

  save();
}

// ================= RENDER SESSIONS =================
function renderSessions() {

  const container = document.getElementById("sessionList");
  container.innerHTML = "";

  let course = document.getElementById("courseFilter").value;
  let date = document.getElementById("dateFilter").value;

  let sessions = [...attendanceSessions];

  if (course !== "ALL") {
    sessions = sessions.filter(s => s.courseCode === course);
  }

  if (date) {
    sessions = sessions.filter(s => s.date === date);
  }

  sessions.forEach(s => {

    container.innerHTML += `
      <div class="session">
        <h3>${s.courseCode} - ${s.courseName}</h3>
        <p><b>Date:</b> ${s.date}</p>
        <p><b>Time:</b> ${s.time}</p>

        <button onclick="lockSession('${s.sessionId}')">
          ${s.locked ? "Locked" : "Lock Session"}
        </button>

        <h4>Students</h4>

        ${s.students.map(st => `
          <div class="student">
            Student ${st.studentId}
            <select onchange="markStudent('${s.sessionId}', ${st.studentId}, this.value)">
              <option ${st.status==="PRESENT"?"selected":""}>PRESENT</option>
              <option ${st.status==="ABSENT"?"selected":""}>ABSENT</option>
              <option ${st.status==="EXCUSED"?"selected":""}>EXCUSED</option>
            </select>
          </div>
        `).join("")}

      </div>
    `;
  });

  updateDashboard();
}

// ================= MARK STUDENT =================
function markStudent(sessionId, studentId, status) {

  const session = attendanceSessions.find(s => s.sessionId == sessionId);

  if (!session || session.locked) return alert("Session is locked!");

  const student = session.students.find(s => s.studentId == studentId);

  if (student) student.status = status;

  save();
  updateDashboard();
}

// ================= LOCK SESSION =================
function lockSession(sessionId) {

  const session = attendanceSessions.find(s => s.sessionId == sessionId);

  if (session) {
    session.locked = !session.locked;
  }

  save();
  renderSessions();
}

// ================= DASHBOARD =================
function updateDashboard() {

  let total = 0;
  let present = 0;
  let absent = 0;

  attendanceSessions.forEach(s => {
    s.students.forEach(st => {

      total++;

      if (st.status === "PRESENT") present++;
      if (st.status === "ABSENT") absent++;

    });
  });

  let presentRate = total ? (present / total) * 100 : 0;
  let absentRate = total ? (absent / total) * 100 : 0;

  document.getElementById("totalSessions").innerText = attendanceSessions.length;
  document.getElementById("presentRate").innerText = presentRate.toFixed(1) + "%";
  document.getElementById("absentRate").innerText = absentRate.toFixed(1) + "%";

  // risk calculation (<75%)
  let risk = 0;

  enrolled.forEach(s => {

    let rate = calculateStudentAttendance(s.id);

    if (rate < 75) risk++;

  });

  document.getElementById("riskCount").innerText = risk;
}

// ================= STUDENT ATTENDANCE =================
function calculateStudentAttendance(studentId) {

  let total = 0;
  let present = 0;

  attendanceSessions.forEach(s => {

    let st = s.students.find(x => x.studentId === studentId);

    if (st) {
      total++;
      if (st.status === "PRESENT") present++;
    }

  });

  return total ? (present / total) * 100 : 0;
}

// ================= SAVE =================
function save() {
  localStorage.setItem("attendanceSessions", JSON.stringify(attendanceSessions));
}

// ================= AUTO RUN =================
setInterval(generateSessionsFromTimetable, 60000);



// ================= STORAGE =================
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

let selectedNotification = null;

// ================= INIT =================
init();

function init() {
  renderNotifications();
  updateDashboard();
}

// ================= CREATE NOTIFICATION =================
function createNotification() {

  const notif = {
    id: Date.now(),
    type: document.getElementById("nType").value,
    priority: document.getElementById("nPriority").value,
    source: document.getElementById("nSource").value,
    title: document.getElementById("nTitle").value,
    message: document.getElementById("nMessage").value,
    target: document.getElementById("nTarget").value,
    schedule: document.getElementById("nSchedule").value,
    read: false,
    archived: false,
    pinned: false,
    time: new Date().toLocaleString()
  };

  notifications.unshift(notif);

  save();
  renderNotifications();
  updateDashboard();

  if (document.getElementById("nPush").checked) {
    showPopup(notif);
  }
}

// ================= SAVE =================
function save() {
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

// ================= RENDER =================
function renderNotifications() {

  const list = document.getElementById("notificationList");
  list.innerHTML = "";

  let type = document.getElementById("typeFilter").value;
  let priority = document.getElementById("priorityFilter").value;
  let status = document.getElementById("statusFilter").value;
  let search = document.getElementById("searchBox").value.toLowerCase();

  let filtered = notifications.filter(n => {

    return (type === "ALL" || n.type === type) &&
           (priority === "ALL" || n.priority === priority) &&
           (status === "ALL" ||
            (status === "READ" && n.read) ||
            (status === "UNREAD" && !n.read) ||
            (status === "ARCHIVED" && n.archived)) &&
           (n.title.toLowerCase().includes(search) ||
            n.message.toLowerCase().includes(search));
  });

  filtered.forEach(n => {

    const div = document.createElement("div");

    div.className = `notif ${n.priority} ${n.read ? "read" : ""}`;

    div.innerHTML = `
      <b>${n.title}</b><br>
      <small>${n.type} • ${n.time}</small>
    `;

    div.onclick = () => showDetails(n.id);

    list.appendChild(div);
  });
}

// ================= SHOW DETAILS =================
function showDetails(id) {

  selectedNotification = notifications.find(n => n.id === id);

  selectedNotification.read = true;

  document.getElementById("detailBox").innerHTML = `
    <h3>${selectedNotification.title}</h3>
    <p>${selectedNotification.message}</p>
    <hr>
    <p><b>Type:</b> ${selectedNotification.type}</p>
    <p><b>Priority:</b> ${selectedNotification.priority}</p>
    <p><b>Source:</b> ${selectedNotification.source}</p>
    <p><b>Target:</b> ${selectedNotification.target}</p>
    <p><b>Time:</b> ${selectedNotification.time}</p>
  `;

  save();
  updateDashboard();
  renderNotifications();
}

// ================= POPUP =================
function showPopup(n) {

  const popup = document.createElement("div");

  popup.className = `popup ${n.priority}`;

  popup.innerHTML = `
    <b>${n.title}</b>
    <p>${n.message}</p>
  `;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 4000);
}

// ================= ACTIONS =================
function markAllRead() {
  notifications.forEach(n => n.read = true);
  save(); renderNotifications(); updateDashboard();
}

function markAllArchived() {
  notifications.forEach(n => n.archived = true);
  save(); renderNotifications(); updateDashboard();
}

function clearNotifications() {
  notifications = [];
  save(); renderNotifications(); updateDashboard();
}

function exportJSON() {
  const data = JSON.stringify(notifications);
  const blob = new Blob([data], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "notifications.json";
  a.click();
}

// ================= DASHBOARD =================
function updateDashboard() {

  let total = notifications.length;
  let unread = notifications.filter(n => !n.read).length;
  let high = notifications.filter(n => n.priority === "HIGH" || n.priority === "CRITICAL").length;
  let system = notifications.filter(n => n.type === "SYSTEM").length;

  document.getElementById("totalNotif").innerText = total;
  document.getElementById("unreadNotif").innerText = unread;
  document.getElementById("highNotif").innerText = high;
  document.getElementById("systemNotif").innerText = system;
}

// ================= AUTO SYSTEM SIMULATION =================
function simulateAutoAlerts() {

  createAuto("ATTENDANCE", "Attendance Warning", "Your attendance is below 75%", "HIGH");
  createAuto("FINANCE", "Fee Reminder", "Clear your tuition fees", "MEDIUM");
  createAuto("RESULTS", "Results Published", "Check your semester results", "LOW");
}

function createAuto(type, title, msg, priority) {

  notifications.unshift({
    id: Date.now(),
    type,
    priority,
    source: "SYSTEM",
    title,
    message: msg,
    target: "ALL",
    read: false,
    archived: false,
    pinned: false,
    time: new Date().toLocaleString()
  });

  save();
  renderNotifications();
  updateDashboard();
  showPopup(notifications[0]);
}