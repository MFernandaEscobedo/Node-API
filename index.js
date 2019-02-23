'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, {useNewUrlParser: true}, (error) => {
    if(error) {
        console.log('error al conectar a la base de datos', error);
    }
    console.log('conexion a la base de datos realizada correctamente');
    app.listen(config.port, (error) => {
        if(error) {
            console.log('error al iniciar el servidor web', error);
        }
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    })
});