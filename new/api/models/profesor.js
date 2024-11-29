const { pool } = require('../database/database.js');

function Actualizar_Curso(usuario, callback){
	pool.connect((err, client, done) => {
        if (err) {
            done();
            return callback(err, null); 
        }
        client.query("SELECT * FROM actualizar_curso_profesor($1,$2,$3)", [global.idprofesor,usuario.curso,usuario.descripcion],(err, data) => {
                done(); 
                if (err) {
                    return callback(err, null);
                }
                return callback(null, data);
            }
        );
    });   
}

function Consultar_Curso(callback){
	pool.connect((err, client, done) => {
        if (err) {
            done();
            return callback(err, null); 
        }
        client.query("SELECT * FROM consultar_cursos()", (err, data) => {
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
    Actualizar_Curso, Consultar_Curso
};