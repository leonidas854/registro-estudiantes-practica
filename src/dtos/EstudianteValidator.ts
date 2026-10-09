import { CARRERAS_VALIDAS, IValidationResult } from '../types/estudiante.types';

export class EstudianteValidator {
  public static validate(dto: {
    nombre: string;
    ci: string;
    edad: number | null;
    carrera: string;
    semestre: string;
    correo: string;
    ciudad: string;
    domicilio: string;
  }): IValidationResult {
    const fields: Record<string, string> = {};

    // 1. Nombre
    if (!dto.nombre) {
      fields.nombre = 'El nombre completo es requerido.';
    } else if (dto.nombre.length < 3) {
      fields.nombre = 'El nombre completo debe tener al menos 3 caracteres.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(dto.nombre)) {
      fields.nombre = 'El nombre no debe contener números ni caracteres especiales no permitidos.';
    }

    // 2. Cédula de Identidad (CI)
    if (!dto.ci) {
      fields.ci = 'La Cédula de Identidad (CI) es requerida.';
    } else if (dto.ci.length < 4 || dto.ci.length > 15) {
      fields.ci = 'El CI debe tener entre 4 y 15 caracteres.';
    } else if (!/^[0-9a-zA-Z-]+$/.test(dto.ci)) {
      fields.ci = 'El CI solo debe contener números, letras o guión.';
    }

    // 3. Edad
    if (dto.edad === null || isNaN(dto.edad) || !Number.isInteger(dto.edad)) {
      fields.edad = 'La edad es requerida y debe ser un número entero válido.';
    } else if (dto.edad < 16 || dto.edad > 100) {
      fields.edad = 'La edad debe ser un rango válido entre 16 y 100 años.';
    }

    // 4. Carrera y Semestre
    if (!dto.carrera) {
      fields.carrera = 'La carrera es requerida.';
    } else if (!CARRERAS_VALIDAS.includes(dto.carrera as any)) {
      fields.carrera = `La carrera seleccionada no es válida. Opciones: ${CARRERAS_VALIDAS.join(', ')}`;
    }

    const semNum = parseInt(dto.semestre, 10);
    if (!dto.semestre || isNaN(semNum) || semNum < 1 || semNum > 10) {
      fields.semestre = 'El semestre debe ser un número válido entre 1 y 10.';
    }

    // 5. Correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!dto.correo) {
      fields.correo = 'El correo electrónico es requerido.';
    } else if (!emailRegex.test(dto.correo)) {
      fields.correo = 'El formato del correo electrónico no es válido.';
    }

    // 6. Residencia
    if (!dto.ciudad || dto.ciudad.length < 2) fields.ciudad = 'La ciudad es requerida (mínimo 2 caracteres).';
    if (!dto.domicilio || dto.domicilio.length < 3) fields.domicilio = 'El domicilio es requerido (mínimo 3 caracteres).';

    const keys = Object.keys(fields);
    return keys.length > 0 ? { isValid: false, error: fields[keys[0]], fields } : { isValid: true, error: null };
  }
}
