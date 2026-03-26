'use strict';

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase configuration
const SUPABASE_URL = 'https://kzwptgbhcddebxdfnsqx.supabase.co';  // Replace with your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6d3B0Z2JoY2RkZWJ4ZGZuc3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4Mjk0NzksImV4cCI6MjA4OTQwNTQ3OX0.9ulqg6eSaH2ONzn4yD3wi6ymQ-aShjx_7nMJuOt3Rps';  // Replace with your Supabase Key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config();

// Importar rutas
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const chatRoutes = require('./routes/chat');

// Importar configuración de BD
const { connectDB } = require('./config/database');

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/chat', chatRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta del dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Conectar a la BD e iniciar servidor
async function startServer() {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();

module.exports = app;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
