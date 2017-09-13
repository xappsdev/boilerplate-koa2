let routerCommon = function(controller, router) {
    router.del('/:id', async (ctx, next) => controller.remove(ctx, next))
    router.get('/:id', async (ctx, next) => controller.findById(ctx, next))
    router.patch('/:id', async (ctx, next) => controller.update(ctx, next))
    router.post('/', async (ctx, next) => controller.find(ctx, next))
    router.post('/create', async (ctx, next) => controller.save(ctx, next))
    return router
}

module.exports = routerCommon
