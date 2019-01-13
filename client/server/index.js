const express = require('express')
const app = express()

const api = require('./api')
api(app)

// const path = require('path')
// app.use(express.static(path.join(__dirname, '/dist')))

app.listen(1213)
