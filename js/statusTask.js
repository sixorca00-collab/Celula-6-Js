// ================= NODOS DEL DOM =================
const taskList = document.getElementById("taskList");
const doing = document.getElementById("doing");
const done = document.getElementById("done");

// ================= FUNCIONES AUXILIARES =================

// Dibuja botones según estado
function updateButtons(task) {
  const actions = task.querySelector(".actions");
  const state = task.dataset.state;

  actions.innerHTML = "";

  if (state === "pendiente") {
    actions.innerHTML = `<button class="btn btn-sm btn-outline-dark btn-right">&rarr;</button>`;
  }

  if (state === "proceso") {
    actions.innerHTML = `
      <button class="btn btn-sm btn-outline-dark btn-left">&larr;</button>
      <button class="btn btn-sm btn-outline-dark btn-right">&rarr;</button>
    `;
  }

  if (state === "completada") {
    actions.innerHTML = `<button class="btn btn-sm btn-outline-dark btn-left">&larr;</button>`;
  }
}

// Actualiza el estado en el array y localStorage
function updateTaskState(task, newState) {
  task.dataset.state = newState;

  const taskIndex = tasks.findIndex(t => t.id === task.dataset.id);
  if (taskIndex !== -1) {
    tasks[taskIndex].state = newState;
    saveTasks();
  }
}

// ================= ANIMACIÓN AL MOVER =================
function moveTaskWithAnimation(task, targetColumn) {
  // efecto inicial: desvanecer y levantar un poco
  task.classList.add("move-anim");

  // Esperar la animación antes de mover
  setTimeout(() => {
    task.classList.remove("move-anim");
    targetColumn.appendChild(task);
  }, 300); // duración coincide con CSS
}

// ================= INICIALIZAR TAREAS EXISTENTES =================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".task").forEach(updateButtons);
});

// ================= DELEGACIÓN DE EVENTOS =================
document.addEventListener("click", (e) => {
  const task = e.target.closest(".task");
  if (!task) return;

  const state = task.dataset.state;

  // Avanzar
  if (e.target.classList.contains("btn-right")) {
    if (state === "pendiente") {
      moveTaskWithAnimation(task, doing);
      updateTaskState(task, "proceso");
    } else if (state === "proceso") {
      moveTaskWithAnimation(task, done);
      updateTaskState(task, "completada");
    }
    updateButtons(task);
  }

  // Retroceder
  if (e.target.classList.contains("btn-left")) {
    if (state === "proceso") {
      moveTaskWithAnimation(task, taskList);
      updateTaskState(task, "pendiente");
    } else if (state === "completada") {
      moveTaskWithAnimation(task, doing);
      updateTaskState(task, "proceso");
    }
    updateButtons(task);
  }
});
