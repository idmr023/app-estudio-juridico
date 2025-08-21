import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Ref para el contenedor de mensajes para poder hacer scroll automático
    const messagesEndRef = useRef(null);

    // Función para hacer scroll hacia el último mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Efecto para añadir el mensaje de bienvenida cuando se abre el chat
    useEffect(() => {
        if (isOpen) {
            setMessages([
                { sender: 'ai', text: '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte sobre nuestros servicios, horarios o ubicación?' }
            ]);
        }
    }, [isOpen]);

    // Efecto para hacer scroll cada vez que se añade un nuevo mensaje
    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);


    const handleSend = async () => {
        if (!userInput.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: userInput };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const requestBody = {
                pregunta: userInput
            };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, requestBody);
            const aiResponse = {
                sender: 'ai',
                text: response.data.respuesta 
            };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
        } catch (error) {
            console.error("Error al chatear con la API:", error);
            const errorResponse = {
                sender: 'ai',
                text: 'Lo siento, ocurrió un error al procesar tu mensaje. Intenta de nuevo.'
            };
            setMessages(prevMessages => [...prevMessages, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    // Si el chat está cerrado, solo muestra el botón flotante para abrirlo.
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                title="Abrir Asistente Virtual"
                className="fixed bottom-5 right-5 bg-blue-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-800 transition-transform transform hover:scale-110 z-50"
            >
                💬
            </button>
        );
    }
    
    // Si el chat está abierto, renderiza la ventana completa.
    return (
        <div className="fixed bottom-5 right-5 w-80 h-[28rem] bg-white rounded-xl shadow-2xl flex flex-col z-50">
            {/* --- Cabecera del Chat --- */}
            <div className="bg-gray-800 text-white p-3 rounded-t-xl flex justify-between items-center">
                <h3 className="font-bold">Asistente Virtual</h3>
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-xl font-bold hover:text-gray-300"
                    title="Cerrar chat"
                >
                    &times;
                </button>
            </div>

            {/* --- Área de Mensajes (con scroll) --- */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className={`inline-block py-2 px-3 rounded-lg max-w-[80%] break-words ${msg.sender === 'ai' ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}

                {/* Indicador de "escribiendo..." */}
                {isLoading && (
                    <div className="my-2 flex justify-start">
                         <span className="inline-block py-2 px-3 rounded-lg bg-gray-200 text-black">
                            ...
                         </span>
                    </div>
                )}
                
                {/* Elemento invisible al final para hacer scroll automático */}
                <div ref={messagesEndRef} />
            </div>

            {/* --- Área de Entrada de Texto --- */}
            <div className="p-2 border-t flex">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend} 
                    className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}