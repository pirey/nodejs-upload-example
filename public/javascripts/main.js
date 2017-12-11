var { axios, FormData, io, Vue } = window

var app = new Vue({ // eslint-disable-line
  el: '#app',
  mounted: function () {
    this.socket = io()
  },
  data: {
  },
  methods: {
    submitForm: function (e) {
      console.log(e)
      e.preventDefault()
      var form = e.target
      request('/profile', new FormData(form))
        .then(res => form.reset())
    }
  }
})

function request (url, data) {
  return axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}
