// --- 1. IMPORTACIONES Y CONFIGURACIÓN ---
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const db = require('./config/db');
// const { inicializarChatbot } = require('./controllers/chatController');

// --- 2. MIDDLEWARES ---
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- 3. IMPORTAR RUTAS ---
const authRoutes = require('./routes/authRoutes');
const casoRoutes = require('./routes/casoRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
// const chatRoutes = require('./routes/chatRoutes');

// --- 4. DELEGAR RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/casos', casoRoutes);
app.use('/api/servicios', servicioRoutes);
// app.use('/api/chat', chatRoutes);

// --- 5. INICIO DEL SERVIDOR ---
app.listen(port, () => {
  console.log(`Servidor backend en ejecución en el puerto ${port}`);
  // inicializarChatbot();
});