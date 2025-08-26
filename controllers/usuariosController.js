const Usuario = require('../models/usuariosModel');

exports.NvoUsuario = async (req, res) => {
      try {
        const { nom_usu, pin, avatar } = req.body;

        if (!nom_usu || !pin || !avatar) {
          return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newUser = await Usuario.crear_usuario(nom_usu, pin, avatar);
        res.status(201).json({ message: "Usuario registrado con éxito 🎉", user: newUser });
      } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
};

exports.obtenerUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.obtenerUsuarioPorId = (req, res) => {
  const id = req.params.id;
  Usuario.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result[0]);
  });
};