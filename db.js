const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL
  || 'postgres://postgres:secret@localhost:5432/postgres'

const db = new Sequelize(databaseUrl)

db.sync()
  .then(() => console.table({ "Connected to DB:": databaseUrl }))
  .catch(console.error)

module.exports = db