const {pool} = require('../config/db');

const get_user_data = (username) => { 
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                done();
                return reject(err);
            }
            client.query("SELECT * FROM get_user_data($1)", [username], (err, data) => {
                done();
                if (err) {
                    return reject(err);
                }
                resolve(data.rows);
            });
        });
    });
}

module.exports = {
    get_user_data
};