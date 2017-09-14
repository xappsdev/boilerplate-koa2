module.exports = (mongoose) => {
    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true
        },
    })

    return mongoose.model('User', UserSchema)
}