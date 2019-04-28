module.exports = (io, socket) => {
  socket.on('update-profile', (data) => {
    console.log('profile')
    socket.emit('detected-update-profile', data);
  });
}
