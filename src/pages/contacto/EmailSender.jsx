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
    <form onSubmit={sendEmail} className="bg-white shadow-lg rounded-lg p-10 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">Formulario de Contacto</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">Nombre completo</label>
        <input
          type="text"
          name="usr"
          onChange={handleInput}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">Correo electrónico</label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">Mensaje</label>
        <textarea
          name="msj"
          rows={5}
          onChange={handleInput}
          className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition duration-200"
        >
          Enviar Mensaje
        </button>
      </div>

      {emailResponse && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded">
          Respuesta del servidor: {JSON.stringify(emailResponse)}
        </div>
      )}
    </form>
  );
}

export default EmailSender;