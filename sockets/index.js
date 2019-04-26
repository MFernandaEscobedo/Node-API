let empleados = [];
module.exports = (io) => {
  io.on('connection', (socket) => {
      console.log('user connected');

      socket.on('update-profile', (data) => {
        console.log('profile')
        socket.emit('detected-update-profile', data);
      });

      socket.on('login', (data) => {
        socket.empleado = data._id;
        empleados.push(socket);
        socket.emit('logged', 'usuario conectado al socket');
      });

      socket.on('add-sale', (data) => {
        // let admin = data.admin;
        // for(let i = 0; i < empleados.length; i++) {
        //   console.log('numero ' + i);
        //   if(empleados[i].empleado === admin) {
        //     console.log('se encontro al jefote')
        //     empleados[i].emit('detected-add-sale', data);
        //   }
        // }
        io.emit('detected-add-sale', data);
      });
  });
};
