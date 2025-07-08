-- Combinar las dos bases de datos
DROP DATABASE IF EXISTS bdservicios;
CREATE DATABASE bdservicios;
USE bdservicios;

-- Creación de la tabla 'admin'
CREATE TABLE admin (
    admin_cod VARCHAR(10) PRIMARY KEY,
    admin_dni INT,
    admin_nom VARCHAR(30),
    admin_ape VARCHAR(30),
    admin_pswd VARCHAR(30),
    admin_email VARCHAR(30)
);

INSERT INTO admin (admin_cod, admin_dni, admin_nom, admin_ape, admin_pswd, admin_email) VALUES
    ('adm001', 74569821, 'Lucía', 'Delgado', 'admin123', 'lucia.delgado@bufete.com'),
    ('adm002', 89654732, 'Carlos', 'Sánchez', 'admin456', 'carlos.sanchez@bufete.com'),
    ('adm003', 65749218, 'Marta', 'Reyes', 'admin789', 'marta.reyes@bufete.com');

-- Creación de la tabla 'usuario'
CREATE TABLE usuario (
    usr_dni INT PRIMARY KEY,
    usr_nom VARCHAR(30),
    usr_ape VARCHAR(30),
    usr_pswd VARCHAR(30),
    usr_email VARCHAR(50),
    usr_img VARCHAR(200),
    usr_listDeseados TEXT
);

INSERT INTO usuario (usr_dni, usr_nom, usr_ape, usr_pswd, usr_email, usr_img, usr_listDeseados) VALUES
    (12345678, 'Pedro', 'Ramírez', 'clave123', 'pedro.ramirez@gmail.com', 'https://ui-avatars.com/api/?background=random&name=Pedro+Ramírez', ''),
    (23456789, 'Ana', 'Gonzales', 'clave456', 'ana.gonzales@gmail.com', 'https://ui-avatars.com/api/?background=random&name=Ana+Gonzales', ''),
    (34567890, 'Luis', 'Fernández', 'clave789', 'luis.fernandez@gmail.com', 'https://ui-avatars.com/api/?background=random&name=Luis+Fernández', '');

-- Creación de la tabla 'servicios'
CREATE TABLE servicio (
    srv_id INT AUTO_INCREMENT PRIMARY KEY,
    srv_nombre VARCHAR(100),
    srv_tipo VARCHAR(50),
    srv_descripcion TEXT,
    srv_precio FLOAT,
    srv_imagen VARCHAR(200),
    srv_tiempo_estimado VARCHAR(50),
    srv_modalidad VARCHAR(20)
);

INSERT INTO servicio (srv_nombre, srv_tipo, srv_descripcion, srv_precio, srv_imagen, srv_tiempo_estimado, srv_modalidad) VALUES
    ('Asesoría Legal Básica', 'Civil', 'Consulta general de hasta 30 minutos para resolver dudas sobre procesos civiles o conflictos legales menores.', 120.00, 'https://via.placeholder.com/200x200?text=Asesoria+Legal', '48 horas', 'Virtual'),
    ('Redacción de Contrato', 'Corporativo', 'Servicio completo de redacción de contratos civiles o comerciales con revisión de cláusulas.', 300.00, 'https://via.placeholder.com/200x200?text=Contrato', '72 horas', 'Virtual'),
    ('Defensa Laboral', 'Laboral', 'Representación en conflictos laborales (despidos, indemnización, hostigamiento laboral).', 500.00, 'https://via.placeholder.com/200x200?text=Laboral', '96 horas', 'Presencial'),
    ('Acompañamiento Judicial', 'Penal', 'Asistencia en procesos judiciales penales. Incluye 1 reunión presencial y seguimiento del caso.', 800.00, 'https://via.placeholder.com/200x200?text=Penal', '120 horas', 'Presencial'),
    ('Constitución de Empresa', 'Corporativo', 'Asesoría y trámite para constitución formal de empresa ante registros públicos.', 650.00, 'https://via.placeholder.com/200x200?text=Empresa', '5 días', 'Virtual');