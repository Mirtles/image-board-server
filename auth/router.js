const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const User = require('../user/model')
const bcrypt = require('bcryptjs')

const router = new Router()

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  console.log("login request made:", req.body)

  if (!email || !password) {
    res.status(400).send({
      message: 'Please enter a valid email and password'
    })
  } else {
    // 1. find user based on email address
    User
      .findOne({
        where: { email: email }
      })
      .then(foundUser => {
        if (!foundUser) {
          return res.status(400).send({
            message: 'That user does not exist'
          })
        }
        // 2. use bcrypt.compareSync to check the password against the stored has
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({ jwt: toJWT({ userId: foundUser.id }), user: foundUser.email })
        } else {
          res.status(400).send({
            message: 'Incorrect password'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: "Oops.. something went wrong!"
        })
      })
  }
})

router.get('/secret-endpoint', (req, res) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      res.send({
        message: 'Welcome to the secret endpoint.',
        data
      })
    }
    catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})

module.exports = router