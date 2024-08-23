
const express = require('express');
const router = express.Router();
const {
  getProductos,
  updateProducto,
} = require('../controller/productoEmpleadoController');


router.get('/', getProductos);
router.put('/:id', updateProducto);

module.exports = router;
