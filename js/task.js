document.addEventListener('DOMContentLoaded', function () {

  /* ================= FORMULARIO ================= */
  const createTaskBtn = document.getElementById('createTask');
  const taskPanel = document.getElementById('taskPanel');
  const taskForm = document.getElementById('taskForm');
  const cancelBtn = document.getElementById('cancelForm');


  taskPanel.style.display = "block";
  taskForm.style.display = "none";


  createTaskBtn.addEventListener('click', () => {
    taskPanel.style.display = 'none';
    taskForm.style.display = 'block';
  });

  cancelBtn.addEventListener('click', () => {
    taskForm.style.display = 'none';
    taskPanel.style.display = 'block';
  });

  /* ================= PAPELERA ================= */
  const openTrashBtn = document.getElementById("openTrash");
  const trashModal = document.getElementById("trashModal");
  const closeTrashBtn = document.getElementById("closeTrash");

  openTrashBtn.addEventListener('click', () => {
    trashModal.style.display = 'flex';
  });

  closeTrashBtn.addEventListener('click', () => {
    trashModal.style.display = 'none';
  });

  /* ================= ELIMINAR ================= */
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("deleteTask")) return;

    const taskDiv = e.target.closest(".task-item");
    if (!taskDiv) return;

    const taskId = taskDiv.dataset.id;
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();

    const trashContent = document.getElementById("trashContent");
    const clone = taskDiv.cloneNode(true);
    clone.querySelectorAll("button").forEach(b => b.remove());

    const empty = trashContent.querySelector("p");
    if (empty) empty.remove();

    trashContent.appendChild(clone);
    taskDiv.remove();
  });
});

/* ================= FILTRO ================= */
// Función para mostrar todas las tareas
function mostrarTodasTareas() {
  document.querySelectorAll(".task-item").forEach(t => {
    t.style.display = "";
  });
}

function filtrarPorPrioridad(prioridad) {
  document.querySelectorAll(".task-item").forEach(t => {
    t.style.display = t.dataset.priority === prioridad ? "" : "none";
  });
}

document.getElementById("comAlta").addEventListener("click", e => {
  e.preventDefault(); filtrarPorPrioridad("1");
});

document.getElementById("comMedia").addEventListener("click", e => {
  e.preventDefault(); filtrarPorPrioridad("2");
});

document.getElementById("comBaja").addEventListener("click", e => {
  e.preventDefault(); filtrarPorPrioridad("3");
});
// NUEVO: Mostrar todas
document.getElementById("comTodas").addEventListener("click", e => {
  e.preventDefault();
  mostrarTodasTareas();
});
