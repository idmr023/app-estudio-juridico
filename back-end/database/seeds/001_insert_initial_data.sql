-- =================================================================
-- SEED 001: INSERCIÓN DE DATOS INICIALES
-- Puebla la base de datos con datos de ejemplo para desarrollo.
-- =================================================================
USE bdservicios;

INSERT INTO admin (admin_cod, admin_dni, admin_nom, admin_ape, admin_pswd, admin_email) VALUES
('adm001', 74569821, 'Lucía', 'Delgado', 'admin123', 'lucia.delgado@bufete.com'),
('adm002', 89654732, 'Carlos', 'Sánchez', 'admin456', 'carlos.sanchez@bufete.com'),
('adm003', 65749218, 'Marta', 'Reyes', 'admin789', 'marta.reyes@bufete.com');

INSERT INTO servicio (srv_nombre, srv_tipo, srv_descripcion, srv_precio, srv_imagen, srv_tiempo_estimado, srv_modalidad) VALUES
('Asesoría Legal Básica', 'Civil', 'Consulta general de hasta 30 minutos.', 120.00, 'url_placeholder', '48 horas', 'Virtual'),
('Redacción de Contrato', 'Corporativo', 'Servicio completo de redacción de contratos.', 300.00, 'url_placeholder', '72 horas', 'Virtual');

INSERT INTO usuario (usr_dni, usr_nom, usr_ape, usr_pswd, usr_email, usr_img, usr_listDeseados) VALUES
(12345678, 'Pedro', 'Ramírez', 'clave123', 'pedro.ramirez@gmail.com', 'url_placeholder', ''),
(23456789, 'Ana', 'Gonzales', 'clave456', 'ana.gonzales@gmail.com', 'url_placeholder', ''),
(11223344, 'Carlos', 'Gomez', 'pass123', 'carlos.g@email.com', 'url_placeholder', ''),
(55667788, 'Ana', 'Torres', 'pass123', 'ana.t@email.com', 'url_placeholder', ''),
(99887766, 'Luisa', 'Mendez', 'pass123', 'luisa.m@email.com', 'url_placeholder', ''),
(10102020, 'Roberto', 'Perez', 'abogadoPass', 'roberto.p@bufete.com', 'url_placeholder', ''),
(30304040, 'Sofia', 'Castro', 'abogadoPass', 'sofia.c@bufete.com', 'url_placeholder', '');

INSERT INTO casos (cliente_dni, abogado_dni, caso_titulo, caso_descripcion, caso_estado) VALUES
(11223344, 10102020, 'Divorcio de mutuo acuerdo', 'Proceso de divorcio solicitado por ambas partes.', 'Activo'),
(55667788, NULL, 'Disputa de linderos', 'Conflicto con vecino sobre los límites de la propiedad.', 'En revisión'),
(99887766, 30304040, 'Reclamación por factura impagada', 'La reclamación fue exitosa.', 'Cerrado');

INSERT INTO eventos_caso (caso_id, evento_descripcion, creado_por_dni, fecha_evento) VALUES
('C20250001', 'Caso creado y asignado al abogado Roberto Perez.', 10102020, '2025-08-01 10:00:00'),
('C20250001', 'Estado del caso actualizado a "En revisión".', 10102020, '2025-08-02 15:30:00');

INSERT INTO documentos_caso (caso_id, nombre_archivo, url_almacenamiento, tipo_archivo, subido_por_dni) VALUES
('C20250001', 'Convenio_Regulador_Borrador.pdf', 'https://example.com/storage/doc1.pdf', 'application/pdf', 10102020);

INSERT INTO mensajes_caso (caso_id, remitente_dni, contenido_mensaje, fecha_envio) VALUES
('C20250001', 11223344, 'Buenas tardes, abogado. He subido la copia de mi DNI.', '2025-08-03 09:16:00');