class EstudianteDto {
    constructor(data) {
        this.nombre = data.nombre?.trim();
        this.ci = data.ci?.trim();
        this.edad = data.edad ? parseInt(data.edad, 10) : null;
        this.carrera = data.carrera?.trim();
        this.semestre = data.semestre?.trim();
        this.correo = data.correo?.trim();
        this.ciudad = data.ciudad?.trim();
        this.domicilio = data.domicilio?.trim();
    }

    validate() {
        if (!this.nombre) return { isValid: false, error: 'El nombre es requerido' };
        
        // Expresión regular para permitir solo letras (incluyendo acentos y ñ) y espacios
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameRegex.test(this.nombre)) return { isValid: false, error: 'El nombre no debe contener números ni caracteres especiales' };

        if (!this.ci) return { isValid: false, error: 'La Cédula de Identidad (CI) es requerida' };
        
        if (!this.carrera) return { isValid: false, error: 'La carrera es requerida' };
        
        if (!this.edad) return { isValid: false, error: 'La edad es requerida' };

        if (this.edad < 16 || this.edad > 100) return { isValid: false, error: 'La edad debe ser realista (entre 16 y 100 años)' };

        if (!this.correo) return { isValid: false, error: 'El correo electrónico es requerido' };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.correo)) return { isValid: false, error: 'El formato del correo electrónico no es válido' };
        
        return { isValid: true, error: null };
    }
}

module.exports = EstudianteDto;
