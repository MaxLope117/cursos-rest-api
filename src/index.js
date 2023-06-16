import express from 'express';
import { check } from 'express-validator';

import {} from 'dotenv/config.js'

import { pool } from './db.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCursoPorId } from '../helpers/db-validators.js';

const app = express();
app.use(express.json());

//* API

//* GET (todo).
app.get('/cursos', async (req, res) => {

    try {
        
        const resultado = await pool.query('SELECT * FROM cursos')
    
        return res.status(200).json({
            ok: true,
            cursos: resultado[0],
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Algo salió mal'
        });
        
    }


});

//* GET por ID.
app.get('/cursos/:id', async (req, res) => {

    const { id } = req.params;

    try {
    
        const { ok, curso } = await existeCursoPorId(id);
    
        if(ok) {
    
            return res.status(200).json({
                ok,
                curso,
            });
    
        }

        return res.status(404).json({
            ok,
            message: `El curso con el ID: ${ id }, no fue encontrado`,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Algo salió mal'
        });
        
    }
    
});

/**
 * * POST
 * 
 *   - nombre (curso)
 *   - autor
 *   - duracion (horas, 0.00)
 *   - clases (cantidad)
 * 
 */
app.post('/cursos', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('autor', 'El autor es obligatorio').not().isEmpty(),
    validarCampos
], async (req, res) => {

    const { nombre, autor, duracion = 0.0, clases = 0 } = req.body;

    try {
        
        const [ rows ] = await pool.query('INSERT INTO cursos (nombre, autor, duracion, clases) VALUES (?, ?, ?, ?)', [nombre, autor, duracion, clases]);
    
        res.status(201).json({
            ok: true,
            message: 'Curso creado con éxito',
            curso: {
                id: rows.insertId,
                nombre,
                autor,
                duracion,
                clases,            
            },
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Algo salió mal'
        });
        
    }
    

});

//* PUT por ID.
app.put('/cursos/:id', async (req, res) => {

    const { id } = req.params;
    const body = req.body;

    try {
        
        const { ok, curso } = await existeCursoPorId(id);
    
        if(ok) {
            
            const nuevoCurso = Object.assign(curso, body);
            const { nombre, autor, duracion, clases} = nuevoCurso

            await pool.query('UPDATE cursos SET nombre = ?, autor = ?, duracion = ?, clases = ?', [nombre, autor, duracion, clases]);
    
            return res.status(200).json({
                ok,
                message: 'Curso actualizado con éxito',
                new_course: nuevoCurso,
            });
    
        }
    
        return res.status(404).json({
            ok: false,
            message: `El curso con el ID: ${ id }, no fue encontrado`,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Algo salió mal'
        });
        
    }


});

//* DELETE por ID.
app.delete('/cursos/:id', async (req, res) => {

    const { id } = req.params;

    try {
        
        const { ok, curso } = await existeCursoPorId(id);
    
        if(ok) {
    
            await pool.query(`DELETE FROM cursos WHERE id=${ id }`);
    
            return res.status(200).json({
                ok,
                message: 'Curso eliminado con éxito',
                curso,
            });
    
        }
    
        return res.status(404).json({
            ok: false,
            message: `El curso con el ID: ${ id }, no fue encontrado`,
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Algo salió mal'
        });
        
    }


});


//* Servidor.
app.listen(3000);
console.log('\nServidor corriendo en el puerto: 3000\n')