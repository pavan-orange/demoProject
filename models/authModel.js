const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})
const AuthUser = mongoose.model('authUser', authSchema)
module.exports = AuthUser;