// ========================================
// RESULT MANAGEMENT SYSTEM
// ========================================

let results = JSON.parse(localStorage.getItem("results")) || [];

// ========================================
// DOM ELEMENTS
// ========================================

const resultForm = document.getElementById("resultForm");
const tableBody = document.getElementById("resultsTableBody");

const totalStudents = document.getElementById("totalStudents");
const submittedResults = document.getElementById("submittedResults");
const publishedResults = document.getElementById("publishedResults");
const pendingApproval = document.getElementById("pendingApproval");
const averageGPA = document.getElementById("averageGPA");

const semesterGPA = document.getElementById("semesterGPA");
const cgpa = document.getElementById("cgpa");
const standing = document.getElementById("standing");

// ========================================
// GRADE CALCULATOR
// ========================================

function calculateGrade(mark){

    if(mark >= 80){
        return {grade:"A", point:5};
    }

    if(mark >= 75){
        return {grade:"B+", point:4.5};
    }

    if(mark >= 70){
        return {grade:"B", point:4};
    }

    if(mark >= 65){
        return {grade:"C+", point:3.5};
    }

    if(mark >= 60){
        return {grade:"C", point:3};
    }

    if(mark >= 50){
        return {grade:"D", point:2};
    }

    return {grade:"F", point:0};
}

// ========================================
// ADD RESULT
// ========================================

resultForm.addEventListener("submit", function(e){

    e.preventDefault();

    const inputs = resultForm.querySelectorAll("input");

    const regNo = inputs[0].value;
    const studentName = inputs[1].value;
    const courseCode = inputs[2].value;
    const courseTitle = inputs[3].value;
    const creditUnits = Number(inputs[4].value);
    const marks = Number(inputs[5].value);

    const gradeInfo = calculateGrade(marks);

    const grade = gradeInfo.grade;
    const gradePoint = gradeInfo.point;

    const gpa = (
        (creditUnits * gradePoint) /
        creditUnits
    ).toFixed(2);

    const status = marks >= 50
        ? "PASS"
        : "FAIL";

    const result = {

        id: Date.now(),

        regNo,
        studentName,
        courseCode,
        courseTitle,
        creditUnits,
        marks,
        grade,
        gradePoint,
        gpa,
        status

    };

    results.push(result);

    saveData();

    renderResults();

    resultForm.reset();

});


// ========================================
// SAVE TO STORAGE
// ========================================

function saveData(){

    localStorage.setItem(
        "results",
        JSON.stringify(results)
    );

}

// ========================================
// DELETE RESULT
// ========================================

function deleteResult(id){

    results = results.filter(
        result => result.id !== id
    );

    saveData();

    renderResults();

}

// ========================================
// RENDER RESULTS
// ========================================

function renderResults(){

    tableBody.innerHTML = "";

    results.forEach(result=>{

        let badge =
            result.status === "PASS"
            ? "status-pass"
            : "status-fail";

        tableBody.innerHTML += `

        <tr>

            <td>${result.regNo}</td>

            <td>${result.studentName}</td>

            <td>${result.courseCode}</td>

            <td>${result.marks}</td>

            <td>${result.grade}</td>

            <td>${result.creditUnits}</td>

            <td>${result.gradePoint}</td>

            <td>${result.gpa}</td>

            <td>
                <span class="${badge}">
                    ${result.status}
                </span>
            </td>

            <td>

                <button
                onclick="deleteResult(${result.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateStatistics();

}

// ========================================
// DASHBOARD STATISTICS
// ========================================

function updateStatistics(){

    totalStudents.textContent =
    new Set(
        results.map(r => r.regNo)
    ).size;

    submittedResults.textContent =
    results.length;

    publishedResults.textContent =
    results.length;

    pendingApproval.textContent = 0;

    calculateOverallGPA();

}

// ========================================
// GPA CALCULATION
// ========================================

function calculateOverallGPA(){

    if(results.length === 0){

        semesterGPA.textContent = "0.00";
        cgpa.textContent = "0.00";
        averageGPA.textContent = "0.00";

        return;
    }

    let total = 0;

    results.forEach(result=>{

        total += parseFloat(result.gpa);

    });

    const average =
    (total / results.length)
    .toFixed(2);

    semesterGPA.textContent =
    average;

    cgpa.textContent =
    average;

    averageGPA.textContent =
    average;

    if(average >= 4.5){

        standing.textContent =
        "Excellent";

    }

    else if(average >= 3.5){

        standing.textContent =
        "Good Standing";

    }

    else if(average >= 2.5){

        standing.textContent =
        "Probation";

    }

    else{

        standing.textContent =
        "At Risk";

    }

}

// ========================================
// SEARCH STUDENT
// ========================================

const searchInput =
document.querySelector(
".filter-section input"
);

searchInput.addEventListener(
"keyup",
function(){

    const value =
    this.value.toLowerCase();

    const rows =
    document.querySelectorAll(
    "#resultsTableBody tr"
    );

    rows.forEach(row=>{

        const text =
        row.innerText.toLowerCase();

        row.style.display =
        text.includes(value)
        ? ""
        : "none";

    });

});

// ========================================
// APPROVAL WORKFLOW
// ========================================

function approveResult(){

    alert(
    "Result Approved Successfully"
    );

}

function rejectResult(){

    alert(
    "Result Rejected"
    );

}

// ========================================
// TRANSCRIPT GENERATOR
// ========================================

function generateTranscript(){

    window.print();

}

// ========================================
// EXPORT RESULTS
// ========================================

function exportResults(){

    let data =
    JSON.stringify(results,null,2);

    let blob =
    new Blob([data],
    {type:"application/json"});

    let link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "student-results.json";

    link.click();

}

// ========================================
// PUBLISH RESULTS
// ========================================

function publishResults(){

    alert(
    "Results Published Successfully"
    );

}

// ========================================
// LOAD SYSTEM
// ========================================

renderResults();

// ========================================
// BUTTON CONNECTIONS
// ========================================

document
.querySelectorAll(".top-actions button")[0]
.addEventListener(
"click",
exportResults
);

document
.querySelectorAll(".top-actions button")[1]
.addEventListener(
"click",
publishResults
);

// =====================================
// RESULT LOCK STATUS
// =====================================

let resultLocked = false;

// =====================================
// AUDIT LOG
// =====================================

let auditLogs =
JSON.parse(
localStorage.getItem("auditLogs")
) || [];

function logActivity(activity){

    auditLogs.push({

        date:new Date().toLocaleString(),
        user:"Administrator",
        activity

    });

    localStorage.setItem(
        "auditLogs",
        JSON.stringify(auditLogs)
    );

    renderAuditLogs();
}

function renderAuditLogs(){

    const body =
    document.getElementById(
    "auditLogBody"
    );

    if(!body) return;

    body.innerHTML="";

    auditLogs.forEach(log=>{

        body.innerHTML += `

        <tr>

            <td>${log.date}</td>
            <td>${log.user}</td>
            <td>${log.activity}</td>

        </tr>

        `;

    });

}

// =====================================
// GRADE ANALYTICS
// =====================================

function updateGradeAnalytics(){

    let a=0,b=0,c=0,d=0,f=0;

    results.forEach(result=>{

        if(result.grade==="A") a++;

        else if(
        result.grade==="B" ||
        result.grade==="B+"
        ) b++;

        else if(
        result.grade==="C" ||
        result.grade==="C+"
        ) c++;

        else if(
        result.grade==="D"
        ) d++;

        else f++;

    });

    document.getElementById("gradeA").textContent=a;
    document.getElementById("gradeB").textContent=b;
    document.getElementById("gradeC").textContent=c;
    document.getElementById("gradeD").textContent=d;
    document.getElementById("gradeF").textContent=f;

}

// =====================================
// PUBLISH RESULTS
// =====================================

document
.getElementById("publishBtn")
?.addEventListener("click",()=>{

    logActivity(
    "Published Results"
    );

    alert(
    "Results Published Successfully"
    );

});

// =====================================
// UNPUBLISH RESULTS
// =====================================

document
.getElementById("unpublishBtn")
?.addEventListener("click",()=>{

    logActivity(
    "Unpublished Results"
    );

    alert(
    "Results Unpublished"
    );

});

// =====================================
// LOCK RESULTS
// =====================================

document
.getElementById("lockBtn")
?.addEventListener("click",()=>{

    resultLocked=true;

    logActivity(
    "Locked Result Entry"
    );

    alert(
    "Result Entry Locked"
    );

});

// =====================================
// UNLOCK RESULTS
// =====================================

document
.getElementById("unlockBtn")
?.addEventListener("click",()=>{

    resultLocked=false;

    logActivity(
    "Unlocked Result Entry"
    );

    alert(
    "Result Entry Unlocked"
    );

});

// =====================================
// OVERRIDE SUBMIT
// =====================================

resultForm.addEventListener(
"submit",
function(e){

    if(resultLocked){

        e.preventDefault();

        alert(
        "Result Entry Locked"
        );

        return;
    }

});

// =====================================
// UPDATE SYSTEM
// =====================================

updateGradeAnalytics();
renderAuditLogs();

document
.getElementById("generateTranscriptBtn")
.addEventListener("click", generateTranscript);

function generateTranscript(){

    if(results.length === 0){

        alert("No Results Available");

        return;
    }

    let transcript = `
    <html>
    <head>
    <title>Student Transcript</title>

    <style>

    body{
        font-family:Arial;
        padding:30px;
    }

    table{
        width:100%;
        border-collapse:collapse;
    }

    th,td{
        border:1px solid #000;
        padding:10px;
    }

    h1{
        text-align:center;
    }

    </style>

    </head>

    <body>

    <h1>ACADEMIC TRANSCRIPT</h1>

    <table>

    <tr>
        <th>Reg No</th>
        <th>Name</th>
        <th>Course</th>
        <th>Marks</th>
        <th>Grade</th>
        <th>GPA</th>
    </tr>
    `;

    results.forEach(result=>{

        transcript += `

        <tr>

        <td>${result.regNo}</td>
        <td>${result.studentName}</td>
        <td>${result.courseCode}</td>
        <td>${result.marks}</td>
        <td>${result.grade}</td>
        <td>${result.gpa}</td>

        </tr>

        `;

    });

    transcript += `
    </table>
    </body>
    </html>
    `;

    const newWindow = window.open();

    newWindow.document.write(transcript);

    newWindow.document.close();

    newWindow.print();

}

document
.getElementById("downloadPDF")
.addEventListener("click", downloadPDF);

function downloadPDF(){

    if(results.length === 0){

        alert("No Results Found");

        return;
    }

    let content =
    JSON.stringify(results,null,2);

    const blob =
    new Blob([content],{
        type:"application/pdf"
    });

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "student_results.pdf";

    link.click();

}

async function downloadPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text(
        "Student Results Report",
        20,
        20
    );

    let y = 40;

    studentResults.forEach(result => {

    tbody.innerHTML += `

    <tr>

        <td>${result.courseCode}</td>
        <td>${result.courseTitle}</td>
        <td>${result.creditUnits}</td>
        <td>${result.marks}</td>
        <td>${result.grade}</td>
        <td>${result.gradePoint}</td>

    </tr>

    `;

});

    doc.save(
    "StudentResults.pdf"
    );

}

