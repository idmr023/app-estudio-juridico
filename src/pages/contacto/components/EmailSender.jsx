import axios from 'axios';
import React, { useState } from 'react';
import "../css/estilos_contacto.css";
import styled from 'styled-components';

const Boton = styled.button`
    width: 100px;
    background: #00bcd4;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 10px;
    font-size: 18px;
    width: 100%;
`

function EmailSender() {
  const [emailResponse, setEmailResponse] = useState(null);
  const [contenido, setContenido] = useState('');

  const texto = ` <style>
      @import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins:wght@300&display=swap");
      *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
      h1, h2,h3, p{
          font-family: "Poppins", sans-serif;
      }
      svg{
          position: absolute; 
          width: 100%;
          z-index: -1;
      }
      footer{
          display: flex;
          bottom: 0;
          margin-top: 50px;
          justify-content: center;
      }
  </style>

  <body>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L1440,256L1440,0L0,0Z"></path></svg>
      <div style="text-align: center;">
          <h1 style="color: #81E3E5;">¡Correo recibido con éxito!</h1>
          <p>Hola, ' .getNombre(). ' te saluda el equipo de Banco Chanchito UTP, gracias por contactarnos. <br> 
              Tú mensaje ha sido recibido con éxito y te responderemos en un plazo de 24hrs. <br>
              Copia de tu mensaje enviado a continuación:</p>
          <cite>' .getContenido(). '</cite>
          <hr>
      </div>
  </body>

  <footer>
      <h3>Banco Chanchito UTP</h3>
      <img src="./phpmailer/logo.jpg" width="100px" height="100px">
      <h2>&copy; | Banco Chanchito UTP</h2>
  </footer>;
  `

  const [values, setValues] = useState({
    usr: '',
    email: '',
    msj: '',
    texto: texto
  });

  const handleInput = ({target}) => {
    const {name, value} = target
    setValues(prev =>({ ...prev, [name] : [value]}))
  }

  const sendEmail = async (e) => {
    e.preventDefault();  
    setValues(values);
    try {
        const response = await axios.post('http://localhost:3001/api/send-email', values);
        const data = response.data;
        setEmailResponse(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <div className="contactForm">
        <form>
            <h2>Envía un mensaje</h2>
            <div className="inputBox">
            <input type="text" id="nombre" name="usr" onChange={handleInput}/>
            <span>Nombre completo</span>
            </div>

            <div className="inputBox">
            <input type="email" id="correo" name="email" onChange={handleInput} />
            <span>Email</span>
            </div>

            <div className="inputBox">
            <textarea id="contenido" name="msj" onChange={handleInput}></textarea>
            <span>Escribe tu mensaje</span>
            </div>
        </form>
      </div>

      <Boton onClick={sendEmail}>Enviar Correo</Boton>
      {emailResponse && <div>Respuesta del servidor: {JSON.stringify(emailResponse)}</div>}
    </div>
  );
}

export default EmailSender;
