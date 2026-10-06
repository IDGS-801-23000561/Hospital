async function ObtenerMascotas() {
    try {
        const respuesta = await fetch("/api/mascotas");

        if(!respuesta.ok){
            console.log("Error al obtener las mascotas");
        }

        const mascotas = await respuesta.json();

        mostrarMascotas(mascotas);

    }catch(error){
        console.error("Error de conexion: ", error);
    }
}

document.getElementById("DOMContentLoad", ObtenerMascotas);

function obtenerTipo(tipo){
    const tipos = {
        1: "Canino",
        2: "Felino",
        3: "Roedor",
        4: "Ave",
        5: "Marino",
        6: "Reptiles"
    };

    return tipos[tipo] || "Desconocido";
}

function mostrarMascotas(mascotas) {
    const catalogo = document.getElementById("catalogo-mascotas");

    catalogo.innerHTML = "";

    if (mascotas.length === 0) {
        catalogo.innerHTML = "<p>No hay mascotas registradas.</p>";
        return;
    }

    mascotas.forEach((mascota) => {
        const tarjeta = document.createElement("div");

        tarjeta.classList.add("mascota-card");

        tarjeta.innerHTML = `
            <div class="card-header">
                <div>
                    <h2>${mascota.nombre}</h2>
                    <span>${obtenerTipo(mascota.tipo)}</span>
                </div>
            </div>

            <div class="card-body">

                <div class="dato">
                    <span class="dato-titulo">Raza</span>
                    <span>${mascota.raza}</span>
                </div>

                <div class="dato">
                    <span class="dato-titulo">Edad</span>
                    <span>${mascota.edad} años</span>
                </div>

                <div class="dato">
                    <span class="dato-titulo">Peso</span>
                    <span>${mascota.peso} kg</span>
                </div>

                <div class="observaciones">
                    <span class="dato-titulo">Observaciones</span>
                    <p>${mascota.observaciones || "Sin observaciones"}</p>
                </div>

            </div>
        `;

        catalogo.appendChild(tarjeta);
    });
}

ObtenerMascotas();

