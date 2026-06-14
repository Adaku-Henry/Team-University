/* =========================================================
   BENCHMARK BUSINESS AND TECHNICAL COLLEGE
   Modern University Website - Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initStickyHeader();
    initSmoothInternalScroll();
    initRevealAnimations();
    initCounters();
    initSearch();
    initBackToTop();
    initActiveNavigation();
    initYear();
});

/* =========================
   MOBILE MENU
========================= */

function initMobileMenu() {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (!menuBtn || !navLinks) return;

    menuBtn.setAttribute("role", "button");
    menuBtn.setAttribute("aria-label", "Open menu");
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", String(isOpen));

        const icon = menuBtn.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    });

    navItems.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }
        });
    });

    document.addEventListener("click", event => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedMenuButton = menuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }
        }
    });
}

/* =========================
   STICKY HEADER SHADOW
========================= */

function initStickyHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeader = () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader);
    updateHeader();
}

/* =========================
   SMOOTH SCROLL FOR SAME-PAGE LINKS
========================= */

function initSmoothInternalScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                const headerHeight = document.querySelector("header")?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

function initRevealAnimations() {
    const revealSelectors = [
        ".about-image",
        ".about-text",
        ".program-card",
        ".feature",
        ".stat",
        ".news-card",
        ".testimonial",
        ".cta h2",
        ".cta p",
        ".cta a",
        ".school-card",
        ".program-item",
        ".teach-card",
        ".req-card",
        ".fee-row",
        ".step",
        ".admission-intro"
    ];

    const elements = document.querySelectorAll(revealSelectors.join(","));

    if (!elements.length) return;

    elements.forEach(element => element.classList.add("reveal"));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px"
    });

    elements.forEach(element => observer.observe(element));
}

/* =========================
   ANIMATED COUNTERS
========================= */

function initCounters() {
    const counters = document.querySelectorAll(".stat h2");

    if (!counters.length) return;

    counters.forEach(counter => {
        const originalText = counter.textContent.trim();
        const target = parseInt(originalText.replace(/\D/g, ""), 10);

        if (Number.isNaN(target)) return;

        counter.dataset.target = String(target);
        counter.dataset.suffix = originalText.includes("+") ? "+" : "";
        counter.textContent = "0" + counter.dataset.suffix;
    });

    const animateCounter = counter => {
        const target = parseInt(counter.dataset.target, 10);
        const suffix = counter.dataset.suffix || "";
        const duration = 1600;
        const startTime = performance.now();

        const update = currentTime => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easedProgress * target);

            counter.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + suffix;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.45
    });

    counters.forEach(counter => observer.observe(counter));
}

/* =========================
   SEARCH FUNCTIONALITY
========================= */

function initSearch() {
    const searchInput = document.querySelector(".search-box input");
    if (!searchInput) return;

    const searchableItems = document.querySelectorAll(
        ".program-card, .news-card, .feature, .testimonial"
    );

    const containers = [
        document.querySelector(".program-container"),
        document.querySelector(".news-container"),
        document.querySelector(".features"),
        document.querySelector(".testimonial-container")
    ].filter(Boolean);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        searchableItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(query);

            item.classList.toggle("is-hidden", query !== "" && !matches);
        });

        containers.forEach(container => updateNoResultsMessage(container, query));
    });
}

function updateNoResultsMessage(container, query) {
    const existingMessage = container.querySelector(".no-results");
    if (existingMessage) existingMessage.remove();

    if (!query) return;

    const visibleItems = Array.from(container.children).filter(child => {
        return !child.classList.contains("is-hidden") && !child.classList.contains("no-results");
    });

    if (visibleItems.length === 0) {
        const message = document.createElement("div");
        message.className = "no-results";
        message.innerHTML = `<strong>No results found.</strong><br>Try another keyword.`;
        container.appendChild(message);
    }
}

/* =========================
   BACK TO TOP BUTTON
========================= */

function initBackToTop() {
    let topButton = document.querySelector(".back-to-top");

    if (!topButton) {
        topButton = document.createElement("button");
        topButton.className = "back-to-top";
        topButton.innerHTML = `<i class="fa fa-arrow-up"></i>`;
        topButton.setAttribute("aria-label", "Back to top");
        document.body.appendChild(topButton);
    }

    const toggleButton = () => {
        if (window.scrollY > 450) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    };

    window.addEventListener("scroll", toggleButton);
    toggleButton();

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =========================
   ACTIVE NAVIGATION
========================= */

function initActiveNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!navLinks.length) return;

    const currentPage = normalizePath(window.location.pathname);

    navLinks.forEach(link => {
        const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);

        if (linkPath === currentPage) {
            link.classList.add("active-link");
        }
    });

    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const onScroll = () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href === "#" + currentSectionId) {
                link.classList.add("active-link");
            }
        });
    };

    window.addEventListener("scroll", onScroll);
}

function normalizePath(path) {
    let cleanPath = path.replace(/\/+$/, "");
    if (cleanPath === "") cleanPath = "/";

    return cleanPath;
}

/* =========================
   AUTO YEAR IN FOOTER
========================= */

function initYear() {
    const footerBottom = document.querySelector(".footer-bottom p");
    if (!footerBottom) return;

    const currentYear = new Date().getFullYear();

    footerBottom.innerHTML = footerBottom.innerHTML.replace(/\d{4}/, currentYear);
}

/* =========================
   OPTIONAL PROGRAM FILTERS
   Works if you add:
   - input#searchProgram
   - buttons with .filter-btn and data-filter
   - cards with .program-item and data-category
========================= */

const programSearch = document.getElementById("searchProgram");
const filterButtons = document.querySelectorAll(".filter-btn");
const programItems = document.querySelectorAll(".program-item");

if (programSearch && programItems.length) {
    programSearch.addEventListener("input", filterPrograms);
}

if (filterButtons.length && programItems.length) {
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterPrograms();
        });
    });
}

function filterPrograms() {
    const query = programSearch ? programSearch.value.toLowerCase().trim() : "";
    const activeButton = document.querySelector(".filter-btn.active");
    const category = activeButton ? activeButton.dataset.filter : "all";

    programItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const itemCategory = item.dataset.category || "all";

        const matchesSearch = text.includes(query);
        const matchesCategory = category === "all" || itemCategory === category;

        item.classList.toggle("hidden", !(matchesSearch && matchesCategory));
    });
}

/* =========================
   STUDENT / LMS SAFE HELPERS
   These only run when matching elements exist.
========================= */

function showSection(sectionId) {
    const sections = document.querySelectorAll(".portal-section");
    const target = document.getElementById(sectionId);

    if (!sections.length || !target) return;

    sections.forEach(section => section.classList.remove("active"));
    target.classList.add("active");
}

window.showSection = showSection;

function enroll(course) {
    if (!course) return;

    const enrolled = JSON.parse(localStorage.getItem("enrolledCoursesSimple")) || [];

    if (!enrolled.includes(course)) {
        enrolled.push(course);
        localStorage.setItem("enrolledCoursesSimple", JSON.stringify(enrolled));
        alert("Enrolled in " + course);
        updateEnrolledList();
    } else {
        alert("Already enrolled in " + course);
    }
}

window.enroll = enroll;

function updateEnrolledList() {
    const list = document.getElementById("enrolledList");
    if (!list) return;

    const enrolled = JSON.parse(localStorage.getItem("enrolledCoursesSimple")) || [];

    list.innerHTML = "";

    if (enrolled.length === 0) {
        list.innerHTML = "<li>No courses enrolled yet</li>";
        return;
    }

    enrolled.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course;
        list.appendChild(li);
    });
}

window.updateEnrolledList = updateEnrolledList;

function submitAssignment(title, fileId) {
    const fileInput = document.getElementById(fileId);

    if (!fileInput || fileInput.files.length === 0) {
        alert("Please select a file before submitting.");
        return;
    }

    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    submissions.push({
        title,
        status: "Submitted",
        file: fileInput.files[0].name,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("submissions", JSON.stringify(submissions));

    alert("Assignment submitted successfully!");
    loadSubmissions();
}

window.submitAssignment = submitAssignment;

function loadSubmissions() {
    const list = document.getElementById("submissionList");
    if (!list) return;

    const submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    list.innerHTML = "";

    if (submissions.length === 0) {
        list.innerHTML = "<li>No submissions yet</li>";
        return;
    }

    submissions.forEach(submission => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${submission.title}</strong> - ${submission.status} <small>(${submission.file})</small>`;
        list.appendChild(li);
    });
}

window.loadSubmissions = loadSubmissions;

function viewFeedback(title) {
    alert("Feedback for " + title + ":\n\nGood work. Improve referencing and formatting.");
}

window.viewFeedback = viewFeedback;

function loadResults() {
    const semesterSelect = document.getElementById("semesterSelect");
    const resultsBody = document.getElementById("resultsBody");
    const gpaValue = document.getElementById("gpaValue");

    if (!semesterSelect || !resultsBody) return;

    const semester = semesterSelect.value;

    const semesterOne = [
        ["BIT101", "Introduction to ICT", "82", "A", "Excellent"],
        ["BUS101", "Business Communication", "76", "B+", "Very Good"],
        ["ACC101", "Financial Accounting", "71", "B", "Good"]
    ];

    const semesterTwo = [
        ["BIT201", "Advanced Programming", "80", "A", "Excellent"],
        ["BIT202", "Database Systems", "75", "B+", "Very Good"],
        ["BIT203", "Operating Systems", "70", "B", "Good"]
    ];

    const data = semester === "Semester 2" ? semesterTwo : semesterOne;

    resultsBody.innerHTML = data.map(row => `
        <tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            <td>${row[4]}</td>
        </tr>
    `).join("");

    if (gpaValue) {
        gpaValue.textContent = semester === "Semester 2" ? "3.70" : "3.62";
    }
}

window.loadResults = loadResults;

function generateRef() {
    const amount = document.getElementById("amount");
    const refCode = document.getElementById("refCode");

    if (!amount || !refCode) return;

    if (!amount.value || Number(amount.value) <= 0) {
        alert("Enter a valid amount first.");
        return;
    }

    const ref = "BBC-" + Math.floor(10000000 + Math.random() * 90000000);
    refCode.textContent = `${ref} (UGX ${Number(amount.value).toLocaleString()})`;
}

window.generateRef = generateRef;

function makePayment() {
    const refCode = document.getElementById("refCode");
    const balance = document.getElementById("balance");
    const amount = document.getElementById("amount");

    if (!refCode || !amount) return;

    if (refCode.textContent.includes("No reference")) {
        alert("Generate payment reference first.");
        return;
    }

    alert("Payment successful via selected method!");

    if (balance) {
        const currentBalance = parseInt(balance.textContent.replace(/\D/g, ""), 10) || 0;
        const paidAmount = parseInt(amount.value, 10) || 0;
        const newBalance = Math.max(currentBalance - paidAmount, 0);

        balance.textContent = "UGX " + newBalance.toLocaleString();
    }
}

window.makePayment = makePayment;

function downloadTranscript() {
    alert("Generating transcript... Download will start shortly.");
}

window.downloadTranscript = downloadTranscript;

function downloadReceipt(id = "") {
    alert(id ? `Downloading receipt ${id}` : "Downloading receipt...");
}

window.downloadReceipt = downloadReceipt;

function submitRegistration() {
    alert("Registration submitted successfully!");
}

window.submitRegistration = submitRegistration;

function saveDraft() {
    alert("Draft saved successfully!");
}

window.saveDraft = saveDraft;

function printSlip() {
    window.print();
}

window.printSlip = printSlip;

function pay(method) {
    alert(`Payment initiated via ${method}`);
}

window.pay = pay;

/* =========================
   SAFE LOAD FOR OPTIONAL LMS
========================= */

document.addEventListener("DOMContentLoaded", () => {
    updateEnrolledList();
    loadSubmissions();

    const dashboardSection = document.getElementById("dashboard");
    if (dashboardSection && document.querySelector(".portal-section")) {
        showSection("dashboard");
    }

    if (document.getElementById("resultsBody")) {
        loadResults();
    }
});