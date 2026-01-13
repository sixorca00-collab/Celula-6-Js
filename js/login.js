
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const usuarioInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const usuarioIngresado = usuarioInput.value.trim();
    const passwordIngresada = passwordInput.value.trim();

    try {
      // Aquí se carga el JSON el JSON 
      const response = await fetch("./data/usuarios.json");
      const data = await response.json();

      const usuarios = data.usuarios;

      // Aquí busco el usuario que coincida
      const usuarioEncontrado = usuarios.find(
        (u) =>
          u.usuario === usuarioIngresado &&
          u.password === passwordIngresada
      );

      if (usuarioEncontrado) {
        alert("Login exitoso. Bienvenido " + usuarioEncontrado.usuario);

        // Guardo la sesion con localstorage
        localStorage.setItem("usuarioLogueado", usuarioEncontrado.usuario);
        window.location.href = "main.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("Error al conectar con la base de datos");
    }
  });
});
