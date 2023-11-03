-- Combinar las dos bases de datos
DROP DATABASE IF EXISTS bdlibreria;
CREATE DATABASE bdlibreria;
USE bdlibreria;

-- Creación de la tabla 'admin'
CREATE TABLE admin (
    admin_cod VARCHAR(10) PRIMARY KEY,
    admin_dni INT,
    admin_nom VARCHAR(30),
    admin_ape VARCHAR(30),
    admin_pswd VARCHAR(30),
    admin_email VARCHAR(30)
);

-- Inserción de datos en la tabla 'admin'
INSERT INTO admin (admin_cod, admin_dni, admin_nom, admin_ape, admin_pswd, admin_email) VALUES
    ('admin001', 123456789, 'Admin 1', 'Apellido 1', 'clave1', 'admin1@example.com'),
    ('admin002', 987654321, 'Admin 2', 'Apellido 2', 'clave2', 'admin2@example.com'),
    ('admin003', 111111111, 'Admin 3', 'Apellido 3', 'clave3', 'admin3@example.com');
-- Agregar más datos de administradores aquí

-- Creación de la tabla 'usuario'
CREATE TABLE usuario (
    usr_cod VARCHAR(10) PRIMARY KEY,
    usr_dni INT,
    usr_nom VARCHAR(30),
    usr_ape VARCHAR(30),
    usr_pswd VARCHAR(30),
    usr_email VARCHAR(30)
);

-- Inserción de datos en la tabla 'usuario'
INSERT INTO usuario (usr_cod, usr_dni, usr_nom, usr_ape, usr_pswd, usr_email) VALUES
    ('usr001', 111111111, 'Usuario 1', 'Apellido 1', 'clave1', 'usuario1@example.com'),
    ('usr002', 222222222, 'Usuario 2', 'Apellido 2', 'clave2', 'usuario2@example.com'),
    ('usr003', 333333333, 'Usuario 3', 'Apellido 3', 'clave3', 'usuario3@example.com');
-- Agregar más datos de usuarios aquí

-- Creación de la tabla 'libro'
CREATE TABLE libro (
    lbr_isbn VARCHAR(10) PRIMARY KEY,
    lbr_titulo VARCHAR(30),
    lbr_edicion INT,
    lbr_volumen INT,
    lbr_editorial VARCHAR(30),
    lbr_autor VARCHAR(30),
    lbr_ano_publ DATE,
    lbr_cat VARCHAR(30)
);

-- Inserción de datos en la tabla 'libro'
INSERT INTO libro (lbr_isbn, lbr_titulo, lbr_edicion, lbr_volumen, lbr_editorial, lbr_autor, lbr_ano_publ, lbr_cat) VALUES
    ('isbn001', 'Libro 1', 1, 1, 'Editorial 1', 'Autor 1', '2022-01-01', 'Categoría 1'),
    ('isbn002', 'Libro 2', 2, 1, 'Editorial 2', 'Autor 2', '2023-02-01', 'Categoría 2'),
    ('isbn003', 'Libro 3', 1, 2, 'Editorial 1', 'Autor 3', '2023-03-01', 'Categoría 1');
-- Agregar más datos de libros aquí

-- Creación de la tabla 'ensayo'
CREATE TABLE ensayo (
    ensy_cod VARCHAR(10) PRIMARY KEY,
    ensy_titulo VARCHAR(30),
    ensy_edicion INT,
    ensy_volumen INT,
    ensy_editorial VARCHAR(30),
    ensy_ano_publ DATE,
    ensy_autor VARCHAR(30)
);

-- Inserción de datos en la tabla 'ensayo'
INSERT INTO ensayo (ensy_cod, ensy_titulo, ensy_edicion, ensy_volumen, ensy_editorial, ensy_ano_publ, ensy_autor) VALUES
    ('ensayo001', 'Ensayo 1', 1, 1, 'Editorial 1', '2022-01-01', 'Autor Ensayo 1'),
    ('ensayo002', 'Ensayo 2', 2, 1, 'Editorial 2', '2023-02-01', 'Autor Ensayo 2'),
    ('ensayo003', 'Ensayo 3', 1, 2, 'Editorial 1', '2023-03-01', 'Autor Ensayo 3');
-- Agregar más datos de ensayos aquí

-- Creación de la tabla 'comic'
CREATE TABLE comic (
    cmc_isbn VARCHAR(10) PRIMARY KEY,
    cmc_titulo VARCHAR(30),
    cmc_edicion INT,
    cmc_volumen INT,
    cmc_editorial VARCHAR(30),
    cmc_autor VARCHAR(30),
    cmc_ano_publ DATE
);

-- Inserción de datos en la tabla 'comic'
INSERT INTO comic (cmc_isbn, cmc_titulo, cmc_edicion, cmc_volumen, cmc_editorial, cmc_autor, cmc_ano_publ) VALUES
    ('comic001', 'Comic 1', 1, 1, 'Editorial 1', 'Autor Comic 1', '2022-01-01'),
    ('comic002', 'Comic 2', 2, 1, 'Editorial 2', 'Autor Comic 2', '2023-02-01'),
    ('comic003', 'Comic 3', 1, 2, 'Editorial 1', 'Autor Comic 3', '2023-03-01');
-- Agregar más datos de cómics aquí
