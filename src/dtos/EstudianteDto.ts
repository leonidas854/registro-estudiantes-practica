import { IEstudianteInput, IValidationResult } from '../types/estudiante.types';
import { EstudianteValidator } from './EstudianteValidator';

export class EstudianteDto {
  public nombre: string;
  public ci: string;
  public edad: number | null;
  public carrera: string;
  public semestre: string;
  public correo: string;
  public ciudad: string;
  public domicilio: string;

  constructor(data: Partial<IEstudianteInput>) {
    this.nombre = typeof data.nombre === 'string' ? data.nombre.trim() : '';
    this.ci = typeof data.ci === 'string' ? data.ci.trim() : '';
    this.edad = data.edad !== undefined && data.edad !== null && data.edad !== ''
      ? Number(data.edad)
      : null;
    this.carrera = typeof data.carrera === 'string' ? data.carrera.trim() : '';
    this.semestre = typeof data.semestre === 'string' ? data.semestre.trim() : '';
    this.correo = typeof data.correo === 'string' ? data.correo.trim().toLowerCase() : '';
    this.ciudad = typeof data.ciudad === 'string' ? data.ciudad.trim() : '';
    this.domicilio = typeof data.domicilio === 'string' ? data.domicilio.trim() : '';
  }

  public validate(): IValidationResult {
    return EstudianteValidator.validate(this);
  }
}
