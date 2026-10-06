const express = require("express")
const conexion = require("./db")

const app = express();

app.use(express.json());
app.use(express.static("public"))

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});