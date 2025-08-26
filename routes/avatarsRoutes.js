const express = require('express');
const router = express.Router();
const avatarsController = require('../controllers/avatarsController');

// GET -> lista todos los avatares
router.get('/', avatarsController.getAvatars);

module.exports = router;