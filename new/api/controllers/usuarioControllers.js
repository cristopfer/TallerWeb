const { IngresarSistemaUsuario, RegistrarUsuario, DatosUsuario } = require('../models/usuario');

function handleIngresarSistemaUsuario(req, res) {
    const { username, password } = req.body; 
    global.nombreusuario = username;

    IngresarSistemaUsuario({ username, password }, (err, respuesta) => {
        if (err) {
            console.error("Error al ingresar al sistema:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        const resultado = respuesta.rows[0].ingresar_sistema;
        return res.status(200).json({ estado: resultado });
    });
}

function handleRegistrarUsuario(req, res) {
    const { username, password, name, lastname, mail, tipo, codigo } = req.body; 

    RegistrarUsuario({ username, password, name, lastname, mail, tipo, codigo  }, (err, respuesta) => {
        if (err) {
            console.error("Error al registrar al usuario:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        const resultado = respuesta.rows[0].registrar_usuario;
        return res.status(200).json({ estado: resultado });
    });
}

function handleDatosUsuario(req, res) {
    DatosUsuario(global.nombreusuario, (err, respuesta) => {
        if (err) {
            console.error("Error al registrar al usuario:", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        const fila = respuesta.rows[0];
        global.idprofesor = fila.idpro;
        global.idusuario = fila.idusu;
        
        return res.status(200).json(fila);
    });
}

module.exports = { handleIngresarSistemaUsuario, handleRegistrarUsuario,handleDatosUsuario};