import express from 'express';
import * as usuarioController from '../controller/usuarioController.js';

const router = express.Router();

router.post('/create', usuarioController.postUsuario);
router.get('/', usuarioController.getUsuario);
router.get('/:id', usuarioController.getUsuarioPorId);
router.put('/update/:id', usuarioController.putUsuario);
router.delete('/delete/:id', usuarioController.deleteUsuario);

export { router as usuarioRoutes };
