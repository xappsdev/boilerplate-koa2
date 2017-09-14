const jwt = require('koa-jwt')

module.exports = jwt({ secret: 'secret-key', algorithm: 'RS256' })
