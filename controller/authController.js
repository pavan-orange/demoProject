const { generateToken } = require("../middleware/generateToken");
const bcrypt = require("bcrypt")
const AuthUser = require("../models/authModel");

module.exports.userSignUp = async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ status: "fail", message: "Passwords do not match" });
    }
    const encryptPass = await bcrypt.hash(req.body.password, 10)
    const user = new AuthUser({ name: req.body.name, email: req.body.email, password: encryptPass })
    const token = generateToken({ id: user._id, name: user.name });
    user.token = token;
    await user.save();
    res.status(201).json({
        status: "success",
        token: token,
        message: "OMG Successfully you are registerd! Now login and access app resource",
        data: {
            user
        }
    })
}

module.exports.userLogin = async (req, res, next) => {
    //1. get req.body
    const userData = req.body;
    const user = await AuthUser.findOne({ email: userData.email });
    if (!user) {
        return res.status(401).json({
            status: "fail",
            message: "User Email or Password incorrect"
        })
    }
    // validate password
    const decryptPass = await bcrypt.compare(userData.password, user.password);
    console.log("decryptPass", decryptPass)
    if (!decryptPass) {
        return res.status(401).json({
            status: "fail",
            message: "Password or Email incorrect"
        })
    }
    const token = generateToken({ id: user._id, name: user.name });
    const users = {
        name: "Ritik",
        Age: "18"
    };
    
        
    res.cookie("userData", JSON.stringify(users),{
        httpOnly: false,
        secure: false,
        sameSite: "None"});
    res.status(201).json({
        status: "success",
        message: " Successfully login in the app",
        token: token,
        data: {
            user
        }
    })
}

module.exports.updatePassword = async (req, res) => {

}    