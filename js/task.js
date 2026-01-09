document.addEventListener('DOMContentLoaded', function () {
// Funcion de crear y el form
  const createTaskBtn = document.getElementById('createTask');
  const taskPanel = document.getElementById('taskPanel');
  const taskForm = document.getElementById('taskForm');
  const cancelBtn = document.getElementById('cancelForm');
  const form = document.getElementById('formMain');

  // Solo se activa si el formulario existe
  if (createTaskBtn && taskPanel && taskForm && cancelBtn && form) {

    createTaskBtn.addEventListener('click', () => {
      taskPanel.style.display = 'none';
      taskForm.style.display = 'block';
    });

    cancelBtn.addEventListener('click', () => {
      taskForm.style.display = 'none';
      taskPanel.style.display = 'block';
    });

    form.addEventListener('submit', (e) => { // e es una representacion de evento lo que hara sera definir el evento que ejecutara el codigo que le siga
      e.preventDefault();
      taskForm.style.display = 'none';
      taskPanel.style.display = 'block';
    });
  }

 // T arjeta de papelera
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

  //Eliminaer tareas
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("deleteTask")) return;

    const taskDiv = e.target.closest(".task-item");
    if (!taskDiv) return;

    const trashContent = document.getElementById("trashContent");
    if (!trashContent) return;

    const clonedTask = taskDiv.cloneNode(true);

    // quitar botones dentro de la papelera
    clonedTask.querySelectorAll("button").forEach(btn => btn.remove());

    // quitar mensaje "No hay tareas"
    const emptyMessage = trashContent.querySelector("p");
    if (emptyMessage) emptyMessage.remove();

    trashContent.appendChild(clonedTask);

    // eliminar del tablero
    taskDiv.remove();
  });

});
