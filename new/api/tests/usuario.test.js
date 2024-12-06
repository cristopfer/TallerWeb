const request = require('supertest');
const { app, server } = require('../app'); // Asegúrate de que este es el archivo correcto
const { pool } = require('../database/database'); // Asegúrate de que este es el archivo correcto
const { faker } = require('@faker-js/faker');

const api = request(app);

describe('Usuario API', () => {

    afterAll((done) => {
        server.close(() => {
            pool.end(() => {
                done();
            });
        });
    });

    it('should handle failed user login', async () => {
        const usuario = { username: 'testuser', password: 'testpassword' };
        const response = await api
            .post('/api/usuario/ingresar')
            .send(usuario)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.estado).toBe(0); //estado 0 significa que el usuario no existe
    });

    it('should handle successful user login', async () => {
        const usuario = { username: 'admin', password: '123' };
        const response = await api
            .post('/api/usuario/ingresar')
            .send(usuario)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.estado).toBe(1); //estado 1 significa que el usuario existe
    });

    it('should handle succesful user registration', async () => {
        const register_user = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
            name: faker.name.firstName(),
            lastname: faker.name.lastName(),
            mail: faker.internet.email(),
            tipo: faker.helpers.arrayElement(['1', '2']),
            codigo: faker.string.alphanumeric(10)
        }
        const response = await api
            .post('/api/usuario/registrar')
            .send(register_user)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.estado).toBe(0); //estado 0 significa que el usuario recien se ha registrado
    });

    it('should handle failed user registration', async () => {
        const register_user = {
            username: 'admin',
            password: 'adm',
            name: 'admin',
            lastname: 'adm',
            mail: 'adm1@gmail.com',
            tipo: '2',
            codigo: 'admin'
        }
        const response = await api
            .post('/api/usuario/registrar')
            .send(register_user)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.estado).toBe(1); //estado 1 significa que el usuario ya existe
    });

    it('should handle user data retrieval', async () => {

        const user = { nomusu: 'admin' };

        const response = await api
            .post('/api/usuario/logueo')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});