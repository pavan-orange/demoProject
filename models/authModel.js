const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: String,
})

//Encrypting password before saving user
// userSchema.pre('save',async function(next){
//     if(!this.isModified('password')){
//         next()
//     }
//     this.password = await bcrypt.hash(this.password, 10)
// })

//Compare user password
// userSchema.methods.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password)
// }

//Return JWT token
// userSchema.methods.getJwtToken = function(){
//     return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
//         expiresIn: process.env.JWT_EXPIRES_TIME
//     })
// }
// Generate password reset token

// userSchema.methods.getResetPasswordToken = function(){
//     //Generate token
//     // const resetToken = crypto.randomBytes(20).toString('hex');
//     //Hash and set to resetPasswordToken
//     // this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
//     //Set token expire time
//     // this.resetpasswordExpire = Date.now() + 30 * 60 * 1000
//     // return resetToken
// }
const AuthUser = mongoose.model('authUser', authSchema)
module.exports = AuthUser;