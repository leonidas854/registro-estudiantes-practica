import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import estudianteRoutes from './routes/estudianteRoutes';
import viewRoutes from './routes/viewRoutes';

const app: Application = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del cliente
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API REST
app.use('/api', estudianteRoutes);

// Rutas de Vistas Web
app.use('/auth', viewRoutes);

// Redirección de conveniencia en la raíz
app.get('/', (_req: Request, res: Response) => {
  res.redirect('/auth/registro');
});

export default app;
