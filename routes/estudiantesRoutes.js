const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: 'Consulta estudiantes'})
});

router.route("/:id")
    .get((req, res) => {
        res.json({msg: 'Consulta de un estudiante'})
    })
    .put((req, res) => {
        res.json({msg: 'Actualizacion de estudiantes'})
    })
    .delete((req, res) => {
        res.json({msg: 'Borrado de estudiantes'})
    });

router.post('/', (req, res) => {
    res.json({msg: 'Ingreso estudiantes'})
});



module.exports = router;