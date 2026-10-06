DROP DATABASE IF EXISTS hospital_veterinaria;
CREATE DATABASE hospital_veterinaria;
USE hospital_veterinaria;

CREATE TABLE mascotas (
	pk_mascota INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    tipo INT, -- 1 Canino, 2 Felino, 3 Roedor, 4 Ave, 5 Marino, 6 Reptiles
    raza VARCHAR(100),
    edad INT,
    peso DOUBLE,
    observaciones VARCHAR(255),
    estado INT DEFAULT 1
);


CREATE TABLE productos (
	pk_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    precio DOUBLE,
    cantidad INT,
    estado INT DEFAULT 1
);


-- DATOS MASCOTAS --
INSERT INTO mascotas(nombre, tipo, raza, edad, peso, observaciones) VALUES ('Jeipi', 1, 'Tailandés', 2, 5.2, 'Le gusta el catnip');
INSERT INTO mascotas(nombre, tipo, raza, edad, peso, observaciones) VALUES ('JotaPe', 2, 'Persa', 7, 5.7, 'A ese sí le gusta la mota');
INSERT INTO mascotas(nombre, tipo, raza, edad, peso, observaciones) VALUES ('Juan Perico', 4, 'Loro', 1, 0.5, 'Inálalo, no sospeches del empaque');


-- DATOS PRODUCTOS --
INSERT INTO productos(nombre, descripcion, precio, cantidad) VALUES('Croquetas', 'Están ricas, ya las probé', 899.99, 15);
INSERT INTO productos(nombre, descripcion, precio, cantidad) VALUES('Champú', 'Este no lo he usado, el perro en la etiqueta se ve felíz y limpio', 200.59, 20);
INSERT INTO productos(nombre, descripcion, precio, cantidad) VALUES('Premios', 'Huesos', 100.00, 40);

SELECT * FROM mascotas;

SELECT * FROM productos;



