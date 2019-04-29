module.exports = (io, socket) => {
  socket.on('update-profile', (data) => {
    socket.emit('detected-update-profile', data);
  });
}
