var io = require('socket.io')()

io.on('connection', function (socket) {
  console.log('new connection', socket.id)

  socket.on('message', function (data, fn) {
    socket.broadcast.emit('message', data)
    fn()
  })
})

module.exports = io
