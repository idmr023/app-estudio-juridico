// 1. IMPORTACIONES
const { db } = require('../config/firebase'); // Importamos la instancia de Firestore
const handleError = require('../utils/handleError');
const usrIMG = require('../utils/usrIMG');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Factor de seguridad para el hasheo

// 2. OBTENER DATOS DE UN USUARIO POR DNI
exports.obtenerUsuario = async (req, res) => {
    try {
        const dni = req.params.dni;
        const userDocRef = db.collection('usuarios').doc(String(dni));
        const doc = await userDocRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Excluimos la contraseña antes de enviar los datos
        const { usr_pswd, ...userData } = doc.data();
        res.json(userData);

    } catch (err) {
        handleError(res, err, 'obtener usuario por dni');
    }
};

exports.registrarUsuario = async (req, res) => {
    try {
        const { name, dni, email, password } = req.body;
        const userDocRef = db.collection('usuarios').doc(String(dni));

        const doc = await userDocRef.get();
        if (doc.exists) {
            return res.status(409).json({ message: 'El DNI ya está registrado.' });
        }

        // Hasheamos la contraseña ANTES de guardarla (¡MUY IMPORTANTE!)
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const nuevoUsuario = {
            usr_nom: name,
            usr_dni: Number(dni), // Guardamos el DNI como número
            usr_email: email,
            usr_pswd: hashedPassword, // Guardamos el HASH, no la contraseña real
            usr_img: usrIMG(name),
            rol: 'cliente' // Asignamos un rol por defecto
        };
        
        // Creamos el nuevo documento de usuario
        await userDocRef.set(nuevoUsuario);

        res.status(201).json({ message: 'Usuario registrado con éxito' });

    } catch (err) {
        handleError(res, err, 'registrar usuario');
    }
};

// 4. INICIAR SESIÓN DE UN USUARIO
exports.iniciarSesion = async (req, res) => {
    try {
        const { dni, password } = req.body;
        console.log('--- INTENTO DE LOGIN RECIBIDO ---', { dni, password });

        const userDocRef = db.collection('usuarios').doc(String(dni));
        const doc = await userDocRef.get();

        // Primero, verificamos si el usuario (DNI) existe
        if (!doc.exists) {
            console.log(`Login fallido: DNI ${dni} no encontrado.`);
            return res.status(401).json({ status: 'Falla', message: 'DNI o contraseña incorrectos.' });
        }

        const userData = doc.data();
        const hashedPasswordInDB = userData.usr_pswd;

        // Segundo, comparamos la contraseña enviada con el hash guardado en la BD
        const passwordIsValid = bcrypt.compareSync(password, hashedPasswordInDB);
        
        console.log(`La comparación de contraseña para DNI ${dni} fue: ${passwordIsValid}`);

        if (passwordIsValid) {
            // ¡Éxito! Excluimos la contraseña del objeto que devolvemos
            const { usr_pswd, ...user } = userData;
            res.json({ status: 'Exito', user: user });
        } else {
            // La contraseña no coincide
            res.status(401).json({ status: 'Falla', message: 'DNI o contraseña incorrectos.' });
        }
    } catch (err) {
        handleError(res, err, 'iniciar sesión');
    }
};