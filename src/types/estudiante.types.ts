export type Carrera =
  | 'Ingeniería de Sistemas'
  | 'Ingeniería de Sistemas Electrónico'
  | 'Ingeniería de Sistemas Electrónicos'
  | 'Ingeniería Comercial'
  | 'Ingenieria Civil'
  | 'Ingeniería Civil'
  | 'Ingeniería Agroindustrial'
  | 'Administración de Empresas'
  | 'Derecho'
  | 'Medicina'
  | 'Arquitectura';

export const CARRERAS_VALIDAS: readonly Carrera[] = [
  'Ingeniería de Sistemas',
  'Ingeniería de Sistemas Electrónico',
  'Ingeniería de Sistemas Electrónicos',
  'Ingeniería Comercial',
  'Ingenieria Civil',
  'Ingeniería Civil',
  'Ingeniería Agroindustrial',
  'Administración de Empresas',
  'Derecho',
  'Medicina',
  'Arquitectura',
] as const;

export type Turno = 'Mañana' | 'Tarde' | 'Noche';

export interface IEstudianteInput {
  nombre: string;
  ci: string;
  edad: number | string;
  carrera: string;
  semestre: string;
  correo: string;
  ciudad: string;
  domicilio: string;
}

export interface IEstudianteAutomation {
  matricula: string;
  correo_institucional: string;
  turno: Turno;
  fecha_induccion: string;
  codigo_verificacion: string;
}

export interface IEstudiante extends IEstudianteAutomation {
  id?: number;
  nombre: string;
  ci: string;
  edad: number;
  carrera: string;
  semestre: string;
  correo: string;
  ciudad: string;
  domicilio: string;
  fecha_registro?: string;
}

export interface IValidationResult {
  isValid: boolean;
  error: string | null;
  fields?: Record<string, string>;
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  fields?: Record<string, string>;
}
