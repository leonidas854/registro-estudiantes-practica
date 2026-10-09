import { db } from '../config/database';
import { IEstudiante } from '../types/estudiante.types';
import { DuplicateCiError } from './DuplicateCiError';

export { DuplicateCiError };

export class EstudianteModel {
  public static async findByCi(ci: string): Promise<IEstudiante | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM estudiantes WHERE ci = ? LIMIT 1', [ci], (err, row) => {
        if (err) return reject(err);
        resolve((row as IEstudiante) || null);
      });
    });
  }

  public static async create(estudiante: IEstudiante): Promise<IEstudiante> {
    const existente = await this.findByCi(estudiante.ci);
    if (existente) throw new DuplicateCiError();

    const sql = `INSERT INTO estudiantes (
      nombre, ci, edad, carrera, semestre, correo, ciudad, domicilio,
      matricula, correo_institucional, turno, fecha_induccion, codigo_verificacion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      estudiante.nombre, estudiante.ci, estudiante.edad, estudiante.carrera,
      estudiante.semestre, estudiante.correo, estudiante.ciudad, estudiante.domicilio,
      estudiante.matricula, estudiante.correo_institucional, estudiante.turno,
      estudiante.fecha_induccion, estudiante.codigo_verificacion,
    ];

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (this: { lastID: number }, err: Error | null) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) return reject(new DuplicateCiError());
          return reject(err);
        }
        resolve({ id: this.lastID, ...estudiante });
      });
    });
  }

  public static async findAll(): Promise<IEstudiante[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM estudiantes ORDER BY id DESC', [], (err, rows) => {
        if (err) return reject(err);
        resolve((rows as IEstudiante[]) || []);
      });
    });
  }

  public static async findById(id: number): Promise<IEstudiante | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM estudiantes WHERE id = ? LIMIT 1', [id], (err, row) => {
        if (err) return reject(err);
        resolve((row as IEstudiante) || null);
      });
    });
  }

  public static async clearAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM estudiantes', (err) => (err ? reject(err) : resolve()));
    });
  }
}
