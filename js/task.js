   document.addEventListener('DOMContentLoaded', function () {
            const createTaskBtn = document.getElementById('createTask');
            const taskPanel = document.getElementById('taskPanel');
            const taskForm = document.getElementById('taskForm');
            const cancelBtn = document.getElementById('cancelForm');

            // Mostrar el formulario y ocultar el panel de tareas
            createTaskBtn.addEventListener('click', function () {
                taskPanel.style.display = 'none';
                taskForm.style.display = 'block';
            });

            // Cancelar: ocultar formulario y mostrar panel de tareas
            cancelBtn.addEventListener('click', function () {
                taskForm.style.display = 'none';
                taskPanel.style.display = 'block';
            });

            // Evitar que el form recargue la página al enviar
            taskForm.querySelector('form').addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Aquí podrías guardar la tarea y volver al panel.');
                taskForm.style.display = 'none';
                taskPanel.style.display = 'block';
            });
        });
    document.addEventListener('DOMContentLoaded',function(){
        const openTrashBtn = document.getElementById("openTrash");
        const trashModal = document.getElementById("trashModal");
        const closeTrashBtn = document.getElementById("closeTrash");

        openTrashBtn.addEventListener('click', ()=>{
            trashModal.style.display = 'flex'; //pasamos a mostrar el modal

        });
        closeTrashBtn.addEventListener('click',() =>{
            trashModal.style.display = 'none'; //para cerrarlo
        })

    });

