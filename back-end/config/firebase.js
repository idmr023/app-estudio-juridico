const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const authAdmin = admin.auth();
const storageAdmin = admin.storage();

console.log('Conexión a Firebase Admin SDK exitosa.');

module.exports = { db, authAdmin, storageAdmin };