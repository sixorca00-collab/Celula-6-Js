const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


titleInput.addEventListener("input", () => {
    if (titleInput.value.length < 3) {
        titleInput.style.borderColor = "red";
    } else {
        titleInput.style.borderColor = "green";
    }
});


form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar la página

    const task = {
        title: titleInput.value,
        description: descInput.value,
        priority: priorityInput.value
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    form.reset();
    renderTasks();
});


function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <strong>${task.title}</strong> - ${task.priority}
        <p>${task.description}</p>
        <button onclick="deleteTask(${index})">Eliminar</button>
    `;
        taskList.appendChild(li);
    });
}


function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}


renderTasks();

