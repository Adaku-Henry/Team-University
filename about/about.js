const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");

        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
    counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 90);

        const updateCounter = () => {
            current += increment;

            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    });
}

const statsSection = document.querySelector(".stats-section");

const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !countersStarted) {
                startCounters();
                countersStarted = true;
            }
        });
    },
    {
        threshold: 0.4
    }
);

if (statsSection) {
    statsObserver.observe(statsSection);
}

const deptFilter = document.getElementById("deptFilter");
const staffSearch = document.getElementById("staffSearch");
const staffCards = document.querySelectorAll(".staff-card");
const noResults = document.getElementById("noResults");

function filterStaff() {
    const selectedDepartment = deptFilter.value.toLowerCase();
    const searchTerm = staffSearch.value.toLowerCase().trim();
    let visibleCount = 0;

    staffCards.forEach((card) => {
        const department = card.dataset.dept.toLowerCase();
        const name = card.dataset.name.toLowerCase();

        const matchesDepartment =
            selectedDepartment === "all" || department === selectedDepartment;

        const matchesSearch = name.includes(searchTerm);

        if (matchesDepartment && matchesSearch) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
}

deptFilter.addEventListener("change", filterStaff);
staffSearch.addEventListener("input", filterStaff);

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

const videoModal = document.getElementById("videoModal");
const openVideo = document.getElementById("openVideo");
const openVideoTwo = document.getElementById("openVideoTwo");
const closeVideo = document.getElementById("closeVideo");
const collegeVideo = document.getElementById("collegeVideo");

function showVideoModal() {
    videoModal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (collegeVideo) {
        collegeVideo.play();
    }
}

function hideVideoModal() {
    videoModal.classList.remove("active");
    document.body.style.overflow = "";

    if (collegeVideo) {
        collegeVideo.pause();
        collegeVideo.currentTime = 0;
    }
}

openVideo.addEventListener("click", showVideoModal);
openVideoTwo.addEventListener("click", showVideoModal);
closeVideo.addEventListener("click", hideVideoModal);

videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
        hideVideoModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal.classList.contains("active")) {
        hideVideoModal();
    }
});

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}