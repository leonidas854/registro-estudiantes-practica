import { AutomationService } from '../../src/services/AutomationService';

describe('AutomationService - Pruebas Unitarias del Módulo de Automatización', () => {
  test('debe sanitizar texto eliminando tildes y eñes correctamente', () => {
    const textoConAcentos = 'Ángel José Núñez Peña';
    const sanitizado = AutomationService.sanitizarTexto(textoConAcentos);
    expect(sanitizado).toBe('angel jose nunez pena');
  });

  test('debe generar matrícula con el formato institucional correcto y código de carrera', () => {
    const matriculaSistemas = AutomationService.generarMatricula('9876543', 'Ingeniería de Sistemas', 2026);
    expect(matriculaSistemas).toBe('MAT-2026-SIS-9876543');

    const matriculaDerecho = AutomationService.generarMatricula('456123-1B', 'Derecho', 2026);
    expect(matriculaDerecho).toBe('MAT-2026-DER-4561231B');

    const matriculaMedicina = AutomationService.generarMatricula('789012', 'Medicina', 2026);
    expect(matriculaMedicina).toBe('MAT-2026-MED-789012');
  });

  test('debe generar correo institucional formateado sin caracteres prohibidos', () => {
    const correo = AutomationService.generarCorreoInstitucional('Martín Fernández Gómez', '7654321');
    // Primer nombre: martin, primer apellido: gomez, ultimos digitos ci: 321
    expect(correo).toBe('martin.gomez321@emi.edu.bo');
  });

  test('debe asignar turno e inducción en función del semestre', () => {
    const turnoPrimerSemestre = AutomationService.asignarTurnoEInduccion('1');
    expect(turnoPrimerSemestre.turno).toBe('Mañana');
    expect(turnoPrimerSemestre.fechaInduccion).toBeDefined();

    const turnoQuintoSemestre = AutomationService.asignarTurnoEInduccion('5');
    expect(turnoQuintoSemestre.turno).toBe('Tarde');

    const turnoOctavoSemestre = AutomationService.asignarTurnoEInduccion('8');
    expect(turnoOctavoSemestre.turno).toBe('Noche');
  });

  test('debe generar código de verificación alfanumérico único de 12 caracteres', () => {
    const codigo = AutomationService.generarCodigoVerificacion('1234567', 'MAT-2026-SIS-1234567');
    expect(codigo).toHaveLength(12);
    expect(codigo).toMatch(/^[0-9A-F]{12}$/);
  });

  test('debe ejecutar el paquete completo de automatizaciones retornando todos los campos requeridos', () => {
    const resultado = AutomationService.ejecutarAutomatizaciones(
      'Camila Andrea Rojas',
      '8765432',
      'Arquitectura',
      '2'
    );

    expect(resultado.matricula).toContain('ARQ');
    expect(resultado.correo_institucional).toBe('camila.rojas432@emi.edu.bo');
    expect(resultado.turno).toBe('Mañana');
    expect(resultado.fecha_induccion).toBeDefined();
    expect(resultado.codigo_verificacion).toBeDefined();
  });
});
