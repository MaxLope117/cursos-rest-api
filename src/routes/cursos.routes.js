import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../../middlewares/validar-campos.js';
import { 
    deleteCursoPorId,
    getCursoPorId, 
    getCursos, 
    postCurso, 
    putCursoPorId
} from '../controllers/cursos.controller.js';

const router = Router();

//* API

//* GET (todo).
router.get('/cursos', getCursos);

//* GET por ID.
router.get('/cursos/:id', getCursoPorId);

/**
 * * POST
 * 
 *   - nombre (curso)
 *   - autor
 *   - duracion (horas, 0.00)
 *   - clases (cantidad)
 * 
 */
router.post('/cursos', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('autor', 'El autor es obligatorio').not().isEmpty(),
    validarCampos
], postCurso);

//* PUT por ID.
router.put('/cursos/:id', putCursoPorId);

//* DELETE por ID.
router.delete('/cursos/:id', deleteCursoPorId);

export default router;