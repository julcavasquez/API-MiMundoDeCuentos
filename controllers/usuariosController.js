const Usuario = require('../models/usuariosModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.NvoUsuario = async (req, res) => {
      try {
        const {nombres,apellidos,nom_usu, pin, avatar } = req.body;
         // 1. Encriptar pin con bcrypt
        const hashedPin = await bcrypt.hash(pin, 10);
        if (!nombres || !apellidos || !nom_usu || !pin || !avatar) {
          return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newUser = await Usuario.crear_usuario(nombres,apellidos,nom_usu, hashedPin, avatar);
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

// clave secreta para firmar el token (puede ir en .env)
const JWT_SECRET = "03071593";

exports.login = async (req, res) => {
  try {
    const { nom_usu, pin } = req.body;
    console.log(nom_usu);
    // buscar usuario por email
    const user = await Usuario.logueo(nom_usu);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
     console.log("hola x aqui",user);
    // comparar contraseña
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      console.log("contraseña incorrecta");
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // generar token
    const token = jwt.sign({ id: user.id_usuario, nom_usu: user.nom_usu }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "Login exitososs", token, userId: user.id_usuario });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


exports.getUsuPerfil = async(req, res) =>{
  try {
    const { id } = req.params;

    // Verificar que el usuario autenticado coincide con el solicitado
    if (req.user.id != id) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    const user = await Usuario.getUsuId(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error en getUserProfile:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

