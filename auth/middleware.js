const User = require('../user/model')
const { toData } = require('./jwt')

// authenticates user! 
function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  // if authorization:"Bearer <key>"
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    // try executes code, can define catch for errors
    try {
      // converts auth key to { userId: , iat: , exp: }
      const data = toData(auth[1])
      User
        .findByPk(data.userId)
        .then(user => {
          if (!user) return next('No such user exists')

          req.user = user
          // calls next piece of middleware
          next()
        })
        .catch(next)
    }
    catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  } else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
}

module.exports = auth