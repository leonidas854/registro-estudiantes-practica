const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`- API: http://localhost:${PORT}/api/registro`);
    console.log(`- Web: http://localhost:${PORT}/auth/registro`);
});
