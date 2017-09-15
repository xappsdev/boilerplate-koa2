const error = require('koa-error')

module.exports =
    error({
        engine: 'pug',
        template: __dirname + '/app/helpers/templates/error.pug'
    })