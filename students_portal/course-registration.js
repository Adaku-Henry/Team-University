/* ===============================
   SAFE ELEMENT SELECTOR
================================ */
function getEl(id) {
    return document.getElementById(id);
}

/* ===============================
   STORAGE KEYS
================================ */
const COURSES_KEY = "university_courses";
const REGISTERED_KEY = "student_registered_courses_2501201663";

/* ===============================
   STATE (FIXED USING SET)
================================ */
let selectedAvailableCourseIds = new Set();
let selectedRegisteredCourseIds = new Set();
let currentModalCourseId = null;

/* ===============================
   ELEMENTS
================================ */
const availableCoursesBody = getEl("availableCoursesBody");
const registeredCoursesBody = getEl("registeredCoursesBody");

const searchCourse = getEl("searchCourse");
const departmentFilter = getEl("departmentFilter");
const semesterFilter = getEl("semesterFilter");

const totalAvailable = getEl("totalAvailable");
const totalRegistered = getEl("totalRegistered");
const totalCredits = getEl("totalCredits");
const registeredCreditsText = getEl("registeredCreditsText");

/* ===============================
   SAFE EVENT BINDING
================================ */
function safeClick(id, fn) {
    const el = getEl(id);
    if (el) el.addEventListener("click", fn);
}

/* ===============================
   DATA FUNCTIONS
================================ */
function getCourses() {
    return JSON.parse(localStorage.getItem(COURSES_KEY)) || [];
}

function getRegisteredIds() {
    return JSON.parse(localStorage.getItem(REGISTERED_KEY)) || [];
}

function saveRegisteredIds(ids) {
    localStorage.setItem(REGISTERED_KEY, JSON.stringify(ids));
}

/* ===============================
   FILTER
================================ */
function getFilteredCourses() {
    const courses = getCourses();

    const search = searchCourse?.value.toLowerCase() || "";
    const dept = departmentFilter?.value || "all";
    const sem = semesterFilter?.value || "all";

    return courses.filter(c =>
        (c.code.toLowerCase().includes(search) ||
         c.title.toLowerCase().includes(search)) &&
        (dept === "all" || c.department === dept) &&
        (sem === "all" || c.semester === sem)
    );
}

/* ===============================
   RENDER AVAILABLE
================================ */
function renderAvailableCourses() {
    if (!availableCoursesBody) return;

    const courses = getFilteredCourses();
    const registeredIds = getRegisteredIds();

    const available = courses.filter(c => !registeredIds.includes(c.id));

    availableCoursesBody.innerHTML = "";

    if (!available.length) {
        availableCoursesBody.innerHTML =
            `<tr><td colspan="7">No available courses</td></tr>`;
        return;
    }

    available.forEach((course, i) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${i + 1}</td>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.level}</td>
            <td>${course.cu}</td>
            <td>
                <button class="small-btn view-btn">View</button>
                <button class="small-btn orange reg-btn">Register</button>
            </td>
        `;

        const checkbox = row.querySelector("input");
        checkbox.addEventListener("change", e => {
            if (e.target.checked) {
                selectedAvailableCourseIds.add(course.id);
            } else {
                selectedAvailableCourseIds.delete(course.id);
            }
        });

        row.querySelector(".view-btn")
            .addEventListener("click", () => openCourseModal(course.id));

        row.querySelector(".reg-btn")
            .addEventListener("click", () => registerCourse(course.id));

        availableCoursesBody.appendChild(row);
    });
}

/* ===============================
   RENDER REGISTERED
================================ */
function renderRegisteredCourses() {
    if (!registeredCoursesBody) return;

    const courses = getCourses();
    const registeredIds = getRegisteredIds();

    const registered = courses.filter(c => registeredIds.includes(c.id));

    registeredCoursesBody.innerHTML = "";

    registered.forEach((course, i) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${i + 1}</td>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.status}</td>
            <td>${course.level}</td>
            <td>${course.cu}</td>
        `;

        const checkbox = row.querySelector("input");
        checkbox.addEventListener("change", e => {
            if (e.target.checked) {
                selectedRegisteredCourseIds.add(course.id);
            } else {
                selectedRegisteredCourseIds.delete(course.id);
            }
        });

        registeredCoursesBody.appendChild(row);
    });

    updateStats();
}

/* ===============================
   REGISTER
================================ */
function registerCourse(id) {
    let ids = getRegisteredIds();

    if (!ids.includes(id)) {
        ids.push(id);
        saveRegisteredIds(ids);
        renderAll();
    }
}

function registerSelectedCourses() {
    let ids = getRegisteredIds();

    selectedAvailableCourseIds.forEach(id => {
        if (!ids.includes(id)) ids.push(id);
    });

    saveRegisteredIds(ids);
    selectedAvailableCourseIds.clear();
    renderAll();
}

/* ===============================
   DEREGISTER
================================ */
function deregisterSelectedCourses() {
    let ids = getRegisteredIds();

    ids = ids.filter(id => !selectedRegisteredCourseIds.has(id));

    saveRegisteredIds(ids);
    selectedRegisteredCourseIds.clear();
    renderAll();
}

/* ===============================
   MODAL
================================ */
function openCourseModal(id) {
    const course = getCourses().find(c => c.id === id);
    if (!course) return;

    currentModalCourseId = id;

    getEl("modalCourseTitle").textContent = course.title;
    getEl("modalCode").textContent = course.code;

    getEl("courseModal")?.classList.remove("hidden");
}

function closeCourseModal() {
    getEl("courseModal")?.classList.add("hidden");
}

/* ===============================
   STATS
================================ */
function updateStats() {
    const courses = getCourses();
    const ids = getRegisteredIds();

    const registered = courses.filter(c => ids.includes(c.id));

    totalAvailable && (totalAvailable.textContent = courses.length);
    totalRegistered && (totalRegistered.textContent = registered.length);

    const credits = registered.reduce((s, c) => s + c.cu, 0);

    totalCredits && (totalCredits.textContent = credits);
    registeredCreditsText && (registeredCreditsText.textContent = credits + " CU");
}

/* ===============================
   MAIN RENDER
================================ */
function renderAll() {
    renderAvailableCourses();
    renderRegisteredCourses();
}

/* ===============================
   BUTTON CONNECTIONS (FIXED)
================================ */
safeClick("registerSelectedBtn", registerSelectedCourses);
safeClick("deregisterSelectedBtn", deregisterSelectedCourses);
safeClick("refreshCourses", renderAll);
safeClick("refreshRegisteredBtn", renderAll);
safeClick("resetFilters", () => {
    if (searchCourse) searchCourse.value = "";
    renderAll();
});

/* ===============================
   TOP BAR BUTTONS (FIXED)
================================ */
safeClick("paymentBtn", () => {
    const ref = "REF-" + Math.floor(Math.random() * 1000000);
    alert("Payment Ref: " + ref);
});

safeClick("whatsappBtn", () => {
    window.open("https://wa.me/256700000000", "_blank");
});

safeClick("helpBtn", () => {
    alert("Support: support@muni.ac.ug");
});

safeClick("powerBtn", () => {
    if (confirm("Logout?")) location.href = "index.html";
});

/* ===============================
   INIT
================================ */
renderAll();const availableCourses = [
    { code: "CSC101", title: "Intro to Programming", cu: 3 },
    { code: "MAT101", title: "Calculus I", cu: 4 }
];

let registeredCourses = [];

/* RENDER AVAILABLE */
function renderAvailable() {
    const body = document.getElementById("availableCoursesBody");
    body.innerHTML = "";

    availableCourses.forEach((course, index) => {
        body.innerHTML += `
        <tr>
            <td><input type="checkbox" data-index="${index}"></td>
            <td>${index + 1}</td>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.cu}</td>
            <td><button onclick="viewCourse(${index})">View</button></td>
        </tr>`;
    });
}

/* RENDER REGISTERED */
function renderRegistered() {
    const body = document.getElementById("registeredCoursesBody");
    body.innerHTML = "";

    registeredCourses.forEach((course, index) => {
        body.innerHTML += `
        <tr>
            <td><input type="checkbox" data-index="${index}"></td>
            <td>${index + 1}</td>
            <td>${course.code}</td>
            <td>${course.title}</td>
            <td>${course.cu}</td>
        </tr>`;
    });

    document.getElementById("registeredCreditsText").innerText =
        registeredCourses.reduce((sum, c) => sum + c.cu, 0);
}

/* REGISTER */
document.getElementById("registerSelectedBtn").onclick = () => {
    const checkboxes = document.querySelectorAll("#availableCoursesBody input:checked");

    checkboxes.forEach(cb => {
        const course = availableCourses[cb.dataset.index];
        registeredCourses.push(course);
    });

    renderRegistered();
};

/* REMOVE */
document.getElementById("deregisterSelectedBtn").onclick = () => {
    const checkboxes = document.querySelectorAll("#registeredCoursesBody input:checked");

    const indexes = [...checkboxes].map(cb => cb.dataset.index);

    registeredCourses = registeredCourses.filter((_, i) => !indexes.includes(i.toString()));

    renderRegistered();
};

/* MODAL */
function viewCourse(index) {
    const course = availableCourses[index];

    document.getElementById("modalCode").innerText = course.code;
    document.getElementById("modalCourseTitle").innerText = course.title;
    document.getElementById("modalCU").innerText = course.cu;

    document.getElementById("courseModal").classList.remove("hidden");
}

document.getElementById("closeModal").onclick = () => {
    document.getElementById("courseModal").classList.add("hidden");
};

document.getElementById("modalCloseBtn").onclick = () => {
    document.getElementById("courseModal").classList.add("hidden");
};

/* INIT */
renderAvailable();
renderRegistered();