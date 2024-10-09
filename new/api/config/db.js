const {Pool} = require('pg-pool')

var config = {
    user: 'pgscse_user',
    database: 'pgscse',
    password: 'vkP0DchOI6a50Se6UrWd67jf7h9MggjP',
    host: 'dpg-cibnjjh5rnuk9q9sfqdg-a.oregon-postgres.render.com',
    port: 5432,
    ssl: true
};

var pool = new Pool(config);

module.exports = {
    pool
}