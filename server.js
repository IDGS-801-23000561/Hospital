const express = require("express");
const path = require("path");
const conexion = require("./db");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/img", express.static("img"));

app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.join(__dirname, "service-worker.js"));
});

app.get("/manifest.webmanifest", (req, res) => {
    res.sendFile(path.join(__dirname, "manifest.webmanifest"));
});

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "login", "login.html")
    );
});

app.get("/api/mascotas", (req, res) => {

    const sql = `
        SELECT
            pk_mascota,
            nombre,
            tipo,
            raza,
            edad,
            peso,
            observaciones,
            imagen
        FROM mascotas
        WHERE estado = 1
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error("Error al hacer la query de mascotas:", error);

            return res.status(500).json({
                error: "Error al obtener mascotas"
            });
        }

        res.json(resultados);
    });
});

app.get("/api/productos", (req, res) => {

    const sql = `
        SELECT
            pk_producto,
            nombre,
            descripcion,
            precio,
            cantidad,
            imagen
        FROM productos
        WHERE estado = 1
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error("Error al hacer la query de productos:", error);

            return res.status(500).json({
                error: "Error al obtener productos"
            });
        }

        res.json(resultados);
    });
});

app.post("/api/login", (req, res) => {

    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({
            error: "Ingresa usuario y contraseña"
        });
    }

    const sql = `
        SELECT
            pk_usuario,
            usuario,
            nombre
        FROM usuarios
        WHERE usuario = ?
        AND pass = ?
    `;

    conexion.query(
        sql,
        [usuario, password],
        (error, resultados) => {

            if (error) {
                console.error("Error al iniciar sesión:", error);

                return res.status(500).json({
                    error: "Error en el servidor"
                });
            }

            if (resultados.length === 0) {
                return res.status(401).json({
                    error: "Usuario o contraseña incorrectos"
                });
            }

            res.json({
                mensaje: "Inicio de sesión correcto",
                usuario: resultados[0]
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});