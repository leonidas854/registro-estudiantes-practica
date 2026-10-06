document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const submitBtn = document.getElementById('submitBtn');
    const messageBox = document.getElementById('messageBox');

    // Deshabilitar la validación HTML5 para usar nuestra validación JS personalizada
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // UI states
        messageBox.classList.add('hidden');
        messageBox.className = 'message-box hidden'; // reset classes
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // --- VALIDACIÓN DEL LADO DEL CLIENTE ---
        // 1. Verificar campos obligatorios
        const requiredFields = ['nombre', 'ci', 'edad', 'carrera', 'semestre', 'correo', 'ciudad', 'domicilio'];
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                return showMessage(`❌ El campo ${field} es obligatorio y no puede estar vacío.`, 'error');
            }
        }

        // 2. Comprobar que la edad sea válida
        const edad = parseInt(data.edad, 10);
        if (isNaN(edad) || edad < 16 || edad > 100) {
            return showMessage('❌ La edad debe ser un número válido entre 16 y 100.', 'error');
        }

        // 3. Validar el formato del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.correo)) {
            return showMessage('❌ El formato del correo electrónico no es válido.', 'error');
        }
        // --- FIN DE VALIDACIÓN ---

        submitBtn.classList.add('loading');

        try {
            const response = await fetch('/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                let successMsg = `✅ ${result.message}. Matrícula: ${result.data.matricula} | Correo Inst: ${result.data.correo_institucional}`;
                showMessage(successMsg, 'success');
                form.reset();
            } else {
                showMessage('❌ ' + (result.error || 'Ocurrió un error al registrar'), 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('❌ Error de conexión con el servidor', 'error');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

    function showMessage(msg, type) {
        messageBox.textContent = msg;
        messageBox.classList.remove('hidden');
        if (type === 'success') {
            messageBox.classList.add('message-success');
        } else {
            messageBox.classList.add('message-error');
        }
        
        // Hide message after 10 seconds
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 10000);
    }
});
