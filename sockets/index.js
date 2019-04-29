let empleados = [];
const socketsUsuario = require('./socketsUsuario');

module.exports = (io) => {
  io.on('connection', (socket) => {
      // sockets del modelo usuarios
      socketsUsuario(io, socket);

      socket.on('login', (data) => {
        socket.empleado = data._id;
        empleados.push(socket);
        socket.emit('logged', 'usuario conectado al socket');
      });

      socket.on('add-sale', (data) => {
        io.emit('detected-add-sale', data);
      });

      socket.on('updated-permissions', (data) => {
        io.emit('detected-update-permissions', data);
      });

      socket.on('register-new-user', (data) => {
        io.emit('detected-register-new-user', data);
      });
  });
};
