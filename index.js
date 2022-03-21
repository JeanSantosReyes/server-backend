const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const path = require('path');
require('dotenv').config();

// Crear servidor aplicacion de express
const app = express();

//Conexion a BD
dbConnection();

// Directorio publico - Acceso denegado en navegador
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', require('./routes/persona.routes'));

// Solucion a rutas de angular | manejo de demas rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Puerto para levantar la aplicacion
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
