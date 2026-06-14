// =========================
// MOBILE NAVIGATION
// =========================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuToggle.textContent = navMenu.classList.contains("show") ? "×" : "☰";
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.textContent = "☰";
    });
});

// =========================
// DARK MODE
// =========================
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("benchmark-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("benchmark-theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("benchmark-theme", "light");
    }
});

// =========================
// ACTIVE NAV LINK ON SCROLL
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// =========================
// ANIMATED COUNTERS
// =========================
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let count = 0;
        const increment = Math.ceil(target / 80);

        const updateCounter = () => {
            count += increment;

            if (count >= target) {
                counter.textContent = target + "+";
            } else {
                counter.textContent = count;
                requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    });
}

window.addEventListener("scroll", () => {
    const overview = document.getElementById("overview");

    if (!overview) return;

    const overviewPosition = overview.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (overviewPosition < screenHeight - 120 && !counterStarted) {
        animateCounters();
        counterStarted = true;
    }
});

// =========================
// SEARCH AND FILTER SYSTEM
// =========================
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const statusFilter = document.getElementById("statusFilter");
const resetFilters = document.getElementById("resetFilters");
const projectCards = document.querySelectorAll(".research-card");
const tagButtons = document.querySelectorAll(".tag-btn");
const emptyMessage = document.getElementById("emptyMessage");

let activeTag = "all";

function filterProjects() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const departmentValue = departmentFilter.value;
    const statusValue = statusFilter.value;

    let visibleCount = 0;

    projectCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const department = card.dataset.department;
        const status = card.dataset.status;
        const tags = card.dataset.tags;

        const matchesSearch =
            title.includes(searchValue) ||
            department.toLowerCase().includes(searchValue) ||
            tags.toLowerCase().includes(searchValue);

        const matchesDepartment =
            departmentValue === "all" || department === departmentValue;

        const matchesStatus =
            statusValue === "all" || status === statusValue;

        const matchesTag =
            activeTag === "all" || tags.includes(activeTag);

        if (matchesSearch && matchesDepartment && matchesStatus && matchesTag) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterProjects);
departmentFilter.addEventListener("change", filterProjects);
statusFilter.addEventListener("change", filterProjects);

tagButtons.forEach(button => {
    button.addEventListener("click", () => {
        tagButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        activeTag = button.dataset.tag;
        filterProjects();
    });
});

resetFilters.addEventListener("click", () => {
    searchInput.value = "";
    departmentFilter.value = "all";
    statusFilter.value = "all";
    activeTag = "all";

    tagButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector('.tag-btn[data-tag="all"]').classList.add("active");

    filterProjects();
});

// =========================
// MODAL SYSTEM
// =========================
const modal = document.getElementById("infoModal");
const modalClose = document.getElementById("modalClose");
const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function openModal(label, title, body) {
    modalLabel.textContent = label;
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// =========================
// PROJECT DETAILS MODAL
// =========================
document.querySelectorAll(".view-project").forEach(button => {
    button.addEventListener("click", event => {
        const card = event.target.closest(".research-card");

        const title = card.dataset.title;
        const department = card.dataset.department;
        const status = card.dataset.status;
        const tags = card.dataset.tags;

        const body = `
            <p><strong>Department:</strong> ${department}</p>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Research Tags:</strong> ${tags}</p>
            <hr style="margin: 18px 0; border: none; border-top: 1px solid var(--border);">
            <p>
                This research project is part of Benchmark Business and Technical College's
                applied research initiative. It focuses on solving real-world challenges using
                academic investigation, technical skills, innovation, and practical implementation.
            </p>
            <br>
            <p>
                The project may include a proposal, literature review, methodology, data analysis,
                implementation plan, recommendations, and final report depending on its approval stage.
            </p>
        `;

        openModal("Research Project", title, body);
    });
});

// =========================
// PUBLICATION MODAL
// =========================
document.querySelectorAll(".read-publication").forEach(button => {
    button.addEventListener("click", event => {
        const card = event.target.closest(".publication-card");
        const title = card.querySelector("h3").textContent;

        const body = `
            <p>
                This publication has been reviewed and approved for academic use within the
                Benchmark Research Hub. It contains an abstract, introduction, literature review,
                methodology, findings, discussion, conclusion, and recommendations.
            </p>
            <br>
            <p>
                Full PDF download functionality can later be connected to a backend database,
                file storage system, or college research repository.
            </p>
            <br>
            <p><strong>Suggested Citation:</strong> Benchmark Business and Technical College Research Department, 2026.</p>
        `;

        openModal("Publication", title, body);
    });
});

// =========================
// STAFF MODAL
// =========================
document.querySelectorAll(".staff-card").forEach(card => {
    card.addEventListener("click", () => {
        const staffData = card.dataset.staff.split("|");
        const name = staffData[0];
        const role = staffData[1];
        const department = staffData[2];
        const bio = staffData[3];

        const body = `
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Department:</strong> ${department}</p>
            <br>
            <p>${bio}</p>
            <br>
            <p>
                This staff member can supervise student research, review proposals,
                support methodology design, and guide final-year research projects.
            </p>
        `;

        openModal("Research Staff", name, body);
    });
});

// =========================
// LIKE BUTTONS
// =========================
document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", () => {
        const countSpan = button.querySelector("span");
        let count = Number(countSpan.textContent);

        if (button.classList.contains("liked")) {
            count--;
            button.classList.remove("liked");
            button.innerHTML = `♡ Like <span>${count}</span>`;
        } else {
            count++;
            button.classList.add("liked");
            button.innerHTML = `♥ Liked <span>${count}</span>`;
        }
    });
});

// =========================
// SAVE BUTTONS
// =========================
document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("saved")) {
            button.classList.remove("saved");
            button.textContent = "🔖 Save";
        } else {
            button.classList.add("saved");
            button.textContent = "✅ Saved";
        }
    });
});

// =========================
// COMMENT SYSTEM DEMO
// =========================
document.querySelectorAll(".post-comment").forEach(button => {
    button.addEventListener("click", event => {
        const discussion = event.target.closest(".discussion");
        const textarea = discussion.querySelector("textarea");
        const commentText = textarea.value.trim();

        if (commentText === "") {
            alert("Please write a comment before posting.");
            return;
        }

        const newComment = document.createElement("p");
        newComment.innerHTML = `<strong>You:</strong> ${commentText}`;

        discussion.insertBefore(newComment, textarea);
        textarea.value = "";
    });
});

// =========================
// FORM SUBMISSION DEMO
// =========================
const researchForm = document.getElementById("researchForm");

researchForm.addEventListener("submit", event => {
    event.preventDefault();

    const titleInput = document.getElementById("researchTitleInput");
    const title = titleInput.value.trim();

    openModal(
        "Submission Received",
        "Research Submitted Successfully",
        `
        <p>
            Your research project <strong>“${title}”</strong> has been submitted to the
            Benchmark Research Hub.
        </p>
        <br>
        <p>
            Status: <strong>Pending Review</strong>
        </p>
        <p>
            The research coordinator or department supervisor will review your submission
            and provide feedback.
        </p>
        `
    );

    researchForm.reset();
});

// =========================
// SIMPLE DOWNLOAD DEMO
// =========================
document.querySelectorAll("button").forEach(button => {
    if (button.textContent.toLowerCase().includes("download")) {
        button.addEventListener("click", event => {
            if (!event.target.classList.contains("btn-primary")) {
                alert("Demo download: connect this button to real PDF/DOCX files later.");
            }
        });
    }
});