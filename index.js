const express = require('express');
const app = express();
const estudiantesRoutes = require('./routes/estudiantesRoutes.js');


app.get('/',(req, res) => {
    res.send('Hola Mundo');
});

app.use("/estudiantes",estudiantesRoutes);


app.listen(3000,() => {
    console.log('Servidor activo');
});

