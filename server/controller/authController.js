import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';

export const login = async (req, res) => {
  const { correoElectronico, contrasena } = req.body;
  
  try {
    const user = await Usuario.findOne({ correoElectronico });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user._id, rol: user.rol }, 'secretKey', { expiresIn: '1h' });

    res.json({ token, user: { nombreCompleto: user.nombreCompleto, rol: user.rol } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
