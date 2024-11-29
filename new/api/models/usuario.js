const { pool } = require('../database/database.js');

function IngresarSistemaUsuario(usuario, callback){
	pool.connect((err, client, done) => {
        if (err) {
            done();
            return callback(err, null); 
        }
        client.query("SELECT * FROM ingresar_sistema($1, $2)", [usuario.username, usuario.password],(err, data) => {
                done(); 
                if (err) {
                    return callback(err, null);
                }
                return callback(null, data);
            }
        );
    });   
}

function RegistrarUsuario(usuario, callback){
	pool.connect((err, client, done) => {
        if (err) {
            done();
            return callback(err, null); 
        }
        client.query("SELECT * FROM registrar_usuario($1,$2,$3,$4,$5,$6,$7)", [usuario.name,usuario.lastname,usuario.username,usuario.mail,usuario.password,parseInt(usuario.tipo),usuario.codigo],(err, data) => {
                done(); 
                if (err) {
                    return callback(err, null);
                }
                return callback(null, data);
            }
        );
    });   
}

function DatosUsuario(nomusu, callback){
	pool.connect((err, client, done) => {
        if (err) {
            done();
            return callback(err, null); 
        }
        client.query("SELECT * FROM consultar_datos_usuario($1)", [nomusu],(err, data) => {
                done(); 
                if (err) {
                    return callback(err, null);
                }
                return callback(null, data);
            }
        );
    });   
}

module.exports = {
    IngresarSistemaUsuario,RegistrarUsuario,DatosUsuario
};