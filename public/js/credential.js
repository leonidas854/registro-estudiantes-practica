/**
 * Módulo para Renderizar la Credencial Digital de Estudiante
 */
export function mostrarCredencial(student) {
  const credentialCard = document.getElementById('credentialCard');
  if (!credentialCard || !student) return;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '-';
  };

  setVal('credNombre', student.nombre);
  setVal('credMatricula', student.matricula);
  setVal('credEmailInst', student.correo_institucional);
  setVal('credTurno', student.turno || 'Asignado');
  setVal('credInduccion', student.fecha_induccion || 'Por definir');
  setVal('credCodigo', student.codigo_verificacion || 'SIS-TOKEN');

  credentialCard.classList.remove('hidden');
}

export function ocultarCredencial() {
  const credentialCard = document.getElementById('credentialCard');
  credentialCard?.classList.add('hidden');
}
