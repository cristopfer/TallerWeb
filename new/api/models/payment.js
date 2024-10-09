const {pool} = require('../config/db');

const pay_teacher = (user_id, teacher_id, payment_card, email) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM pagar_profesor($1,$2,$3,$4)", [user_id, teacher_id, payment_card, email], (err, data) => {
                done();
                if (err) {
                    LogModel.ErrorLog("models/payment.js", "pay_teacher", err.message);
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

module.exports = {
    pay_teacher
};