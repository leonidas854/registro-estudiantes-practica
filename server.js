// Wrapper para compatibilidad hacia atrás con 'node server.js'
try {
  require('./dist/server');
} catch (e) {
  console.log('El proyecto ha sido migrado a TypeScript.');
  console.log('Ejecuta primero "npm run build" y luego "npm start", o utiliza "npm run dev".');
}
