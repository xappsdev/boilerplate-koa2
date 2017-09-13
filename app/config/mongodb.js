module.exports = () => {
    const dbInstance = 'Teste_local'
    const ip = 'localhost'
    const port = 27017
    const url = process.env.MONGO_HOST || `mongodb://${ip}:${port}/${dbInstance}`
    const connection = {
        url,
        port
    }
    const options = {
        useMongoClient: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
    }
    return {
        connection,
        options
    }
}
