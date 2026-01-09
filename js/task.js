document.addEventListener('DOMContentLoaded', function () {

  // ================= FORMULARIO =================
  const createTaskBtn = document.getElementById('createTask');
  const taskPanel = document.getElementById('taskPanel');
  const taskForm = document.getElementById('taskForm');
  const cancelBtn = document.getElementById('cancelForm');
  const form = document.getElementById('formMain');

  if (createTaskBtn && taskPanel && taskForm && cancelBtn && form) {

    createTaskBtn.addEventListener('click', () => {
      taskPanel.style.display = 'none';
      taskForm.style.display = 'block';
    });

    cancelBtn.addEventListener('click', () => {
      taskForm.style.display = 'none';
      taskPanel.style.display = 'block';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      taskForm.style.display = 'none';
      taskPanel.style.display = 'block';
    });
  }

  // ================= PAPELERA =================
  const openTrashBtn = document.getElementById("openTrash");
  const trashModal = document.getElementById("trashModal");
  const closeTrashBtn = document.getElementById("closeTrash");

  if (openTrashBtn && trashModal && closeTrashBtn) {
    openTrashBtn.addEventListener('click', () => {
      trashModal.style.display = 'flex';
    });

    closeTrashBtn.addEventListener('click', () => {
      trashModal.style.display = 'none';
    });
  }

  // ================= ELIMINAR TAREAS =================
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("deleteTask")) return;

    const taskDiv = e.target.closest(".task-item");
    if (!taskDiv) return;

    const trashContent = document.getElementById("trashContent");
    if (!trashContent) return;

    const clonedTask = taskDiv.cloneNode(true);
    clonedTask.querySelectorAll("button").forEach(btn => btn.remove());

    const emptyMessage = trashContent.querySelector("p");
    if (emptyMessage) emptyMessage.remove();

    trashContent.appendChild(clonedTask);
    taskDiv.remove();
  });


});

/* ================= FILTRADO POR PRIORIDAD ================= */

// Muestra solo las tareas cuya prioridad coincide
function filtrarPorPrioridad(prioridad) {

  const tareas = document.querySelectorAll(".task-item");

  tareas.forEach(tarea => {

    const prioridadTarea = tarea.dataset.priority;

    if (prioridadTarea === prioridad) {
      tarea.style.display = "";
    } else {
      tarea.style.display = "none";
    }
  });
}

// Eventos del dropdown
document.getElementById("comAlta").addEventListener("click", (e) => {
  e.preventDefault();
  filtrarPorPrioridad("1");
});

document.getElementById("comMedia").addEventListener("click", (e) => {
  e.preventDefault();
  filtrarPorPrioridad("2");
});

document.getElementById("comBaja").addEventListener("click", (e) => {
  e.preventDefault();
  filtrarPorPrioridad("3");
});
