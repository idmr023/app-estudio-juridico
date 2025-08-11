import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faHourglassHalf, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ListaDeCasos({ clienteDNI }) {
    const [casos, setCasos] = useState([]);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate    ();

    const handleRowClick = (caso_id) => {
        navigate(`/cuenta/casos/${caso_id}`); 
    };

    useEffect(() => {
        if (!clienteDNI) {
            setEstaCargando(false);
            return;
        }

        setEstaCargando(true);
        setError(null);

        axios.get(`http://localhost:3001/api/list_casos/${clienteDNI}`)
            .then(response => {
                setCasos(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los casos:", error);
                setError("No se pudieron cargar los casos. Por favor, intente más tarde.");
            })
            .finally(() => {
                setTimeout(() => setEstaCargando(false), 500);
            });

    }, [clienteDNI]);

    const statusInfo = {
        'Activo': {
            className: 'bg-teal-500/20 text-teal-300',
            icon: faFolderOpen
        },
        'En revisión': {
            className: 'bg-yellow-500/20 text-yellow-300',
            icon: faHourglassHalf
        },
        'Cerrado': {
            className: 'bg-gray-500/20 text-gray-400',
            icon: faCheckCircle
        }
    };

    if (estaCargando) {
        return (
            <div className="bg-gray-900 rounded-lg shadow-md p-6 w-full max-w-5xl">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Cargando Casos...</h2>
                <div className="flex justify-center items-center py-10">
                    <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
             <div className="bg-red-900/50 rounded-lg shadow-md p-6 w-full max-w-5xl text-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-400 text-3xl mb-4" />
                <h2 className="text-xl font-bold text-white">Ocurrió un Error</h2>
                <p className="text-red-300">{error}</p>
             </div>
        )
    }

    return (
        <>
        <div className="bg-[#17181A] min-h-screen p-6 text-white flex flex-col gap-10 items-center">
            <div className="bg-gray-900 rounded-lg shadow-md p-6 w-full max-w-5xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Mis Casos Registrados</h2>

                    {casos.length === 0 ? (
                        <p className="text-center text-gray-400 py-4">No se encontraron casos registrados para este cliente.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">ID Caso</th>
                                        <th scope="col" className="px-6 py-3">Título</th>
                                        <th scope="col" className="px-6 py-3">Abogado Asignado</th>
                                        <th scope="col" className="px-6 py-3 text-center">Estado</th>
                                        <th scope="col" className="px-6 py-3">Última Actualización</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {casos.map((caso) => {
                                        const status = statusInfo[caso.caso_estado] || statusInfo['Cerrado'];
                                        return (
                                            <tr key={caso.caso_id} 
                                                className="hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer"
                                                onClick={() => handleRowClick(caso.caso_id)} 
                                            >
                                                <td className="px-6 py-4 font-mono text-teal-400">{caso.caso_id}</td>
                                                <td className="px-6 py-4 font-medium text-white">{caso.caso_titulo}</td>
                                                <td className="px-6 py-4">{caso.nombre_abogado || 'Pendiente'}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                                                        <FontAwesomeIcon icon={status.icon} />
                                                        {caso.caso_estado}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">{new Date(caso.fecha_actualizacion).toLocaleDateString()}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListaDeCasos;