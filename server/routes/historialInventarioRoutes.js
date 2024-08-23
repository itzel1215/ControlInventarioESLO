const express = require('express');
const router = express.Router();
const {
  getHistorial,
  createHistorial,
  getHistorialById,
  updateHistorial,
  deleteHistorial
} = require('../controller/historialInventarioController');


router.get('/', getHistorial);
router.post('/', createHistorial);
router.get('/:id', getHistorialById);
router.put('/:id', updateHistorial);
router.delete('/:id', deleteHistorial);

module.exports = router;
