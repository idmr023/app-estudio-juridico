import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Huevada() {
  const [admins, setAdmnis] = useState([]);

  useEffect(() => {
    // Realizar una solicitud al servidor para obtener la lista de usuarios
    axios.get('http://localhost:3001/admin')
      .then((response) => {
        setAdmnis(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios desde el servidor:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
      {admins.map((admin) => (
        <p key={admin.admin_cod}>{admin.admin_dni} | {admin.admin_nom}</p>
      ))}
      </ul>
    </div>
  );
}

export {Huevada};