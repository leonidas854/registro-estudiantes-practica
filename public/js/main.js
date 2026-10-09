/**
 * Punto de Entrada de la Aplicación Cliente (SIS-REG)
 */
import { registrarEstudianteApi, obtenerEstudiantesApi } from './api.js';
import { validarEstudianteCliente } from './validator.js';
import { showBanner, clearFieldErrors, setFieldError, switchTab } from './ui.js';
import { mostrarCredencial, ocultarCredencial } from './credential.js';
import { renderStudentsTable, filtrarEstudiantes } from './table.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const totalBadge = document.getElementById('totalBadge');
  const searchFilter = document.getElementById('searchFilter');
  const refreshListBtn = document.getElementById('refreshListBtn');

  let allStudents = [];

  // Pestañas
  document.getElementById('tabFormBtn')?.addEventListener('click', () => switchTab('formSection'));
  document.getElementById('tabListBtn')?.addEventListener('click', () => {
    switchTab('listSection');
    cargarEstudiantes();
  });

  // Limpiar Formulario
  resetBtn?.addEventListener('click', () => {
    form?.reset();
    clearFieldErrors();
    ocultarCredencial();
  });

  // Envío del Formulario
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    // 1. Validar en cliente
    const errors = validarEstudianteCliente(data);
    if (Object.keys(errors).length > 0) {
      clearFieldErrors();
      Object.entries(errors).forEach(([f, msg]) => setFieldError(f, msg));
      showBanner('Por favor corrija los campos marcados en rojo antes de enviar.', 'error');
      return;
    }

    // 2. Enviar a la API
    submitBtn?.classList.add('loading');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await registrarEstudianteApi(data);
      if (res.status === 201) {
        showBanner('✅ ¡Registro exitoso! Credenciales emitidas.', 'success');
        mostrarCredencial(res.data);
        form.reset();
        cargarEstudiantes();
      } else if (res.status === 409) {
        setFieldError('ci', res.error || 'CI ya registrado.');
        showBanner(`⚠️ ${res.error || 'El CI ya se encuentra registrado.'}`, 'error');
      } else if (res.status === 400) {
        if (res.fields) Object.entries(res.fields).forEach(([f, m]) => setFieldError(f, m));
        showBanner(`❌ ${res.message || 'Datos de formulario inválidos.'}`, 'error');
      } else {
        showBanner(`❌ ${res.message || 'Error inesperado.'}`, 'error');
      }
    } catch {
      showBanner('❌ Error de conexión con el servidor.', 'error');
    } finally {
      submitBtn?.classList.remove('loading');
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  // Cargar Estudiantes
  async function cargarEstudiantes() {
    try {
      const res = await obtenerEstudiantesApi();
      allStudents = res.data || [];
      if (totalBadge) totalBadge.textContent = allStudents.length;
      renderStudentsTable(allStudents);
    } catch {
      renderStudentsTable([]);
    }
  }

  // Búsqueda y refresco
  searchFilter?.addEventListener('input', (e) => {
    renderStudentsTable(filtrarEstudiantes(allStudents, e.target.value));
  });
  refreshListBtn?.addEventListener('click', cargarEstudiantes);

  cargarEstudiantes();
});
