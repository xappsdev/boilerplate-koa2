const glob = require('glob')
const path = require('path')

const modelsPath = path.resolve('app/modules')

module.exports = (app) => {
    glob(`${modelsPath}/**/*.router.js`, { dot: true }, function (er, files) {
        files.forEach(function(route) {
            app.use(require(route).routes())
               .use(require(route).allowedMethods({
                    throw: true
                }))
        })
    })
    return app
}