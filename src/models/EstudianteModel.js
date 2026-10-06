const db = require('../config/database');

class EstudianteModel {
    static async create(estudianteDto) {
        return new Promise((resolve, reject) => {
            // Automation: Generate Matricula and Correo Institucional
            const year = new Date().getFullYear();
            const matricula = `${year}${estudianteDto.ci}`;
            
            const nameParts = estudianteDto.nombre.toLowerCase().split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
            const cleanCi = estudianteDto.ci.replace(/\D/g, '');
            const correo_institucional = `${firstName}.${lastName}${cleanCi.substring(0,3)}@universidad.edu.bo`.replace(/[^a-z0-9.@]/g, '');

            const sql = `INSERT INTO estudiantes 
                         (nombre, ci, edad, carrera, semestre, correo, ciudad, domicilio, matricula, correo_institucional) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            const params = [
                estudianteDto.nombre,
                estudianteDto.ci,
                estudianteDto.edad,
                estudianteDto.carrera,
                estudianteDto.semestre,
                estudianteDto.correo,
                estudianteDto.ciudad,
                estudianteDto.domicilio,
                matricula,
                correo_institucional
            ];

            db.run(sql, params, function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        reject(new Error('La Cédula de Identidad (CI) ya está registrada.'));
                    } else {
                        reject(err);
                    }
                } else {
                    resolve({ id: this.lastID, ...estudianteDto, matricula, correo_institucional });
                }
            });
        });
    }

    // Aquí se podrían agregar más métodos: findById, findAll, update, delete
}

module.exports = EstudianteModel;
