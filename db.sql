-- ====================================================================================
-- SCRIPT DE BASE DE DATOS COMPLETO Y CORREGIDO PARA 'PROYECTO ABOGADO'
-- ====================================================================================
-- Este script realiza las siguientes acciones:
-- 1. Crea la base de datos 'bdservicios' desde cero.
-- 2. Limpia cualquier versión anterior de las tablas y triggers.
-- 3. Crea todas las estructuras de tablas ('admin', 'usuario', 'servicio', 'casos', 'caso_secuencia').
-- 4. Implementa el trigger para la generación automática de IDs de caso (ej: C20250001).
-- 5. Inserta datos de ejemplo de forma ordenada y consistente, respetando las claves foráneas.
-- 6. Realiza una verificación final de los datos insertados.
-- ====================================================================================


-- --- SECCIÓN 1: CONFIGURACIÓN DEL ENTORNO DE LA BASE DE DATOS ---
DROP DATABASE IF EXISTS bdservicios;
CREATE DATABASE bdservicios;
USE bdservicios;


-- --- SECCIÓN 2: LIMPIEZA DE OBJETOS (para permitir re-ejecución) ---
DROP TRIGGER IF EXISTS tg_casos_before_insert;
DROP TABLE IF EXISTS casos;
DROP TABLE IF EXISTS caso_secuencia;
DROP TABLE IF EXISTS servicio;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS admin;


-- --- SECCIÓN 3: CREACIÓN DE ESTRUCTURAS DE TABLAS ---

-- Tabla 'admin': Para los administradores del sistema.
CREATE TABLE admin (
    admin_cod VARCHAR(10) PRIMARY KEY,
    admin_dni INT,
    admin_nom VARCHAR(30),
    admin_ape VARCHAR(30),
    admin_pswd VARCHAR(30),
    admin_email VARCHAR(30)
);

-- Tabla 'usuario': Almacena tanto a clientes como a abogados. Es la tabla "padre" de 'casos'.
CREATE TABLE usuario (
    usr_dni INT PRIMARY KEY,
    usr_nom VARCHAR(30),
    usr_ape VARCHAR(30),
    usr_pswd VARCHAR(30),
    usr_email VARCHAR(50),
    usr_img VARCHAR(200),
    usr_listDeseados TEXT
);

-- Tabla 'servicio': Almacena la oferta de servicios legales.
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

-- --- TABLA PARA EL TIMELINE / HISTORIAL DE EVENTOS ---
CREATE TABLE eventos_caso (
    evento_id INT AUTO_INCREMENT PRIMARY KEY,
    -- Clave foránea para vincular con el caso específico
    caso_id VARCHAR(15) NOT NULL,
    -- Descripción del hito (ej: "Estado actualizado a 'En revisión'")
    evento_descripcion VARCHAR(255) NOT NULL,
    -- Quién realizó la acción (útil para auditoría)
    creado_por_dni INT,
    -- Fecha en que ocurrió el evento
    fecha_evento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caso_id) REFERENCES casos(caso_id) ON DELETE CASCADE,
    FOREIGN KEY (creado_por_dni) REFERENCES usuario(usr_dni) ON DELETE SET NULL
);

INSERT INTO eventos_caso (caso_id, evento_descripcion, creado_por_dni, fecha_evento) VALUES
('C20250001', 'Caso creado y asignado al abogado Roberto Perez.', 10102020, '2025-08-01 10:00:00'),
('C20250001', 'Estado del caso actualizado a "En revisión".', 10102020, '2025-08-02 15:30:00'),
('C20250001', 'Cliente ha subido un nuevo documento: "Copia_DNI_Carlos_Gomez.jpg".', 11223344, '2025-08-03 09:15:00'),
('C20250001', 'Abogado ha subido un nuevo documento: "Convenio_Regulador_Borrador.pdf".', 10102020, '2025-08-04 11:00:00'),
('C20250002', 'Caso creado. Pendiente de asignación de abogado.', 55667788, '2025-08-05 16:00:00'),
('C20250003', 'Estado del caso actualizado a "Cerrado".', 30304040, '2025-07-20 18:00:00');

-- --- TABLA PARA LOS DOCUMENTOS ---
CREATE TABLE documentos_caso (
    doc_id INT AUTO_INCREMENT PRIMARY KEY,
    caso_id VARCHAR(15) NOT NULL,
    -- El nombre original del archivo para mostrar al usuario
    nombre_archivo VARCHAR(255) NOT NULL,
    -- IMPORTANTE: Aquí se guarda la URL del archivo almacenado en un servicio como S3 o Cloudinary
    url_almacenamiento TEXT NOT NULL,
    -- El tipo de archivo (ej: 'application/pdf') para mostrar iconos
    tipo_archivo VARCHAR(100),
    -- Quién subió el documento
    subido_por_dni INT,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caso_id) REFERENCES casos(caso_id) ON DELETE CASCADE,
    FOREIGN KEY (subido_por_dni) REFERENCES usuario(usr_dni) ON DELETE SET NULL
);

INSERT INTO documentos_caso (caso_id, nombre_archivo, url_almacenamiento, tipo_archivo, subido_por_dni) VALUES
('C20250001', 'Convenio_Regulador_Borrador.pdf', 'https://example.com/storage/doc1.pdf', 'application/pdf', 10102020),
('C20250001', 'Copia_DNI_Carlos_Gomez.jpg', 'https://example.com/storage/doc2.jpg', 'image/jpeg', 11223344),
('C20250002', 'Escrituras_Propiedad_Lote_A.pdf', 'https://example.com/storage/doc3.pdf', 'application/pdf', 55667788),
('C20250003', 'Comprobante_Pago_Final.pdf', 'https://example.com/storage/doc4.pdf', 'application/pdf', 99887766);

-- --- TABLA PARA LA MENSAJERÍA ---
CREATE TABLE mensajes_caso (
    mensaje_id INT AUTO_INCREMENT PRIMARY KEY,
    caso_id VARCHAR(15) NOT NULL,
    -- Quién envió el mensaje
    remitente_dni INT NOT NULL,
    -- El contenido del mensaje
    contenido_mensaje TEXT NOT NULL,
    -- Fecha de envío
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Para saber si el mensaje ha sido visto (0 = no leído, 1 = leído)
    leido TINYINT(1) DEFAULT 0,
    FOREIGN KEY (caso_id) REFERENCES casos(caso_id) ON DELETE CASCADE,
    FOREIGN KEY (remitente_dni) REFERENCES usuario(usr_dni) ON DELETE CASCADE
);

INSERT INTO mensajes_caso (caso_id, remitente_dni, contenido_mensaje, fecha_envio) VALUES
('C20250001', 11223344, 'Buenas tardes, abogado. He subido la copia de mi DNI. ¿Hay algún otro documento que necesite de mi parte por ahora?', '2025-08-03 09:16:00'),
('C20250001', 10102020, 'Recibido, Carlos. Gracias. Por ahora es suficiente. Estoy terminando el borrador del convenio, se lo enviaré para su revisión a más tardar mañana.', '2025-08-03 11:30:00'),
('C20250001', 11223344, 'Perfecto, quedo a la espera. Muchas gracias.', '2025-08-03 11:35:00'),
('C20250003', 30304040, 'Luisa, le confirmo que el pago ha sido procesado y el caso se ha cerrado exitosamente. Saludos.', '2025-07-20 18:05:00');

-- Tabla 'casos': Almacena los casos legales, vinculados a la tabla 'usuario'.
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

-- Tabla 'caso_secuencia': Tabla auxiliar para llevar el conteo de los IDs de casos por año.
CREATE TABLE caso_secuencia (
    año INT PRIMARY KEY,
    ultimo_id INT NOT NULL DEFAULT 0
);

-- --- SECCIÓN 4: CREACIÓN DEL TRIGGER PARA IDs AUTOMÁTICOS ---
DELIMITER $$
CREATE TRIGGER tg_casos_before_insert
BEFORE INSERT ON casos
FOR EACH ROW
BEGIN
    DECLARE current_year INT;
    DECLARE next_id INT;
    DECLARE final_id VARCHAR(15);

    SET current_year = YEAR(CURDATE());
    INSERT INTO caso_secuencia (año, ultimo_id)
    VALUES (current_year, 1)
    ON DUPLICATE KEY UPDATE ultimo_id = ultimo_id + 1;
    SELECT ultimo_id INTO next_id FROM caso_secuencia WHERE año = current_year;
    SET final_id = CONCAT('C', current_year, LPAD(next_id, 4, '0'));
    SET NEW.caso_id = final_id;
END$$
DELIMITER ;


-- --- SECCIÓN 5: INSERCIÓN DE DATOS DE EJEMPLO ---

-- Se insertan los datos en las tablas independientes y "padre" primero.
INSERT INTO admin (admin_cod, admin_dni, admin_nom, admin_ape, admin_pswd, admin_email) VALUES
('adm001', 74569821, 'Lucía', 'Delgado', 'admin123', 'lucia.delgado@bufete.com'),
('adm002', 89654732, 'Carlos', 'Sánchez', 'admin456', 'carlos.sanchez@bufete.com'),
('adm003', 65749218, 'Marta', 'Reyes', 'admin789', 'marta.reyes@bufete.com');

INSERT INTO servicio (srv_nombre, srv_tipo, srv_descripcion, srv_precio, srv_imagen, srv_tiempo_estimado, srv_modalidad) VALUES
('Asesoría Legal Básica', 'Civil', 'Consulta general de hasta 30 minutos para resolver dudas sobre procesos civiles o conflictos legales menores.', 120.00, 'https://via.placeholder.com/200x200?text=Asesoria+Legal', '48 horas', 'Virtual'),
('Redacción de Contrato', 'Corporativo', 'Servicio completo de redacción de contratos civiles o comerciales con revisión de cláusulas.', 300.00, 'https://via.placeholder.com/200x200?text=Contrato', '72 horas', 'Virtual'),
('Defensa Laboral', 'Laboral', 'Representación en conflictos laborales (despidos, indemnización, hostigamiento laboral).', 500.00, 'https://via.placeholder.com/200x200?text=Laboral', '96 horas', 'Presencial'),
('Acompañamiento Judicial', 'Penal', 'Asistencia en procesos judiciales penales. Incluye 1 reunión presencial y seguimiento del caso.', 800.00, 'https://via.placeholder.com/200x200?text=Penal', '120 horas', 'Presencial'),
('Constitución de Empresa', 'Corporativo', 'Asesoría y trámite para constitución formal de empresa ante registros públicos.', 650.00, 'https://via.placeholder.com/200x200?text=Empresa', '5 días', 'Virtual');

-- **CORRECCIÓN CLAVE**: Se insertan TODOS los usuarios necesarios (clientes y abogados) ANTES de insertar los casos.
INSERT INTO usuario (usr_dni, usr_nom, usr_ape, usr_pswd, usr_email, usr_img, usr_listDeseados) VALUES
(12345678, 'Pedro', 'Ramírez', 'clave123', 'pedro.ramirez@gmail.com', 'https://ui-avatars.com/api/?background=random&name=Pedro+Ramírez', ''),
(23456789, 'Ana', 'Gonzales', 'clave456', 'ana.gonzales@gmail.com', 'https://ui-avatars.com/api/?background=random&name=Ana+Gonzales', ''),
(34567890, 'Luis', 'Fernández', 'clave789', 'luis.fernandez@gmail.com', 'https://ui-avatars.com/api/?background=random&name=Luis+Fernández', ''),
-- Usuarios necesarios para la tabla 'casos'
(11223344, 'Carlos', 'Gomez', 'pass123', 'carlos.g@email.com', 'https://ui-avatars.com/api/?background=random&name=Carlos+Gomez', ''),
(55667788, 'Ana', 'Torres', 'pass123', 'ana.t@email.com', 'https://ui-avatars.com/api/?background=random&name=Ana+Torres', ''),
(99887766, 'Luisa', 'Mendez', 'pass123', 'luisa.m@email.com', 'https://ui-avatars.com/api/?background=random&name=Luisa+Mendez', ''),
-- Abogados que también son usuarios
(10102020, 'Roberto', 'Perez', 'abogadoPass', 'roberto.p@bufete.com', 'https://ui-avatars.com/api/?background=random&name=Roberto+Perez', ''),
(30304040, 'Sofia', 'Castro', 'abogadoPass', 'sofia.c@bufete.com', 'https://ui-avatars.com/api/?background=random&name=Sofia+Castro', '');


-- Finalmente, se insertan los datos en la tabla "hija" ('casos'). Esto ahora funcionará correctamente.
INSERT INTO casos (cliente_dni, abogado_dni, caso_titulo, caso_descripcion, caso_estado) VALUES
(11223344, 10102020, 'Divorcio de mutuo acuerdo', 'Proceso de divorcio solicitado por ambas partes, se necesita redacción de convenio regulador.', 'Activo'),
(55667788, NULL, 'Disputa de linderos', 'Conflicto con vecino sobre los límites de la propiedad. Se requiere revisión de escrituras.', 'En revisión'),
(99887766, 30304040, 'Reclamación por factura impagada', 'La reclamación fue exitosa y el pago fue recibido. Caso finalizado.', 'Cerrado');


-- --- SECCIÓN 6: VERIFICACIÓN FINAL ---
SELECT 'Contenido de la tabla admin:' AS '';
SELECT * FROM admin;
SELECT 'Contenido de la tabla usuario:' AS '';
SELECT * FROM usuario;
SELECT 'Contenido de la tabla servicio:' AS '';
SELECT * FROM servicio;
SELECT 'Contenido de la tabla casos (con IDs autogenerados):' AS '';
SELECT * FROM casos;