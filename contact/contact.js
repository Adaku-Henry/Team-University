// ================= GLOBAL HELPERS =================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const STORAGE_KEYS = {
    messages: "benchmark_contact_messages",
    tickets: "benchmark_support_tickets",
    appointments: "benchmark_appointments",
    complaints: "benchmark_complaints",
    suggestions: "benchmark_suggestions",
    feedback: "benchmark_feedback",
    chat: "benchmark_chat_history"
};

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateId(prefix) {
    return `${prefix}-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
}

function todayString() {
    return new Date().toISOString().split("T")[0];
}

function showToast(message) {
    const container = $("#toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4200);
}

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validPhone(phone) {
    return /^\+?[0-9\s-]{9,16}$/.test(phone);
}

// ================= NAVIGATION =================
$("#menuToggle").addEventListener("click", () => {
    $("#navLinks").classList.toggle("show");
});

$$(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        $("#navLinks").classList.remove("show");
    });
});

$("#contrastToggle").addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
    showToast("Accessibility contrast mode updated.");
});

$("#languageSelect").addEventListener("change", (e) => {
    const value = e.target.value;
    const messages = {
        en: "Language set to English.",
        sw: "Lugha imewekwa kuwa Swahili.",
        lu: "Language preference set to Lugbara."
    };
    showToast(messages[value] || "Language updated.");
});

// ================= DATA =================
const departments = [
    {
        name: "Admissions Office",
        email: "admissions@benchmarkcollege.ac.ug",
        phone: "+256 701 555 999",
        location: "Administration Block, Room A01"
    },
    {
        name: "Registrar",
        email: "registrar@benchmarkcollege.ac.ug",
        phone: "+256 702 111 222",
        location: "Administration Block, Room A05"
    },
    {
        name: "Finance Office",
        email: "finance@benchmarkcollege.ac.ug",
        phone: "+256 703 222 333",
        location: "Finance Block, Room F02"
    },
    {
        name: "ICT Support",
        email: "ict@benchmarkcollege.ac.ug",
        phone: "+256 700 888 999",
        location: "ICT Lab, Help Desk"
    },
    {
        name: "Library",
        email: "library@benchmarkcollege.ac.ug",
        phone: "+256 704 333 444",
        location: "Main Library"
    },
    {
        name: "Research Office",
        email: "research@benchmarkcollege.ac.ug",
        phone: "+256 705 444 555",
        location: "Innovation Hub, Room R03"
    },
    {
        name: "Academic Affairs",
        email: "academics@benchmarkcollege.ac.ug",
        phone: "+256 706 555 666",
        location: "Academic Block"
    },
    {
        name: "Human Resource",
        email: "hr@benchmarkcollege.ac.ug",
        phone: "+256 707 666 777",
        location: "Administration Block, Room H01"
    },
    {
        name: "Student Affairs",
        email: "students@benchmarkcollege.ac.ug",
        phone: "+256 708 777 888",
        location: "Student Centre"
    }
];

const staff = [
    {
        name: "Mr. Daniel Okello",
        position: "Admissions Officer",
        department: "Admissions",
        phone: "+256 701 555 999",
        email: "daniel.okello@benchmarkcollege.ac.ug",
        office: "Room A01",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
    },
    {
        name: "Ms. Grace Auma",
        position: "Registrar",
        department: "Registrar",
        phone: "+256 702 111 222",
        email: "grace.auma@benchmarkcollege.ac.ug",
        office: "Room A05",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
        name: "Mr. Simon Odoch",
        position: "Finance Officer",
        department: "Finance",
        phone: "+256 703 222 333",
        email: "simon.odch@benchmarkcollege.ac.ug",
        office: "Finance Block",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
        name: "Ms. Rebecca Atim",
        position: "ICT Help Desk Lead",
        department: "ICT Support",
        phone: "+256 700 888 999",
        email: "rebecca.atim@benchmarkcollege.ac.ug",
        office: "ICT Lab",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    },
    {
        name: "Dr. Peter Andama",
        position: "Research Director",
        department: "Research Office",
        phone: "+256 705 444 555",
        email: "peter.andama@benchmarkcollege.ac.ug",
        office: "Innovation Hub",
        photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80"
    },
    {
        name: "Ms. Mercy Alanyo",
        position: "Student Affairs Coordinator",
        department: "Student Affairs",
        phone: "+256 708 777 888",
        email: "mercy.alanyo@benchmarkcollege.ac.ug",
        office: "Student Centre",
        photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=300&q=80"
    }
];

const faqs = [
    {
        category: "Admissions",
        question: "How do I apply for admission?",
        answer: "You can apply through the admissions portal, visit the Admissions Office, or contact admissions@benchmarkcollege.ac.ug for guidance."
    },
    {
        category: "Fees",
        question: "How do I pay tuition fees?",
        answer: "Fees can be paid through approved bank accounts, mobile money channels, or the Finance Office. Always keep your payment receipt."
    },
    {
        category: "Results",
        question: "How do I view my results?",
        answer: "Students can view results through the official Student Portal after clearance and publication by the Registrar."
    },
    {
        category: "Graduation",
        question: "How do I apply for graduation?",
        answer: "Graduation applications are submitted through the Registrar's Office or the graduation portal during the announced application period."
    },
    {
        category: "Research",
        question: "Who do I contact for research collaborations?",
        answer: "Contact the Research Office at research@benchmarkcollege.ac.ug for proposals, innovation partnerships, and grant inquiries."
    },
    {
        category: "Hostel",
        question: "Does the college provide hostel support?",
        answer: "The Student Affairs Office provides guidance on recommended hostels and accommodation options near campus."
    },
    {
        category: "Scholarships",
        question: "Are scholarships available?",
        answer: "Scholarship announcements are published on the college website and notice boards. You can also contact the Admissions Office."
    },
    {
        category: "ICT",
        question: "What should I do if I cannot access the student portal?",
        answer: "Submit an ICT support ticket or contact ict@benchmarkcollege.ac.ug with your student number and issue description."
    }
];

// ================= RENDER DEPARTMENTS =================
function renderDepartments() {
    const grid = $("#departmentGrid");
    grid.innerHTML = departments.map(dept => `
        <div class="dept-card">
            <h3>${dept.name}</h3>
            <p><strong>Email:</strong> ${dept.email}</p>
            <p><strong>Phone:</strong> ${dept.phone}</p>
            <p><strong>Office:</strong> ${dept.location}</p>
            <a href="mailto:${dept.email}">Email Office</a>
        </div>
    `).join("");
}

// ================= RENDER STAFF =================
function renderStaff(list = staff) {
    const grid = $("#staffGrid");

    if (!list.length) {
        grid.innerHTML = `<p>No staff members found.</p>`;
        return;
    }

    grid.innerHTML = list.map(person => `
        <div class="staff-card">
            <div class="staff-photo">
                <img src="${person.photo}" alt="${person.name}">
            </div>
            <div>
                <h3>${person.name}</h3>
                <p><strong>${person.position}</strong></p>
                <p>${person.department}</p>
                <p>${person.phone}</p>
                <p>${person.email}</p>
                <p>Office: ${person.office}</p>
            </div>
        </div>
    `).join("");
}

function filterStaff() {
    const search = $("#staffSearch").value.toLowerCase();
    const department = $("#staffDepartmentFilter").value;

    const filtered = staff.filter(person => {
        const combined = `${person.name} ${person.position} ${person.department} ${person.email} ${person.phone} ${person.office}`.toLowerCase();
        const matchesSearch = combined.includes(search);
        const matchesDepartment = !department || person.department === department;
        return matchesSearch && matchesDepartment;
    });

    renderStaff(filtered);
}

$("#staffSearch").addEventListener("input", filterStaff);
$("#staffDepartmentFilter").addEventListener("change", filterStaff);

// ================= FAQ =================
function renderFaq(list = faqs) {
    const faqList = $("#faqList");

    if (!list.length) {
        faqList.innerHTML = `<p>No FAQ found for your search.</p>`;
        return;
    }

    faqList.innerHTML = list.map((faq, index) => `
        <div class="faq-item">
            <button class="faq-question">
                <span>${faq.category}: ${faq.question}</span>
                <strong>+</strong>
            </button>
            <div class="faq-answer">
                ${faq.answer}
            </div>
        </div>
    `).join("");

    $$(".faq-question").forEach(button => {
        button.addEventListener("click", () => {
            const item = button.parentElement;
            item.classList.toggle("active");
            button.querySelector("strong").textContent = item.classList.contains("active") ? "−" : "+";
        });
    });
}

$("#faqSearch").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = faqs.filter(faq =>
        faq.category.toLowerCase().includes(value) ||
        faq.question.toLowerCase().includes(value) ||
        faq.answer.toLowerCase().includes(value)
    );
    renderFaq(filtered);
});

// ================= CAPTCHA =================
let captchaResult = 0;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    captchaResult = a + b;
    $("#captchaQuestion").textContent = `${a} + ${b} = ?`;
}

// ================= CONTACT FORM =================
$("#message").addEventListener("input", () => {
    $("#messageCount").textContent = $("#message").value.length;
});

function setFieldError(inputId, message) {
    const group = $(`#${inputId}`).closest(".form-group");
    const error = group.querySelector(".error");
    if (error) error.textContent = message;
}

function clearErrors() {
    $$(".error").forEach(error => error.textContent = "");
}

$("#mainContactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const fullName = $("#fullName").value.trim();
    const email = $("#email").value.trim();
    const phone = $("#phone").value.trim();
    const department = $("#department").value;
    const category = $("#category").value;
    const subject = $("#subject").value.trim();
    const message = $("#message").value.trim();
    const captchaAnswer = Number($("#captchaAnswer").value);

    let hasError = false;

    if (fullName.length < 3) {
        setFieldError("fullName", "Full name must be at least 3 characters.");
        hasError = true;
    }

    if (!validEmail(email)) {
        setFieldError("email", "Enter a valid email address.");
        hasError = true;
    }

    if (!validPhone(phone)) {
        setFieldError("phone", "Enter a valid phone number.");
        hasError = true;
    }

    if (!department) {
        setFieldError("department", "Select a department.");
        hasError = true;
    }

    if (!category) {
        setFieldError("category", "Select a category.");
        hasError = true;
    }

    if (subject.length < 5) {
        setFieldError("subject", "Subject must be at least 5 characters.");
        hasError = true;
    }

    if (message.length < 15) {
        setFieldError("message", "Message must be at least 15 characters.");
        hasError = true;
    }

    if (captchaAnswer !== captchaResult) {
        setFieldError("captchaAnswer", "Captcha answer is incorrect.");
        hasError = true;
    }

    if (hasError) return;

    const messages = getData(STORAGE_KEYS.messages);
    const newMessage = {
        id: generateId("MSG"),
        sender: fullName,
        email,
        phone,
        country: $("#country").value.trim(),
        organization: $("#organization").value.trim(),
        department,
        category,
        priority: $("#priority").value,
        subject,
        message,
        attachment: $("#attachment").files[0]?.name || "None",
        status: "Pending",
        unread: true,
        date: new Date().toLocaleString(),
        day: todayString()
    };

    messages.unshift(newMessage);
    saveData(STORAGE_KEYS.messages, messages);

    $("#formSuccess").textContent = `Message sent successfully. Your reference number is ${newMessage.id}.`;
    $("#mainContactForm").reset();
    $("#messageCount").textContent = "0";
    generateCaptcha();
    updateDashboard();
    renderMessageTable();

    showToast("New message received and saved locally.");
});

// ================= APPOINTMENT FORM =================
$("#appointmentForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const appointments = getData(STORAGE_KEYS.appointments);
    const appointment = {
        id: generateId("APT"),
        name: $("#appointmentName").value.trim(),
        email: $("#appointmentEmail").value.trim(),
        officer: $("#appointmentOfficer").value,
        date: $("#appointmentDate").value,
        time: $("#appointmentTime").value,
        meetingType: $("#meetingType").value,
        purpose: $("#appointmentPurpose").value.trim(),
        status: "Pending",
        created: new Date().toLocaleString(),
        day: todayString()
    };

    appointments.unshift(appointment);
    saveData(STORAGE_KEYS.appointments, appointments);

    $("#appointmentSuccess").textContent = `Appointment request submitted. Reference: ${appointment.id}`;
    $("#appointmentForm").reset();

    updateDashboard();
    showToast("Appointment request submitted.");
});

// ================= TICKET FORM =================
$("#ticketForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const tickets = getData(STORAGE_KEYS.tickets);
    const ticket = {
        id: generateId("TKT"),
        name: $("#ticketName").value.trim(),
        email: $("#ticketEmail").value.trim(),
        category: $("#ticketCategory").value,
        priority: $("#ticketPriority").value,
        issue: $("#ticketIssue").value.trim(),
        file: $("#ticketFile").files[0]?.name || "None",
        status: "Open",
        date: new Date().toLocaleString(),
        day: todayString()
    };

    tickets.unshift(ticket);
    saveData(STORAGE_KEYS.tickets, tickets);

    $("#ticketSuccess").textContent = `Ticket submitted successfully. Ticket Number: ${ticket.id}`;
    $("#ticketForm").reset();

    renderTickets();
    updateDashboard();
    showToast("New support ticket created.");
});

function renderTickets() {
    const tickets = getData(STORAGE_KEYS.tickets);
    const list = $("#ticketList");

    if (!tickets.length) {
        list.innerHTML = `<p>No tickets submitted yet.</p>`;
        return;
    }

    list.innerHTML = tickets.slice(0, 6).map(ticket => `
        <div class="activity-item">
            <strong>${ticket.id} - ${ticket.category}</strong>
            <small>${ticket.priority} Priority • ${ticket.status}</small>
            <small>${ticket.date}</small>
        </div>
    `).join("");
}

// ================= TABS =================
$$(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
        $$(".tab-btn").forEach(btn => btn.classList.remove("active"));
        $$(".tab-content").forEach(tab => tab.classList.remove("active"));

        button.classList.add("active");
        $(`#${button.dataset.tab}`).classList.add("active");
    });
});

// ================= COMPLAINTS =================
$("#complaintForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const complaints = getData(STORAGE_KEYS.complaints);
    const complaint = {
        id: generateId("CMP"),
        category: $("#complaintCategory").value,
        priority: $("#complaintPriority").value,
        complaint: $("#complaintText").value.trim(),
        evidence: $("#complaintEvidence").files[0]?.name || "None",
        status: "Submitted",
        date: new Date().toLocaleString(),
        day: todayString()
    };

    complaints.unshift(complaint);
    saveData(STORAGE_KEYS.complaints, complaints);

    $("#complaintSuccess").textContent = `Complaint submitted. Tracking ID: ${complaint.id}`;
    $("#complaintForm").reset();

    updateDashboard();
    showToast("Complaint submitted for review.");
});

// ================= SUGGESTIONS =================
$("#suggestionForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const suggestions = getData(STORAGE_KEYS.suggestions);
    const suggestion = {
        id: generateId("SGT"),
        category: $("#suggestionCategory").value,
        anonymous: $("#anonymousSuggestion").checked,
        suggestion: $("#suggestionText").value.trim(),
        date: new Date().toLocaleString(),
        day: todayString()
    };

    suggestions.unshift(suggestion);
    saveData(STORAGE_KEYS.suggestions, suggestions);

    $("#suggestionSuccess").textContent = `Suggestion submitted successfully. Reference: ${suggestion.id}`;
    $("#suggestionForm").reset();

    updateDashboard();
    showToast("Suggestion received.");
});

// ================= FEEDBACK RATING =================
$$("#ratingStars span").forEach(star => {
    star.addEventListener("click", () => {
        const value = Number(star.dataset.value);
        $("#ratingValue").value = value;

        $$("#ratingStars span").forEach(s => {
            s.classList.toggle("active", Number(s.dataset.value) <= value);
        });
    });
});

$("#feedbackForm").addEventListener("submit", (e) => {
    e.preventDefault();

    if (Number($("#ratingValue").value) === 0) {
        showToast("Please select a star rating before submitting feedback.");
        return;
    }

    const feedbackItems = getData(STORAGE_KEYS.feedback);
    const feedback = {
        id: generateId("FDB"),
        department: $("#feedbackDepartment").value,
        rating: $("#ratingValue").value,
        comment: $("#feedbackComment").value.trim(),
        date: new Date().toLocaleString(),
        day: todayString()
    };

    feedbackItems.unshift(feedback);
    saveData(STORAGE_KEYS.feedback, feedbackItems);

    $("#feedbackSuccess").textContent = `Thank you for your feedback. Reference: ${feedback.id}`;
    $("#feedbackForm").reset();
    $("#ratingValue").value = "0";
    $$("#ratingStars span").forEach(s => s.classList.remove("active"));

    updateDashboard();
    showToast("Feedback submitted successfully.");
});

// ================= NEWSLETTER =================
$("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#newsletterName").value.trim();
    const email = $("#newsletterEmail").value.trim();

    if (!validEmail(email)) {
        showToast("Please enter a valid newsletter email.");
        return;
    }

    $("#newsletterSuccess").textContent = `Thank you ${name}. You have subscribed successfully.`;
    $("#newsletterForm").reset();
    showToast("Newsletter subscription completed.");
});

// ================= DOWNLOAD RESOURCES =================
$$(".download-btn").forEach(button => {
    button.addEventListener("click", () => {
        const fileName = button.dataset.file;
        const content = `Benchmark Business and Technical College - ${fileName}\n\nThis is a sample generated resource file from the contact page frontend. Replace this with a real PDF/document link when connected to a backend.`;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName.replaceAll(" ", "_")}.txt`;
        link.click();

        URL.revokeObjectURL(url);
        showToast(`${fileName} download started.`);
    });
});

// ================= ADMIN MESSAGE MANAGEMENT =================
function renderMessageTable() {
    const messages = getData(STORAGE_KEYS.messages);
    const table = $("#messageTable");

    if (!messages.length) {
        table.innerHTML = `
            <tr>
                <td colspan="7">No contact messages yet.</td>
            </tr>
        `;
        return;
    }

    table.innerHTML = messages.map(message => `
        <tr>
            <td>${message.id}</td>
            <td>${message.sender}</td>
            <td>${message.date}</td>
            <td>${message.subject}</td>
            <td>${message.department}</td>
            <td>
                <span class="status ${message.status.toLowerCase()}">${message.status}</span>
            </td>
            <td>
                <button class="btn btn-primary" onclick="resolveMessage('${message.id}')">Resolve</button>
            </td>
        </tr>
    `).join("");
}

window.resolveMessage = function(id) {
    const messages = getData(STORAGE_KEYS.messages);
    const updated = messages.map(message => {
        if (message.id === id) {
            return { ...message, status: "Resolved", unread: false };
        }
        return message;
    });

    saveData(STORAGE_KEYS.messages, updated);
    renderMessageTable();
    updateDashboard();
    showToast("Message marked as resolved.");
};

$("#markResolvedBtn").addEventListener("click", () => {
    const messages = getData(STORAGE_KEYS.messages);
    const index = messages.findIndex(message => message.status === "Pending");

    if (index === -1) {
        showToast("No pending messages to resolve.");
        return;
    }

    messages[index].status = "Resolved";
    messages[index].unread = false;
    saveData(STORAGE_KEYS.messages, messages);

    renderMessageTable();
    updateDashboard();
    showToast("First pending message marked as resolved.");
});

$("#clearDataBtn").addEventListener("click", () => {
    if (!confirm("Clear all local contact data from this browser?")) return;

    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));

    renderTickets();
    renderMessageTable();
    updateDashboard();
    loadChatHistory();

    showToast("Local contact data cleared.");
});

// ================= DASHBOARD =================
function updateDashboard() {
    const messages = getData(STORAGE_KEYS.messages);
    const tickets = getData(STORAGE_KEYS.tickets);
    const appointments = getData(STORAGE_KEYS.appointments);
    const complaints = getData(STORAGE_KEYS.complaints);
    const suggestions = getData(STORAGE_KEYS.suggestions);
    const feedback = getData(STORAGE_KEYS.feedback);

    const unread = messages.filter(message => message.unread).length;
    const resolved = messages.filter(message => message.status === "Resolved").length;
    const pending = messages.filter(message => message.status === "Pending").length;

    const todaysContacts = [
        ...messages,
        ...tickets,
        ...appointments,
        ...complaints,
        ...suggestions,
        ...feedback
    ].filter(item => item.day === todayString()).length;

    animateNumber("#totalMessages", messages.length);
    animateNumber("#unreadMessages", unread);
    animateNumber("#resolvedInquiries", resolved);
    animateNumber("#pendingResponses", pending);
    animateNumber("#supportTickets", tickets.length);
    animateNumber("#todayContacts", todaysContacts);

    $("#messagesBar").style.width = `${Math.min(messages.length * 10 + 8, 100)}%`;
    $("#ticketsBar").style.width = `${tickets.length ? 65 : 8}%`;
    $("#departmentBar").style.width = `${Math.min((messages.length + tickets.length) * 8 + 15, 100)}%`;
}

function animateNumber(selector, target) {
    const element = $(selector);
    const current = Number(element.textContent) || 0;
    const steps = 12;
    const increment = (target - current) / steps;
    let count = 0;

    const timer = setInterval(() => {
        count++;
        const value = Math.round(current + increment * count);
        element.textContent = value;

        if (count >= steps) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 25);
}

// ================= LIVE CHAT SIMULATION =================
const botReplies = [
    "Thank you for contacting Benchmark College. How can we support you today?",
    "For admissions, please contact admissions@benchmarkcollege.ac.ug or call +256 701 555 999.",
    "For finance support, please submit your student number and payment reference.",
    "For ICT support, you can submit a support ticket on this page.",
    "A staff member would take over in a real backend-powered live chat system.",
    "You can also book an appointment with the relevant office from the appointment section."
];

function saveChatMessage(sender, text) {
    const chat = getData(STORAGE_KEYS.chat);
    chat.push({
        sender,
        text,
        time: new Date().toLocaleTimeString()
    });
    saveData(STORAGE_KEYS.chat, chat);
}

function addChatMessage(sender, text, save = true) {
    const body = $("#chatBody");
    const div = document.createElement("div");
    div.className = `chat-msg ${sender}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;

    if (save) saveChatMessage(sender, text);
}

function loadChatHistory() {
    const body = $("#chatBody");
    const chat = getData(STORAGE_KEYS.chat);
    body.innerHTML = "";

    if (!chat.length) {
        addChatMessage("bot", "Hello! Welcome to Benchmark College Live Support. Type your question to begin.", true);
        return;
    }

    chat.forEach(message => {
        addChatMessage(message.sender, message.text, false);
    });
}

$("#chatLauncher").addEventListener("click", () => {
    $("#chatWidget").classList.toggle("open");
});

$("#closeChat").addEventListener("click", () => {
    $("#chatWidget").classList.remove("open");
});

$("#chatForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = $("#chatMessage");
    const text = input.value.trim();

    if (!text) return;

    addChatMessage("user", text);
    input.value = "";

    setTimeout(() => {
        const lower = text.toLowerCase();
        let reply;

        if (lower.includes("admission") || lower.includes("apply")) {
            reply = "Admissions support: call +256 701 555 999 or email admissions@benchmarkcollege.ac.ug. You can also book an appointment.";
        } else if (lower.includes("fee") || lower.includes("finance") || lower.includes("payment")) {
            reply = "Finance support: contact finance@benchmarkcollege.ac.ug or submit a finance ticket with your payment details.";
        } else if (lower.includes("result") || lower.includes("portal")) {
            reply = "Results and portal support: contact ICT Support or submit a support ticket from this page.";
        } else if (lower.includes("research")) {
            reply = "Research support: email research@benchmarkcollege.ac.ug or contact the Research Office in the Innovation Hub.";
        } else if (lower.includes("emergency")) {
            reply = "Emergency contacts: Security +256 777 911 911, Medical Centre +256 777 222 333.";
        } else {
            reply = botReplies[Math.floor(Math.random() * botReplies.length)];
        }

        addChatMessage("bot", reply);
        showToast("New live chat response received.");
    }, 900);
});

// ================= DATE DISPLAY =================
function setDateInfo() {
    const date = new Date();

    $("#currentDay").textContent = date.toLocaleDateString(undefined, {
        weekday: "long"
    });

    $("#currentDate").textContent = date.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const dateInput = $("#appointmentDate");
    dateInput.min = todayString();
}

// ================= INIT =================
function init() {
    renderDepartments();
    renderStaff();
    renderFaq();
    generateCaptcha();
    renderTickets();
    renderMessageTable();
    updateDashboard();
    loadChatHistory();
    setDateInfo();

    setTimeout(() => {
        showToast("Welcome to Benchmark College Contact Centre.");
    }, 1000);

    setInterval(() => {
        const notifications = [
            "Admissions Office is available for inquiries.",
            "ICT Help Desk is monitoring support tickets.",
            "You can use WhatsApp for quick responses.",
            "Remember to include your student number when requesting support."
        ];

        const random = notifications[Math.floor(Math.random() * notifications.length)];
        showToast(random);
    }, 45000);
}

document.addEventListener("DOMContentLoaded", init);