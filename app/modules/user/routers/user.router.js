const Router = require('koa-router')
let router = new Router()

const baseUrl = 'user'
const prefix = require('../../../config/api').prefix

const controller = require(`../controllers/${baseUrl}.controller`)

router.prefix(`/${prefix}/${baseUrl}`)
router = new (require('../../../common/routerCommon'))(controller, router)

module.exports = router