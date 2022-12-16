CREATE DATABASE los_pinos;
USE los_pinos;

CREATE TABLE login(
    id_user INT NOT NULL AUTO_INCREMENT,
    correo VARCHAR(100) NOT NULL,
    password VARCHAR(16) NOT NULL,
    PRIMARY KEY(id_user)
)ENGINE = innodb;--AUTO_INCREMENT = 2; CON ESTA ULTIMA LINEA ANTES DEL ";" HARA QUE INICIE EN EL 2

CREATE TABLE clientes(
    id_cliente BIGINT NOT NULL AUTO_INCREMENT,
    rfc VARCHAR(13),
    nombre VARCHAR(60) NOT NULL,
    apellido_paterno VARCHAR(30) NOT NULL,
    apellido_materno VARCHAR(30) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    password VARCHAR(16) NOT NULL,
    PRIMARY KEY(id_cliente)
)ENGINE = InnoDB;

CREATE TABLE pedidos ( --LOS TIPOS DE LAS LLAVES FORANEAS DEBEN SER IGUAL A LAS QUE SE REFERENCIARÁN
    folio BIGINT NOT NULL AUTO_INCREMENT,
    id_cliente BIGINT NOT NULL,
    pedido JSON NOT NULL, --LOS TIPOS DE LAS LLAVES FORANEAS DEBEN SER IGUAL A LAS QUE SE REFERENCIARÁN
    total float NOT NULL,
    status VARCHAR(15),
    time_ago timestamp NOT NULL DEFAULT current_timestamp,
    constraint fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    PRIMARY KEY(folio)
)ENGINE = innodb;

CREATE TABLE menu(
    id_pan BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50)NOT NULL,
    precio FLOAT NOT NULL,
    descripcion TEXT,
    PRIMARY KEY(id_pan)
)ENGINE = innodb;