import { EstudianteDto } from '../dtos/EstudianteDto';
import { EstudianteModel } from '../models/EstudianteModel';
import { AutomationService } from './AutomationService';
import { IEstudiante } from '../types/estudiante.types';

export class EstudianteService {
  /**
   * Procesa el registro de un nuevo estudiante con validaciones y automatizaciones
   */
  public static async registrarEstudiante(dto: EstudianteDto): Promise<IEstudiante> {
    // 1. Ejecutar automatizaciones (matrícula institucional, correo, turno, inducción, token)
    const automatizaciones = AutomationService.ejecutarAutomatizaciones(
      dto.nombre,
      dto.ci,
      dto.carrera,
      dto.semestre
    );

    // 2. Construir entidad completa
    const estudianteParaCrear: IEstudiante = {
      nombre: dto.nombre,
      ci: dto.ci,
      edad: dto.edad as number,
      carrera: dto.carrera,
      semestre: dto.semestre,
      correo: dto.correo,
      ciudad: dto.ciudad,
      domicilio: dto.domicilio,
      ...automatizaciones,
    };

    // 3. Persistir en la base de datos
    return await EstudianteModel.create(estudianteParaCrear);
  }

  /**
   * Obtiene la lista completa de estudiantes inscritos
   */
  public static async listarEstudiantes(): Promise<IEstudiante[]> {
    return await EstudianteModel.findAll();
  }
}
