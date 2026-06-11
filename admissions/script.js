// js/application.js

let currentStep = 1;
const totalSteps = 8; // update if more steps added

function showStep(step){

document.querySelectorAll(".form-step")
.forEach(s => s.classList.remove("active"));

document.getElementById("step" + step)
.classList.add("active");

currentStep = step;

updateProgress();
}

function nextStep(){

if(currentStep === 1){

if(!validateStep1()) return;

}

if(currentStep === 2){

if(!validateStep2()) return;

}

if(currentStep === 3){

if(!validateStep3()) return;

}

if(currentStep === 4){

if(!validateStep4()) return;

}

if(currentStep === 5){

if(!validateStep5()) return;

}

if(currentStep === 6){

if(!validateStep6()) return;

}

if(currentStep === 7){

if(!validateStep7()) return;

}
function updateProgress(){

let percent = (currentStep / totalSteps) * 100;

document.getElementById("progressBar")
.style.width = percent + "%";

document.getElementById("currentStep")
.innerText = currentStep;

}
// MOVE FORWARD
if(currentStep < totalSteps){
currentStep++;
showStep(currentStep);
}
}


    window.onload = function(){

    // Load Personal Information
    let personalInfo = JSON.parse(
        localStorage.getItem("personalInfo")
    );

    if(personalInfo){

        document.getElementById("surname").value =
        personalInfo.surname || "";

        document.getElementById("firstname").value =
        personalInfo.firstname || "";

        document.getElementById("othernames").value =
        personalInfo.othernames || "";

        document.getElementById("gender").value =
        personalInfo.gender || "";

        document.getElementById("dob").value =
        personalInfo.dob || "";

        document.getElementById("nationality").value =
        personalInfo.nationality || "";

        document.getElementById("nin").value =
        personalInfo.nin || "";
    }


    // Load Contact Information
    let contactInfo = JSON.parse(
        localStorage.getItem("contactInformation")
    );

    if(contactInfo){

        document.getElementById("email").value =
        contactInfo.email || "";

        document.getElementById("phone").value =
        contactInfo.phone || "";

        document.getElementById("altPhone").value =
        contactInfo.altPhone || "";

        document.getElementById("country").value =
        contactInfo.country || "";

        document.getElementById("address").value =
        contactInfo.address || "";

        document.getElementById("district").value =
        contactInfo.district || "";

        document.getElementById("kinName").value =
        contactInfo.kinName || "";

        document.getElementById("relationship").value =
        contactInfo.relationship || "";

        document.getElementById("kinPhone").value =
        contactInfo.kinPhone || "";

        document.getElementById("kinEmail").value =
        contactInfo.kinEmail || "";
    }
    loadProgrammes();
populateProgrammeOptions();

};

function nextStep(){

const applicationType =
document.getElementById("applicationType");

const intake =
document.getElementById("intake");

const studyMode =
document.getElementById("studyMode");

if(applicationType.value === ""){
alert("Select Application Type");
return;
}

if(intake.value === ""){
alert("Select Intake");
return;
}

if(studyMode.value === ""){
alert("Select Study Mode");
return;
}

alert(
"Step 1 Completed Successfully"
);
}
function showStep(step){

document
.querySelectorAll(".form-step")
.forEach(section => {

section.classList.remove("active");

});

document
.getElementById("step"+step)
.classList.add("active");

document
.getElementById("currentStep")
.innerText = step;

updateProgress();
}
function updateProgress(){

let percentage =
(stepPercentage());

document
.getElementById("progressBar")
.style.width = percentage + "%";
}

function stepPercentage(){

return (currentStep/totalSteps)*100;
}
function previousStep(){

if(currentStep > 1){

currentStep--;

showStep(currentStep);

}
}
function nextStep(){

let applicationType =
document.getElementById("applicationType");

let intake =
document.getElementById("intake");

let studyMode =
document.getElementById("studyMode");

if(applicationType.value === ""){

alert("Select Application Type");

return;
}

if(intake.value === ""){

alert("Select Intake");

return;
}

if(studyMode.value === ""){

alert("Select Study Mode");

return;
}

currentStep = 2;

showStep(currentStep);
}
function validateStep2(){

clearErrors();

let valid = true;

let surname =
document.getElementById("surname");

let firstname =
document.getElementById("firstname");

let gender =
document.getElementById("gender");

let dob =
document.getElementById("dob");

let nationality =
document.getElementById("nationality");

let nin =
document.getElementById("nin");

let photo =
document.getElementById("passportPhoto");

if(surname.value.trim() === ""){

showError(
"surnameError",
"Enter surname"
);

valid = false;
}

if(firstname.value.trim() === ""){

showError(
"firstnameError",
"Enter first name"
);

valid = false;
}

if(gender.value === ""){

showError(
"genderError",
"Select gender"
);

valid = false;
}

if(dob.value === ""){

showError(
"dobError",
"Select date of birth"
);

valid = false;
}

if(nationality.value === ""){

showError(
"nationalityError",
"Select nationality"
);

valid = false;
}

if(nin.value.trim() === ""){

showError(
"ninError",
"Enter NIN or Passport Number"
);

valid = false;
}

if(photo.files.length === 0){

showError(
"photoError",
"Upload passport photo"
);

valid = false;
}

if(!valid) return;

currentStep = 3;

showStep(currentStep);
}
function showError(id,message){

document.getElementById(id)
.innerText = message;
}

function clearErrors(){

document
.querySelectorAll(".error")
.forEach(error => {

error.innerText = "";

});
}
document
.getElementById("passportPhoto")
.addEventListener("change",function(){

let file = this.files[0];

if(!file) return;

let maxSize =
2 * 1024 * 1024;

if(file.size > maxSize){

alert(
"Passport photo must be less than 2MB"
);

this.value = "";
}

});

setInterval(() => {

let personalData = {

surname:
document.getElementById("surname")?.value,

firstname:
document.getElementById("firstname")?.value,

othernames:
document.getElementById("othernames")?.value,

gender:
document.getElementById("gender")?.value,

dob:
document.getElementById("dob")?.value,

nationality:
document.getElementById("nationality")?.value,

nin:
document.getElementById("nin")?.value

};

localStorage.setItem(
"personalInfo",
JSON.stringify(personalData)
);

},3000);

function validateStep3(){

clearErrors();

let valid = true;

const email =
document.getElementById("email");

const phone =
document.getElementById("phone");

const country =
document.getElementById("country");

const address =
document.getElementById("address");

const district =
document.getElementById("district");

const kinName =
document.getElementById("kinName");

const relationship =
document.getElementById("relationship");

const kinPhone =
document.getElementById("kinPhone");


// EMAIL VALIDATION

let emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email.value.trim() === ""){

showError(
"emailError",
"Email address is required"
);

valid = false;

}
else if(!emailPattern.test(email.value)){

showError(
"emailError",
"Invalid email address"
);

valid = false;
}


// PHONE VALIDATION

let phonePattern =
/^[0-9]{10,15}$/;

if(phone.value.trim() === ""){

showError(
"phoneError",
"Phone number required"
);

valid = false;

}
else if(!phonePattern.test(phone.value)){

showError(
"phoneError",
"Invalid phone number"
);

valid = false;
}


// COUNTRY

if(country.value === ""){

showError(
"countryError",
"Select country"
);

valid = false;
}


// ADDRESS

if(address.value.trim() === ""){

showError(
"addressError",
"Address required"
);

valid = false;
}


// DISTRICT

if(district.value.trim() === ""){

showError(
"districtError",
"District required"
);

valid = false;
}


// NEXT OF KIN NAME

if(kinName.value.trim() === ""){

showError(
"kinNameError",
"Next of kin required"
);

valid = false;
}


// RELATIONSHIP

if(relationship.value === ""){

showError(
"relationshipError",
"Relationship required"
);

valid = false;
}


// NEXT OF KIN PHONE

if(kinPhone.value.trim() === ""){

showError(
"kinPhoneError",
"Phone number required"
);

valid = false;

}
else if(!phonePattern.test(kinPhone.value)){

showError(
"kinPhoneError",
"Invalid phone number"
);

valid = false;
}

if(!valid) return;

currentStep = 4;

showStep(currentStep);

}

setInterval(() => {

let contactData = {

email:
document.getElementById("email")?.value,

phone:
document.getElementById("phone")?.value,

altPhone:
document.getElementById("altPhone")?.value,

country:
document.getElementById("country")?.value,

address:
document.getElementById("address")?.value,

district:
document.getElementById("district")?.value,

kinName:
document.getElementById("kinName")?.value,

relationship:
document.getElementById("relationship")?.value,

kinPhone:
document.getElementById("kinPhone")?.value,

kinEmail:
document.getElementById("kinEmail")?.value

};

localStorage.setItem(
"contactInformation",
JSON.stringify(contactData)
);

},3000);

const programmes = [

{
name:"Bachelor of Information Technology",
faculty:"computing",
duration:"3 Years"
},

{
name:"Bachelor of Computer Science",
faculty:"computing",
duration:"3 Years"
},

{
name:"Bachelor of Software Engineering",
faculty:"computing",
duration:"4 Years"
},

{
name:"Bachelor of Cyber Security",
faculty:"computing",
duration:"3 Years"
},

{
name:"Bachelor of Business Administration",
faculty:"business",
duration:"3 Years"
},

{
name:"Bachelor of Accounting and Finance",
faculty:"business",
duration:"3 Years"
},

{
name:"Bachelor of Public Administration",
faculty:"business",
duration:"3 Years"
},

{
name:"Bachelor of Education Arts",
faculty:"education",
duration:"3 Years"
},

{
name:"Bachelor of Nursing Science",
faculty:"health",
duration:"4 Years"
},

{
name:"Master of Public Administration and Management",
faculty:"graduate",
duration:"2 Years"
}

];

function loadProgrammes(){

let container =
document.getElementById(
"programmeContainer"
);

container.innerHTML="";

programmes.forEach(programme => {

container.innerHTML += `

<div class="programme-card">

<h3>${programme.name}</h3>

<p>
Duration:
${programme.duration}
</p>

<p>
Faculty:
${programme.faculty}
</p>

</div>

`;

});

}

function populateProgrammeOptions(){

let first =
document.getElementById(
"firstChoice"
);

let second =
document.getElementById(
"secondChoice"
);

programmes.forEach(programme => {

first.innerHTML +=
`<option>${programme.name}</option>`;

second.innerHTML +=
`<option>${programme.name}</option>`;

});

}
function validateStep4(){

clearErrors();

let first =
document.getElementById(
"firstChoice"
);

let second =
document.getElementById(
"secondChoice"
);

let valid=true;

if(first.value===""){

showError(
"firstChoiceError",
"Select first choice"
);

valid=false;
}

if(second.value===""){

showError(
"secondChoiceError",
"Select second choice"
);

valid=false;
}

if(first.value===second.value){

showError(
"secondChoiceError",
"Second choice must be different"
);

valid=false;
}

if(!valid) return;

currentStep=5;

showStep(currentStep);
}
setInterval(()=>{

localStorage.setItem(

"programmeSelection",

JSON.stringify({

firstChoice:
document.getElementById(
"firstChoice"
)?.value,

secondChoice:
document.getElementById(
"secondChoice"
)?.value

})

);

},3000);

function addSubject(){

let container =
document.getElementById(
"subjectContainer"
);

let row =
document.createElement("div");

row.classList.add("subject-row");

row.innerHTML = `

<input
type="text"
placeholder="Subject Name">

<select>

<option value="">
Grade
</option>

<option>D1</option>
<option>D2</option>
<option>C3</option>
<option>C4</option>
<option>C5</option>
<option>C6</option>
<option>P7</option>
<option>P8</option>
<option>F9</option>

</select>

`;

container.appendChild(row);
}

function validateStep5(){

clearErrors();

let valid = true;

if(
document.getElementById("uceSchool")
.value.trim() === ""
){

showError(
"uceSchoolError",
"School required"
);

valid = false;
}

if(
document.getElementById("uceIndex")
.value.trim() === ""
){

showError(
"uceIndexError",
"Index number required"
);

valid = false;
}

if(
document.getElementById("uceCertificate")
.files.length === 0
){

showError(
"uceCertificateError",
"Upload certificate"
);

valid = false;
}

if(!valid) return;

currentStep = 6;

showStep(currentStep);
}

setInterval(() => {

let academicData = {

uceSchool:
document.getElementById("uceSchool")?.value,

uceIndex:
document.getElementById("uceIndex")?.value,

uceYear:
document.getElementById("uceYear")?.value,

uaceSchool:
document.getElementById("uaceSchool")?.value,

uaceIndex:
document.getElementById("uaceIndex")?.value

};

localStorage.setItem(
"academicQualifications",
JSON.stringify(academicData)
);

},3000);

function validateFile(file){

if(!file) return false;

const maxSize = 5 * 1024 * 1024; // 5MB

if(file.size > maxSize){
alert("File must be less than 5MB");
return false;
}

return true;
}
function validateStep6(){

clearErrors();

let valid = true;

// REQUIRED FILES

let passport = document.getElementById("docPassport").files[0];
let nin = document.getElementById("docNIN").files[0];
let birth = document.getElementById("docBirth").files[0];
let olevel = document.getElementById("docOlevel").files[0];

// VALIDATION CHECKS

if(!passport){
showError("docPassportError","Passport photo required");
valid = false;
} else if(!validateFile(passport)){
valid = false;
}

if(!nin){
showError("docNINError","National ID required");
valid = false;
} else if(!validateFile(nin)){
valid = false;
}

if(!birth){
showError("docBirthError","Birth certificate required");
valid = false;
} else if(!validateFile(birth)){
valid = false;
}

if(!olevel){
showError("docOlevelError","O-Level certificate required");
valid = false;
} else if(!validateFile(olevel)){
valid = false;
}

if(!valid) return;

currentStep = 7;
showStep(currentStep);
}

setInterval(() => {

let docs = {

passport: document.getElementById("docPassport")?.value,
nin: document.getElementById("docNIN")?.value,
birth: document.getElementById("docBirth")?.value,
olevel: document.getElementById("docOlevel")?.value,
alevel: document.getElementById("docAlevel")?.value,
diploma: document.getElementById("docDiploma")?.value,
degree: document.getElementById("docDegree")?.value

};

localStorage.setItem("supportingDocs", JSON.stringify(docs));

},3000);

function countWords(){

let text = document.getElementById("sop").value.trim();

let words = text.length ? text.split(/\s+/).length : 0;

document.getElementById("wordCounter").innerText =
words + " words";

}
function validateStep7(){

clearErrors();

let valid = true;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10,15}$/;

// REFEREE 1

let ref1Name = document.getElementById("ref1Name");
let ref1Email = document.getElementById("ref1Email");
let ref1Phone = document.getElementById("ref1Phone");

// REFEREE 2

let ref2Name = document.getElementById("ref2Name");
let ref2Email = document.getElementById("ref2Email");
let ref2Phone = document.getElementById("ref2Phone");

// SOP

let sop = document.getElementById("sop");

// VALIDATION

if(ref1Name.value.trim() === ""){
showError("ref1NameError","Required");
valid = false;
}

if(!emailPattern.test(ref1Email.value)){
showError("ref1EmailError","Valid email required");
valid = false;
}

if(!phonePattern.test(ref1Phone.value)){
showError("ref1PhoneError","Valid phone required");
valid = false;
}

if(ref2Name.value.trim() === ""){
showError("ref2NameError","Required");
valid = false;
}

if(!emailPattern.test(ref2Email.value)){
showError("ref2EmailError","Valid email required");
valid = false;
}

if(!phonePattern.test(ref2Phone.value)){
showError("ref2PhoneError","Valid phone required");
valid = false;
}

// SOP RULES

let wordCount = sop.value.trim().split(/\s+/).length;

if(wordCount < 200){
showError("sopError","Minimum 200 words required");
valid = false;
}

if(wordCount > 1000){
showError("sopError","Maximum 1000 words allowed");
valid = false;
}

if(!valid) return;

currentStep = 8;
showStep(currentStep);
}

setInterval(() => {

let refereeData = {

ref1Name: document.getElementById("ref1Name")?.value,
ref1Email: document.getElementById("ref1Email")?.value,
ref1Phone: document.getElementById("ref1Phone")?.value,
ref1Org: document.getElementById("ref1Org")?.value,

ref2Name: document.getElementById("ref2Name")?.value,
ref2Email: document.getElementById("ref2Email")?.value,
ref2Phone: document.getElementById("ref2Phone")?.value,
ref2Org: document.getElementById("ref2Org")?.value,

sop: document.getElementById("sop")?.value

};

localStorage.setItem(
"refereeData",
JSON.stringify(refereeData)
);

},3000);

function buildReview(){

// PERSONAL

document.getElementById("reviewPersonal").innerHTML = `
<p><b>Name:</b> ${document.getElementById("surname").value}
${document.getElementById("firstname").value}</p>

<p><b>Gender:</b> ${document.getElementById("gender").value}</p>
<p><b>DOB:</b> ${document.getElementById("dob").value}</p>
<p><b>Nationality:</b> ${document.getElementById("nationality").value}</p>
`;

// CONTACT

document.getElementById("reviewContact").innerHTML = `
<p><b>Email:</b> ${document.getElementById("email").value}</p>
<p><b>Phone:</b> ${document.getElementById("phone").value}</p>
<p><b>Country:</b> ${document.getElementById("country").value}</p>
`;

// PROGRAMME

document.getElementById("reviewProgramme").innerHTML = `
<p><b>First Choice:</b> ${document.getElementById("firstChoice").value}</p>
<p><b>Second Choice:</b> ${document.getElementById("secondChoice").value}</p>
`;

// SOP

document.getElementById("reviewReferees").innerHTML = `
<p><b>Referee 1:</b> ${document.getElementById("ref1Name").value}</p>
<p><b>Referee 2:</b> ${document.getElementById("ref2Name").value}</p>
<p><b>Statement:</b> Submitted ✔</p>
`;

}

function validateStep8(){

clearErrors();

let valid = true;

// CHECK DECLARATION

if(!document.getElementById("declaration").checked){

showError("declarationError",
"You must accept declaration");

valid = false;
}

// PAYMENT METHOD

if(document.getElementById("paymentMethod").value === ""){

showError("paymentError",
"Select payment method");

valid = false;
}

// PHONE

if(document.getElementById("paymentPhone").value === ""){

alert("Enter payment phone number");
valid = false;
}

if(!valid) return;

// GENERATE APPLICATION ID

let appId =
"ADM-" + Math.floor(100000 + Math.random()*900000);

// STORE

localStorage.setItem("applicationId", appId);

// SHOW SUCCESS

alert(
"Application Submitted Successfully!\nYour ID: " + appId
);

// LOCK FORM

document.querySelectorAll("input, select, textarea")
.forEach(el => el.disabled = true);

}

setInterval(() => {

let finalData = {

declaration:
document.getElementById("declaration")?.checked,

paymentMethod:
document.getElementById("paymentMethod")?.value,

paymentPhone:
document.getElementById("paymentPhone")?.value

};

localStorage.setItem(
"finalApplication",
JSON.stringify(finalData)
);

},3000);

function loadStep8(){

buildReview();

let saved =
JSON.parse(localStorage.getItem("finalApplication"));

if(saved){

document.getElementById("paymentMethod").value =
saved.paymentMethod || "";

document.getElementById("paymentPhone").value =
saved.paymentPhone || "";

document.getElementById("declaration").checked =
saved.declaration || false;

}

}
function showStep(step){

document.querySelectorAll(".form-step")
.forEach(s => s.classList.remove("active"));

document.getElementById("step"+step)
.classList.add("active");

currentStep = step;

// WHEN STEP 8 OPENS
if(step === 8){
loadStep8();
}

updateProgress();
}

function submitApplication() {

    // Generate Application ID
    let appId = "ADM-" + Math.floor(100000 + Math.random() * 900000);

    document.getElementById("applicationID").innerText = appId;

    // Build summary (you can expand this)
    let summary = `
        <p><b>Name:</b> ${document.getElementById("surname").value || ''} ${document.getElementById("firstname").value || ''}</p>
        <p><b>Email:</b> ${document.getElementById("email").value || ''}</p>
        <p><b>Phone:</b> ${document.getElementById("phone").value || ''}</p>
        <p><b>Program:</b> ${document.getElementById("firstChoice")?.value || ''}</p>
    `;

    document.getElementById("finalSummary").innerHTML = summary;

    // Move to step 9
    showStep(9);
}

function printApplication() {
    window.print();
}

function downloadPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let name = document.getElementById("surname").value + " " +
               document.getElementById("firstname").value;

    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let program = document.getElementById("firstChoice").value;
    let appId = document.getElementById("applicationID").innerText;

    doc.setFont("helvetica", "bold");
    doc.text("UNIVERSITY APPLICATION FORM", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.text("Application ID: " + appId, 20, 40);
    doc.text("Name: " + name, 20, 50);
    doc.text("Email: " + email, 20, 60);
    doc.text("Phone: " + phone, 20, 70);
    doc.text("Program: " + program, 20, 80);

    doc.text("Status: SUBMITTED", 20, 100);

    doc.save("University_Application.pdf");
}