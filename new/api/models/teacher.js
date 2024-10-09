const {pool} = require('../config/db');

const list_courses = (course) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM listar_cursos($1)", [course], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/teacher.js", "query_courses", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

const get_teacher_data = (teacher_id) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM consultar_profesor($1)", [teacher_id], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/teacher.js", "get_teacher_data", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

const rate_teacher = (teacher_id, rate) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM calificar_profesor($1,$2)", [teacher_id, rate], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/teacher.js", "query_courses", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

const update_teacher = (user_id, name, surname, email) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM actualizar_profesor($1,$2,$3,$4)", [user_id, name, surname, email], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/teacher.js", "update_teacher_data", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

const update_course = (teacher_id, course, description) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM actualizar_curso_profesor($1,$2,$3)", [teacher_id, course, description], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/teacher.js", "update_course_teacher", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

module.exports = {
    list_courses,
    get_teacher_data,
    rate_teacher,
    update_teacher,
    update_course
}