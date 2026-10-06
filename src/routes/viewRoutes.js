const express = require('express');
const path = require('path');

const router = express.Router();

// Ruta para servir la UI (HTML)
router.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

module.exports = router;
