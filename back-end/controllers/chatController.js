const { OpenAI, OpenAIEmbeddings } = require("@langchain/openai");
const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { loadQAStuffChain } = require("langchain/chains");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const fs = require('fs');
const path = require('path');
const handleError = require('../utils/handleError');

let qaChain;
let vectorStore;

exports.inicializarChatbot = async () => {
    try {
        console.log("Inicializando el asistente virtual...");
        const conocimientoPath = path.join(__dirname, '..', 'conocimiento.md');
        const textoConocimiento = fs.readFileSync(conocimientoPath, 'utf8');
        
        const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
        const docs = await textSplitter.createDocuments([textoConocimiento]);
        
        const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
        vectorStore = await FaissStore.fromDocuments(docs, embeddings);
        
        const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
        qaChain = loadQAStuffChain(model);
        
        console.log("Asistente virtual listo y en espera.");
    } catch (error) {
        console.error("Error fatal al inicializar el chatbot:", error);
    }
};

exports.procesarChat = async (req, res) => {
    const { pregunta } = req.body;
    if (!pregunta) return res.status(400).json({ message: "La pregunta es requerida." });

    try {
        if (!vectorStore || !qaChain) {
            return res.status(503).json({ message: "El asistente no está disponible." });
        }

        const relevantDocs = await vectorStore.similaritySearch(pregunta, 2);

        const promptSeguro = `
            Eres un asistente virtual de un consultorio jurídico. Tu única función es responder preguntas basándote ESTRICTAMENTE en el siguiente contexto.
            No puedes inventar información, ni dar consejos legales.
            Si la respuesta no está en el contexto, DEBES responder: "Lo siento, no tengo información sobre eso. Para consultas específicas, te recomiendo hablar con un abogado."
            Contexto: ${relevantDocs.map(doc => doc.pageContent).join("\n\n")}
            Pregunta: ${pregunta}
            Respuesta:
        `;

        const respuesta = await qaChain.call({
            input_documents: relevantDocs,
            question: promptSeguro,
        });

        res.json({ respuesta: respuesta.text.trim() });
    } catch (error) {
        handleError(res, error, 'procesar chat');
    }
};