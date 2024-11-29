const express = require('express');
const usuarioController = require('../controllers/usuarioControllers');

const router = express.Router();

router.post('/ingresar', usuarioController.handleIngresarSistemaUsuario);
router.post('/registrar', usuarioController.handleRegistrarUsuario);
router.post('/logueo', usuarioController.handleDatosUsuario);

module.exports = router;