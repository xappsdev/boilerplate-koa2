const jwt = require('jsonwebtoken');
const options = require('../../config/api').jwt

const token = async (ctx, next) => {
    let body = ctx.request.body
    let token = jwt.sign({ data: body }, options.public)
    
    ctx.body = { token }
    ctx.status = 200
}

module.exports =  {
    token: token
}