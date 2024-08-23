import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/inventario';
mongoose.connect(url);

const db = mongoose.connection;
db.on('open', () => {
  console.log("Estas conectado a mongo");
});
db.on('error', () => {
  console.log("No hubo conexion a la base de datos");
});

export default db;
