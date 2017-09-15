const glob = require('glob')
const path = require('path')

const modulesPath = path.resolve('app/modules')

const createRoutes = (app, jwt) => {
    glob(`${modulesPath}/**/*.router.js`, { dot: true }, function (er, files) {
        files.forEach(function(file) {
            const route = require(file)(jwt)
            app.use(route.routes())
               .use(route.allowedMethods({
                    throw: true
                }))
        })
    })
}

module.exports = (app, jwt) => createRoutes(app, jwt)