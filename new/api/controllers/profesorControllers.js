const { Actualizar_Curso, Consultar_Curso, Comprar_Curso, CalificarProfesor} = require('../models/profesor');

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

function handleComprarCurso(req, res) {

    Comprar_Curso((err, respuesta) => {
        if (err) {
            console.error("Error al registrar al usuario:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        const resultado = respuesta.rows[0].comprar_curso;
        return res.status(200).json({ estado: resultado });
    });
}

function handleCalificarCurso(req, res) {
    const { idpro, valor} = req.body; 

    CalificarProfesor({ idpro, valor},(err, respuesta) => {
        if (err) {
            console.error("Error al registrar al usuario:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        const resultado = respuesta.rows[0].comprar_curso;
        return res.status(200).json({ estado: resultado });
    });
}

module.exports = { handleActualizarCurso, handleConsultarCurso, handleComprarCurso, handleCalificarCurso};