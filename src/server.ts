import app from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SIS-REG: Sistema de Registro y Admisión Estudiantil  `);
  console.log(`=======================================================`);
  console.log(`Servidor activo en: http://localhost:${PORT}`);
  console.log(`- Web Formulario:  http://localhost:${PORT}/auth/registro`);
  console.log(`- API Registro:    http://localhost:${PORT}/api/registro`);
  console.log(`- API Listado:     http://localhost:${PORT}/api/estudiantes`);
  console.log(`=======================================================`);
});

export default server;
