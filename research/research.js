/* =========================
   DATA STORAGE (SIMULATION DB)
========================= */
let likes = {};
let saved = {};

/* =========================
   MODAL HANDLERS
========================= */
function openResearch(title, dept, status, author, content) {
    document.getElementById("researchTitle").innerText = title;
    document.getElementById("researchDept").innerText = dept;
    document.getElementById("researchStatus").innerText = status;
    document.getElementById("researchAuthor").innerText = author;
    document.getElementById("researchDate").innerText = new Date().toLocaleDateString();
    document.getElementById("researchBody").innerText = content;

    document.getElementById("researchModal").style.display = "flex";
}

function closeResearch() {
    document.getElementById("researchModal").style.display = "none";
}

/* =========================
   PUBLICATION VIEW
========================= */
function openPublication(id) {
    alert("Opening full publication: " + id);
}

/* =========================
   STAFF PROFILE VIEW
========================= */
function openStaff(id) {
    alert("Opening staff profile: " + id);
}

/* =========================
   LIKE SYSTEM
========================= */
function likePost(id) {
    if (!likes[id]) likes[id] = 0;
    likes[id]++;
    alert("Likes: " + likes[id]);
}

/* =========================
   SAVE SYSTEM
========================= */
function savePost(id) {
    saved[id] = true;
    alert("Saved successfully!");
}

/* =========================
   SEARCH SYSTEM
========================= */
function searchResearch() {
    let input = document.querySelector(".filter-box input").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "block" : "none";
    });
}

/* =========================
   TAG FILTER SYSTEM
========================= */
document.querySelectorAll(".tag-filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        let tag = btn.innerText.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let text = card.innerText.toLowerCase();
            card.style.display = (tag === "all" || text.includes(tag)) ? "block" : "none";
        });
    });
});

/* =========================
   FORM SUBMISSION (SIMULATED)
========================= */
document.querySelector(".research-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Research submitted successfully (frontend simulation)");
    this.reset();
});

/* =========================
   NOTIFICATION CLICK
========================= */
document.querySelectorAll(".notification").forEach(note => {
    note.addEventListener("click", () => {
        note.style.background = "#e3f2fd";
        alert("Notification opened");
    });
});

/* =========================
   HERO BUTTONS
========================= */
document.querySelectorAll(".hero-buttons button")[0].addEventListener("click", () => {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".hero-buttons button")[1].addEventListener("click", () => {
    document.getElementById("submit").scrollIntoView({ behavior: "smooth" });
});