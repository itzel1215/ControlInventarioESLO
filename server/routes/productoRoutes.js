import express from 'express';
import * as productoController from '../controller/productoController.js';

const router = express.Router();

router.get('/', productoController.getProductos);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

export { router as productoRoutes };
