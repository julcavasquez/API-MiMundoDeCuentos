const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');
const authMiddleware = require("../middleware/authMiddleware");


router.get('/list-tiposdoc', controller.getTiposDocumentos);
router.get('/list-usuarios', controller.obtenerUsuarios);
router.patch('/:id/update-estado', controller.actualizarEstadoUsuario);
router.patch('/:id/eliminar', controller.eliminarUsuario);
router.post("/register", controller.NvoUsuario);
router.post("/login", controller.login);
// Endpoint protegido → requiere token
router.get("/:id", authMiddleware, controller.getUsuPerfil);
module.exports = router;