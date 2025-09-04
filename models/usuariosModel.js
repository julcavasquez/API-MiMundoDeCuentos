const db = require('../database/conexion');

const Usuario = {

  crear_usuario: async (nombres,apellidos,nom_usu, pin, avatar) => {
    const [result] = await db.query(
      "INSERT INTO usuarios (nombres, apellidos, nom_usu, pin, avatar) VALUES (?, ?, ?, ?, ?)",
      [nombres,apellidos,nom_usu, pin, avatar]
    );
    return { id: result.insertId, nom_usu, pin, avatar };
  },

  logueo: async (nom_usu) => {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE nom_usu = ?", [nom_usu]);
    return rows[0];
  },

  getAll: (callback) => {
    const sql = 'SELECT id_usuario, nombre, apellidos, nom_usu, email, estado FROM usuarios WHERE estado != "eliminado"';
    db.query(sql, callback);
  },

  getUsuId: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    return rows[0]; // devuelve un solo usuario
  },
};

module.exports = Usuario;