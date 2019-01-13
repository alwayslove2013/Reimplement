const express = require('express')
const app = express()

const api = require('./api')
const path = require('path')
api(app)
app.use(express.static(path.join(__dirname, '/dist')))

app.listen(1213)
