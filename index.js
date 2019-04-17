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
      console.log(data);
      io.emit('detected-update-profile', data);
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
