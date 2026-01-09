const formMain = document.getElementById("formMain");
const nameTask = document.getElementById("nameTask");
const description = document.getElementById("description");
const selecPriority = document.getElementById("selecPriority");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ================= UTILIDADES ================= */

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateId() {
  return crypto.randomUUID();
}

function sanitize(text) {
  return text.replace(/[<>]/g, "");
}

function getPriorityClass(priority) {
  if (priority === "1") return "bg-danger bg-opacity-25";
  if (priority === "2") return "bg-warning bg-opacity-25";
  if (priority === "3") return "bg-success bg-opacity-25";
  return "";
  return "";
}

/* ================= CREAR ================= */

formMain.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {
    id: generateId(),
    title: sanitize(nameTask.value.trim()),
    description: sanitize(description.value.trim()),
    priority: selecPriority.value,
    state: "pendiente"
  };

  tasks.push(task);
  saveTasks();
  createTaskCard(task);
  formMain.reset();

  taskForm.style.display = "none";
  taskPanel.style.display = "block";
});

/* ================= CREAR CARD ================= */

function createTaskCard(task) {
  const card = document.createElement("div");

  card.className = `border rounded p-2 task-item task mb-2 ${getPriorityClass(task.priority)}`;
  card.dataset.id = task.id;
  card.dataset.state = task.state;
  card.dataset.priority = task.priority;

  const collapseId = `collapse-${task.id}`;
  const accordionId = `accordion-${task.id}`;

  card.innerHTML = `
    <div class="d-flex gap-2 mb-2 align-items-center">
      <p class="title mb-0"></p>
      <button class="btn btn-sm btn-secondary editTask">✏️</button>
      <button class="btn btn-sm btn-danger deleteTask">X</button>
    </div>

    <div class="accordion" id="${accordionId}">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#${collapseId}">
            Description
          </button>
        </h2>
        <div id="${collapseId}" class="accordion-collapse collapse">
          <div class="accordion-body">
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex gap-2 actions"></div>
  `;

  card.querySelector(".title").textContent = task.title;
  card.querySelector(".accordion-body p").textContent = task.description;

  // Insertar según estado
  if (task.state === "pendiente") taskList.appendChild(card);
  if (task.state === "proceso") doing.appendChild(card);
  if (task.state === "completada") done.appendChild(card);

  // Esperar a que statusTask exista
  if (typeof updateButtons === "function") {
    updateButtons(card);
  }
}

/* ================= CARGA INICIAL ================= */

window.addEventListener("DOMContentLoaded", () => {
  tasks.forEach(task => {
    setTimeout(() => createTaskCard(task), 0);
  });
});
