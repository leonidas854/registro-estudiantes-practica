import request from 'supertest';
import app from '../../src/app';
import { db } from '../../src/config/database';

describe('API Estudiantes - Pruebas de Integración (/api)', () => {
  beforeAll((done) => {
    // Asegurar que la tabla esté creada en la base de datos de test
    db.run(
      `CREATE TABLE IF NOT EXISTS estudiantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        ci TEXT NOT NULL UNIQUE,
        edad INTEGER NOT NULL,
        carrera TEXT NOT NULL,
        semestre TEXT NOT NULL,
        correo TEXT NOT NULL,
        ciudad TEXT,
        domicilio TEXT,
        matricula TEXT NOT NULL,
        correo_institucional TEXT NOT NULL,
        turno TEXT,
        fecha_induccion TEXT,
        codigo_verificacion TEXT,
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      () => {
        // Limpiar datos previos de pruebas
        db.run('DELETE FROM estudiantes', () => done());
      }
    );
  });

  afterAll((done) => {
    db.close(() => done());
  });

  const estudiantePayloadValido = {
    nombre: 'Alejandro Morales Rivera',
    ci: '9123456-CB',
    edad: 22,
    carrera: 'Ingeniería de Sistemas',
    semestre: '3',
    correo: 'alejandro.morales@gmail.com',
    ciudad: 'Cochabamba',
    domicilio: 'Av. Heroínas 1020',
  };

  test('POST /api/registro - Debe registrar un nuevo estudiante con éxito (201 Created)', async () => {
    const res = await request(app)
      .post('/api/registro')
      .send(estudiantePayloadValido);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('registrado con éxito');
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.nombre).toBe(estudiantePayloadValido.nombre);
    expect(res.body.data.ci).toBe(estudiantePayloadValido.ci);
    // Verificar campos automatizados
    expect(res.body.data.matricula).toContain('SIS');
    expect(res.body.data.correo_institucional).toContain('@emi.edu.bo');
    expect(res.body.data.turno).toBe('Tarde');
    expect(res.body.data.fecha_induccion).toBeDefined();
    expect(res.body.data.codigo_verificacion).toBeDefined();
  });

  test('POST /api/registro - Debe rechazar intento de registro con CI duplicado (409 Conflict)', async () => {
    // Intentar registrar de nuevo el mismo estudiante
    const res = await request(app)
      .post('/api/registro')
      .send(estudiantePayloadValido);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain('ya se encuentra registrada');
  });

  test('POST /api/registro - Debe retornar 400 Bad Request cuando faltan campos o son inválidos', async () => {
    const res = await request(app)
      .post('/api/registro')
      .send({
        nombre: '123 Inválido',
        ci: '',
        edad: 12, // Menor a 16
        correo: 'no-es-correo',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.fields).toBeDefined();
  });

  test('GET /api/estudiantes - Debe retornar 200 OK con la lista de estudiantes registrados', async () => {
    const res = await request(app).get('/api/estudiantes');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.total).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].ci).toBe(estudiantePayloadValido.ci);
  });
});
