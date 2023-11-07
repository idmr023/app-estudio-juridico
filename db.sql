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
    usr_dni INT PRIMARY KEY,
    usr_nom VARCHAR(30),
    usr_ape VARCHAR(30),
    usr_pswd VARCHAR(30),
    usr_email VARCHAR(30)
);

-- Inserción de datos en la tabla 'usuario'
INSERT INTO usuario (usr_dni, usr_nom, usr_ape, usr_pswd, usr_email) VALUES
    (111111111, 'Usuario 1', 'Apellido 1', 'clave1', 'usuario1@example.com'),
    (222222222, 'Usuario 2', 'Apellido 2', 'clave2', 'usuario2@example.com'),
    (333333333, 'Usuario 3', 'Apellido 3', 'clave3', 'usuario3@example.com');
-- Agregar más datos de usuarios aquí

-- Creación de la tabla 'libro'
CREATE TABLE libro (
    lbr_isbn VARCHAR(10) PRIMARY KEY,
    lbr_titulo VARCHAR(30),
    lbr_edicion INT,
    lbr_volumen INT,
    lbr_editorial VARCHAR(30),
    lbr_autor VARCHAR(30),
    lbr_descripcion VARCHAR(200),
    lbr_ano_publ DATE,
    lbr_genero VARCHAR(30),
    lbr_tipo VARCHAR(30),
    lbr_precio FLOAT,
    lbr_portada VARCHAR(100)
);

INSERT INTO libro (lbr_isbn, lbr_titulo, lbr_edicion, lbr_volumen, lbr_editorial, lbr_autor, lbr_ano_publ, lbr_genero, lbr_tipo, lbr_precio, lbr_portada)
VALUES
    ('9780547928227', 'El Señor de los Anillos', 3, 1, 'Minotauro', 'J.R.R. Tolkien', '1954-07-29', 'Fantasía', 'Libro', 19.99, 'https://images.cdn3.buscalibre.com/fit-in/360x360/c8/46/c84670a719ca6d243222755407a8cf6f.jpg'),
    ('9780061120084', 'To Kill a Mockingbird', 1, 1, 'Harper Perennial Modern Classics', 'Harper Lee', '1960-07-11', 'Novela', 'Libro', 15.99, 'https://epqkkxb65h3.exactdn.com/wp-content/uploads/2023/02/m-2908.jpg'),
    ('9780141439587', 'Moby-Dick', 1, 1, 'Penguin Classics', 'Herman Melville', '1851-10-18', 'Aventuras', 'Libro', 12.50, 'https://images.cdn1.buscalibre.com/fit-in/360x360/b5/89/b589be02f650868192cc4bc0c876ea31.jpg'),
    ('9788418017469', 'Cien años de soledad', 1, 1, 'Debolsillo', 'Gabriel García Márquez', '1967-05-30', 'Realismo mágico', 'Libro', 18.75, 'https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg'),
    ('9788433975090', '1984', 1, 1, 'Anagrama', 'George Orwell', '1949-06-08', 'Distopía', 'Libro', 14.99, 'https://images.cdn1.buscalibre.com/fit-in/360x360/b0/39/b039af065268818b7bd3b0e016f8db65.jpg')