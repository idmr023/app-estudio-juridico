import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { sender: 'ai', text: '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte sobre nuestros servicios, horarios o ubicación?' }
            ]);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!userInput.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: userInput };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            // --- ¡AQUÍ ESTÁ LA MAGIA! Es una llamada de API normal ---

            // 1. Preparamos el cuerpo de la petición, tal como lo espera el backend.
            const requestBody = {
                pregunta: userInput
            };

            // 2. Hacemos la llamada POST a nuestro endpoint del chatbot.
            //    Usamos la variable de entorno para la URL base.
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, requestBody);

            // 3. Extraemos la respuesta del objeto JSON que nos devuelve el backend.
            const aiResponse = {
                sender: 'ai',
                text: response.data.respuesta 
            };
            
            setMessages([...newMessages, aiResponse]);

        } catch (error) {
            console.error("Error al chatear con la API:", error);
            const errorResponse = {
                sender: 'ai',
                text: 'Lo siento, ocurrió un error al procesar tu mensaje. Intenta de nuevo.'
            };
            setMessages([...newMessages, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 bg-blue-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-800 transition-transform transform hover:scale-110"
            >
                💬
            </button>
        );
    }
    
    // ... (El resto del JSX del widget de chat) ...
    // ... que ya te proporcioné antes ...
}