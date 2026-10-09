import { EstudianteDto } from '../../src/dtos/EstudianteDto';

describe('EstudianteDto - Pruebas Unitarias de Validación', () => {
  const datosValidos = {
    nombre: 'Valeria Mendoza Flores',
    ci: '8765432-LP',
    edad: 21,
    carrera: 'Ingeniería de Sistemas',
    semestre: '4',
    correo: 'valeria.mendoza@gmail.com',
    ciudad: 'La Paz',
    domicilio: 'Calle Murillo 450',
  };

  test('debe validar exitosamente cuando todos los datos son correctos', () => {
    const dto = new EstudianteDto(datosValidos);
    const result = dto.validate();

    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  test('debe rechazar si el nombre está vacío o tiene menos de 3 caracteres', () => {
    const dtoVacio = new EstudianteDto({ ...datosValidos, nombre: '  ' });
    const resVacio = dtoVacio.validate();
    expect(resVacio.isValid).toBe(false);
    expect(resVacio.fields?.nombre).toContain('requerido');

    const dtoCorto = new EstudianteDto({ ...datosValidos, nombre: 'Al' });
    const resCorto = dtoCorto.validate();
    expect(resCorto.isValid).toBe(false);
    expect(resCorto.fields?.nombre).toContain('al menos 3 caracteres');
  });

  test('debe rechazar si el nombre contiene números o caracteres extraños', () => {
    const dto = new EstudianteDto({ ...datosValidos, nombre: 'Juan Carlos 123' });
    const result = dto.validate();

    expect(result.isValid).toBe(false);
    expect(result.fields?.nombre).toContain('no debe contener números');
  });

  test('debe rechazar si el CI está vacío o no cumple el rango de longitud', () => {
    const dtoVacio = new EstudianteDto({ ...datosValidos, ci: '' });
    expect(dtoVacio.validate().isValid).toBe(false);

    const dtoCorto = new EstudianteDto({ ...datosValidos, ci: '12' });
    const resCorto = dtoCorto.validate();
    expect(resCorto.isValid).toBe(false);
    expect(resCorto.fields?.ci).toContain('entre 4 y 15 caracteres');
  });

  test('debe rechazar edades menores a 16 o mayores a 100 años', () => {
    const dtoMenor = new EstudianteDto({ ...datosValidos, edad: 15 });
    expect(dtoMenor.validate().isValid).toBe(false);
    expect(dtoMenor.validate().fields?.edad).toContain('entre 16 y 100');

    const dtoMayor = new EstudianteDto({ ...datosValidos, edad: 101 });
    expect(dtoMayor.validate().isValid).toBe(false);
  });

  test('debe rechazar si la carrera no pertenece al catálogo oficial', () => {
    const dto = new EstudianteDto({ ...datosValidos, carrera: 'Astronomía Cuántica' });
    const result = dto.validate();

    expect(result.isValid).toBe(false);
    expect(result.fields?.carrera).toContain('no es válida');
  });

  test('debe rechazar semestres fuera del rango 1 a 10', () => {
    const dtoInvalido = new EstudianteDto({ ...datosValidos, semestre: '15' });
    const result = dtoInvalido.validate();

    expect(result.isValid).toBe(false);
    expect(result.fields?.semestre).toContain('entre 1 y 10');
  });

  test('debe rechazar correos electrónicos con formato inválido', () => {
    const correosInvalidos = ['correo-invalido', 'usuario@', '@dominio.com', 'test@dominio'];

    for (const correo of correosInvalidos) {
      const dto = new EstudianteDto({ ...datosValidos, correo });
      const result = dto.validate();
      expect(result.isValid).toBe(false);
      expect(result.fields?.correo).toContain('no es válido');
    }
  });

  test('debe rechazar ciudad o domicilio vacíos', () => {
    const dtoSinCiudad = new EstudianteDto({ ...datosValidos, ciudad: '' });
    expect(dtoSinCiudad.validate().isValid).toBe(false);

    const dtoSinDomicilio = new EstudianteDto({ ...datosValidos, domicilio: '' });
    expect(dtoSinDomicilio.validate().isValid).toBe(false);
  });
});
