const user = require('../../models').models.user

const factory = new (require('../../common/controllerCommon'))(user)
const service = require('./user.service')

module.exports =  {
    find: factory.find,
    findById: factory.findById,
    save: factory.save,
    update: factory.update,
    remove: factory.remove
}