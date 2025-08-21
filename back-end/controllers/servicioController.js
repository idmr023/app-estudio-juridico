const { db } = require('../config/firebase');
const handleError = require('../utils/handleError');

exports.listarServicios = async (req, res) => {
    try {
        const serviciosRef = db.collection('servicios');
        
        const snapshot = await serviciosRef.get();

        if (snapshot.empty) {
            console.log('No se encontraron documentos en la colección de servicios.');
            return res.json([]);
        }

        const servicios = snapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data()
        }));

        res.json(servicios);

    } catch (err) {
        handleError(res, err, 'listar servicios');
    }
};