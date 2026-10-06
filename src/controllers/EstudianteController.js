const EstudianteDto = require('../dtos/EstudianteDto');
const EstudianteModel = require('../models/EstudianteModel');

class EstudianteController {
    static async registrar(req, res) {
        try {
            // 1. Mapear request data a DTO
            const estudianteDto = new EstudianteDto(req.body);

            // 2. Validar
            const validation = estudianteDto.validate();
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.error });
            }

            // 3. Interacción con el Modelo
            const nuevoEstudiante = await EstudianteModel.create(estudianteDto);

            // 4. Respuesta
            return res.status(201).json({ 
                message: 'Estudiante registrado con éxito', 
                data: nuevoEstudiante 
            });

        } catch (error) {
            console.error('Error en EstudianteController.registrar:', error);
            return res.status(500).json({ error: error.message || 'Error interno del servidor' });
        }
    }
}

module.exports = EstudianteController;
