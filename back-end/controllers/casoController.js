const db = require('../config/db');
const handleError = require('../utils/handleError');

exports.listarCasosPorCliente = (req, res) => {
    const dni = req.params.dni;
    const sql = `SELECT c.*, CONCAT(a.usr_nom, ' ', a.usr_ape) AS nombre_abogado FROM casos AS c LEFT JOIN usuario AS a ON c.abogado_dni = a.usr_dni WHERE c.cliente_dni = ? ORDER BY c.fecha_actualizacion DESC;`;
    db.query(sql, [dni], (err, result) => {
        if (err) return handleError(res, err, 'listar casos de cliente');
        res.json(result);
    });
};

exports.obtenerDetalleCaso = async (req, res) => {
    const { caso_id } = req.params;
    try {
        const [casoResult, eventosResult, docsResult, msjsResult] = await Promise.all([
            db.promise().query(`SELECT c.*, CONCAT(a.usr_nom, ' ', a.usr_ape) AS nombre_abogado FROM casos AS c LEFT JOIN usuario AS a ON c.abogado_dni = a.usr_dni WHERE c.caso_id = ?`, [caso_id]),
            db.promise().query('SELECT evento_id, caso_id, evento_descripcion, creado_por_dni, DATE_FORMAT(fecha_evento, "%Y-%m-%dT%H:%i:%s.000Z") AS fecha_evento FROM eventos_caso WHERE caso_id = ? ORDER BY fecha_evento DESC', [caso_id]),
            db.promise().query('SELECT * FROM documentos_caso WHERE caso_id = ? ORDER BY fecha_subida DESC', [caso_id]),
            db.promise().query(`SELECT m.*, u.usr_nom AS nombre_remitente FROM mensajes_caso AS m JOIN usuario AS u ON m.remitente_dni = u.usr_dni WHERE m.caso_id = ? ORDER BY m.fecha_envio ASC`, [caso_id])
        ]);

        const [casoData] = casoResult[0];
        if (!casoData) return res.status(404).json({ message: 'Caso no encontrado' });
        
        res.json({
            ...casoData,
            timeline: eventosResult[0],
            documentos: docsResult[0],
            mensajes: msjsResult[0]
        });
    } catch (err) {
        handleError(res, err, 'obtener detalle de caso');
    }
};