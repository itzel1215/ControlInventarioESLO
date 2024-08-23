import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Para encriptar la contraseña

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombreCompleto: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  sexo: { type: String, required: true },
  direccion: { type: String, required: true },
  rol: { type: String, required: true },
  correoElectronico: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});

// Antes de guardar el usuario, encripta la contraseña
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContrasena = async function(contrasenaIngresada) {
  return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

export default mongoose.model('Usuario', usuarioSchema);
