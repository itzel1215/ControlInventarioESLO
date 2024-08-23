
const ProductoEmpleado = require('../models/productoEmpleadoModel');
const getProductos = async (req, res) => {
  try {
    const productos = await ProductoEmpleado.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  try {
    const producto = await ProductoEmpleado.findById(id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    producto.cantidad = cantidad || producto.cantidad;

    const actualizado = await producto.save();
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProductos,
  updateProducto,
};
