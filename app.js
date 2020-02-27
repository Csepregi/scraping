const express = require('express')
const app = express()
const cors = require('cors')
const articlesRouter = require('./controllers/articles')
app.use(cors())

app.use(express.static('build'))
app.use('/api/articles', articlesRouter)

module.exports = app