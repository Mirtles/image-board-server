const Router = require('express')
const Image = require('./model')

const router = new Router()

router.get('/image', (req, res, next) => {
  Image.findAll()
    .then(images => {
      console.table(images)
      res.send(images)
    })
    .catch(err => next(err))
})

router.post('/image', (req, res, next) => {
  Image.create(req.body)
    .then(image => {
      console.table(image)
      res.send(image)
    })
    .catch(err => next(err))
})

module.exports = router