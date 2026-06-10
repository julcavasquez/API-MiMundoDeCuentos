const db = require('../database/conexion');
const bcrypt = require("bcryptjs");

const Usuario = {

  crear_usuario: async (data) => {
    const connection = await db.getConnection();

    try {

      await connection.beginTransaction();

      // TABLA USUARIOS

      const [userResult] = await connection.query(
        `
        INSERT INTO usuarios
        (
          rol_id,
          nombres,
          apellidos
        )
        VALUES (?, ?, ?)
        `,
        [
          data.roleId,
          data.nombres,
          data.apellidos
        ]
      );

      const usuarioId = userResult.insertId;

      // ENCRIPTAR CLAVE

      const hashedPassword =
        await bcrypt.hash(data.password, 10);

      // TABLA CREDENCIALES

      await connection.query(
        `
        INSERT INTO credenciales_general
        (
          usuario_id,
          correo,
          clave_acceso
        )
        VALUES (?, ?, ?)
        `,
        [
          usuarioId,
          data.email,
          hashedPassword
        ]
      );

      await connection.commit();

      return {
        success: true,
        usuarioId
      };

    } catch (error) {

      await connection.rollback();

      throw error;

    } finally {

      connection.release();

    }
  },

  logueo: async (correo) => {
    const sql = `
    SELECT
        u.id_usu,
        u.rol_id,
        u.nombres,
        u.apellidos,
        r.nombre AS rol,
        cg.correo,
        cg.clave_acceso
      FROM usuarios u
      INNER JOIN credenciales_general cg
        ON u.id_usu = cg.usuario_id
      INNER JOIN roles r
        ON u.rol_id = r.id
      WHERE cg.correo = ?
      AND u.estado = 1
      AND u.eliminado = 0`;

      const [rows] =
      await db.query(sql, [correo]);
      return rows[0];
      
  },

  getAllUsuarios: async () => {

    const sql = `
      SELECT
        u.id_usu,
        u.nombres,
        u.apellidos,
        r.nombre AS rol,
        u.estado,
        cg.correo
      FROM usuarios u
      INNER JOIN roles r
        ON u.rol_id = r.id
      LEFT JOIN credenciales_general cg
        ON u.id_usu = cg.usuario_id
      WHERE u.eliminado=0
      ORDER BY u.id_usu DESC
    `;
    const [rows] = await db.query(sql);
    return rows;

  },

  getUsuId: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    return rows[0]; // devuelve un solo usuario
  },

  updateEstadoUsuario: async (id) => {
    const sql = `
      UPDATE usuarios
      SET estado = IF(estado = 1, 0, 1)
      WHERE id_usu = ?
    `;

    const [result] = await db.query(sql, [id]);

    return result;

  },

  eliminacionLogica: async (id) => {

    const sql = `
      UPDATE usuarios
      SET eliminado = 1
      WHERE id_usu = ?
    `;

    const [result] = await db.query(sql, [id]);

    return result;

  },

  getAllTiposDoc: async () => {

        const sql = `
            SELECT
                id_tdi,
                nombre
            FROM tipos_doc_identidad
            WHERE estado = 1
            ORDER BY nombre
        `;

        const [rows] = await db.query(sql);

        return rows;

    }
};

module.exports = Usuario;