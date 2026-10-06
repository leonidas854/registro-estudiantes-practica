const express = require('express');
const cors = require('cors');
const path = require('path');

const estudianteRoutes = require('./routes/estudianteRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api', estudianteRoutes);

// Rutas de Vistas
app.use('/auth', viewRoutes);

module.exports = app;
