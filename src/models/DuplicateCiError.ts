export class DuplicateCiError extends Error {
  constructor(message: string = 'La Cédula de Identidad (CI) ya se encuentra registrada en el sistema.') {
    super(message);
    this.name = 'DuplicateCiError';
  }
}
