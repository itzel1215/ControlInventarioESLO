const mongoose = require('mongoose');

const historialInventarioSchema = new mongoose.Schema({
  nombreEmpleado: { 
    type: String, 
    required: true 
  },
  fechaInventario: { 
    type: Date, 
    default: Date.now, 
    required: true 
  },
  productosModificados: [
    {
      nombre: { 
        type: String, 
        required: true 
      },
      anterior: { 
        type: Number, 
        required: true 
      },
      actual: { 
        type: Number, 
        required: true 
      }
    }
  ]
});

// Exporta el modelo para su uso en otros archivos
module.exports = mongoose.model('HistorialInventario', historialInventarioSchema);
