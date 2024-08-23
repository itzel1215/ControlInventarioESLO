const express = require('express');
const router = express.Router();
const Producto = require('../models/productoModel');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { nombre, tipoProducto, cantidad, fechaRegistro } = req.body;

  const producto = new Producto({
    nombre,
    tipoProducto,
    cantidad,
    fechaRegistro
  });

  try {
    const nuevoProducto = await producto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    producto.nombre = req.body.nombre || producto.nombre;
    producto.tipoProducto = req.body.tipoProducto || producto.tipoProducto;
    producto.cantidad = req.body.cantidad || producto.cantidad;
    producto.fechaRegistro = req.body.fechaRegistro || producto.fechaRegistro;

    const productoActualizado = await producto.save();
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    await producto.remove();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
