const formMain = document.getElementById('formMain');
const nameTask = document.getElementById('nameTask');
const description = document.getElementById('description');
const selecPriority = document.getElementById('selecPriority');
const save = document.getElementById('save')

let users = JSON.parse(localStorage.getItem("users")) || [];