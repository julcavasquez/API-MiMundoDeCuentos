const db = require('../database/conexion');

const Usuario = {

  crear_usuario: async (nom_usu, pin, avatar) => {
    const [result] = await db.query(
      "INSERT INTO usuarios (nom_usu, pin, avatar) VALUES (?, ?, ?)",
      [nom_usu, pin, avatar]
    );
    return { id: result.insertId, nom_usu, pin, avatar };
  },

  getAll: (callback) => {
    const sql = 'SELECT id_usuario, nombre, apellidos, nom_usu, email, estado FROM usuarios WHERE estado != "eliminado"';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT id_usuario, nombre, apellidos, nom_usu, email, estado FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Usuario;