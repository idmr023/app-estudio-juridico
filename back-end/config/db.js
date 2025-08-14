const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error fatal al conectar a MySQL:', err);
    process.exit(1); // Detiene la aplicación si no se puede conectar
  }
  console.log('Conexión a MySQL exitosa');
});

module.exports = db;