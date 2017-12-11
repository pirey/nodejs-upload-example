var axios = window.axios
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
    handleAttachment: function (e) {
      var vm = this
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      var data = new window.FormData()
      data.append('attachment', files[0])

      request('/attachment', data)
        .then(res => {
          if (res.status !== 'OK') {
            window.alert('something went wrong')
          }
          vm.socket.emit('message', res.data.path + res.data.originalname, function () {
            vm.messages = vm.messages.concat(res.data.path + res.data.originalname)
            e.target.value = ''
            vm.message = ''
          })
        })
    },
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

function request (url, data) {
  return axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data; boundary=xxx'
    },
    data: data
  }).then(res => res.data)
}
