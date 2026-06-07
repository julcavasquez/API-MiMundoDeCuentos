const db = require('../database/conexion');

const Roles = {
  getAll: async () => {

    const sql = `
      SELECT *
      FROM roles
      WHERE estado = 1
    `;

    const [rows] = await db.query(sql);

    return rows;

  }


};

module.exports = Roles;