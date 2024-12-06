const request = require('supertest');
const {app, server} = require('../app'); // Asegúrate de que este es el archivo correcto
const { pool } = require('../database/database'); // Asegúrate de que este es el archivo correcto

const api = request(app);

describe('Profesor API', () => {
    afterAll((done) => {
        server.close(() => {
            pool.end(() => {
                done();
            });
        });
    });

    it('should handle failed course update', async () => {
        const curso = { curso: 'random_course', descripcion: 'random_description' };
        const response = await api
            .post('/api/profesor/actualizarCurso')
            .send(curso)
            .expect(500)
            .expect('Content-Type', /application\/json/);
    });

});