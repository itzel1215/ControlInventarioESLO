const HistorialInventario = require('../models/historialInventarioModel');
const Producto = require('../models/productoModel');
const Usuario = require('../models/usuarioModel');

// Obtener todo el historial de inventario
const getHistorial = async (req, res) => {
  try {
    const historial = await HistorialInventario.find();
    res.json(historial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo registro en el historial de inventario
const createHistorial = async (req, res) => {
  try {
    // Obtén el ID del usuario desde la sesión
    const usuarioId = req.user._id; // Asumiendo que el ID de usuario está en req.user._id
    const usuario = await Usuario.findById(usuarioId);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtén la lista de productos modificados desde el frontend
    const { productosModificados } = req.body;

    // Valida y obtiene la información actual de los productos
    const productosInfo = await Promise.all(
      productosModificados.map(async (productoModificado) => {
        const producto = await Producto.findById(productoModificado.id);
        if (!producto) {
          throw new Error(`Producto con ID ${productoModificado.id} no encontrado`);
        }

        return {
          nombre: producto.nombre,
          anterior: producto.cantidad,
          actual: productoModificado.cantidadActual
        };
      })
    );

    // Crea el nuevo registro en el historial de inventario
    const nuevoHistorial = new HistorialInventario({
      nombreEmpleado: usuario.nombre, // Usa el nombre del usuario que está en sesión
      productosModificados: productosInfo,
    });

    const historialGuardado = await nuevoHistorial.save();
    res.status(201).json(historialGuardado);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener un historial de inventario por ID
const getHistorialById = async (req, res) => {
  try {
    const historial = await HistorialInventario.findById(req.params.id);
    if (!historial) return res.status(404).json({ message: 'Historial no encontrado' });
    res.json(historial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un registro del historial de inventario
const updateHistorial = async (req, res) => {
  const { id } = req.params;
  const { productosModificados } = req.body;

  try {
    const historial = await HistorialInventario.findById(id);
    if (!historial) return res.status(404).json({ message: 'Historial no encontrado' });

    historial.productosModificados = productosModificados || historial.productosModificados;

    const historialActualizado = await historial.save();
    res.json(historialActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un registro del historial de inventario
const deleteHistorial = async (req, res) => {
  try {
    const historial = await HistorialInventario.findById(req.params.id);
    if (!historial) return res.status(404).json({ message: 'Historial no encontrado' });

    await historial.remove();
    res.json({ message: 'Historial eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHistorial,
  createHistorial,
  getHistorialById,
  updateHistorial,
  deleteHistorial,
};
