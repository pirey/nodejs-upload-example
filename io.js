var io = require('socket.io')()

io.on('connection', function (socket) {
  socket.on('attachment', function (data) {
    console.log('attachment comes in...')
  })
})

module.exports = io
