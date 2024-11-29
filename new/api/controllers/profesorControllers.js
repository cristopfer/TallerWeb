const { Actualizar_Curso, Consultar_Curso} = require('../models/profesor');

function handleActualizarCurso(req, res) {
    const { curso, descripcion} = req.body; 

    Actualizar_Curso({ curso, descripcion}, (err, respuesta) => {
        if (err) {
            console.error("Error al registrar al usuario:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        const resultado = respuesta.rows[0].actualizar_curso_profesor;
        return res.status(200).json({ estado: resultado });
    });
}

function handleConsultarCurso(req, res) {

    Consultar_Curso((err, respuesta) => {
        if (err) {
            console.error("Error al registrar al usuario:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        const filas = respuesta.rows;
        return res.status(200).json(filas);
    });
}

module.exports = { handleActualizarCurso, handleConsultarCurso};