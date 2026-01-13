const formMain = document.getElementById("formMain");
const nameTask = document.getElementById("nameTask");
const description = document.getElementById("description");
const selecPriority = document.getElementById("selecPriority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskEditingId = null;

/* ================= CAMBIO DE COLOR EN SELECT ================= */

// Función para actualizar color del select
function updateSelectColor(selectElement) {
  const value = selectElement.value;
  
  // Remover clases previas
  selectElement.classList.remove('bg-danger', 'bg-warning', 'bg-success', 'bg-opacity-25');
  
  // Agregar clase según prioridad
  if (value === "1") {
    selectElement.classList.add('bg-danger', 'bg-opacity-25');
  } else if (value === "2") {
    selectElement.classList.add('bg-warning', 'bg-opacity-25');
  } else if (value === "3") {
    selectElement.classList.add('bg-success', 'bg-opacity-25');
  }
}

// Event listener para select de CREAR
if (selecPriority) {
  selecPriority.addEventListener('change', function() {
    updateSelectColor(this);
  });
}

// Event listener para select de EDITAR
const editSelecPriority = document.getElementById("EditSelecPriority");
if (editSelecPriority) {
  editSelecPriority.addEventListener('change', function() {
    updateSelectColor(this);
  });
}

/* ================= MODAL DE EDITAR ================= */
const formEdit = document.getElementById('formEdit');
const editNameInput = document.getElementById('exampleFormControlInput1');
const editDescriptionInput = document.getElementById('exampleFormControlTextarea1');

// Cerrar modal de editar
document.getElementById('closeFormEdit').addEventListener('click', () => {
  formEdit.close();
  taskEditingId = null;
});

// Event delegation para abrir el modal de editar
document.addEventListener('click', (e) => {
  if (e.target.closest('.editTask')) {
    const card = e.target.closest('.task-item');
    if (!card) return;

    const taskId = card.dataset.id;
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) return;
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


    // Guardar el ID de la tarea que se está editando
    taskEditingId = taskId;

    // Rellenar el formulario con los datos actuales
    editNameInput.value = task.title;
    editDescriptionInput.value = task.description;
    
    // ⭐ Establecer prioridad y color
    if (editSelecPriority) {
      editSelecPriority.value = task.priority;
      updateSelectColor(editSelecPriority);
    }

    // Abrir el modal
    formEdit.showModal();
  }
});

// Guardar cambios del modal de editar
formEdit.querySelector('.btn-danger').addEventListener('click', () => {
  if (!taskEditingId) return;

  // Validar que los campos no estén vacíos
  if (!editNameInput.value.trim() || !editDescriptionInput.value.trim()) {
    alert('Por favor completa todos los campos');
    return;priorityContainer
  }

  // Buscar la tarea y actualizarla
  const task = tasks.find(t => t.id === taskEditingId);
  if (task) {
    task.title = sanitize(editNameInput.value.trim());
    task.description = sanitize(editDescriptionInput.value.trim());
    
    // ⭐ Guardar también la prioridad
    if (editSelecPriority) {
      task.priority = editSelecPriority.value;
    }
    
    // Guardar en localStorage
    saveTasks();

    // Actualizar la tarjeta en el DOM
    const card = document.querySelector(`[data-id="${taskEditingId}"]`);
    if (card) {
      card.querySelector('.title').textContent = task.title;
      card.querySelector('.accordion-body p').textContent = task.description;
      
      // ⭐ Actualizar el color de la tarjeta
      card.classList.remove('bg-danger', 'bg-warning', 'bg-success', 'bg-opacity-25');
      const priorityClasses = getPriorityClass(task.priority).split(' ');
      priorityClasses.forEach(cls => card.classList.add(cls));
      card.dataset.priority = task.priority;
    }

    // Cerrar modal y limpiar
    formEdit.close();
    taskEditingId = null;
  }
});

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
}

/* ================= CREAR TAREA ================= */
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
      <button class="btn btn-sm btn-secondary editTask">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-sm btn-danger deleteTask">
        <i class="bi bi-trash3"></i>
      </button>
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

  // Usar textContent para prevenir XSS
  card.querySelector(".title").textContent = task.title;
  card.querySelector(".accordion-body p").textContent = task.description;

  // Insertar según estado
  const taskList = document.getElementById("taskList");
  const doing = document.getElementById("doing");
  const done = document.getElementById("done");

  if (task.state === "pendiente") taskList.appendChild(card);
  if (task.state === "proceso") doing.appendChild(card);
  if (task.state === "completada") done.appendChild(card);

  // Actualizar botones de navegación si existe la función
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













