const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teacher_controller')

router.post('/listadoCursosProfesor', teacherController.list_courses)
router.post('/consultarProfesor', teacherController.get_teacher)
router.post('/obtenerIdProfesor', (req, res) => {
    idpro = req.body.idprofesor;
    res.send(JSON.stringify({ estado: 0}));
})
router.post('/calificar', teacherController.rate_teacher)
router.post('/actualizarDatosProfesor', teacherController.update_teacher)
router.post('/actualizarCurso', teacherController.update_course)

module.exports = router