const taskList = document.getElementById("taskList");
const doing = document.getElementById("doing");
const done = document.getElementById("done");

// Dibuja los botones según el estado
function updateButtons(task) {
  const actions = task.querySelector(".actions");
  const state = task.dataset.state;

  actions.innerHTML = "";

  if (state === "pendiente") {
    actions.innerHTML = `
      <button class="btn btn-sm btn-outline-dark btn-right">&rarr;</button>
    `;
  }

  if (state === "proceso") {
    actions.innerHTML = `
      <button class="btn btn-sm btn-outline-dark btn-left">&larr;</button>
      <button class="btn btn-sm btn-outline-dark btn-right">&rarr;</button>
    `;
  }

  if (state === "completada") {
    actions.innerHTML = `
      <button class="btn btn-sm btn-outline-dark btn-left">&larr;</button>
    `;
  }
}

// Inicializar botones al cargar
document.querySelectorAll(".task").forEach(updateButtons);

// Delegación de eventos
document.addEventListener("click", function (e) {
  const task = e.target.closest(".task");
  if (!task) return;

  const state = task.dataset.state;

  // ➡️ Avanzar estado
  if (e.target.classList.contains("btn-right")) {
    if (state === "pendiente") {
      task.dataset.state = "proceso";
      doing.appendChild(task);
    } else if (state === "proceso") {
      task.dataset.state = "completada";
      done.appendChild(task);
    }
    updateButtons(task);
  }

  // ⬅️ Retroceder estado
  if (e.target.classList.contains("btn-left")) {
    if (state === "proceso") {
      task.dataset.state = "pendiente";
      taskList.appendChild(task);
    } else if (state === "completada") {
      task.dataset.state = "proceso";
      doing.appendChild(task);
    }
    updateButtons(task);
  }
});
