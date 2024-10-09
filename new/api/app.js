global.nombreusuario = "-";
global.idpro = "-";
global.idusu = '-';
global.idproLogueado = '-';

const express = require('express')
const app = express()
const applyMiddlewares = require('./middlewares/middlewares')
const user_router = require('./api/routers/user_router');
const teacher_router = require('./api/routers/teacher_router');
const comment_router = require('./api/routers/comment_router');
const message_router = require('./api/routers/message_router');
const payment_router = require('./api/routers/payment_router');

const port = process.env.PORT || 3000

applyMiddlewares(app)

app.use('/api/usuario', user_router);
app.use('/api/profesor', teacher_router);
app.use('/api/comentario', comment_router);
app.use('/api/mensaje', message_router);
app.use('/api/pago', payment_router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})