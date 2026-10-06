const form = document.getElementById("login-form");
const mensajeError = document.getElementById("mensaje-error");

if (localStorage.getItem("usuario")) {
    window.location.href = "/mascotas/mascotas.html";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    try {
        const respuesta = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                password: password
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensajeError.textContent = datos.error;
            mensajeError.style.display = "block";
            return;
        }

        localStorage.setItem(
            "usuario",
            JSON.stringify(datos.usuario)
        );

        window.location.href = "/mascotas/mascotas.html";

    } catch (error) {
        mensajeError.textContent =
            "No se pudo conectar con el servidor.";

        mensajeError.style.display = "block";
    }
});