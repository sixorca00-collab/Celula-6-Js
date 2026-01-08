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

  /* ===============================
    Modal Papelera
     =============================== */
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

  /* ===============================
    Eliminar tareas → Papelera
     =============================== */
  function attachDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.deleteTask');

    deleteButtons.forEach(button => {
      button.onclick = (e) => {
        const taskDiv = e.target.closest('.task-item');
        if (!taskDiv) return;

        const trashContent = document.getElementById('trashContent');
        if (!trashContent) return;

        const clonedTask = taskDiv.cloneNode(true);

        // quitar botones dentro de la papelera
      

        const emptyMessage = trashContent.querySelector('p');
        if (emptyMessage) emptyMessage.remove();

        trashContent.appendChild(clonedTask);
        taskDiv.remove();
      };
    });
  }

  attachDeleteButtons();
});