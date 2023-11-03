const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { Resend } = require('resend');
const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdlibreria'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa');
});

// Lista admin

app.get('/admin', (req, res) => {
  const sql = 'SELECT * FROM admin';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener admin:', err);
      res.status(500).send('Error al obtener admin');
      return;
    }
    res.json(result);
  });
});

app.post('/api/signup', (req, res) => {
  const sql = 'INSERT INTO usuario (`usr_nom`, `usr_dni`, `usr_email`, `usr_pswd`) VALUES(?)';
  const values = [
    req.body.name,
    req.body.dni,
    req.body.email,
    req.body.password,
  ]
  db.query(sql, [values], (err, data) => {
    if(err){
      return res.json("Error");
    }
    return res.json(data);
  })
})

//Login
app.post('/api/login', (req, res) => {
  const {dni, password} = req.body
  const values = [dni, password]
  const sql = 'SELECT * FROM usuario WHERE usr_dni = ? AND usr_pswd = ?'
    db.query(sql, values, (err, data) => {
      if(err){
        return res.json("Error")
      } if(data.length > 0){
        return res.json("Exito")
      } else{
        return res.json("Falla")
      }
    })
});

//Enviar correo
app.post('/api/send-email', async (req, res) => {
  const nodemailer = require('nodemailer');
  const values = [
    req.body.usr,
    req.body.email,
    req.body.texto,
  ]
  enviarMail = async() => {
      const config = {
          host : 'smtp.gmail.com',
          port : 587,
          auth : {
              user: 'jparatupcya@gmail.com',
              pass : 'xekh jfzl fzlg wuuv'
          }
      }

      const mensaje = {
        from: 'jparatupcya@gmail.com',
        to: values[1],
        subject: 'Hola ' + values[0] + ' - Su mensaje ha sido recibido',
        text: values[2]
    } 

      const transport = nodemailer.createTransport(config);
      const info = await transport.sendMail(mensaje);
  }

  enviarMail();
})  

app.listen(3001, () => {
  console.log('Servidor backend en ejecución en el puerto 3001');
});