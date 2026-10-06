async function ObtenerProductos() {
  try {
    const respuesta = await fetch("/api/productos");

    if (!respuesta.ok) {
      console.log("Error al obtener los productos");
    }

    const productos = await respuesta.json();

    mostrarProductos(productos);
  } catch (error) {
    console.error("Error de conexion: ", error);
  }
}

function mostrarProductos(productos) {
  const catalogo = document.getElementById("catalogo-productos");

  catalogo.innerHTML = "";

  if (productos.length === 0) {
    catalogo.innerHTML = "<p>No hay productos registrados.</p>";
    return;
  }

  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");

    tarjeta.classList.add("producto-card");

    tarjeta.innerHTML = `
      <div class="card-header">
        <img
          src="/img/${producto.imagen}"
          alt="${producto.nombre}"
          class="producto-imagen"
        >

        <div>
          <h2>${producto.nombre}</h2>
          <span>Producto veterinario</span>
        </div>
      </div>

      <div class="card-body">

        <div class="dato">
          <span class="dato-titulo">Precio</span>
          <span>$${Number(producto.precio).toFixed(2)}</span>
        </div>

        <div class="dato">
          <span class="dato-titulo">Cantidad</span>
          <span>${producto.cantidad}</span>
        </div>

        <div class="descripcion">
          <span class="dato-titulo">Descripción</span>
          <p>${producto.descripcion || "Sin descripción"}</p>
        </div>

      </div>
    `;

    catalogo.appendChild(tarjeta);
  });
}

ObtenerProductos();