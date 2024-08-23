import usuarioSchema from "../models/usuarioModel.js";

export const getUsuario = async (req, res) => {
  try {
      const data = await usuarioSchemaSchema.find({});
      res.json({ success: true, data: data });
  } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const getUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
      let data;
      if (id) {
          data = await usuarioSchema.findById(id);
      } else {
          data = await usuarioSchemaSchema.find({});
      }
      res.json({ success: true, data: data });
  } catch (error) {
      console.error("Error al obtener las usuarios:", error);
      res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const postUsuario = async (req, res) => {
  try {
     
      const data = new usuarioSchema({
          ...req.body
      });

      await data.save();

      res.send({ success: true, message: "Dato guardado exitosamente", data: data });
  } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ success: false, message: "Error del servidor" });
  }
};


export const putUsuario = async (req, res) => {
  try {
      const { id } = req.params;
      const newData = req.body;
      const data = await usuarioSchema.findByIdAndUpdate(id, newData, { new: true });
      if (!data) {
          return res.status(404).json({ success: false, message: "Usuario no encontrada" });
      }
      res.json({ success: true, message: "El usuario se actualizó correctamente", data: data });
  } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ success: false, message: "Error del servidor" });
  }
};
export const deleteUsuario = async (req, res) => {
  try {
      const id = req.params.id;
      const data = await usuarioSchemaSchema.deleteOne({ _id: id });
      res.send({ success: true, message: "El dato se eliminó con éxito", data: data });
  } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({ success: false, message: "Error del servidor" });
  }
};
