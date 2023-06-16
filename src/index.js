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

    const resultado = await pool.query('SELECT * FROM cursos')

    res.json({
        ok: true,
        cursos: resultado[0],
    });

});

//* GET por ID.
app.get('/cursos/:id', async (req, res) => {

    const id = req.params.id;

    const { ok, curso } = await existeCursoPorId(id);

    if(ok) {

        return res.json({
            ok,
            curso,
        });

    }

    return res.json({
        ok: false,
        message: `El curso con el ID: ${ id }, no fue encontrado`,
    });
    
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
    
    const [ rows ] = await pool.query('INSERT INTO cursos (nombre, autor, duracion, clases) VALUES (?, ?, ?, ?)', [nombre, autor, duracion, clases]);

    res.json({
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

});

//* PUT por ID.
app.put('/cursos/:id', async (req, res) => {

    const id = req.params.id;

});

//* DELETE por ID.
app.delete('/cursos/:id', async (req, res) => {

    const id = req.params.id;

    const { ok, curso } = await existeCursoPorId(id);

    if(ok) {

        await pool.query(`DELETE FROM cursos WHERE id=${ id }`);

        return res.json({
            ok,
            message: 'Curso eliminado con éxito',
            curso,
        })

    }

    return res.json({
        ok: false,
        message: `El curso con el ID: ${ id }, no fue encontrado`,
    });

});


//* Servidor.
app.listen(3000);
console.log('\nServidor corriendo en el puerto: 3000\n')