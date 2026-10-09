import { Request, Response } from 'express';
import { EstudianteDto } from '../dtos/EstudianteDto';
import { EstudianteService } from '../services/EstudianteService';
import { DuplicateCiError } from '../models/EstudianteModel';
import { IApiResponse } from '../types/estudiante.types';

export class EstudianteController {
  /**
   * Endpoint POST /api/registro
   * Registra un nuevo estudiante
   */
  public static async registrar(req: Request, res: Response): Promise<Response> {
    try {
      // 1. Mapear datos del request a DTO
      const estudianteDto = new EstudianteDto(req.body);

      // 2. Validar DTO
      const validation = estudianteDto.validate();
      if (!validation.isValid) {
        const errorResponse: IApiResponse = {
          success: false,
          message: validation.error || 'Datos de estudiante inválidos.',
          error: validation.error || 'Datos inválidos',
          fields: validation.fields,
        };
        return res.status(400).json(errorResponse);
      }

      // 3. Orquestar registro y automatizaciones
      const nuevoEstudiante = await EstudianteService.registrarEstudiante(estudianteDto);

      // 4. Respuesta HTTP 201 exitosa
      const successResponse: IApiResponse = {
        success: true,
        message: 'Estudiante registrado con éxito',
        data: nuevoEstudiante,
      };
      return res.status(201).json(successResponse);

    } catch (error: any) {
      // Manejo específico de CI duplicado (409 Conflict)
      if (error instanceof DuplicateCiError || error?.name === 'DuplicateCiError' || error?.message?.includes('ya está registrada')) {
        const conflictResponse: IApiResponse = {
          success: false,
          message: error.message,
          error: error.message,
        };
        return res.status(409).json(conflictResponse);
      }

      // Error interno
      console.error('[EstudianteController.registrar] Error no controlado:', error);
      const serverErrorResponse: IApiResponse = {
        success: false,
        message: 'Error interno del servidor al procesar el registro.',
        error: error?.message || 'Error interno',
      };
      return res.status(500).json(serverErrorResponse);
    }
  }

  /**
   * Endpoint GET /api/estudiantes
   * Lista todos los estudiantes registrados
   */
  public static async listar(_req: Request, res: Response): Promise<Response> {
    try {
      const estudiantes = await EstudianteService.listarEstudiantes();
      return res.status(200).json({
        success: true,
        message: 'Estudiantes recuperados con éxito',
        total: estudiantes.length,
        data: estudiantes,
      });
    } catch (error: any) {
      console.error('[EstudianteController.listar] Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al listar estudiantes',
        error: error?.message || 'Error interno',
      });
    }
  }
}
