const Usuario = require('../models/usuariosModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.NvoUsuario = async (req, res) => {
       try {

      const result =
        await Usuario.crear_usuario(req.body);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: result
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: 'Error al registrar usuario'
      });

    }

};

exports.obtenerUsuarios = async (req, res) => {
    try {

      const usuarios = await Usuario.getAllUsuarios();
      console.log(usuarios);
      res.json(usuarios);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: 'Error al obtener usuarios'
      });

    }

};

exports.obtenerUsuarioPorId = (req, res) => {
  const id = req.params.id;
  Usuario.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(result[0]);
  });
};

exports.login = async (req, res) => {
  try {
      const {
        correo,
        password
      } = req.body;

       const user =
        await Usuario.logueo(correo);
      console.log(user);
      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            'Correo o contraseña incorrectos'
        });

      }

      const validar_password =
        await bcrypt.compare(
          password,
          user.clave_acceso
        );

        console.log(validar_password);

      if (!validar_password) {
        return res.status(401).json({
          success: false,
          message:
            'Correo o contraseña incorrectos'

        });

      }

      const token =
        jwt.sign(
          {
            id: user.id_usu,
            rolId: user.rol_id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '8h'
          }

        );

      return res.json({
        success: true,
        token,
        user: {
          id: user.id,
          nombres: user.nombres,
          apellidos: user.apellidos,
          correo: user.correo,
          rolId:user.rol_id,
          rol: user.rol
        }
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message:'Error interno del servidor'
      });
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
};

exports.actualizarEstadoUsuario = async (req, res) => {

  try {

    const { id } = req.params;
    await Usuario.updateEstadoUsuario(id);
    res.status(200).json({
      success: true,
      message: 'Estado actualizado correctamente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar estado de usuario'
    });

  }

};

exports.eliminarUsuario = async (req, res) => {

  try {
    const { id } = req.params;
    await Usuario.eliminacionLogica(id);
    res.status(200).json({
      success: true,
      message: 'Usuario eliminado correctamente'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario'
    });

  }
};

