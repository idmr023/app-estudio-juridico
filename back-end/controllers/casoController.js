const db = require('../config/db');
const handleError = require('../utils/handleError');

exports.listarCasosPorCliente = async (req, res) => {
    try {
        const dni = Number(req.params.dni); // Asegurarse que es número

        // 1. PETICIÓN PRINCIPAL: Obtenemos todos los casos del cliente.
        // Usamos .where() para filtrar y .orderBy() para ordenar.
        const casosRef = db.collection('casos');
        const snapshot = await casosRef
            .where('cliente_dni', '==', dni)
            .orderBy('fecha_creacion', 'desc') // Ordenamos por fecha de creación (o el campo que prefieras)
            .get();

        // Si no se encuentra ningún caso, devolvemos un array vacío.
        if (snapshot.empty) {
            return res.json([]);
        }

        // 2. ITERACIÓN Y ENRIQUECIMIENTO:
        // Usamos Promise.all para hacer todas las búsquedas de abogados en paralelo. ¡Es muy eficiente!
        const casosPromesas = snapshot.docs.map(async (doc) => {
            const casoData = doc.data();
            let nombre_abogado = 'Pendiente de asignación';

            // 3. PETICIÓN SECUNDARIA (si es necesaria):
            // Si el caso tiene un abogado asignado, vamos a buscar su nombre.
            if (casoData.abogado_dni) {
                const abogadoDocRef = db.collection('usuarios').doc(String(casoData.abogado_dni));
                const abogadoDoc = await abogadoDocRef.get();
                
                if (abogadoDoc.exists) {
                    const abogadoData = abogadoDoc.data();
                    nombre_abogado = `${abogadoData.usr_nom} ${abogadoData.usr_ape}`;
                } else {
                    nombre_abogado = 'Abogado no encontrado';
                }
            }
         
            return {
                id: doc.id, // En Firestore, el ID del documento está separado de los datos
                ...casoData,
                nombre_abogado: nombre_abogado
            };
        });

        // Esperamos a que todas las promesas (búsquedas de abogados) se completen
        const casosEnriquecidos = await Promise.all(casosPromesas);
        
        res.json(casosEnriquecidos);

    } catch (err) {
        handleError(res, err, 'listar casos de cliente');
    }
};

exports.obtenerDetalleCaso = async (req, res) => {
    try {
        const caso_id = req.params.caso_id;

        const casoDocRef = db.collection('casos');
        const casoDoc = await casoDocRef.get();

        if (!casoDoc.exists) {
            return res.status(444).json({ message: 'Caso no encontrado' });
        }
        
        const casoData = casoDoc.data();
        const [eventosSnap, documentosSnap, mensajesSnap] = await Promise.all([
            casoDocRef.collection('eventos').orderBy('fecha_evento', 'desc').get(),
            casoDocRef.collection('documentos').orderBy('fecha_subida', 'desc').get(), 
            casoDocRef.collection('mensajes').orderBy('fecha_envio', 'asc').get()
        ]);

        // Mapeamos los resultados de las snapshots a arrays de datos.
        const eventos = eventosSnap.docs.map(doc => doc.data());
        const documentos = documentosSnap.docs.map(doc => doc.data());

        const mensajesPromesas = mensajesSnap.docs.map(async (doc) => {
            const mensajesData = doc.data();
            let nombre_remitente = 'Usuario desconocido';

            if(mensajesData.remitente_dni){
                const remitenteDoc =  await db.collection('usuarios').doc(String(mensajeData.remitente_dni)).get();
                if (remitenteDoc.exists) {
                    nombre_remitente = remitenteDoc.data().usr_nom;
                }
            }
            return { ...mensajeData, nombre_remitente };
        });

        const mensajes = await Promise.all(mensajesPromesas);


        let nombre_abogado = 'Pendiente de asignación';
        if (casoData.abogado_dni){
            const abogadoDoc = await db.collection('usuarios').doc(String(casoData.abogado_dni)).get();
            if (abogadoDoc.exists) {
                nombre_abogado = `${abogadoDoc.data().usr_nom} ${abogadoDoc.data().usr_ape}`;
            }
        }

        res.json({
            id: casoDoc.id,
            ...casoData,
            timeline: eventos,
            documentos: documentos,
            mensajes: mensajes,
            nombre_abogado: nombre_abogado
        });

    } catch (err) {
        handleError(res, err, 'Obtener detalle de caso');
    }
};