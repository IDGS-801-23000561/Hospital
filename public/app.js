if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("Service Worker registrado correctamente");
            })
            .catch((error) => {
                console.error(
                    "Error al registrar el Service Worker:",
                    error
                );
            });
    });
}


const paginaLogin =
    window.location.pathname.includes("/login/");

const paginaLanding =
    window.location.pathname.includes("/landing/") ||
    window.location.pathname === "/";


if (!paginaLogin && !paginaLanding) {

    const usuarioGuardado =
        localStorage.getItem("usuario");

    if (!usuarioGuardado) {
        window.location.href = "/login/login.html";
    } else {

        const usuario =
            JSON.parse(usuarioGuardado);

        const nombre =
            document.getElementById("nombre-usuario");

        if (nombre) {
            nombre.textContent =
                "Hola, " + usuario.nombre;
        }
    }
}


const botonLogout =
    document.getElementById("btn-logout");

if (botonLogout) {

    botonLogout.addEventListener("click", () => {

        localStorage.removeItem("usuario");

        window.location.href =
            "/login/login.html";
    });
}