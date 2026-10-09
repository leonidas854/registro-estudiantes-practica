import crypto from 'crypto';
import { IEstudianteAutomation, Turno } from '../types/estudiante.types';

export class AutomationService {
  private static readonly CODIGOS_CARRERA: Record<string, string> = {
    'Ingeniería de Sistemas': 'SIS',
    'Ingeniería de Sistemas Electrónico': 'SEL',
    'Ingeniería de Sistemas Electrónicos': 'SEL',
    'Ingeniería Comercial': 'COM',
    'Ingenieria Civil': 'CIV',
    'Ingeniería Civil': 'CIV',
    'Ingeniería Agroindustrial': 'AGR',
    'Administración de Empresas': 'ADM',
    'Derecho': 'DER',
    'Medicina': 'MED',
    'Arquitectura': 'ARQ',
  };

  /**
   * Normaliza una cadena removiendo tildes, diéresis y caracteres especiales
   */
  public static sanitizarTexto(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/gi, 'n')
      .toLowerCase()
      .trim();
  }

  /**
   * Genera la matrícula estudiantil oficial estandarizada
   * Formato: MAT-{AÑO}-{COD_CARRERA}-{CI}
   */
  public static generarMatricula(ci: string, carrera: string, year: number = new Date().getFullYear()): string {
    const codCarrera = this.CODIGOS_CARRERA[carrera] || 'GEN';
    const ciLimpio = ci.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    return `MAT-${year}-${codCarrera}-${ciLimpio}`;
  }

  /**
   * Genera el correo electrónico institucional único
   * Formato: primer_nombre.primer_apellido{ultimos_3_ci}@universidad.edu.bo
   */
  public static generarCorreoInstitucional(nombreCompleto: string, ci: string): string {
    const nombreSanitizado = this.sanitizarTexto(nombreCompleto);
    const partes = nombreSanitizado.split(/\s+/).filter(Boolean);
    const primerNombre = partes[0] || 'estudiante';
    const primerApellido = partes.length > 1 ? partes[partes.length - 1] : 'u';
    
    // Extraer últimos 3 dígitos del CI o caracteres alfanuméricos
    const digitosCi = ci.replace(/\D/g, '');
    const sufijoCi = digitosCi.length >= 3 ? digitosCi.slice(-3) : (digitosCi || '001');

    return `${primerNombre}.${primerApellido}${sufijoCi}@universidad.edu.bo`;
  }

  /**
   * Asigna automáticamente el turno y la fecha de inducción según el semestre
   */
  public static asignarTurnoEInduccion(semestreStr: string): { turno: Turno; fechaInduccion: string } {
    const semestre = parseInt(semestreStr, 10) || 1;
    let turno: Turno = 'Mañana';

    if (semestre <= 2) {
      turno = 'Mañana';
    } else if (semestre <= 6) {
      turno = 'Tarde';
    } else {
      turno = 'Noche';
    }

    // Calcula fecha de inducción institucional (próximo inicio del ciclo académico)
    const fechaActual = new Date();
    const fechaInduccion = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 15);
    const fechaFormateada = fechaInduccion.toISOString().split('T')[0];

    return { turno, fechaInduccion: fechaFormateada };
  }

  /**
   * Genera un código hash alfanumérico único para verificación del comprobante
   */
  public static generarCodigoVerificacion(ci: string, matricula: string): string {
    const raw = `${ci}-${matricula}-${Date.now()}`;
    return crypto.createHash('sha256').update(raw).digest('hex').substring(0, 12).toUpperCase();
  }

  /**
   * Proceso completo de automatización para un estudiante
   */
  public static ejecutarAutomatizaciones(nombre: string, ci: string, carrera: string, semestre: string): IEstudianteAutomation {
    const matricula = this.generarMatricula(ci, carrera);
    const correo_institucional = this.generarCorreoInstitucional(nombre, ci);
    const { turno, fechaInduccion } = this.asignarTurnoEInduccion(semestre);
    const codigo_verificacion = this.generarCodigoVerificacion(ci, matricula);

    return {
      matricula,
      correo_institucional,
      turno,
      fecha_induccion: fechaInduccion,
      codigo_verificacion,
    };
  }
}
