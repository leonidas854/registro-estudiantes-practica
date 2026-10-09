/**
 * Módulo para Gestión y Visualización de la Tabla de Estudiantes
 */
export function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderStudentsTable(students) {
  const tbody = document.getElementById('studentsTableBody');
  if (!tbody) return;

  if (!students || students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-cell">No hay estudiantes registrados aún.</td></tr>';
    return;
  }

  tbody.innerHTML = students.map((st) => `
    <tr>
      <td><strong>${escapeHtml(st.ci)}</strong></td>
      <td>${escapeHtml(st.nombre)}</td>
      <td>${escapeHtml(st.carrera)}</td>
      <td><span style="color: #60a5fa; font-weight: 600;">${escapeHtml(st.matricula || '-')}</span></td>
      <td>${escapeHtml(st.correo_institucional || '-')}</td>
      <td>${escapeHtml(st.turno || 'Regular')}</td>
      <td><code style="color: #c084fc;">${escapeHtml(st.codigo_verificacion || '-')}</code></td>
    </tr>
  `).join('');
}

export function filtrarEstudiantes(students, query) {
  const q = query.toLowerCase().trim();
  if (!q) return students;

  return students.filter((st) =>
    (st.nombre && st.nombre.toLowerCase().includes(q)) ||
    (st.ci && st.ci.toLowerCase().includes(q)) ||
    (st.carrera && st.carrera.toLowerCase().includes(q)) ||
    (st.matricula && st.matricula.toLowerCase().includes(q)) ||
    (st.correo_institucional && st.correo_institucional.toLowerCase().includes(q))
  );
}
