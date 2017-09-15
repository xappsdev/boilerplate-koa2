const compress = require('koa-compress')
const compressible = require('compressible')

module.exports =
    compress({
        filter: function (content_type) {
            return compressible(content_type)
        },
        threshold: 1024,
        flush: require('zlib').Z_SYNC_FLUSH
    })