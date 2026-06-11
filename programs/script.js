function applyProgram(program) {
    localStorage.setItem("selectedProgram", program);
    window.location.href = "application.html";
}

// FILTER SYSTEM
const search = document.getElementById("searchProgram");
const filter = document.getElementById("filterSchool");

search.addEventListener("input", filterPrograms);
filter.addEventListener("change", filterPrograms);

function filterPrograms() {
    const text = search.value.toLowerCase();
    const value = filter.value;

    document.querySelectorAll(".program-card").forEach(card => {
        const matchText = card.innerText.toLowerCase().includes(text);
        const matchSchool = value === "all" || card.dataset.school === value;

        card.style.display = (matchText && matchSchool) ? "block" : "none";
    });
}