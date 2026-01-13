const formMain = document.getElementById("formMain");
const nameTask = document.getElementById("nameTask");
const description = document.getElementById("description");
const selecPriority = document.getElementById("selecPriority");

const taskList2 = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//utilidades

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateId() {
    return crypto.randomUUID();
}

//crear

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
//Crear card

function createTaskCard(task) {
  const card = document.createElement("div");

  card.className = "border rounded p-2 task-item task mb-2";
  card.dataset.id = task.id;
  card.dataset.state = "pendiente";

  const collapseId = `collapse-${task.id}`;
  const accordionId = `accordion-${task.id}`;

  card.innerHTML = `
    <div class="d-flex gap-2 mb-2 align-items-center">
      <p class="title mb-0">${task.title}</p>
      <button class="btn btn-sm btn-secondary editTask">✏️</button>
      <button class="btn btn-sm btn-danger deleteTask">X</button>
    </div>

    <div class="accordion" id="${accordionId}">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button 
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#${collapseId}"
            aria-expanded="false"
            aria-controls="${collapseId}">
            Description
          </button>
        </h2>

        <div 
          id="${collapseId}"
          class="accordion-collapse collapse"
          data-bs-parent="#${accordionId}">
          <div class="accordion-body">
            <p>${task.description}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex gap-2 actions">
        <button class="btn btn-sm btn-outline-dark moveLeft">&larr;</button>
        <button class="btn btn-sm btn-outline-dark moveRight">&rarr;</button>
    </div>
  `;

  taskList.appendChild(card);

// CLAVE: inicializar botones según estado
if (typeof updateButtons === "function") {
  updateButtons(card);
}

// re-adjuntar delete (archivo del compañero)
if (typeof attachDeleteButtons === "function") {
  attachDeleteButtons();
}

}

/* ================= CARGA INICIAL ================= */
window.addEventListener("DOMContentLoaded", () => {
  tasks.forEach(task => {
    setTimeout(() => createTaskCard(task), 0);
  });
});