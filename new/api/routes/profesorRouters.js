const express = require('express');
const profesorController = require('../controllers/profesorControllers');

const router = express.Router();

router.post('/actualizarCurso', profesorController.handleActualizarCurso);
router.post('/consultarCurso', profesorController.handleConsultarCurso);
router.post('/comprarCurso', profesorController.handleComprarCurso);
router.post('/calificarCurso', profesorController.handleCalificarCurso);

module.exports = router;