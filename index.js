const express = require('express')
const db = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4000

// middleware:
const corsMiddleware = cors()
const parserMiddleware = bodyParser.json()
const imageRouter = require('./image/router')
const authRouter = require('./auth/router')
const userRouter = require('./user/router')

app.use(corsMiddleware, parserMiddleware, imageRouter, authRouter, userRouter)

app.listen(port, () => { console.table({ "Done it": `server is up and listening on port ${port}` }) })