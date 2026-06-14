// ================= COURSE DATABASE =================
const courses = [
    { code: "BIT321", title: "Web Development", cu: 4, type: "Core", semester: "II", lecturer: "Dr. A", capacity: 60, status: "Open", prereq: ["BIT221"], day: "Mon" },
    { code: "BIT322", title: "Database Systems", cu: 4, type: "Core", semester: "II", lecturer: "Dr. B", capacity: 50, status: "Open", prereq: ["BIT221"], day: "Tue" },
    { code: "BIT323", title: "Computer Networks", cu: 3, type: "Core", semester: "II", lecturer: "Dr. C", capacity: 55, status: "Open", prereq: [], day: "Wed" },
    { code: "BIT324", title: "Software Engineering", cu: 4, type: "Core", semester: "II", lecturer: "Dr. D", capacity: 40, status: "Open", prereq: ["BIT221"], day: "Thu" },
    { code: "BIT221", title: "Programming II", cu: 3, type: "Core", semester: "I", lecturer: "Dr. E", capacity: 70, status: "Completed", prereq: [], day: "Fri" },
    { code: "BIT121", title: "Intro to Computing", cu: 3, type: "Core", semester: "I", lecturer: "Dr. F", capacity: 80, status: "Completed", prereq: [], day: "Mon" }
];

// ================= STATE =================
let selectedCourses = [];
const MIN_CU = 12;
const MAX_CU = 24;

// ================= INIT =================
window.onload = function () {
    renderCourses();
    updateUI();
};

// ================= RENDER COURSES =================
function renderCourses() {
    const tbody = document.getElementById("courseTableBody");
    tbody.innerHTML = "";

    courses.forEach(course => {
        tbody.innerHTML += `
        <tr>
            <td><input type="checkbox" onchange="toggleCourse('${course.code}')"></td>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.cu}</td>
            <td>${course.type}</td>
            <td>${course.semester}</td>
            <td>${course.lecturer}</td>
            <td>${course.capacity}</td>
            <td>${course.status}</td>
            <td><button onclick="toggleCourse('${course.code}')">Add</button></td>
        </tr>
        `;
    });
}

// ================= ADD / REMOVE COURSE =================
function toggleCourse(code) {
    const course = courses.find(c => c.code === code);

    const exists = selectedCourses.find(c => c.code === code);

    if (exists) {
        selectedCourses = selectedCourses.filter(c => c.code !== code);
    } else {
        const totalCU = getTotalCU();

        if (totalCU + course.cu > MAX_CU) {
            alert("❌ Credit limit exceeded (Max 24 CU)");
            return;
        }

        selectedCourses.push(course);
    }

    updateUI();
}

// ================= TOTAL CU =================
function getTotalCU() {
    return selectedCourses.reduce((sum, c) => sum + c.cu, 0);
}

// ================= UPDATE UI =================
function updateUI() {
    updateSelectedCourses();
    updateCredits();
    updatePrerequisites();
    updateTimetable();
    updateAdvisor();
    updateStats();
}

// ================= SELECTED COURSES =================
function updateSelectedCourses() {
    const box = document.getElementById("selectedCourses");
    box.innerHTML = "";

    selectedCourses.forEach(c => {
        box.innerHTML += `
        <div style="padding:5px;border:1px solid #ccc;margin:5px;">
            <b>${c.code}</b> - ${c.title} (${c.cu} CU)
            <button onclick="toggleCourse('${c.code}')">Remove</button>
        </div>
        `;
    });
}

// ================= CREDIT MONITOR =================
function updateCredits() {
    const total = getTotalCU();

    document.getElementById("currentCU").innerText = total;
    document.getElementById("totalCU").innerText = total;
    document.getElementById("registeredCourses").innerText = selectedCourses.length;
    document.getElementById("remainingCU").innerText = MAX_CU - total;
    document.getElementById("remainingCredits").innerText = MAX_CU - total;

    const status = (total >= MIN_CU && total <= MAX_CU) ? "Eligible" : "Not Eligible";
    document.getElementById("registrationStatus").innerText = status;

    const progress = (total / MAX_CU) * 100;
    document.getElementById("creditProgress").style.width = progress + "%";
}

// ================= PREREQUISITE CHECK =================
function updatePrerequisites() {
    const eligible = document.getElementById("eligibleCourses");
    const missing = document.getElementById("missingPrerequisites");
    const blocked = document.getElementById("blockedCourses");

    eligible.innerHTML = "";
    missing.innerHTML = "";
    blocked.innerHTML = "";

    selectedCourses.forEach(c => {
        if (c.prereq.length === 0) {
            eligible.innerHTML += `<li>${c.code}</li>`;
        } else {
            const missingReq = c.prereq.filter(p => !selectedCourses.find(s => s.code === p));

            if (missingReq.length > 0) {
                missing.innerHTML += `<li>${c.code} missing: ${missingReq.join(", ")}</li>`;
            } else {
                eligible.innerHTML += `<li>${c.code}</li>`;
            }
        }
    });
}

// ================= TIMETABLE =================
function updateTimetable() {
    document.getElementById("mon").innerText = "";
    document.getElementById("tue").innerText = "";
    document.getElementById("wed").innerText = "";
    document.getElementById("thu").innerText = "";
    document.getElementById("fri").innerText = "";

    selectedCourses.forEach(c => {
        const cell = document.getElementById(c.day.toLowerCase());

        if (cell.innerText !== "") {
            document.getElementById("conflictAlerts").innerHTML =
                "⚠ Timetable conflict detected!";
        }

        cell.innerText += c.code + " ";
    });
}

// ================= AI ADVISOR =================
function updateAdvisor() {
    const msg = document.getElementById("advisorMessage");

    const total = getTotalCU();

    if (total < MIN_CU) {
        msg.innerHTML = "⚠ You need more courses to meet minimum CU requirement.";
    } else if (total > MAX_CU) {
        msg.innerHTML = "❌ Too many credits selected.";
    } else {
        msg.innerHTML = "✅ Your course load is balanced and approved.";
    }
}

// ================= STATS =================
function updateStats() {
    const core = selectedCourses.filter(c => c.type === "Core").length;
    document.querySelector(".stat-box").innerText = "Core: " + core;
}

// ================= ACTION BUTTONS =================

// Save Draft
document.getElementById("saveDraftBtn").onclick = function () {
    localStorage.setItem("draftCourses", JSON.stringify(selectedCourses));
    alert("Draft Saved Successfully");
};

// Clear
document.getElementById("clearBtn").onclick = function () {
    selectedCourses = [];
    updateUI();
};

// Preview
document.getElementById("previewBtn").onclick = function () {
    alert(JSON.stringify(selectedCourses, null, 2));
};

// Print
document.getElementById("printBtn").onclick = function () {
    window.print();
};

// Submit
document.getElementById("submitBtn").onclick = function () {
    const total = getTotalCU();

    if (total < MIN_CU) {
        alert("❌ Minimum CU not met");
        return;
    }

    if (!document.getElementById("declaration").checked) {
        alert("❌ Please accept declaration");
        return;
    }

    alert("🎉 Registration Submitted Successfully!");
    localStorage.removeItem("draftCourses");
};