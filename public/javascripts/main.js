// var axios = window.axios
var io = window.io
var Vue = window.Vue

var app = new Vue({ // eslint-disable-line
  el: '#app',
  mounted: function () {
    this.socket = io()
    this.registerSocketHandlers()
  },
  data: {
    message: '',
    messages: []
  },
  methods: {
    registerSocketHandlers: function () {
      var vm = this
      var socket = vm.socket
      socket.on('message', function (msg) {
        vm.messages = vm.messages.concat(msg)
      })
    },
    submitForm: function (e) {
      e.preventDefault()

      var vm = this
      vm.socket.emit('message', vm.message, function () {
        vm.messages = vm.messages.concat(vm.message)
        vm.message = ''
      })
    }
  }
})

/* function request (url, data) {
  return axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
} */
