import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, storage } from '../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { ChatbotWidget } from './ChatbotWidget';

// --- SUB-COMPONENTES PARA MANTENER EL CÓDIGO LIMPIO ---

const TimelineItem = ({ evento }) => {
    // CAMBIO: Los Timestamps de Firebase son objetos, usamos el método .toDate() para convertirlos.
    const fecha = evento.fecha_evento?.toDate ? evento.fecha_evento.toDate() : new Date();
    return (
        <div className="relative pl-8 pb-4">
            <div className="absolute left-0 top-1 w-4 h-4 bg-teal-400 rounded-full border-4 border-gray-900"></div>
            <div className="pl-4">
                <p className="text-sm text-gray-400">{fecha.toLocaleString()}</p>
                <p className="font-medium text-white">{evento.evento_descripcion}</p>
            </div>
        </div>
    );
};

const DocumentoItem = ({ doc }) => (
    <a href={doc.url_almacenamiento} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
        <span>📄 {doc.nombre_archivo}</span>
        <span className="text-xs text-teal-400">Descargar</span>
    </a>
);

// MEJORA: Nuevo sub-componente para los mensajes del chat.
const MensajeItem = ({ msg, userDni }) => {
    const isSentByUser = msg.remitente_dni === userDni;
    return (
        <div className={`flex my-2 ${isSentByUser ? 'justify-end' : 'justify-start'}`}>
            <div className="flex flex-col">
                {!isSentByUser && <span className="text-xs text-teal-400 ml-2">{msg.nombre_remitente}</span>}
                <div className={`p-3 rounded-lg max-w-xs ${isSentByUser ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}>
                    {msg.contenido_mensaje}
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export function CasoDetallePage() {
    const { caso_id } = useParams();
    const [caso, setCaso] = useState(null);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState(null);

    // MEJORA: Estados para manejar la subida de archivos y los nuevos mensajes.
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    // ===================================================================
    // CAMBIO PRINCIPAL: Se reemplaza Axios por listeners en tiempo real de Firebase
    // ===================================================================
    useEffect(() => {
        if (!caso_id) return;
        
        setEstaCargando(true);
        
        // Listener para el documento principal del caso
        const casoDocRef = doc(db, "casos", caso_id);
        const unsubscribeCaso = onSnapshot(casoDocRef, async (docSnap) => {
            if (docSnap.exists()) {
                const casoData = docSnap.data();
                
                // Obtenemos el nombre del abogado (esto no necesita ser en tiempo real)
                let nombre_abogado = 'No asignado';
                if (casoData.abogado_dni) {
                    const abogadoDoc = await getDoc(doc(db, "usuarios", String(casoData.abogado_dni)));
                    if (abogadoDoc.exists()) {
                        nombre_abogado = `${abogadoDoc.data().usr_nom} ${abogadoDoc.data().usr_ape}`;
                    }
                }
                setCaso(prev => ({ ...prev, ...casoData, id: docSnap.id, nombre_abogado }));
            } else {
                setError("Caso no encontrado.");
            }
        }, (err) => {
            console.error("Error en listener de caso:", err);
            setError("No se pudo cargar la información del caso.");
        });

        // Listeners para las sub-colecciones
        const eventosQuery = query(collection(db, "casos", caso_id, "eventos"), orderBy("fecha_evento", "desc"));
        const unsubscribeEventos = onSnapshot(eventosQuery, (snapshot) => {
            const timeline = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCaso(prev => ({ ...prev, timeline }));
        });
        
        const documentosQuery = query(collection(db, "casos", caso_id, "documentos"), orderBy("fecha_subida", "desc"));
        const unsubscribeDocumentos = onSnapshot(documentosQuery, (snapshot) => {
            const documentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCaso(prev => ({ ...prev, documentos }));
        });

        const mensajesQuery = query(collection(db, "casos", caso_id, "mensajes"), orderBy("fecha_envio", "asc"));
        const unsubscribeMensajes = onSnapshot(mensajesQuery, (snapshot) => {
            const mensajes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Aquí se podría enriquecer con los nombres de los remitentes si fuera necesario
            setCaso(prev => ({ ...prev, mensajes }));
        });

        setEstaCargando(false);

        // Función de limpieza: se desuscribe de todos los listeners cuando el componente se desmonta.
        // ¡Esto es crucial para evitar fugas de memoria!
        return () => {
            unsubscribeCaso();
            unsubscribeEventos();
            unsubscribeDocumentos();
            unsubscribeMensajes();
        };

    }, [caso_id]);


    // MEJORA: Función para manejar la subida de archivos a Firebase Storage
    const handleFileUpload = async () => {
        if (!selectedFile) return alert("Por favor, selecciona un archivo primero.");
        setIsUploading(true);

        const storageRef = ref(storage, `casos/${caso_id}/${selectedFile.name}`);
        
        try {
            const snapshot = await uploadBytes(storageRef, selectedFile);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Aquí añadirías la lógica para guardar la referencia del archivo en Firestore
            // (en la sub-colección 'documentos' del caso).

            alert("Archivo subido con éxito.");
            setSelectedFile(null);
        } catch (err) {
            console.error("Error al subir archivo:", err);
            alert("No se pudo subir el archivo.");
        } finally {
            setIsUploading(false);
        }
    };


    if (estaCargando) return <div className="text-center p-10">Cargando detalles del caso...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!caso) return <div className="text-center p-10">Caso no encontrado.</div>;

    return (
        <div className="bg-[#17181A] min-h-screen p-6 text-white flex flex-col items-center gap-8">
            
            <div className="w-full max-w-5xl bg-gray-900 p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">{caso.caso_titulo}</h1>
                <p className="text-teal-400 font-mono">{caso.id}</p>
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
                <div className="flex flex-col gap-8">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Historial del Caso</h2>
                        <div className="relative border-l-2 border-gray-700 ml-2">
                            {caso.timeline && caso.timeline.length > 0 ? (
                                caso.timeline.map(evento => <TimelineItem key={evento.id} evento={evento} />)
                            ) : <p className="pl-4 text-gray-500">No hay eventos registrados.</p>}
                        </div>
                    </div>
                    
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Documentos</h2>
                        <div className="space-y-3">
                           {caso.documentos && caso.documentos.length > 0 ? (
                                caso.documentos.map(doc => <DocumentoItem key={doc.id} doc={doc} />)
                            ) : <p className="text-gray-500">No hay documentos adjuntos.</p>}
                        </div>
                    </div>
                </div>

                {/* MEJORA: Panel de mando ahora es funcional */}
                <div className="flex flex-col gap-8">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Adjuntar Nuevo Documento</h2>
                        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-700 rounded-lg">
                            <input type="file" className="hidden" id="file-upload" onChange={(e) => setSelectedFile(e.target.files[0])} />
                            <label htmlFor="file-upload" className="cursor-pointer bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition">
                                {selectedFile ? "Archivo seleccionado" : "Seleccionar Archivo"}
                            </label>
                            {selectedFile && <p className="text-sm text-gray-400 mt-2">{selectedFile.name}</p>}
                        </div>
                        <button onClick={handleFileUpload} disabled={isUploading || !selectedFile} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-500">
                            {isUploading ? "Subiendo..." : "Subir Documento"}
                        </button>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg shadow-md flex flex-col h-full">
                        <h2 className="text-xl font-bold mb-4">Mensajes con su Abogado</h2>
                        <div className="flex-grow bg-gray-800 rounded-t-lg p-4 space-y-4 overflow-y-auto">
                            {caso.mensajes && caso.mensajes.length > 0 ? (
                                caso.mensajes.map(msg => <MensajeItem key={msg.id} msg={msg} userDni={caso.cliente_dni} />)
                            ) : <p className="text-gray-500 text-center pt-10">Inicie la conversación.</p>}
                        </div>
                        <div className="flex border-t-2 border-gray-700">
                            <input type="text" placeholder="Escriba un mensaje..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-grow bg-gray-800 p-3 text-white focus:outline-none rounded-bl-lg" />
                            <button className="bg-teal-500 px-6 font-bold hover:bg-teal-600 rounded-br-lg">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <ChatbotWidget />
        </div>
    );
}