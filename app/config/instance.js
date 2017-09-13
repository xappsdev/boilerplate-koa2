const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const mongodb = require('./mongodb')()
const instance = mongoose.connect(mongodb.connection.url, mongodb.options)
mongoose.connection.on('error', console.error)

module.exports = {
    instance,
    mongoose
}