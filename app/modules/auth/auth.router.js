const Router = require('koa-router')
const prefix = require('../../config/api').prefix

const baseUrl = 'auth'
const controller = require(`./${baseUrl}.controller`)

const createRoutes = (jwt) => {
    let router = new Router()

    router.prefix(`/${prefix}/${baseUrl}`)
    router.post('/', async (ctx, next) => controller.token(ctx, next))    
    
    return router
}

module.exports = (jwt) => createRoutes(jwt)