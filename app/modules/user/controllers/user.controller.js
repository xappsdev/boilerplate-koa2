const administrator = require('../../../models').models.administrator

const factory = new (require('../../../common/controllerCommon'))(administrator)
const service = require('../services/user.service')

module.exports =  {
    find: factory.find,
    findById: factory.findById,
    save: factory.save,
    update: factory.update,
    remove: factory.remove
}