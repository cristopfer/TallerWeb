const {pool} = require('../config/db');

const insert_comment = (user_id, teacher_id, comment) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM ingresar_comentario($1,$2,$3)", [user_id, teacher_id, comment], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/comment.js", "insert_comment", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

const get_teacher_comments_list = (teacher_id) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM consultar_comentarios_profesor($1)", [teacher_id], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/comment.js", "get_teacher_comments_list", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

module.exports = {
    insert_comment,
    get_teacher_comments_list
};