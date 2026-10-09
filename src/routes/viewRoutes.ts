import { Router, Request, Response } from 'express';
import path from 'path';

const router = Router();

// Ruta para servir la UI (HTML)
router.get('/registro', (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

// Redirección de conveniencia
router.get('/', (_req: Request, res: Response) => {
  res.redirect('/auth/registro');
});

export default router;
