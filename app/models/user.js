module.exports = (mongoose) => {
    const AdministratorSchema = new mongoose.Schema({
        email: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        },
    })

    return mongoose.model('User', AdministratorSchema)
}