const formMain = document.getElementById("formMain");
const nameTask = document.getElementById("nameTask");
const description = document.getElementById("description");
const selecPriority = document.getElementById("selecPriority");

const taskList2 = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ================= UTILIDADES ================= */

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateId() {
    return crypto.randomUUID();
}

/* ================= CREATE ================= */

formMain.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = {
        id: generateId(),
        title: nameTask.value.trim(),
        description: description.value.trim(),
        priority: selecPriority.value
    };

    tasks.push(task);
    saveTasks();
    createTaskCard(task);
    formMain.reset();
});

/* ================= CREAR CARD ================= */

function createTaskCard(task) {
    const card = document.createElement("div");

    card.className = "border rounded p-2 task-item task mb-2";
    card.dataset.id = task.id;
    card.dataset.state = "pendiente"; // requerido por tu mover

    card.innerHTML = `
    <div class="d-flex gap-2 mb-2 align-items-center">
        <p class="title mb-0">${task.title}</p>
        <button class="btn btn-sm btn-secondary editTask">✏️</button>
        <button class="btn btn-sm btn-danger deleteTask">X</button>
    </div>

    <div class="accordion">
        <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse">
            description
            </button>
        </h2>
        <div class="accordion-collapse collapse">
            <div class="accordion-body">
            <p>${task.description}</p>
            </div>
        </div>
        </div>
    </div>

    <div class="d-flex gap-2 actions"></div>
`;

    taskList.appendChild(card);
}

/* ================= DELETE ================= */

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("deleteTask")) return;

    const card = e.target.closest(".task-item");
    if (!card) return;

    const id = card.dataset.id;

    // eliminar del array
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();

    // eliminar SOLO del DOM
    card.remove();
});

/* ================= CARGAR DESDE STORAGE ================= */

tasks.forEach(task => {
    createTaskCard(task);
});




