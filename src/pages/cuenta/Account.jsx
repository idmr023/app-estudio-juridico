import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLock, faPlus, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/CarritoContext';
import ListaDeCasos from './ListaDeCasos';

const Account = () => {
  const [mostrarDatos, setMostrarDatos] = useState(true);
  const [pasos, setPasos] = useState([
    { texto: 'Enviar copia de DNI al abogado', completado: false },
    { texto: 'Asistir a la reunión inicial', completado: false },
    { texto: 'Firmar contrato de representación', completado: false },
  ]);
  const [nuevoPaso, setNuevoPaso] = useState('');
  const [cargando, setCargando] = useState(true);
  const { account } = useContext(ShoppingCartContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 1500); // simula carga de 1.5s

    return () => clearTimeout(timer);
  }, []);

  const agregarPaso = () => {
    if (nuevoPaso.trim() === '') return;
    setPasos([...pasos, { texto: nuevoPaso.trim(), completado: false }]);
    setNuevoPaso('');
  };

  const marcarComoCompletado = (index) => {
    const nuevosPasos = [...pasos];
    nuevosPasos[index].completado = !nuevosPasos[index].completado;
    setPasos(nuevosPasos);
  };

  const eliminarPaso = (index) => {
    const nuevosPasos = pasos.filter((_, i) => i !== index);
    setPasos(nuevosPasos);
  };

  return (
    <div className="bg-[#17181A] min-h-screen p-6 text-white flex flex-col gap-10 items-center">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Cuenta del Cliente</h1>

        {mostrarDatos && (
          <div className="text-lg space-y-2">
            <p><span className="text-teal-400 font-semibold">Nombre:</span> {account.name}</p>
            <p><span className="text-teal-400 font-semibold">DNI:</span> {account.dni}</p>
            <p><span className="text-teal-400 font-semibold">Email:</span> {account.email}</p>
          </div>
        )}

        <button
          onClick={() => setMostrarDatos(!mostrarDatos)}
          className="mt-6 flex items-center justify-center gap-2 mx-auto bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-full text-white"
        >
          {mostrarDatos ? 'Ocultar datos' : 'Ver datos del usuario'}
          <FontAwesomeIcon icon={mostrarDatos ? faLock : faEye} />
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg shadow-md p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Proceso Legal: Seguimiento</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg text-black"
            placeholder="Nuevo paso legal..."
            value={nuevoPaso}
            onChange={(e) => setNuevoPaso(e.target.value)}
          />
          <button
            onClick={agregarPaso}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {cargando ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ul className="space-y-3">
            {pasos.map((paso, index) => (
              <li
                key={index}
                className={`flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg ${
                  paso.completado ? 'line-through text-gray-400' : ''
                }`}
              >
                <span>{paso.texto}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => marcarComoCompletado(index)}
                    className="text-green-400 hover:text-green-500"
                    title="Marcar como completado"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    onClick={() => eliminarPaso(index)}
                    className="text-red-400 hover:text-red-500"
                    title="Eliminar paso"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export { Account };