// Obtenemos los elementos del HTML
const formMain = document.getElementById('formMain');
const nameTask = document.getElementById('nameTask');
const description = document.getElementById('description');
const selecPriority = document.getElementById('selecPriority');
const contenedor = document.getElementById('nameReplace');


let users = JSON.parse(localStorage.getItem("users")) || [];

// Escuchamos el envío del formulario
formMain.addEventListener("submit", function(e) {
    e.preventDefault(); 

    // Creamos un objeto con los datos del formulario
    const nuevaTarea = {
        nameTask: nameTask.value,
        description: description.value,
        priority: selecPriority.value
    };

    users.push(nuevaTarea);

    localStorage.setItem("users", JSON.stringify(users));

    // Limpiamos el formulario
    formMain.reset();

    // Mostramos los datos en pantalla
    mostrarDatos();
});



function mostrarDatos() {
    contenedor.innerHTML = ""; // Limpiamos antes de pintar

    users.forEach((user, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <input type="text" value="${user.nameTask}" disabled>
            <input type="text" value="${user.description}" disabled>
            <input type="text" value="${user.priority}" disabled>
        `;

        contenedor.appendChild(div);
    });
}


mostrarDatos();

