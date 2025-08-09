import axios from 'axios';
import React, { useState } from 'react';

function EmailSender({ scrollToTop, showButton }) {
  const [emailResponse, setEmailResponse] = useState(null);

  const [values, setValues] = useState({
    usr: '',
    email: '',
    msj: '',
  });

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/send-email', values);
      const data = response.data;
      setEmailResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={sendEmail}>
      <h2>Formulario de Contacto</h2>

      <div>
        <label>Nombre completo</label>
        <input
          type="text"
          name="usr"
          onChange={handleInput}
          required
        />
      </div>

      <div>
        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          required
        />
      </div>

      <div>
        <label>Mensaje</label>
        <textarea
          name="msj"
          rows={5}
          onChange={handleInput}
          required
        />
      </div>

      <div>
        <button
          type="submit"
        >
          Enviar Mensaje
        </button>
      </div>

      {emailResponse && (
        <div>
          Respuesta del servidor: {JSON.stringify(emailResponse)}
        </div>
      )}
    </form>
  );
}

export default EmailSender;