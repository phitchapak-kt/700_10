const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const errorHandler = require('./middlewares/errorHandler')
const swaggerSpec = require('./swagger')

const app = express()

app.use(bodyparser.json())
app.use(cors())