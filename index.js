const express = require('express')
const db = require('./db')

const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => { console.table({ "Done it": `server is up and listening on port ${port}` }) })