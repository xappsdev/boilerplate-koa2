// lib's
const body = require('koa-body')
const error = require('koa-error')
const fs = require('fs')
const helmet = require('koa-helmet')
const http = require('http')
const http2 = require('http2')
const loggerMiddleware = require('koa-logger')

// constants
const jwt = require('./app/middlewares/jwt')
const compress = require('./app/middlewares/compress')
const cors = require('./app/middlewares/cors')

const logger = require('./app/helpers/logger')
const models = require('./app/models')
const routes = require('./app/routes')
const port = require('./app/config/api').port

// certificados
const certificates = {
  key: fs.readFileSync('./cert/server.key'),
  cert:  fs.readFileSync('./cert/server.crt')
}

// init
const Koa = require('koa')
let app = new Koa()

// middlewares
app.use(body())
app.use(helmet())
app.use(loggerMiddleware())
app.use(cors.corsError)
app.use(cors.cors)
app.use(compress)
app.use(error({
  engine: 'pug',
  template: __dirname + '/app/helpers/templates/error.pug'
}))

// models and routes
models.init()
routes(app, jwt)

// start
http.createServer(app.callback()).listen(port.http, () => {
  logger.log(`Server listening at http://localhost:${port.http}/api/`)
})
// http2.createServer(certificates, app.callback()).listen(port.http2, () => {
//   logger.log(`Server listening at https://localhost:${port.http2}/api/`)
// })

module.exports = app