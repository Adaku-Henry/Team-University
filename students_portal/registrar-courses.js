const COURSES_KEY = "university_courses";

const courseForm = document.getElementById("courseForm");
const registrarCoursesBody = document.getElementById("registrarCoursesBody");
const clearAllCourses = document.getElementById("clearAllCourses");

const courseId = document.getElementById("courseId");
const courseCode = document.getElementById("courseCode");
const courseTitle = document.getElementById("courseTitle");
const department = document.getElementById("department");
const lecturer = document.getElementById("lecturer");
const level = document.getElementById("level");
const cu = document.getElementById("cu");
const semester = document.getElementById("semester");
const status = document.getElementById("status");
const timetable = document.getElementById("timetable");
const prerequisite = document.getElementById("prerequisite");
const description = document.getElementById("description");

function getCourses() {
    return JSON.parse(localStorage.getItem(COURSES_KEY)) || [];
}

function saveCourses(courses) {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}

function renderRegistrarCourses() {
    const courses = getCourses();

    registrarCoursesBody.innerHTML = "";

    if (courses.length === 0) {
        registrarCoursesBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; color:#005f85;">
                    No courses added yet.
                </td>
            </tr>
        `;
        return;
    }

    courses.forEach((course, index) => {
        registrarCoursesBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${course.code}</td>
                <td>${course.title}</td>
                <td>${course.department}</td>
                <td>${course.level}</td>
                <td>${course.semester}</td>
                <td>${course.cu}</td>
                <td>
                    <button class="small-btn"
                    onclick="editCourse('${course.id}')">
                        Edit
                    </button>

                    <button class="small-btn orange"
                    onclick="deleteCourse('${course.id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

courseForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let courses = getCourses();

    const newCourse = {
        id: courseId.value || crypto.randomUUID(),
        code: courseCode.value.trim().toUpperCase(),
        title: courseTitle.value.trim().toUpperCase(),
        department: department.value.trim(),
        lecturer: lecturer.value.trim(),
        level: level.value.trim().toLowerCase(),
        cu: Number(cu.value),
        semester: semester.value.trim(),
        status: status.value.trim().toLowerCase(),
        timetable: timetable.value.trim(),
        prerequisite: prerequisite.value.trim() || "None",
        description: description.value.trim() || "No description provided."
    };

    const duplicateCode = courses.find(course =>
        course.code === newCourse.code && course.id !== newCourse.id
    );

    if (duplicateCode) {
        alert("A course with this code already exists.");
        return;
    }

    if (courseId.value) {
        courses = courses.map(course =>
            course.id === courseId.value ? newCourse : course
        );

        alert("Course updated successfully.");
    } else {
        courses.push(newCourse);

        alert("Course added successfully. It will now appear in the student portal.");
    }

    saveCourses(courses);

    courseForm.reset();
    courseId.value = "";

    renderRegistrarCourses();
});

function editCourse(id) {
    const course = getCourses().find(course => course.id === id);

    if (!course) return;

    courseId.value = course.id;
    courseCode.value = course.code;
    courseTitle.value = course.title;
    department.value = course.department;
    lecturer.value = course.lecturer;
    level.value = course.level;
    cu.value = course.cu;
    semester.value = course.semester;
    status.value = course.status;
    timetable.value = course.timetable;
    prerequisite.value = course.prerequisite;
    description.value = course.description;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteCourse(id) {
    if (!confirm("Are you sure you want to delete this course?")) {
        return;
    }

    let courses = getCourses();

    courses = courses.filter(course => course.id !== id);

    saveCourses(courses);

    renderRegistrarCourses();

    alert("Course deleted successfully.");
}

clearAllCourses.addEventListener("click", function() {
    if (!confirm("This will delete all courses. Continue?")) {
        return;
    }

    localStorage.removeItem(COURSES_KEY);

    renderRegistrarCourses();

    alert("All courses cleared.");
});

renderRegistrarCourses();