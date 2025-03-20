const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController.js');


router.get('/', estudiantesController.consultar );

router.route("/:id")
    .get(estudiantesController.consultarDetalle)
    .put(estudiantesController.actualizar)
    .delete(estudiantesController.borrar);

router.post('/', estudiantesController.ingresar);



module.exports = router;