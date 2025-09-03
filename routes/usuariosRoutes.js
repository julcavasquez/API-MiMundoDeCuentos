const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');

router.get('/', controller.obtenerUsuarios);
router.get('/:id', controller.obtenerUsuarioPorId);
router.post("/", controller.NvoUsuario);
router.post("/login", controller.login);
module.exports = router;