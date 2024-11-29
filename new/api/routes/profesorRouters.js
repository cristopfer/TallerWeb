const express = require('express');
const profesorController = require('../controllers/profesorControllers');

const router = express.Router();

router.post('/actualizarCurso', profesorController.handleActualizarCurso);
router.post('/consultarCurso', profesorController.handleConsultarCurso);

module.exports = router;