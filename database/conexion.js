const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '03071593',
  database: 'app_cuentos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log('✅ Conectado a MySQL');
// });

module.exports = db;