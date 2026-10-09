/**
 * Módulo de Comunicación con la API REST (SIS-REG)
 */
export async function registrarEstudianteApi(data) {
  const response = await fetch('/api/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return { status: response.status, ok: response.ok, ...result };
}

export async function obtenerEstudiantesApi() {
  const response = await fetch('/api/estudiantes');
  if (!response.ok) {
    throw new Error('Error al consultar lista de estudiantes');
  }
  return await response.json();
}
