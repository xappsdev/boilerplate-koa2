// lib's
const body = require('koa-body')
const compress = require('koa-compress')
const compressible = require('compressible')
const convert = require('koa-convert')
const cors = require('koa-cors')
const corsError = require('koa-cors-error')
const error = require('koa-error')
const fs = require('fs')
const helmet = require('koa-helmet')
const http = require('http')
const http2 = require('http2')
const loggerMiddleware = require('koa-logger')

// constants
const jwt = require('./app/middlewares/jwt')
const logger = require('./app/helpers/logger')
const models = require('./app/models')
const routes = require('./app/routes')
const port = require('./app/config/api').port

// certificados
const certificates = {  
  key: fs.readFileSync('./cert/server.key'),
  cert:  fs.readFileSync('./cert/server.crt')
};

// init
const Koa = require('koa')
let app = new Koa()

app.use(body())
app.use(helmet())
app.use(loggerMiddleware())
app.use(convert(corsError))
app.use(convert(cors(
  {
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    headers: ['Content-Type', 'Authorization'],
  }
)))
app.use(compress({
  filter: function (content_type) {
  	return compressible(content_type)
  },
  threshold: 1024,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(error({
  engine: 'pug',
  template: __dirname + '/app/helpers/templates/error.pug'
}))

// models
models.init()

// routes
app.use(jwt)
app = routes(app)

// start
http.createServer(app.callback()).listen(port.http)
http2.createServer(certificates, app.callback()).listen(port.http2, () => {
    logger.log(`Server listening at https://localhost:${port.http2}/api/`)
})

module.exports = app