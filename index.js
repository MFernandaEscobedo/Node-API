'use strict';

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const app = require('./app');
const config = require('./config');

const socket = require('socket.io');
const http = require('http');
const server = http.Server(app);

const io = socket(server);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('update-profile', (data) => {
      console.log('evento al actualizar el perfil')
      socket.emit('detected-update-profile', data);
    });

    socket.on('login', (data) => {
      console.log('login')
      socket.empleado = data._id;
    });

    socket.on('add-sale', (data) => {
      console.log('evento al realizar una venta')
      // debo saber cuales de mis empleados tienen la posibilidad de ver en tiempo real cuando alguien realizar una venta en una sucursal
      io.emit('detected-add-sale', data);
    });
});

mongoose.connect(config.db, {useNewUrlParser: true}, (error) => {
    if(error) {
        console.log('error al conectar a la base de datos', error);
    }
    console.log('conexion a la base de datos realizada correctamente');
    server.listen(config.port, (error) => {
        if(error) {
            console.log('error al iniciar el servidor web', error);
        }
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    })
});
