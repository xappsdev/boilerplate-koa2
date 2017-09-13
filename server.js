// lib's
const http = require('http')
const body = require('koa-body')
const compress = require('koa-compress')
const convert = require('koa-convert')
const cors = require('koa-cors')
const corsError = require('koa-cors-error')
const helmet = require('koa-helmet')
const loggerMiddleware = require('koa-logger')
const mount = require('koa-mount')

// constants
const port = require('./app/config/api').port
const logger = require('./app/helpers/logger')
const models = require('./app/models')
const routes = require('./app/routes')

// init
const Koa = require('koa')
let app = new Koa()

// config koa
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

// models and routes
models.init()
app = routes(app)

// start
http.createServer(app.callback()).listen(port, () => {
    logger.log(`Server listening at http://localhost:${port}/api/`)
})