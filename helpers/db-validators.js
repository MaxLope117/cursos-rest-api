import { pool } from '../src/db.js';

export const existeCursoPorId = async ( id ) => {

    const [ resultado ] = await pool.query(`SELECT * FROM cursos WHERE id=${ id }`)

    if(resultado[0] == undefined) {
        // console.log('Curso no encontrado')
        return {
            ok: false,
        };
    }

    // console.log('Curso encontrado');
    return {
        ok: true,
        curso: resultado[0],
    };

}