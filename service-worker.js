const CACHE_NAME = "hospital-veterinaria-v1";

const RECURSOS = [
    "/",
    "/app.css",
    "/app.js",
    "/manifest.webmanifest",

    "/mascotas/mascotas.html",
    "/mascotas/mascotas.css",
    "/mascotas/mascotas.js",

    "/productos/productos.html",
    "/productos/productos.css",
    "/productos/productos.js",

    "/img/Croquetas.jpeg",
    "/img/champo.jpeg",
    "/img/hueso.jpeg"
];


// INSTALAR
self.addEventListener("install", (event) => {
    console.log("Service Worker: instalando");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(RECURSOS);
        })
    );

    self.skipWaiting();
});


// ACTIVAR
self.addEventListener("activate", (event) => {
    console.log("Service Worker: activado");

    event.waitUntil(
        caches.keys().then((nombres) => {
            return Promise.all(
                nombres
                    .filter((nombre) => nombre !== CACHE_NAME)
                    .map((nombre) => caches.delete(nombre))
            );
        })
    );

    self.clients.claim();
});


// FETCH
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(async (response) => {

                if (response.ok) {
                    const cache = await caches.open(CACHE_NAME);

                    await cache.put(
                        event.request,
                        response.clone()
                    );
                }

                return response;
            })
            .catch(async () => {

                console.log(
                    "Sin conexión, buscando en caché:",
                    event.request.url
                );

                const respuestaCache =
                    await caches.match(event.request);

                if (respuestaCache) {
                    return respuestaCache;
                }

                // Si es la API y nunca se guardó
                if (event.request.url.includes("/api/")) {
                    return new Response("[]", {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                }

                return new Response("Recurso no disponible sin conexión", {
                    status: 503
                });
            })
    );
});