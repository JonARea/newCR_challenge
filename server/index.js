const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '2mb'}))
app.use('/api', routes)
app.use(express.static(path.join(__dirname, '..', 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
app.listen(8080, () => console.log('Listening on Port 8080'))

module.exports = app
