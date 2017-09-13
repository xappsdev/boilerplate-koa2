const glob = require('glob')
const path = require('path')

const modelsPath = path.resolve('app/models')

const instance = require('./config/instance')
const mongoose = instance.mongoose

let models = []
let init = async function() {
    let files = glob.sync(`${modelsPath}/*`, { dot: true })
    await files.forEach(function(model) {
        const fileName = modelName(model)
        models[fileName] = (require(model)(mongoose))
    })
}

let modelName = function(model) {
    let result = model.split('/')
    return result[result.length - 1].replace('.js', '')
}

module.exports = {
    models,
    init
}