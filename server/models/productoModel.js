const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipoProducto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
