import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { usuarioRoutes } from './routes/usuarioRoutes.js'; 
import authRoutes from './routes/authRoutes.js';
const productoRoutes = require('./routes/productoRoutes.js');
const productoEmpleadoRoutes = require('./routes/productoEmpleadoRoutes');


const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/inventario', { useNewUrlParser: true,
 useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

app.use('/Usuario', usuarioRoutes); 
app.use('/api/auth', authRoutes);
app.use('/Producto', productoRoutes);
app.use('/api/productos-empleados', productoEmpleadoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});



