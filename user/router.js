
const Router = require('express')
const User = require('./model')
const bcrypt = require('bcryptjs')

router = new Router()

router.post('/signup', (req, res, next) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  console.table({ "New user": user })
  User
    .create(user)
    .then(user => {
      console.log(`User ${req.body.email}, ${req.body.password} registered.`)
      res.send(`Registered ${user.email}`)
    })
    .catch(err => {
      console.table({ error: err })
      console.error
    })
})

module.exports = router