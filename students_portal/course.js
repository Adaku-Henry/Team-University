console.log("Course Management Loaded");

/* =====================================
COURSE DATABASE
===================================== */

let availableCourses = [

{
code:"BIT321",
name:"Web Development",
lecturer:"Dr. Sarah N.",
credits:4,
department:"Computer Science",
semester:"Semester 1",
status:"NORMAL",
prerequisite:"BIT221",
timetable:"Mon 08:00 - 10:00",
attendance:"87%",
cat:28,
exam:56,
description:"Modern Web Development using HTML, CSS, JavaScript and frameworks."
},

{
code:"BIT322",
name:"Database Systems",
lecturer:"Mr. John K.",
credits:4,
department:"Computer Science",
semester:"Semester 1",
status:"RETAKE",
prerequisite:"BIT121",
timetable:"Tue 10:00 - 12:00",
attendance:"91%",
cat:24,
exam:60,
description:"Database design, SQL, normalization and administration."
},

{
code:"BIT323",
name:"Networking",
lecturer:"Dr. Alice M.",
credits:3,
department:"Information Technology",
semester:"Semester 2",
status:"NORMAL",
prerequisite:"BIT122",
timetable:"Wed 08:00 - 11:00",
attendance:"78%",
cat:22,
exam:52,
description:"Computer networks, routing and switching."
},

{
code:"BIT324",
name:"Software Engineering",
lecturer:"Dr. Peter O.",
credits:4,
department:"Software Engineering",
semester:"Semester 2",
status:"SUPPLEMENTARY",
prerequisite:"BIT223",
timetable:"Thu 14:00 - 16:00",
attendance:"80%",
cat:18,
exam:45,
description:"Software lifecycle, testing and project management."
}

];

/* =====================================
ENROLLED COURSES
===================================== */

let enrolledCourses =
JSON.parse(
localStorage.getItem("enrolledCourses")
) || [];

/* =====================================
CURRENT COURSE
===================================== */

let currentCourse = null;
/* =====================================
INITIALIZATION
===================================== */

window.onload = () => {

renderAvailableCourses();
renderEnrolledCourses();
updateStatistics();
populateFilters();

};

/* =====================================
FILTER DROPDOWNS
===================================== */

function populateFilters(){

let deptFilter =
document.getElementById("departmentFilter");

let semesterFilter =
document.getElementById("semesterFilter");

let departments =
[...new Set(
availableCourses.map(c=>c.department)
)];

departments.forEach(dept=>{

let option =
document.createElement("option");

option.value = dept;
option.textContent = dept;

deptFilter.appendChild(option);

});

let semesters =
[...new Set(
availableCourses.map(c=>c.semester)
)];

semesters.forEach(sem=>{

let option =
document.createElement("option");

option.value = sem;
option.textContent = sem;

semesterFilter.appendChild(option);

});

}

/* =====================================
RENDER AVAILABLE COURSES
===================================== */

function renderAvailableCourses(
courses = availableCourses
){

let container =
document.getElementById("availableCourses");

container.innerHTML = "";

courses.forEach(course=>{

let card =
document.createElement("div");

card.className = "course-card";

card.innerHTML = `

<div class="course-header">

<div>
<div class="course-title">
${course.code} - ${course.name}
</div>

<div class="course-meta">
Lecturer: ${course.lecturer}<br>
${course.credits} CU |
${course.department} |
${course.semester}
</div>

</div>

<span class="status-badge ${getStatusClass(course.status)}">
${course.status}
</span>

</div>

<div class="course-actions">

<button
class="view-btn"
onclick="viewCourse('${course.code}')">

View Details

</button>

<button
class="enroll-btn"
onclick="enrollCourse('${course.code}')">

Enroll

</button>

</div>

`;

container.appendChild(card);

});

document.getElementById(
"availableCount"
).innerText = courses.length;

}

/* =====================================
RENDER ENROLLED COURSES
===================================== */

function renderEnrolledCourses(){

let container =
document.getElementById("enrolledCourses");

container.innerHTML = "";

enrolledCourses.forEach(course=>{

let card =
document.createElement("div");

card.className = "course-card";

card.innerHTML = `

<div class="course-header">

<div>

<div class="course-title">
${course.code} - ${course.name}
</div>

<div class="course-meta">
${course.credits} CU
</div>

</div>

<span class="status-badge ${getStatusClass(course.status)}">
${course.status}
</span>

</div>

<div class="course-actions">

<button onclick="viewCourse('${course.code}')">
View
</button>

<button onclick="viewMaterials('${course.code}')">
Materials
</button>

<button onclick="viewAttendance('${course.code}')">
Attendance
</button>

<button onclick="viewMarks('${course.code}')">
Marks
</button>

<button
class="remove-btn"
onclick="removeCourse('${course.code}')">

Remove

</button>

</div>

`;

container.appendChild(card);

});

document.getElementById(
"enrolledCount"
).innerText =
enrolledCourses.length;

}
/* =====================================
ENROLL COURSE
===================================== */
function enrollCourse(code){

let course =
availableCourses.find(
c => c.code === code
);

if(!course) return;

if(
!validateEnrollment(course)
){
return;
}

enrolledCourses.push(course);

localStorage.setItem(
"enrolledCourses",
JSON.stringify(enrolledCourses)
);

renderEnrolledCourses();

updateStatistics();

alert(
course.name +
" enrolled successfully."
);

}

/* =====================================
REMOVE COURSE
===================================== */

function removeCourse(code){

if(
!confirm(
"Remove this course?"
)
) return;

enrolledCourses =
enrolledCourses.filter(
c => c.code !== code
);

localStorage.setItem(
"enrolledCourses",
JSON.stringify(enrolledCourses)
);

renderEnrolledCourses();
updateStatistics();

}
/* =====================================
SEARCH
===================================== */

document
.getElementById("searchCourse")
.addEventListener(
"keyup",
function(){

let value =
this.value.toLowerCase();

let filtered =
availableCourses.filter(course =>

course.code
.toLowerCase()
.includes(value)

||

course.name
.toLowerCase()
.includes(value)

);

renderAvailableCourses(filtered);

}
);

/* =====================================
FILTERS
===================================== */

document
.getElementById("departmentFilter")
.addEventListener(
"change",
applyFilters
);

document
.getElementById("semesterFilter")
.addEventListener(
"change",
applyFilters
);

function applyFilters(){

let dept =
document.getElementById(
"departmentFilter"
).value;

let sem =
document.getElementById(
"semesterFilter"
).value;

let filtered =
availableCourses.filter(course => {

let deptMatch =
dept === "all"
||
course.department === dept;

let semMatch =
sem === "all"
||
course.semester === sem;

return deptMatch && semMatch;

});

renderAvailableCourses(filtered);

}

/* =====================================
STATISTICS
===================================== */

function updateStatistics(){

document.getElementById(
"totalAvailable"
).innerText =
availableCourses.length;

document.getElementById(
"totalEnrolled"
).innerText =
enrolledCourses.length;

let credits =
enrolledCourses.reduce(
(sum, course)=>
sum + course.credits,
0
);

document.getElementById(
"totalCredits"
).innerText =
credits;

document.getElementById(
"enrolledCredits"
).innerText =
credits + " CU";

document.getElementById(
"completedCourses"
).innerText =
10;

}

/* =====================================
STATUS BADGES
===================================== */

function getStatusClass(status){

switch(status){

case "NORMAL":
return "normal";

case "RETAKE":
return "retake";

case "MISSING PAPER":
return "missing";

case "SUPPLEMENTARY":
return "supplementary";

default:
return "normal";

}

}

/* =====================================
MODAL VIEW
===================================== */

function viewCourse(code){

let course =
availableCourses.find(
c => c.code === code
)
||
enrolledCourses.find(
c => c.code === code
);

if(!course) return;

currentCourse = course;

document.getElementById(
"modalCourseTitle"
).innerText =
course.code + " - " + course.name;

document.getElementById(
"modalCode"
).innerText =
course.code;

document.getElementById(
"modalLecturer"
).innerText =
course.lecturer;

document.getElementById(
"modalDepartment"
).innerText =
course.department;

document.getElementById(
"modalCredits"
).innerText =
course.credits;

document.getElementById(
"modalSemester"
).innerText =
course.semester;

document.getElementById(
"modalPrerequisite"
).innerText =
course.prerequisite;

document.getElementById(
"modalTimetable"
).innerText =
course.timetable;

document.getElementById(
"modalDescription"
).innerText =
course.description;

document.getElementById(
"modalStatus"
).innerText =
course.status;

document.getElementById(
"courseModal"
).classList.remove("hidden");

}

/* =====================================
MODAL CONTROLS
===================================== */

document
.getElementById("closeModal")
.addEventListener(
"click",
closeModal
);

document
.getElementById("closeDetails")
.addEventListener(
"click",
closeModal
);

function closeModal(){

document
.getElementById("courseModal")
.classList.add("hidden");

}

/* Close when clicking outside */

window.onclick = function(event){

let modal =
document.getElementById("courseModal");

if(event.target === modal){

modal.classList.add("hidden");

}

};

/* =====================================
COURSE MATERIALS
===================================== */

function viewMaterials(code){

let course =
enrolledCourses.find(
c => c.code === code
);

if(!course) return;

alert(

`COURSE MATERIALS

Course:
${course.code}

${course.name}

Available Materials

• Lecture Notes

• Assignments

• Tutorials

• Lab Manuals

• Past Papers

• Course Outline

Download module will be connected later.`

);

}
/* =====================================
ATTENDANCE SYSTEM
===================================== */

function viewAttendance(code){

let course =
enrolledCourses.find(
c => c.code === code
);

if(!course) return;

let attendance =
parseInt(course.attendance);

let status =
attendance >= 80
?
"GOOD STANDING"
:
"LOW ATTENDANCE";

alert(

`ATTENDANCE REPORT

Course:
${course.name}

Attendance:
${course.attendance}

Status:
${status}

Minimum Required:
80%`

);

}

/* =====================================
MARKS SYSTEM
===================================== */

function viewMarks(code){

let course =
enrolledCourses.find(
c => c.code === code
);

if(!course) return;

let total =
course.cat + course.exam;

let grade = "";

if(total >= 80){

grade = "A";

}
else if(total >= 75){

grade = "B+";

}
else if(total >= 70){

grade = "B";

}
else if(total >= 65){

grade = "C+";

}
else if(total >= 60){

grade = "C";

}
else if(total >= 50){

grade = "D";

}
else{

grade = "F";

}

alert(

`ACADEMIC PERFORMANCE

Course:
${course.name}

CAT:
${course.cat}/30

Exam:
${course.exam}/70

Final Mark:
${total}/100

Grade:
${grade}`

);

}

/* =====================================
LECTURER PROFILE
===================================== */

function viewLecturer(code){

let course =
availableCourses.find(
c => c.code === code
);

if(!course) return;

alert(

`LECTURER PROFILE

Name:
${course.lecturer}

Department:
${course.department}

Course:
${course.name}

Email:
${course.lecturer
.toLowerCase()
.replace(/\s+/g,"")}
@university.ac.ug

Office:
Faculty Building

Consultation:
Monday - Friday`

);

}

/* =====================================
REGISTRATION RULE ENGINE
===================================== */

const MAX_CREDITS = 24;

/* Simulated Student Record */

let studentRecord = {

completedCourses:[
"BIT121",
"BIT221"
],

cgpa:3.4,

feesCleared:true

};

/* =====================================
VALIDATE REGISTRATION
===================================== */

function validateEnrollment(course){

/* FEES CHECK */

if(!studentRecord.feesCleared){

alert(
"Registration blocked. Fees not cleared."
);

return false;

}

/* CREDIT LIMIT */

let currentCredits =
enrolledCourses.reduce(
(sum,c)=>
sum + c.credits,
0
);

if(
currentCredits + course.credits
>
MAX_CREDITS
){

alert(
"Maximum credit load exceeded."
);

return false;

}

/* DUPLICATE CHECK */

let exists =
enrolledCourses.some(
c => c.code === course.code
);

if(exists){

alert(
"Course already enrolled."
);

return false;

}

/* PREREQUISITE CHECK */

if(
course.prerequisite &&
!studentRecord.completedCourses.includes(
course.prerequisite
)
){

alert(

`Missing prerequisite:

${course.prerequisite}

for

${course.code}`

);

return false;

}

/* GPA CHECK */

if(studentRecord.cgpa < 2.0){

alert(
"CGPA too low for registration."
);

return false;

}

return true;

}

