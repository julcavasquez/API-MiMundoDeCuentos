const express = require('express');
const router = express.Router();
const controller = require('../controllers/rolesController');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/', controller.obtenerRoles);
// router.get('/:id', controller.obtenerUsuarioPorId);
// router.post("/", controller.NvoUsuario);
// router.post("/login", controller.login);
// Endpoint protegido → requiere token
// router.get("/:id", authMiddleware, controller.getUsuPerfil);
module.exports = router;