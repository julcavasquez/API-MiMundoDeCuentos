const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '03071593',
        database: 'colegio',
    }
);

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Base de datos conectado');
});