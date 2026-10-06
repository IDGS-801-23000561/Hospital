const express = require("express")
const conexion = require("./db")

const app = express();

app.use(express.json());
app.use(express.static("public"))

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

app.get("/api/mascotas", (req,res) => {
    const sql = `
        SELECT 
            pk_mascota,
            nombre,
            tipo,
            raza,
            edad,
            peso,
            observaciones,
        FROM mascotas
        WHERE estado = 1
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error("Error al hacer la query de mascotas: ", error);

            return res.status(500).json({
                error: "Error al obtener mascotas"
            });
        }


        res.json(resultados);
    });
});

