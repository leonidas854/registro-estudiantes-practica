import { Router } from 'express';
import { EstudianteController } from '../controllers/EstudianteController';

const router = Router();

// Rutas de API para estudiantes
router.post('/registro', EstudianteController.registrar);
router.get('/estudiantes', EstudianteController.listar);

export default router;
