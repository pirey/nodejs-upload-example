var form = document.querySelector('#profile')
var { axios, FormData } = window

form.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log(e)
  request('/profile', new FormData(form))
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
