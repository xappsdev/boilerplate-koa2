let serviceCommon = function(model) {
    let _model = model;

    const find = async (_params) => {
        return await _model.find(_params)
    }
    const findById = async (_id) => {
        return await _model.findById(_id)
    }
    const save = async (_params) => {
        let saved = new _model(_params)
        return await saved.save()
    }
    const update = async (_id, _params) => {
        return await _model.update({ _id : _id }, { $set: _params })
    }
    const remove = async (_id) => {
        return await _model.remove({ _id: _id })
    }
    
    return { 
        find,
        findById,
        save,
        update,
        remove
    }
}

module.exports = serviceCommon
