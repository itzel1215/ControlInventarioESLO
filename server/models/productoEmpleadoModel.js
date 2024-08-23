
const mongoose = require('mongoose');

const productoEmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipoProducto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductoEmpleado', productoEmpleadoSchema);



