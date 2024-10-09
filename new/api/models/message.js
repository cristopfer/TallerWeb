const {pool} = require('../config/db');

const insert_message = (user_id, teacher_id, message, type) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM ingresar_mensaje($1,$2,$3,$4)", [user_id, teacher_id, message, type], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/comment.js", "insert_message", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

const get_teacher_message = (user_id, teacher_id) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM consultar_mensaje_profesor($1,$2)", [teacher_id, user_id], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/comment.js", "get_teacher_message", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

const get_private_message = (teacher_id) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM consultar_mensaje_privado($1)", [teacher_id], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/comment.js", "get_private_message", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

module.exports = {
    insert_message,
    get_teacher_message,
    get_private_message
}