-- =================================================================
-- MIGRACIÓN 001: CREACIÓN DEL ESQUEMA INICIAL DE LA BASE DE DATOS
-- Define la ESTRUCTURA de todas las tablas y sus relaciones.
-- =================================================================

-- --- CONFIGURACIÓN DEL ENTORNO ---
DROP DATABASE IF EXISTS bdservicios;
CREATE DATABASE bdservicios;
USE bdservicios;

-- --- CREACIÓN DE TABLAS (en orden de dependencia) ---

-- Tablas independientes (no dependen de otras)
CREATE TABLE admin (
    admin_cod VARCHAR(10) PRIMARY KEY,
    admin_dni INT,
    admin_nom VARCHAR(30),
    admin_ape VARCHAR(30),
    admin_pswd VARCHAR(30),
    admin_email VARCHAR(30)
);

CREATE TABLE usuario (
    usr_dni INT PRIMARY KEY,
    usr_nom VARCHAR(30),
    usr_ape VARCHAR(30),
    usr_pswd VARCHAR(30),
    usr_email VARCHAR(50),
    usr_img VARCHAR(200),
    usr_listDeseados TEXT
);

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

CREATE TABLE caso_secuencia (
    año INT PRIMARY KEY,
    ultimo_id INT NOT NULL DEFAULT 0
);

-- Tablas dependientes (tienen claves foráneas a las tablas anteriores)
-- **CORRECCIÓN**: La tabla 'casos' debe crearse ANTES de las tablas que dependen de ella.
CREATE TABLE casos (
    caso_id VARCHAR(15) PRIMARY KEY,
    cliente_dni INT NOT NULL,
    abogado_dni INT,
    caso_titulo VARCHAR(100) NOT NULL,
    caso_descripcion TEXT,
    caso_estado ENUM('Activo', 'En revisión', 'Cerrado') NOT NULL DEFAULT 'Activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_dni) REFERENCES usuario(usr_dni) ON DELETE CASCADE,
    FOREIGN KEY (abogado_dni) REFERENCES usuario(usr_dni) ON DELETE SET NULL
);

CREATE TABLE eventos_caso (
    evento_id INT AUTO_INCREMENT PRIMARY KEY,
    caso_id VARCHAR(15) NOT NULL,
    evento_descripcion VARCHAR(255) NOT NULL,
    creado_por_dni INT,
    fecha_evento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caso_id) REFERENCES casos(caso_id) ON DELETE CASCADE,
    FOREIGN KEY (creado_por_dni) REFERENCES usuario(usr_dni) ON DELETE SET NULL
);

CREATE TABLE documentos_caso (
    doc_id INT AUTO_INCREMENT PRIMARY KEY,
    caso_id VARCHAR(15) NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    url_almacenamiento TEXT NOT NULL,
    tipo_archivo VARCHAR(100),
    subido_por_dni INT,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caso_id) REFERENCES casos(caso_id) ON DELETE CASCADE,
    FOREIGN KEY (subido_por_dni) REFERENCES usuario(usr_dni) ON DELETE SET NULL
);

CREATE TABLE mensajes_caso (
    mensaje_id INT AUTO_INCREMENT PRIMARY KEY,
    caso_id VARCHAR(15) NOT NULL,
    remitente_dni INT NOT NULL,
    contenido_mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leido TINYINT(1) DEFAULT 0,
    FOREIGN KEY (caso_id) REFERENCES casos(caso_id) ON DELETE CASCADE,
    FOREIGN KEY (remitente_dni) REFERENCES usuario(usr_dni) ON DELETE CASCADE
);


-- --- CREACIÓN DEL TRIGGER ---
DELIMITER $$
CREATE TRIGGER tg_casos_before_insert
BEFORE INSERT ON casos
FOR EACH ROW
BEGIN
    DECLARE current_year INT;
    DECLARE next_id INT;
    DECLARE final_id VARCHAR(15);
    SET current_year = YEAR(CURDATE());
    INSERT INTO caso_secuencia (año, ultimo_id) VALUES (current_year, 1) ON DUPLICATE KEY UPDATE ultimo_id = ultimo_id + 1;
    SELECT ultimo_id INTO next_id FROM caso_secuencia WHERE año = current_year;
    SET final_id = CONCAT('C', current_year, LPAD(next_id, 4, '0'));
    SET NEW.caso_id = final_id;
END$$
DELIMITER ;