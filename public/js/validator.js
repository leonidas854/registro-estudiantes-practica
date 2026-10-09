/**
 * Módulo de Validación de Entrada del Cliente
 */
export function validarEstudianteCliente(data) {
  const errors = {};

  // 1. Nombre Completo
  const nombre = data.nombre?.trim() || '';
  if (!nombre) {
    errors.nombre = 'El nombre completo es obligatorio.';
  } else if (nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(nombre)) {
    errors.nombre = 'El nombre solo debe contener letras y espacios válidos.';
  }

  // 2. Cédula de Identidad
  const ci = data.ci?.trim() || '';
  if (!ci) {
    errors.ci = 'La Cédula de Identidad (C.I.) es obligatoria.';
  } else if (ci.length < 4 || ci.length > 15) {
    errors.ci = 'El CI debe tener entre 4 y 15 caracteres.';
  }

  // 3. Edad (rango 16 a 90/100)
  const edad = parseInt(data.edad, 10);
  if (!data.edad || isNaN(edad)) {
    errors.edad = 'La edad es obligatoria.';
  } else if (edad < 16 || edad > 90) {
    errors.edad = 'La edad debe estar comprendida entre 16 y 90 años.';
  }

  // 4. Carrera y Semestre
  if (!data.carrera?.trim()) errors.carrera = 'Debe seleccionar una carrera.';
  if (!data.semestre?.trim()) errors.semestre = 'Debe seleccionar un semestre.';

  // 5. Correo Electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.correo?.trim()) {
    errors.correo = 'El correo electrónico es obligatorio.';
  } else if (!emailRegex.test(data.correo.trim())) {
    errors.correo = 'Ingrese un formato de correo electrónico válido.';
  }

  // 6. Ubicación
  if (!data.ciudad?.trim()) errors.ciudad = 'La ciudad es obligatoria.';
  if (!data.domicilio?.trim()) errors.domicilio = 'El domicilio es obligatorio.';

  return errors;
}
