const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require("body-parser");
const usuarioRouters = require('./routes/usuarioRouters');
const profesorRouters = require('./routes/profesorRouters');
//const pedidosRoutes = require('./routes/orderRoutes');
//const favoritosRoutes = require('./routes/favoritesRoutes');
global.nombreusuario = "-";
global.idprofesor = "-";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/usuario', usuarioRouters);
app.use('/api/profesor', profesorRouters);
//app.use('/api/pedidos', pedidosRoutes);
//app.use('/api/favoritos', favoritosRoutes);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = {app, server};