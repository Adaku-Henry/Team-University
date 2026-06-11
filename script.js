// MOBILE MENU TOGGLE

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// CLOSE MENU AFTER CLICKING LINK

document.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// STICKY NAVBAR EFFECT

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if(window.scrollY > 100){

        header.style.boxShadow =
        "0 4px 15px rgba(0,0,0,0.15)";

    }
    else{

        header.style.boxShadow =
        "0 2px 10px rgba(0,0,0,0.1)";
    }

});


// SMOOTH SCROLLING

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// ANIMATED COUNTERS

const counters =
document.querySelectorAll(".stat h2");

const speed = 200;

counters.forEach(counter => {

    const updateCounter = () => {

        const target =
        +counter.innerText.replace("+","");

        const current =
        +counter.innerText.replace("+","");

        const increment =
        target / speed;

        if(current < target){

            counter.innerText =
            Math.ceil(current + increment) + "+";

            setTimeout(updateCounter,20);

        }
        else{

            counter.innerText =
            target + "+";

        }

    };

    updateCounter();

});


// SCROLL REVEAL ANIMATION

const revealElements =
document.querySelectorAll(
".program-card, .feature, .news-card, .testimonial"
);

function revealOnScroll(){

    revealElements.forEach(item => {

        const position =
        item.getBoundingClientRect().top;

        const windowHeight =
        window.innerHeight;

        if(position < windowHeight - 100){

            item.style.opacity = "1";

            item.style.transform =
            "translateY(0px)";
        }

    });

}

revealElements.forEach(item => {

    item.style.opacity = "0";

    item.style.transform =
    "translateY(60px)";

    item.style.transition =
    "all 0.8s ease";

});

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();


// SEARCH BOX FUNCTIONALITY

const searchInput =
document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener(
"keyup",
function(){

console.log(
"Searching:",
this.value
);

});

}


// BACK TO TOP BUTTON

const topButton =
document.createElement("button");

topButton.innerHTML =
'<i class="fa fa-arrow-up"></i>';

topButton.classList.add(
"back-to-top"
);

document.body.appendChild(
topButton
);

window.addEventListener(
"scroll",
() => {

if(window.scrollY > 400){

topButton.style.display =
"block";

}
else{

topButton.style.display =
"none";

}

});

topButton.addEventListener(
"click",
() => {

window.scrollTo({

top:0,

behavior:"smooth"

});

});


// ACTIVE NAVIGATION LINKS

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener(
"scroll",
() => {

let current = "";

sections.forEach(section => {

const sectionTop =
section.offsetTop;

if(window.scrollY >=
sectionTop - 200){

current =
section.getAttribute("id");

}

});

navItems.forEach(link => {

link.classList.remove(
"active-link"
);

if(

link.getAttribute("href")
=== "#" + current

){

link.classList.add(
"active-link"
);

}

});

});


// LOADING EFFECT

window.addEventListener(
"load",
() => {

document.body.style.opacity =
"1";

});




// =====================================
// ABOUT SECTION INTERACTIONS
// =====================================


// REVEAL ABOUT ELEMENTS ON SCROLL

const aboutElements = document.querySelectorAll(

    ".about-intro, .history-section, .vision-box, .mission-box, .value-card, .leader-card, .achievement, .objectives, .about-cta"
    
    );
    
    function revealAboutSections(){
    
    aboutElements.forEach((element)=>{
    
    const position =
    element.getBoundingClientRect().top;
    
    const screenPosition =
    window.innerHeight - 120;
    
    if(position < screenPosition){
    
    element.style.opacity = "1";
    
    element.style.transform =
    "translateY(0px)";
    
    }
    
    });
    
    }
    
    aboutElements.forEach((element)=>{
    
    element.style.opacity = "0";
    
    element.style.transform =
    "translateY(60px)";
    
    element.style.transition =
    "all 0.8s ease";
    
    });
    
    window.addEventListener(
    
    "scroll",
    
    revealAboutSections
    
    );
    
    revealAboutSections();
    
    
    
    // ACHIEVEMENT COUNTERS
    
    const achievementCounters =
    
    document.querySelectorAll(
    
    ".achievement h2"
    
    );
    
    const observer = new IntersectionObserver(
    
    (entries)=>{
    
    entries.forEach(entry=>{
    
    if(entry.isIntersecting){
    
    const counter =
    
    entry.target;
    
    const target = parseInt(
    
    counter.innerText.replace("+","")
    
    );
    
    let count = 0;
    
    const increment =
    
    target / 100;
    
    const updateCounter = ()=>{
    
    if(count < target){
    
    count += increment;
    
    counter.innerText =
    
    Math.ceil(count) + "+";
    
    requestAnimationFrame(
    
    updateCounter
    
    );
    
    }
    else{
    
    counter.innerText =
    
    target + "+";
    
    }
    
    };
    
    updateCounter();
    
    observer.unobserve(counter);
    
    }
    
    });
    
    },
    
    {
    
    threshold:0.5
    
    }
    
    );
    
    achievementCounters.forEach(counter=>{
    
    observer.observe(counter);
    
    });
    
    
    
    // VALUE CARD HOVER EFFECT
    
    const valueCards =
    
    document.querySelectorAll(
    
    ".value-card"
    
    );
    
    valueCards.forEach(card=>{
    
    card.addEventListener(
    
    "mouseenter",
    
    ()=>{
    
    card.style.transform =
    
    "translateY(-12px) scale(1.03)";
    
    });
    
    card.addEventListener(
    
    "mouseleave",
    
    ()=>{
    
    card.style.transform =
    
    "translateY(0px) scale(1)";
    
    });
    
    });
    
    
    
    // LEADERSHIP IMAGE ZOOM
    
    const leaders =
    
    document.querySelectorAll(
    
    ".leader-card img"
    
    );
    
    leaders.forEach(img=>{
    
    img.addEventListener(
    
    "mouseenter",
    
    ()=>{
    
    img.style.transform =
    
    "scale(1.08)";
    
    img.style.transition =
    
    ".4s";
    
    });
    
    img.addEventListener(
    
    "mouseleave",
    
    ()=>{
    
    img.style.transform =
    
    "scale(1)";
    
    });
    
    });
    
    
    
    // CTA BUTTON ANIMATION
    
    const ctaButton =
    
    document.querySelector(
    
    ".about-cta a"
    
    );
    
    if(ctaButton){
    
    setInterval(()=>{
    
    ctaButton.classList.toggle(
    
    "pulse"
    
    );
    
    },1500);
    
    }
    
    
    
    // OBJECTIVES FADE EFFECT
    
    const objectiveItems =
    
    document.querySelectorAll(
    
    ".objectives li"
    
    );
    
    objectiveItems.forEach(
    
    (item,index)=>{
    
    item.style.opacity = "0";
    
    item.style.transition =
    
    ".6s";
    
    item.style.transitionDelay =
    
    `${index * 0.2}s`;
    
    });
    
    function showObjectives(){
    
    objectiveItems.forEach(item=>{
    
    const top =
    
    item.getBoundingClientRect().top;
    
    if(top < window.innerHeight - 80){
    
    item.style.opacity = "1";
    
    item.style.transform =
    
    "translateX(0px)";
    
    }
    
    });
    
    }
    
    objectiveItems.forEach(item=>{
    
    item.style.transform =
    
    "translateX(-40px)";
    
    });
    
    window.addEventListener(
    
    "scroll",
    
    showObjectives
    
    );
    
    showObjectives();
    
    
    
    // HISTORY SECTION HIGHLIGHT
    
    const historySection =
    
    document.querySelector(
    
    ".history-section"
    
    );
    
    if(historySection){
    
    window.addEventListener(
    
    "scroll",
    
    ()=>{
    
    const pos =
    
    historySection.getBoundingClientRect().top;
    
    if(pos < 300){
    
    historySection.style.borderLeft =
    
    "8px solid #ffb703";
    
    }
    
    });
    
    }
    
    
    
    // SIMPLE PARALLAX EFFECT
    
    window.addEventListener(
    
    "scroll",
    
    ()=>{
    
    const aboutImage =
    
    document.querySelector(
    
    ".about-image img"
    
    );
    
    if(aboutImage){
    
    const scrollValue =
    
    window.scrollY;
    
    aboutImage.style.transform =
    
    `translateY(${scrollValue * 0.05}px)`;
    
    }
    
    });
    
    
    
    // SECTION LOAD ANIMATION
    
    window.addEventListener(
    
    "load",
    
    ()=>{
    
    const aboutPage =
    
    document.querySelector(
    
    ".about-page"
    
    );
    
    if(aboutPage){
    
    aboutPage.style.opacity = "1";
    
    aboutPage.style.transition =
    
    "1s";
    
    }
    
    });
    


// ===========================
// ACADEMICS PAGE SCROLL ANIMATION
// ===========================

const academicElements = document.querySelectorAll(

    ".school-card, .program-item, .teach-card, .departments li, .elearning, .cta"
    
    );
    

    const admissionElements = document.querySelectorAll(
        ".admission-intro, .req-card, .fee-row, .step"
        );
        
        admissionElements.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(60px)";
            el.style.transition = "all 0.8s ease";
        });
        
        function revealAdmissions(){
            admissionElements.forEach(el => {
                const top = el.getBoundingClientRect().top;
                if(top < window.innerHeight - 100){
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }
            });
        }
        
        window.addEventListener("scroll", revealAdmissions);
        revealAdmissions();

    
    // INITIAL STATE (hidden)
    
    academicElements.forEach(el => {
    
    el.style.opacity = "0";
    
    el.style.transform = "translateY(60px)";
    
    el.style.transition = "all 0.8s ease";
    
    });
    
    
    // SCROLL FUNCTION
    
    function revealAcademics(){
    
    academicElements.forEach(el => {
    
    const elementTop = el.getBoundingClientRect().top;
    
    const windowHeight = window.innerHeight;
    
    if(elementTop < windowHeight - 100){
    
    el.style.opacity = "1";
    
    el.style.transform = "translateY(0)";
    
    }
    
    });
    
    }
    
    
    // RUN ON SCROLL
    
    window.addEventListener("scroll", revealAcademics);
    
    
    // RUN ON LOAD
    
    window.addEventListener("load", revealAcademics);

    
    // SIDEBAR NAVIGATION
function showSection(sectionId){

    document.querySelectorAll(".portal-section")
    .forEach(sec => sec.classList.remove("active"));

    document.getElementById(sectionId)
    .classList.add("active");

    document.querySelectorAll(".sidebar-menu li")
    .forEach(li => li.classList.remove("active"));

    event.target.classList.add("active");
}

// ENROLL COURSE SYSTEM
function enroll(course){

let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

if(!enrolled.includes(course)){
enrolled.push(course);
localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
alert("Enrolled in " + course);
updateEnrolledList();
}else{
alert("Already enrolled in " + course);
}

}

// VIEW MATERIALS
function openCourse(course){
alert("Opening materials for: " + course);
window.location.href = "#";
}

// UPDATE ENROLLED LIST
function updateEnrolledList(){

let list = document.getElementById("enrolledList");
let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

list.innerHTML = "";

if(enrolled.length === 0){
list.innerHTML = "<li>No courses enrolled yet</li>";
return;
}

enrolled.forEach(c => {
let li = document.createElement("li");
li.innerText = c;
list.appendChild(li);
});

}

// LOAD ON PAGE OPEN
window.addEventListener("load", updateEnrolledList);

// LOAD SUBMISSIONS
function loadSubmissions(){

let list = document.getElementById("submissionList");
let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

list.innerHTML = "";

if(submissions.length === 0){
list.innerHTML = "<li>No submissions yet</li>";
return;
}

submissions.forEach(sub => {

let li = document.createElement("li");

li.innerHTML = `
<b>${sub.title}</b> - ${sub.status}
`;

list.appendChild(li);

});

}

// SUBMIT ASSIGNMENT
function submitAssignment(title,fileId){

let fileInput = document.getElementById(fileId);

if(fileInput.files.length === 0){
alert("Please select a file before submitting");
return;
}

let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

submissions.push({
title:title,
status:"Submitted",
file:fileInput.files[0].name
});

localStorage.setItem("submissions", JSON.stringify(submissions));

alert("Assignment submitted successfully!");

loadSubmissions();

}

// VIEW FEEDBACK (SIMULATED)
function viewFeedback(title){

alert(
"Feedback for " + title + ":\n\nGood work. Improve referencing and formatting."
);

}

// LOAD ON START
window.addEventListener("load", loadSubmissions);

// ===========================
// RESULTS PAGE LOGIC
// ===========================

// Load Results (simulate semester switching)
function loadResults() {

    const semester =
        document.getElementById("semesterSelect").value;

    const resultsBody =
        document.getElementById("resultsBody");

    console.log("Loading:", semester);

    // Simple demo switch (you can later connect database)
    if (semester === "Semester 2") {

        resultsBody.innerHTML = `
        <tr>
            <td>BIT201</td>
            <td>Advanced Programming</td>
            <td>80</td>
            <td>A</td>
            <td>Excellent</td>
        </tr>
        <tr>
            <td>BIT202</td>
            <td>Database Systems</td>
            <td>75</td>
            <td>B+</td>
            <td>Very Good</td>
        </tr>
        <tr>
            <td>BIT203</td>
            <td>Operating Systems</td>
            <td>70</td>
            <td>B</td>
            <td>Good</td>
        </tr>
        `;

        document.getElementById("gpaValue").innerText = "3.70";

    } else {

        location.reload(); // reset to semester 1 demo

    }
}


// DOWNLOAD TRANSCRIPT (mock)
function downloadTranscript() {

    alert("Generating transcript... Download will start shortly.");

    // later you can connect PDF generator (jsPDF or backend)
}

// ===========================
// FEES MODULE
// ===========================

// Generate payment reference
function generateRef() {

    const amount =
        document.getElementById("amount").value;

    if (!amount) {
        alert("Enter amount first");
        return;
    }

    const ref =
        "TU-" + Math.floor(Math.random() * 100000000);

    document.getElementById("refCode").innerText =
        ref + " (UGX " + amount + ")";

}

// Simulate payment
function makePayment() {

    const ref =
        document.getElementById("refCode").innerText;

    if (ref === "No reference generated") {
        alert("Generate payment reference first");
        return;
    }

    alert("Payment Successful via selected method!");

    // update balance (demo logic)
    const balance = document.getElementById("balance");

    let current =
        parseInt(balance.innerText.replace(/[^0-9]/g, ""));

    let newBalance = current - 100000;

    balance.innerText = "UGX " + newBalance;
}

// Download receipt
function downloadReceipt() {

    alert("Downloading receipt...");

}

// =========================
// LMS SECTION SWITCHING
// =========================

function showSection(id){

    const sections = document.querySelectorAll(".portal-section");

    sections.forEach(sec => {
        sec.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

// =========================
// DEFAULT LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {
    showSection("dashboard");
});

/* =========================
   GLOBAL LMS SCRIPT
========================= */

let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

/* =========================
   ENROLL COURSE SYSTEM
========================= */

function enrollCourse(code, name, credits, type) {

    enrolledCourses.push({
        code,
        name,
        credits,
        type
    });

    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));

    alert(`${name} enrolled successfully as ${type}`);

    renderEnrolledCourses();
}

/* =========================
   RENDER ENROLLED COURSES
========================= */

function renderEnrolledCourses() {

    const table = document.getElementById("enrolledTable");

    if (!table) return;

    table.innerHTML = "";

    enrolledCourses.forEach((c, index) => {

        table.innerHTML += `
            <tr>
                <td>${c.code}</td>
                <td>${c.name}</td>
                <td>${c.credits}</td>
                <td>${c.type}</td>
                <td>Lecturer TBD</td>
                <td class="good">Active</td>
                <td><button onclick="removeCourse(${index})">Remove</button></td>
            </tr>
        `;
    });

    updateSummary();
}

/* =========================
   REMOVE COURSE
========================= */

function removeCourse(index) {

    enrolledCourses.splice(index, 1);

    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));

    renderEnrolledCourses();
}

/* =========================
   UPDATE SUMMARY
========================= */

function updateSummary() {

    let total = enrolledCourses.length;

    let credits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);

    const totalCourses = document.getElementById("totalCourses");
    const totalCredits = document.getElementById("totalCredits");

    if (totalCourses) totalCourses.innerText = total;
    if (totalCredits) totalCredits.innerText = credits;
}

/* =========================
   INITIAL LOAD
========================= */

document.addEventListener("DOMContentLoaded", function () {
    renderEnrolledCourses();
});

/* =========================
   PLACEHOLDER FUNCTIONS
========================= */

function submitRegistration() {
    alert("Registration submitted successfully!");
}

function saveDraft() {
    alert("Draft saved!");
}

function printSlip() {
    window.print();
}

function downloadTranscript() {
    alert("Transcript downloading...");
}

function pay(method) {
    alert(`Payment initiated via ${method}`);
}

function downloadReceipt(id) {
    alert(`Downloading receipt ${id}`);
}