import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';

function EmailSender() {
  const [isSending, setIsSending] = useState(false);
  const [formResponse, setFormResponse] = useState({ type: '', message: '' });

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
    if (!values.usr || !values.email || !values.msj) {
        return alert("Por favor, complete todos los campos.");
    }
    setIsSending(true);
    setFormResponse({ type: '', message: '' });

    try {
      const mailCollectionRef = collection(db, 'mail');

      await addDoc(mailCollectionRef, {
        to: values.email,
        message: {
          subject: `Consulta recibida de ${values.usr}`,
          text: `De: ${values.usr} (${values.email})\n\nMensaje:\n${values.msj}`,
        },
        createdAt: serverTimestamp()
      });
      
      setFormResponse({ type: 'success', message: '¡Gracias! Tu mensaje ha sido enviado.' });
      setValues({ usr: '', email: '', msj: '' });

    } catch (error) {
      console.error("Error al guardar el mensaje en Firestore:", error);
      setFormResponse({ type: 'error', message: 'No se pudo enviar el mensaje. Intenta de nuevo.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={sendEmail} className="bg-white shadow-lg rounded-lg p-10 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">Formulario de Contacto</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">Nombre completo</label>
        <input
          type="text" name="usr" value={values.usr} onChange={handleInput}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">Correo electrónico</label>
        <input
          type="email" name="email" value={values.email} onChange={handleInput}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-800 mb-1">Mensaje</label>
        <textarea
          name="msj" rows={5} value={values.msj} onChange={handleInput}
          className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex justify-center">
        <button type="submit" disabled={isSending}
          className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition duration-200 disabled:bg-gray-400"
        >
          {isSending ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </div>

      {formResponse.message && (
        <div className={`mt-6 p-4 rounded text-center ${
            formResponse.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {formResponse.message}
        </div>
      )}
    </form>
  );
}

export default EmailSender;