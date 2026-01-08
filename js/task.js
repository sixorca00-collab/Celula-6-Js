document.addEventListener('DOMContentLoaded', function () {

    // === SPA: formulario ===
    const createTaskBtn = document.getElementById('createTask');
    const taskPanel = document.getElementById('taskPanel');
    const taskForm = document.getElementById('taskForm');
    const cancelBtn = document.getElementById('cancelForm');

    createTaskBtn.addEventListener('click', () => {
        taskPanel.style.display = 'none';
        taskForm.style.display = 'block';
    });

    cancelBtn.addEventListener('click', () => {
        taskForm.style.display = 'none';
        taskPanel.style.display = 'block';
    });

    taskForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        taskForm.style.display = 'none';
        taskPanel.style.display = 'block';
    });

    // === Modal Papelera ===
    const openTrashBtn = document.getElementById("openTrash");
    const trashModal = document.getElementById("trashModal");
    const closeTrashBtn = document.getElementById("closeTrash");

    openTrashBtn.addEventListener('click', () => {
        trashModal.style.display = 'flex';
    });

    closeTrashBtn.addEventListener('click', () => {
        trashModal.style.display = 'none';
    });

    // === Eliminar tareas → Papelera ===
    const deleteButtons = document.querySelectorAll('.deleteTask');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const taskDiv = e.target.closest('.border');
            if (!taskDiv) return;

            const clonedTask = taskDiv.cloneNode(true);
            const trashContent = document.getElementById('trashContent');

            const emptyMessage = trashContent.querySelector('p');
            if (emptyMessage) emptyMessage.remove();

            trashContent.appendChild(clonedTask);
            taskDiv.remove();
        });
    });

});
