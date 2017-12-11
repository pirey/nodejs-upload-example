var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/profile', function (req, res, next) {
  res.render('profile')
})

router.post('/profile', upload.single('avatar'), function (req, res, next) {
  fs.rename(req.file.path, req.file.path + req.file.originalname, function (err) {
    if (err) {
      return res.json({ status: 'FAILED', data: err })
    }
    return res.json({ status: 'OK', data: req.file })
  })
})

module.exports = router
