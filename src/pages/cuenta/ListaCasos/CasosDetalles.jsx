import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TimelineItem = ({ evento }) => (
    <div className="relative pl-8 pb-4">
        <div className="absolute left-0 top-1 w-4 h-4 bg-teal-400 rounded-full border-4 border-gray-900"></div>
        <div className="pl-4">
            <p className="text-sm text-gray-400">{new Date(evento.fecha_evento).toLocaleString()}</p>
            <p className="font-medium text-white">{evento.evento_descripcion}</p>
        </div>
    </div>
);

const DocumentoItem = ({ doc }) => (
    <a href={doc.url_almacenamiento} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
        <span>📄 {doc.nombre_archivo}</span>
        <span className="text-xs text-teal-400">Descargar</span>
    </a>
);

export function CasoDetallePage() {
    const { caso_id } = useParams(); // Obtiene el ID del caso desde la URL
    const [caso, setCaso] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/casos/${caso_id}`)
            .then(response => {
                setCaso(response.data);
            })
            .catch(err => {
                console.error("Error al obtener detalle del caso:", err);
                setError("No se pudo cargar la información del caso.");
            })
            .finally(() => {
                setEstaCargando(false);
            });
    }, [caso_id]); // El efecto se re-ejecuta si el ID del caso cambia

    if (estaCargando) return <div className="text-center p-10">Cargando detalles del caso...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!caso) return <div className="text-center p-10">Caso no encontrado.</div>;

    return (
        <div className="bg-[#17181A] min-h-screen p-6 text-white flex flex-col items-center gap-8">
            
            {/* -- CABECERA DEL CASO -- */}
            <div className="w-full max-w-5xl bg-gray-900 p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">{caso.caso_titulo}</h1>
                <p className="text-teal-400 font-mono">{caso.caso_id}</p>
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-400">Estado</p>
                        <p className="font-semibold text-lg">{caso.caso_estado}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Abogado Asignado</p>
                        <p className="font-semibold text-lg">{caso.nombre_abogado || 'No asignado'}</p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* -- COLUMNA IZQUIERDA: TIMELINE Y DOCUMENTOS -- */}
                <div className="flex flex-col gap-8">
                    {/* -- SECCIÓN TIMELINE -- */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Historial del Caso</h2>
                        <div className="relative border-l-2 border-gray-700 ml-2">
                            {caso.timeline.length > 0 ? (
                                caso.timeline.map(evento => <TimelineItem key={evento.evento_id} evento={evento} />)
                            ) : <p className="pl-4 text-gray-500">No hay eventos registrados.</p>}
                        </div>
                    </div>
                    
                    {/* -- SECCIÓN DOCUMENTOS -- */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Documentos</h2>
                        <div className="space-y-3">
                           {caso.documentos.length > 0 ? (
                                caso.documentos.map(doc => <DocumentoItem key={doc.doc_id} doc={doc} />)
                            ) : <p className="text-gray-500">No hay documentos adjuntos.</p>}
                        </div>
                    </div>
                </div>

                {/* -- COLUMNA DERECHA: MENSAJERÍA -- */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col h-full">
                    <h2 className="text-xl font-bold mb-4">Mensajes con su Abogado</h2>
                    <div className="flex-grow bg-gray-800 rounded-t-lg p-4 space-y-4 overflow-y-auto">
                        {/* Aquí iría el mapeo de los mensajes */}
                        {caso.mensajes.length > 0 ? (
                            caso.mensajes.map(msg => (
                                <div key={msg.mensaje_id} className="flex flex-col">
                                    <span className="text-xs text-teal-400">{msg.nombre_remitente}</span>
                                    <div className="bg-gray-700 p-3 rounded-lg max-w-xs">{msg.contenido_mensaje}</div>
                                </div>
                            ))
                         ) : <p className="text-gray-500 text-center pt-10">Inicie la conversación.</p>}
                    </div>
                    <div className="flex border-t-2 border-gray-700">
                        <input type="text" placeholder="Escriba un mensaje..." className="flex-grow bg-gray-800 p-3 text-white focus:outline-none rounded-bl-lg" />
                        <button className="bg-teal-500 px-6 font-bold hover:bg-teal-600 rounded-br-lg">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}