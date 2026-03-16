const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const errorHandler = require('./middlewares/errorHandler')
const swaggerSpec = require('./swagger')

const app = express()

app.use(bodyparser.json())
app.use(cors())

app.use('/users', require('./routes/users'))
app.use('/categories', require('./routes/categories'))
app.use('/listings', require('./routes/listings'))
app.use('/listing_images', require('./routes/listing_images'))
app.use('/conversations', require('./routes/conversations'))
app.use('/messages', require('./routes/messages'))
app.use('/saved_listings', require('./routes/saved_listings'))
app.use('/images', express.static('uploads'))

app.get('/api-docs/spec', (req, res) => res.json(swaggerSpec))
app.get('/api-docs', (req, res) => res.sendFile(path.join(__dirname, 'swagger-ui.html')))

app.use(errorHandler)

module.exports = app