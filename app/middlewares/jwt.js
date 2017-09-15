const convert = require('koa-convert')
const jwt = require('koa-jwt')
const options = require('../config/api').jwt

module.exports = convert(jwt({ secret: options.public }))
