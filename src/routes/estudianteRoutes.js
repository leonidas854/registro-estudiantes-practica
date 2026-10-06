const express = require('express');
const EstudianteController = require('../controllers/EstudianteController');

const router = express.Router();

// Ruta de API para registro
router.post('/registro', EstudianteController.registrar);

module.exports = router;
