const mysql = require("mysql2")

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "hospital_veterinaria"
});

conexion.connect((error) => {
    if(error){
        console.log("Error de conexion a la bd: ", error);
        return;
    }
    console.log("Conexion exitosa");
});

module.exports = conexion;