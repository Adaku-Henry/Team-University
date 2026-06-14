const programs = [
    {
        code: "BBTC-CERT-001",
        title: "Certificate in Computer Applications",
        school: "ict",
        level: "Certificate",
        duration: "6 Months",
        semesters: 1,
        mode: "Day / Evening / Weekend",
        fee: 550000,
        feeText: "UGX 550,000 / Semester",
        badge: "Digital Starter",
        summary: "A practical beginner programme for learners who want office computer skills, internet productivity and digital confidence.",
        qualification: "UCE or equivalent qualification. Adult learners with basic literacy may be considered.",
        requirements: ["UCE certificate or equivalent", "Basic English communication", "Interest in computer use", "No prior ICT experience required"],
        modules: ["Computer Fundamentals", "Microsoft Office", "Internet and Email", "Digital Safety", "Typing and Document Production"],
        careers: ["Office Assistant", "Data Clerk", "Computer Lab Assistant", "Digital Records Assistant"],
        skills: ["Typing", "Office productivity", "Internet research", "Digital communication"],
        scholarship: "Youth Digital Skills Bursary",
        innovation: "Students build a digital portfolio and professional CV before completion."
    },
    {
        code: "BBTC-CERT-002",
        title: "Certificate in Business Administration",
        school: "business",
        level: "Certificate",
        duration: "1 Year",
        semesters: 2,
        mode: "Day / Weekend",
        fee: 650000,
        feeText: "UGX 650,000 / Semester",
        badge: "Business Starter",
        summary: "Introduces learners to business operations, customer care, records management and entrepreneurship.",
        qualification: "UCE or equivalent qualification.",
        requirements: ["UCE or equivalent", "Basic numeracy", "Basic English", "Interest in business or enterprise"],
        modules: ["Principles of Business", "Customer Care", "Business Communication", "Bookkeeping", "Entrepreneurship"],
        careers: ["Business Assistant", "Sales Assistant", "Office Clerk", "Small Business Owner"],
        skills: ["Customer service", "Basic bookkeeping", "Business writing", "Enterprise thinking"],
        scholarship: "Need-Based Business Support",
        innovation: "Learners create a micro-business launch plan."
    },
    {
        code: "BBTC-CERT-003",
        title: "Certificate in Plumbing and Water Systems",
        school: "technical",
        level: "Certificate",
        duration: "1 Year",
        semesters: 2,
        mode: "Day / Weekend",
        fee: 700000,
        feeText: "UGX 700,000 / Semester",
        badge: "Hands-On Trade",
        summary: "A practical trade programme focused on plumbing installation, maintenance and safe water systems.",
        qualification: "UCE or equivalent. Practical skills background is an added advantage.",
        requirements: ["UCE or equivalent", "Ability to participate in workshop practice", "Interest in technical work", "Safety awareness"],
        modules: ["Pipe Fitting", "Drainage Systems", "Water Supply Systems", "Workshop Safety", "Plumbing Drawing"],
        careers: ["Plumber", "Maintenance Technician", "Water Systems Assistant", "Self-Employed Artisan"],
        skills: ["Pipe installation", "Leak repair", "Tool handling", "Technical drawing"],
        scholarship: "Skilled Trades Support Fund",
        innovation: "Students complete real-world installation simulations."
    },
    {
        code: "BBTC-CERT-004",
        title: "Certificate in Electrical Installation",
        school: "technical",
        level: "Certificate",
        duration: "1 Year",
        semesters: 2,
        mode: "Day / Weekend",
        fee: 760000,
        feeText: "UGX 760,000 / Semester",
        badge: "High Demand",
        summary: "Prepares learners for domestic and commercial electrical installation, maintenance and safety compliance.",
        qualification: "UCE or equivalent qualification with basic mathematics recommended.",
        requirements: ["UCE or equivalent", "Mathematics recommended", "Workshop readiness", "Safety discipline"],
        modules: ["Electrical Principles", "Domestic Wiring", "Installation Practice", "Electrical Safety", "Fault Diagnosis"],
        careers: ["Electrical Installer", "Maintenance Assistant", "Workshop Technician", "Self-Employed Electrician"],
        skills: ["Wiring", "Fault finding", "Circuit testing", "Safety compliance"],
        scholarship: "Technical Skills Scholarship",
        innovation: "Includes energy-saving and solar wiring awareness."
    },
    {
        code: "BBTC-CERT-005",
        title: "Certificate in Catering and Hotel Operations",
        school: "hospitality",
        level: "Certificate",
        duration: "1 Year",
        semesters: 2,
        mode: "Day / Weekend",
        fee: 720000,
        feeText: "UGX 720,000 / Semester",
        badge: "Hospitality",
        summary: "Builds practical skills in food production, service, housekeeping and hotel customer care.",
        qualification: "UCE or equivalent qualification.",
        requirements: ["UCE or equivalent", "Good hygiene standards", "Communication skills", "Passion for hospitality"],
        modules: ["Food Production", "Restaurant Service", "Housekeeping", "Front Office Basics", "Hospitality Hygiene"],
        careers: ["Chef Assistant", "Hotel Attendant", "Waiter / Waitress", "Guest Service Assistant"],
        skills: ["Food preparation", "Service etiquette", "Housekeeping", "Guest relations"],
        scholarship: "Hospitality Talent Award",
        innovation: "Students host a mini restaurant service day."
    },
    {
        code: "BBTC-DIP-006",
        title: "Diploma in Information Technology",
        school: "ict",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Evening / Weekend",
        fee: 1200000,
        feeText: "UGX 1,200,000 / Semester",
        badge: "Popular",
        summary: "A broad ICT programme covering software, hardware, networking, databases and user support.",
        qualification: "UCE with relevant passes or certificate in ICT-related field.",
        requirements: ["UCE or equivalent", "Pass in Mathematics or ICT preferred", "Certificate holders may apply", "Basic computer knowledge recommended"],
        modules: ["Programming", "Computer Networks", "Database Systems", "Web Design", "IT Support"],
        careers: ["IT Officer", "Systems Assistant", "Network Technician", "Database Assistant"],
        skills: ["Programming", "Troubleshooting", "Networking", "Database management"],
        scholarship: "ICT Merit Scholarship",
        innovation: "Includes practical helpdesk simulation and cloud productivity tools."
    },
    {
        code: "BBTC-DIP-007",
        title: "Diploma in Cyber Security and Digital Forensics",
        school: "ict",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Evening / Weekend / Blended",
        fee: 1450000,
        feeText: "UGX 1,450,000 / Semester",
        badge: "Future Career",
        summary: "A security-focused programme in ethical hacking, cyber defence, digital evidence and secure systems.",
        qualification: "UCE or certificate/diploma background in ICT. Mathematics or computer studies is recommended.",
        requirements: ["UCE or equivalent", "Computer knowledge required", "Ethical conduct", "Interest in cybersecurity"],
        modules: ["Network Security", "Ethical Hacking", "Digital Forensics", "Cyber Law", "Incident Response"],
        careers: ["Cybersecurity Assistant", "SOC Technician", "Digital Forensics Assistant", "Security Support Officer"],
        skills: ["Threat analysis", "Security testing", "Evidence handling", "Incident response"],
        scholarship: "Cyber Talent Scholarship",
        innovation: "Includes cyber range lab challenges and simulated attacks."
    },
    {
        code: "BBTC-DIP-008",
        title: "Diploma in Business Administration",
        school: "business",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Evening / Weekend",
        fee: 1000000,
        feeText: "UGX 1,000,000 / Semester",
        badge: "Enterprise Core",
        summary: "Develops management, operations, leadership and enterprise administration skills.",
        qualification: "UCE or certificate in business-related field.",
        requirements: ["UCE or equivalent", "Business certificate accepted", "Communication skills", "Basic numeracy"],
        modules: ["Management Principles", "Business Law", "Marketing", "Operations Management", "Entrepreneurship"],
        careers: ["Administrator", "Operations Assistant", "Business Officer", "Entrepreneur"],
        skills: ["Management", "Planning", "Business communication", "Team leadership"],
        scholarship: "Women in Business Scholarship",
        innovation: "Students design a business process improvement project."
    },
    {
        code: "BBTC-DIP-009",
        title: "Diploma in Accounting and Finance",
        school: "business",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Evening / Weekend",
        fee: 1050000,
        feeText: "UGX 1,050,000 / Semester",
        badge: "Finance",
        summary: "Prepares learners for accounting, taxation, financial reporting, budgeting and audit support roles.",
        qualification: "UCE with mathematics or certificate in accounting/business field.",
        requirements: ["UCE or equivalent", "Mathematics recommended", "Basic business awareness", "Integrity and accuracy"],
        modules: ["Financial Accounting", "Cost Accounting", "Taxation", "Auditing", "Computerised Accounting"],
        careers: ["Accounts Assistant", "Cashier", "Audit Assistant", "Finance Clerk"],
        skills: ["Bookkeeping", "Financial reporting", "Budgeting", "Accounting software"],
        scholarship: "Accounting Excellence Award",
        innovation: "Includes practical accounting software lab."
    },
    {
        code: "BBTC-DIP-010",
        title: "Diploma in Procurement and Logistics Management",
        school: "business",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 1100000,
        feeText: "UGX 1,100,000 / Semester",
        badge: "Supply Chain",
        summary: "Focuses on purchasing, stores management, logistics, contracts and supply chain efficiency.",
        qualification: "UCE or certificate qualification in business, stores or logistics.",
        requirements: ["UCE or equivalent", "Business certificate accepted", "Numeracy skills", "Interest in supply chains"],
        modules: ["Procurement Principles", "Stores Management", "Logistics", "Contract Management", "Inventory Control"],
        careers: ["Procurement Assistant", "Stores Officer", "Logistics Assistant", "Inventory Clerk"],
        skills: ["Supplier evaluation", "Stock control", "Tender preparation", "Logistics planning"],
        scholarship: "Supply Chain Support Grant",
        innovation: "Students use digital inventory simulation tools."
    },
    {
        code: "BBTC-DIP-011",
        title: "Diploma in Human Resource Management",
        school: "business",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Evening / Weekend",
        fee: 980000,
        feeText: "UGX 980,000 / Semester",
        badge: "People Leadership",
        summary: "Trains students in recruitment, performance management, workplace relations and staff development.",
        qualification: "UCE or relevant certificate qualification.",
        requirements: ["UCE or equivalent", "Good communication", "Interest in people management", "Basic office skills"],
        modules: ["Human Resource Planning", "Recruitment", "Labour Law", "Performance Management", "Training and Development"],
        careers: ["HR Assistant", "Recruitment Assistant", "Training Assistant", "Administrative Officer"],
        skills: ["Interviewing", "HR records", "Employee relations", "Policy support"],
        scholarship: "Leadership and Service Scholarship",
        innovation: "Includes mock interviews and digital HR records practice."
    },
    {
        code: "BBTC-DIP-012",
        title: "Diploma in Entrepreneurship and Innovation",
        school: "business",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend / Blended",
        fee: 1020000,
        feeText: "UGX 1,020,000 / Semester",
        badge: "Startup Lab",
        summary: "Designed for future founders, innovators and small business owners who want to build sustainable enterprises.",
        qualification: "UCE or equivalent. Existing small business owners may apply.",
        requirements: ["UCE or equivalent", "Business idea or interest", "Communication skills", "Creativity"],
        modules: ["Startup Creation", "Innovation Design", "Digital Marketing", "Business Finance", "Pitching"],
        careers: ["Entrepreneur", "Innovation Officer", "Business Development Assistant", "Startup Founder"],
        skills: ["Business modelling", "Pitching", "Digital selling", "Market testing"],
        scholarship: "Startup Founder Bursary",
        innovation: "Students graduate with a tested business prototype."
    },
    {
        code: "BBTC-DIP-013",
        title: "Diploma in Secretarial and Office Administration",
        school: "business",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Evening",
        fee: 850000,
        feeText: "UGX 850,000 / Semester",
        badge: "Office Pro",
        summary: "Develops professional office management, records, communication, typing and executive support skills.",
        qualification: "UCE or certificate in office practice/business studies.",
        requirements: ["UCE or equivalent", "Typing interest", "Good communication", "Professional attitude"],
        modules: ["Office Practice", "Records Management", "Business Communication", "Typing", "Customer Care"],
        careers: ["Secretary", "Office Administrator", "Receptionist", "Records Assistant"],
        skills: ["Document preparation", "Scheduling", "Filing", "Front desk service"],
        scholarship: "Professional Office Skills Award",
        innovation: "Includes executive office simulation."
    },
    {
        code: "BBTC-DIP-014",
        title: "Diploma in Tourism and Hospitality Management",
        school: "hospitality",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 1150000,
        feeText: "UGX 1,150,000 / Semester",
        badge: "Tourism Economy",
        summary: "Prepares learners for tourism operations, hotel management, travel services and guest experience leadership.",
        qualification: "UCE or certificate in hospitality, tourism or related field.",
        requirements: ["UCE or equivalent", "Communication skills", "Hospitality certificate accepted", "Customer service attitude"],
        modules: ["Tour Guiding", "Hotel Operations", "Travel Agency Practice", "Food and Beverage", "Tourism Marketing"],
        careers: ["Hotel Supervisor", "Tour Guide", "Travel Consultant", "Guest Relations Officer"],
        skills: ["Tour planning", "Guest handling", "Hotel supervision", "Service marketing"],
        scholarship: "Tourism Talent Scholarship",
        innovation: "Students design a local tourism product."
    },
    {
        code: "BBTC-DIP-015",
        title: "Diploma in Electrical Engineering",
        school: "technical",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 1350000,
        feeText: "UGX 1,350,000 / Semester",
        badge: "Engineering",
        summary: "Covers electrical systems, industrial installation, power distribution, electronics and maintenance.",
        qualification: "UCE with mathematics/physics recommended or certificate in electrical installation.",
        requirements: ["UCE or equivalent", "Mathematics recommended", "Electrical certificate accepted", "Workshop safety readiness"],
        modules: ["Electrical Machines", "Power Systems", "Electronics", "Industrial Wiring", "Maintenance Practice"],
        careers: ["Electrical Technician", "Maintenance Technician", "Power Systems Assistant", "Installation Supervisor"],
        skills: ["Industrial wiring", "Testing", "Maintenance", "Power systems support"],
        scholarship: "Engineering Skills Grant",
        innovation: "Includes solar and energy efficiency practical projects."
    },
    {
        code: "BBTC-DIP-016",
        title: "Diploma in Civil Engineering and Building Construction",
        school: "technical",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 1300000,
        feeText: "UGX 1,300,000 / Semester",
        badge: "Construction",
        summary: "Builds construction, site supervision, materials, surveying and structural drawing skills.",
        qualification: "UCE or certificate in building construction, plumbing, carpentry or related trade.",
        requirements: ["UCE or equivalent", "Mathematics recommended", "Technical drawing interest", "Site practice readiness"],
        modules: ["Building Construction", "Surveying", "Construction Materials", "Structural Drawing", "Site Management"],
        careers: ["Site Supervisor", "Construction Technician", "Survey Assistant", "Clerk of Works Assistant"],
        skills: ["Site planning", "Measurement", "Construction drawing", "Materials testing"],
        scholarship: "Infrastructure Skills Scholarship",
        innovation: "Students model a low-cost sustainable building project."
    },
    {
        code: "BBTC-DIP-017",
        title: "Diploma in Automotive Mechanics",
        school: "technical",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 1250000,
        feeText: "UGX 1,250,000 / Semester",
        badge: "Garage Lab",
        summary: "A practical automotive programme in vehicle systems, diagnostics, repair and workshop management.",
        qualification: "UCE or certificate in automotive/mechanical field.",
        requirements: ["UCE or equivalent", "Workshop interest", "Automotive certificate accepted", "Safety discipline"],
        modules: ["Engine Systems", "Vehicle Electronics", "Diagnostics", "Transmission Systems", "Workshop Management"],
        careers: ["Auto Mechanic", "Garage Supervisor", "Vehicle Diagnostic Assistant", "Fleet Maintenance Assistant"],
        skills: ["Diagnostics", "Repair", "Service planning", "Tool handling"],
        scholarship: "Youth Mechanics Development Fund",
        innovation: "Includes digital vehicle diagnostic practice."
    },
    {
        code: "BBTC-DIP-018",
        title: "Diploma in Fashion and Garment Design",
        school: "technical",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 900000,
        feeText: "UGX 900,000 / Semester",
        badge: "Creative Industry",
        summary: "Combines garment construction, fashion illustration, tailoring, branding and fashion entrepreneurship.",
        qualification: "UCE or certificate in tailoring/fashion/design.",
        requirements: ["UCE or equivalent", "Creativity", "Fashion certificate accepted", "Portfolio is an advantage"],
        modules: ["Pattern Drafting", "Garment Construction", "Fashion Illustration", "Textile Studies", "Fashion Business"],
        careers: ["Fashion Designer", "Tailor", "Garment Producer", "Fashion Entrepreneur"],
        skills: ["Pattern making", "Sewing", "Fashion branding", "Product design"],
        scholarship: "Creative Women and Youth Grant",
        innovation: "Students stage a mini fashion showcase."
    },
    {
        code: "BBTC-DIP-019",
        title: "Diploma in Journalism and Multimedia Production",
        school: "media",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend / Blended",
        fee: 1150000,
        feeText: "UGX 1,150,000 / Semester",
        badge: "Media Studio",
        summary: "Trains students in reporting, video production, radio, photography, digital storytelling and public communication.",
        qualification: "UCE or certificate in media/communication field.",
        requirements: ["UCE or equivalent", "Good English", "Interest in storytelling", "Media certificate accepted"],
        modules: ["News Writing", "Radio Production", "Video Editing", "Photography", "Digital Media"],
        careers: ["Journalist", "Content Creator", "Radio Presenter", "Public Relations Assistant"],
        skills: ["Reporting", "Editing", "Camera work", "Digital publishing"],
        scholarship: "Media Excellence Scholarship",
        innovation: "Students operate a simulated campus newsroom."
    },
    {
        code: "BBTC-DIP-020",
        title: "Diploma in Social Work and Community Development",
        school: "social",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 950000,
        feeText: "UGX 950,000 / Semester",
        badge: "Community Impact",
        summary: "Prepares students to support communities, NGOs, social services, advocacy and development projects.",
        qualification: "UCE or certificate in social/community development field.",
        requirements: ["UCE or equivalent", "Communication skills", "Community interest", "Certificate holders accepted"],
        modules: ["Social Work Practice", "Community Mobilisation", "Project Planning", "Counselling Basics", "Human Rights"],
        careers: ["Community Development Officer", "NGO Assistant", "Social Worker Assistant", "Project Assistant"],
        skills: ["Mobilisation", "Case support", "Project reporting", "Community research"],
        scholarship: "Community Service Scholarship",
        innovation: "Students design a community action project."
    },
    {
        code: "BBTC-DIP-021",
        title: "Diploma in Early Childhood Education",
        school: "education",
        level: "Diploma",
        duration: "2 Years",
        semesters: 4,
        mode: "Day / Weekend",
        fee: 920000,
        feeText: "UGX 920,000 / Semester",
        badge: "Teaching",
        summary: "Develops early childhood teaching, child development, classroom care and learning material design skills.",
        qualification: "UCE or certificate in education/childcare field.",
        requirements: ["UCE or equivalent", "Interest in teaching children", "Good communication", "Childcare certificate accepted"],
        modules: ["Child Development", "Teaching Methods", "Play-Based Learning", "Classroom Management", "Learning Materials"],
        careers: ["Nursery Teacher", "Childcare Assistant", "ECD Centre Manager", "Teaching Assistant"],
        skills: ["Lesson planning", "Child observation", "Classroom care", "Creative teaching"],
        scholarship: "Teacher Development Scholarship",
        innovation: "Students create low-cost learning materials from local resources."
    },
    {
        code: "BBTC-BACH-022",
        title: "Bachelor of Business Administration",
        school: "business",
        level: "Bachelor",
        duration: "3 Years",
        semesters: 6,
        mode: "Day / Evening / Weekend",
        fee: 1600000,
        feeText: "UGX 1,600,000 / Semester",
        badge: "Leadership Degree",
        summary: "A broad business degree in management, finance, marketing, strategy, operations and entrepreneurship.",
        qualification: "UACE with principal passes, diploma qualification, or recognised equivalent.",
        requirements: ["UACE with required principal passes", "Diploma holders accepted", "Business background is an advantage", "Mature entry may be considered"],
        modules: ["Strategic Management", "Marketing Management", "Corporate Finance", "Business Research", "Entrepreneurship"],
        careers: ["Business Manager", "Administrator", "Marketing Officer", "Operations Manager"],
        skills: ["Leadership", "Strategic planning", "Financial decision-making", "Business analysis"],
        scholarship: "Business Leadership Scholarship",
        innovation: "Includes enterprise consulting projects with local businesses."
    },
    {
        code: "BBTC-BACH-023",
        title: "Bachelor of Information Systems and Business Technology",
        school: "ict",
        level: "Bachelor",
        duration: "3 Years",
        semesters: 6,
        mode: "Day / Evening / Blended",
        fee: 1750000,
        feeText: "UGX 1,750,000 / Semester",
        badge: "Tech + Business",
        summary: "Combines information systems, business processes, analytics, software tools and digital transformation.",
        qualification: "UACE with relevant passes, diploma in ICT/business, or recognised equivalent.",
        requirements: ["UACE or diploma qualification", "Mathematics/ICT recommended", "Computer literacy", "Interest in business technology"],
        modules: ["Systems Analysis", "Business Analytics", "Enterprise Systems", "Database Management", "Digital Transformation"],
        careers: ["Systems Analyst", "Business Analyst", "IT Project Assistant", "Digital Transformation Officer"],
        skills: ["Data analysis", "Systems design", "Process improvement", "Technology strategy"],
        scholarship: "Digital Enterprise Scholarship",
        innovation: "Students build a business dashboard and automation prototype."
    },
    {
        code: "BBTC-BACH-024",
        title: "Bachelor of Education in Vocational Studies",
        school: "education",
        level: "Bachelor",
        duration: "3 Years",
        semesters: 6,
        mode: "Weekend / Blended",
        fee: 1500000,
        feeText: "UGX 1,500,000 / Semester",
        badge: "TVET Teacher",
        summary: "Designed for vocational instructors, trainers and technical educators who want professional teaching competence.",
        qualification: "UACE, diploma, or recognised technical/vocational qualification.",
        requirements: ["UACE or diploma qualification", "Technical/vocational background", "Teaching interest", "Work experience is an advantage"],
        modules: ["Vocational Pedagogy", "Curriculum Design", "Assessment Methods", "Workshop Instruction", "Education Technology"],
        careers: ["Vocational Teacher", "Training Officer", "Curriculum Developer", "TVET Centre Coordinator"],
        skills: ["Instructional design", "Assessment", "Workshop teaching", "Learner support"],
        scholarship: "TVET Instructor Development Grant",
        innovation: "Includes digital lesson design and competency-based training projects."
    },
    {
        code: "BBTC-MAST-025",
        title: "Master of Business Leadership and Entrepreneurship",
        school: "graduate",
        level: "Master",
        duration: "2 Years",
        semesters: 4,
        mode: "Evening / Weekend / Blended",
        fee: 2500000,
        feeText: "UGX 2,500,000 / Semester",
        badge: "Executive",
        summary: "A professional graduate programme for managers, founders and leaders focused on strategy, innovation and enterprise growth.",
        qualification: "Recognised bachelor degree or equivalent professional qualification. Work experience is recommended.",
        requirements: ["Bachelor degree from a recognised institution", "Updated CV", "Professional or leadership experience recommended", "Two academic/professional referees may be required"],
        modules: ["Strategic Leadership", "Entrepreneurial Finance", "Innovation Management", "Business Research", "Enterprise Growth"],
        careers: ["Business Leader", "Entrepreneur", "Consultant", "Operations Director"],
        skills: ["Strategic leadership", "Innovation management", "Executive decision-making", "Business growth planning"],
        scholarship: "Graduate Merit and Leadership Scholarship",
        innovation: "Learners develop an investable enterprise growth strategy."
    }
];

let filteredPrograms = [...programs];
let compareList = [];
let bookmarks = JSON.parse(localStorage.getItem("bbtcBookmarks")) || [];

const grid = document.getElementById("programGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchProgram");
const schoolFilter = document.getElementById("filterSchool");
const levelFilter = document.getElementById("filterLevel");
const modeFilter = document.getElementById("filterMode");
const sortPrograms = document.getElementById("sortPrograms");
const resultCount = document.getElementById("resultCount");
const totalPrograms = document.getElementById("totalPrograms");

const detailsModal = document.getElementById("detailsModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const compareDrawer = document.getElementById("compareDrawer");
const compareContent = document.getElementById("compareContent");

totalPrograms.textContent = programs.length;

function moneyNumber(value) {
    return Number(value || 0);
}

function listItems(items) {
    return items.map(item => `<li>${item}</li>`).join("");
}

function tagItems(items) {
    return items.map(item => `<span class="tag">${item}</span>`).join("");
}

function renderPrograms(data = filteredPrograms) {
    grid.innerHTML = "";

    if (!data.length) {
        emptyState.style.display = "block";
        resultCount.textContent = 0;
        return;
    }

    emptyState.style.display = "none";
    resultCount.textContent = data.length;

    data.forEach(program => {
        const saved = bookmarks.includes(program.code);
        const selected = compareList.includes(program.code);

        const card = document.createElement("article");
        card.className = "program-sheet";
        card.innerHTML = `
            <div class="sheet-top">
                <div class="sheet-code">
                    <span>${program.code}</span>
                    <button class="bookmark ${saved ? "saved" : ""}" data-action="bookmark" data-code="${program.code}">
                        ${saved ? "Saved" : "Save"}
                    </button>
                </div>

                <h3>${program.title}</h3>
                <p>${program.summary}</p>
            </div>

            <div class="sheet-meta">
                <div class="meta-item">
                    <small>Level</small>
                    <strong>${program.level}</strong>
                </div>

                <div class="meta-item">
                    <small>Duration</small>
                    <strong>${program.duration}</strong>
                </div>

                <div class="meta-item">
                    <small>Study Mode</small>
                    <strong>${program.mode}</strong>
                </div>

                <div class="meta-item">
                    <small>Tuition</small>
                    <strong>${program.feeText}</strong>
                </div>
            </div>

            <div class="sheet-body">
                <div class="pdf-section">
                    <h4>🎓 Minimum Qualification</h4>
                    <p>${program.qualification}</p>
                </div>

                <div class="pdf-section">
                    <h4>📌 Entry Requirements</h4>
                    <ul>${listItems(program.requirements)}</ul>
                </div>

                <div class="pdf-section">
                    <h4>📚 Key Learning Areas</h4>
                    <ul>${listItems(program.modules.slice(0, 5))}</ul>
                </div>

                <div class="pdf-section">
                    <h4>💼 Career Pathways</h4>
                    <div class="tag-row">${tagItems(program.careers)}</div>
                </div>

                <div class="pdf-section">
                    <h4>🚀 Creative Advantage</h4>
                    <p>${program.innovation}</p>
                </div>

                <div class="pdf-section">
                    <h4>🎁 Scholarship / Support</h4>
                    <p>${program.scholarship}</p>
                </div>
            </div>

            <div class="sheet-footer">
                <button class="details-btn" data-action="details" data-code="${program.code}">View Details</button>
                <button class="compare-btn ${selected ? "selected" : ""}" data-action="compare" data-code="${program.code}">
                    ${selected ? "Selected" : "Compare"}
                </button>
                <button class="apply-btn" data-action="apply" data-code="${program.code}">Apply</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const school = schoolFilter.value;
    const level = levelFilter.value;
    const mode = modeFilter.value;

    filteredPrograms = programs.filter(program => {
        const searchable = `
            ${program.title}
            ${program.code}
            ${program.school}
            ${program.level}
            ${program.mode}
            ${program.summary}
            ${program.qualification}
            ${program.requirements.join(" ")}
            ${program.modules.join(" ")}
            ${program.careers.join(" ")}
            ${program.skills.join(" ")}
            ${program.scholarship}
        `.toLowerCase();

        const matchesSearch = searchable.includes(query);
        const matchesSchool = school === "all" || program.school === school;
        const matchesLevel = level === "all" || program.level === level;
        const matchesMode = mode === "all" || program.mode.includes(mode);

        return matchesSearch && matchesSchool && matchesLevel && matchesMode;
    });

    sortFilteredPrograms();
    renderPrograms(filteredPrograms);
}

function sortFilteredPrograms() {
    const sortValue = sortPrograms.value;

    if (sortValue === "title") {
        filteredPrograms.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortValue === "feeLow") {
        filteredPrograms.sort((a, b) => moneyNumber(a.fee) - moneyNumber(b.fee));
    }

    if (sortValue === "duration") {
        filteredPrograms.sort((a, b) => a.semesters - b.semesters);
    }

    if (sortValue === "default") {
        filteredPrograms.sort((a, b) => programs.indexOf(a) - programs.indexOf(b));
    }
}

function getProgram(code) {
    return programs.find(program => program.code === code);
}

function openDetails(code) {
    const program = getProgram(code);
    if (!program) return;

    modalBody.innerHTML = `
        <div class="modal-inner">
            <div class="modal-hero">
                <span>${program.code} • ${program.badge}</span>
                <h2>${program.title}</h2>
                <p>${program.summary}</p>
            </div>

            <div class="modal-grid">
                <div class="modal-box">
                    <h3>Programme Identity</h3>
                    <p><strong>School:</strong> ${schoolName(program.school)}</p>
                    <p><strong>Level:</strong> ${program.level}</p>
                    <p><strong>Duration:</strong> ${program.duration}</p>
                    <p><strong>Study Mode:</strong> ${program.mode}</p>
                    <p><strong>Tuition:</strong> ${program.feeText}</p>
                </div>

                <div class="modal-box">
                    <h3>Minimum Qualification</h3>
                    <p>${program.qualification}</p>
                </div>

                <div class="modal-box">
                    <h3>Entry Requirements</h3>
                    <ul>${listItems(program.requirements)}</ul>
                </div>

                <div class="modal-box">
                    <h3>Core Modules</h3>
                    <ul>${listItems(program.modules)}</ul>
                </div>

                <div class="modal-box">
                    <h3>Practical Skills</h3>
                    <ul>${listItems(program.skills)}</ul>
                </div>

                <div class="modal-box">
                    <h3>Career Opportunities</h3>
                    <ul>${listItems(program.careers)}</ul>
                </div>

                <div class="modal-box">
                    <h3>Scholarship / Support</h3>
                    <p>${program.scholarship}</p>
                </div>

                <div class="modal-box">
                    <h3>Enterprise Creative Advantage</h3>
                    <p>${program.innovation}</p>
                </div>
            </div>

            <div class="modal-actions">
                <button class="apply-btn" onclick="applyProgram('${program.code}')">Apply for This Programme</button>
                <button class="compare-btn" onclick="toggleCompare('${program.code}')">Add to Compare</button>
                <button class="details-btn" onclick="window.print()">Print PDF View</button>
            </div>
        </div>
    `;

    detailsModal.classList.add("show");
}

function schoolName(school) {
    const names = {
        business: "School of Business",
        ict: "School of ICT and Digital Innovation",
        technical: "School of Technical and Vocational Studies",
        hospitality: "School of Hospitality and Tourism",
        education: "School of Education",
        media: "School of Media and Communication",
        social: "School of Social and Community Development",
        graduate: "Graduate and Professional School"
    };

    return names[school] || school;
}

function toggleBookmark(code) {
    if (bookmarks.includes(code)) {
        bookmarks = bookmarks.filter(item => item !== code);
        showToast("Programme removed from bookmarks");
    } else {
        bookmarks.push(code);
        showToast("Programme saved to bookmarks");
    }

    localStorage.setItem("bbtcBookmarks", JSON.stringify(bookmarks));
    renderPrograms(filteredPrograms);
}

function toggleCompare(code) {
    if (compareList.includes(code)) {
        compareList = compareList.filter(item => item !== code);
        showToast("Programme removed from comparison");
    } else {
        if (compareList.length >= 3) {
            showToast("You can compare only 3 programmes at a time");
            return;
        }

        compareList.push(code);
        showToast("Programme added to comparison");
    }

    renderPrograms(filteredPrograms);
}

function openCompare() {
    if (!compareList.length) {
        compareContent.innerHTML = `
            <p>No programme selected yet. Use the Compare button on any programme.</p>
        `;
        compareDrawer.classList.add("show");
        return;
    }

    const selectedPrograms = compareList.map(getProgram).filter(Boolean);

    compareContent.innerHTML = `
        <table class="compare-table">
            <tr>
                <th>Field</th>
                ${selectedPrograms.map(p => `<th>${p.title}</th>`).join("")}
            </tr>

            <tr>
                <td>Code</td>
                ${selectedPrograms.map(p => `<td>${p.code}</td>`).join("")}
            </tr>

            <tr>
                <td>Level</td>
                ${selectedPrograms.map(p => `<td>${p.level}</td>`).join("")}
            </tr>

            <tr>
                <td>Duration</td>
                ${selectedPrograms.map(p => `<td>${p.duration}</td>`).join("")}
            </tr>

            <tr>
                <td>Mode</td>
                ${selectedPrograms.map(p => `<td>${p.mode}</td>`).join("")}
            </tr>

            <tr>
                <td>Tuition</td>
                ${selectedPrograms.map(p => `<td>${p.feeText}</td>`).join("")}
            </tr>

            <tr>
                <td>Qualification</td>
                ${selectedPrograms.map(p => `<td>${p.qualification}</td>`).join("")}
            </tr>

            <tr>
                <td>Careers</td>
                ${selectedPrograms.map(p => `<td>${p.careers.join(", ")}</td>`).join("")}
            </tr>

            <tr>
                <td>Scholarship</td>
                ${selectedPrograms.map(p => `<td>${p.scholarship}</td>`).join("")}
            </tr>
        </table>
    `;

    compareDrawer.classList.add("show");
}

function applyProgram(code) {
    const program = getProgram(code);
    if (!program) return;

    localStorage.setItem("selectedProgramme", JSON.stringify(program));

    showToast(`${program.title} selected for application`);

    setTimeout(() => {
        alert(
            `Programme Selected:\n\n${program.title}\n${program.code}\n\nThis selection has been saved. Connect this button to your application form page when ready.`
        );
    }, 300);
}

function resetFilters() {
    searchInput.value = "";
    schoolFilter.value = "all";
    levelFilter.value = "all";
    modeFilter.value = "all";
    sortPrograms.value = "default";
    filteredPrograms = [...programs];
    renderPrograms(filteredPrograms);
}

function showToast(message) {
    const oldToast = document.querySelector(".toast");
    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2600);
}

grid.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    const action = button.dataset.action;
    const code = button.dataset.code;

    if (action === "details") openDetails(code);
    if (action === "bookmark") toggleBookmark(code);
    if (action === "compare") toggleCompare(code);
    if (action === "apply") applyProgram(code);
});

searchInput.addEventListener("input", applyFilters);
schoolFilter.addEventListener("change", applyFilters);
levelFilter.addEventListener("change", applyFilters);
modeFilter.addEventListener("change", applyFilters);
sortPrograms.addEventListener("change", applyFilters);

document.getElementById("resetBtn").addEventListener("click", resetFilters);

document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("downloadPdfBtn").addEventListener("click", () => window.print());

document.getElementById("openCompareBtn").addEventListener("click", openCompare);

document.getElementById("closeCompare").addEventListener("click", () => {
    compareDrawer.classList.remove("show");
});

document.getElementById("clearBookmarksBtn").addEventListener("click", () => {
    bookmarks = [];
    localStorage.removeItem("bbtcBookmarks");
    renderPrograms(filteredPrograms);
    showToast("All bookmarks cleared");
});

closeModal.addEventListener("click", () => {
    detailsModal.classList.remove("show");
});

detailsModal.addEventListener("click", event => {
    if (event.target === detailsModal) {
        detailsModal.classList.remove("show");
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        detailsModal.classList.remove("show");
        compareDrawer.classList.remove("show");
    }
});

renderPrograms();