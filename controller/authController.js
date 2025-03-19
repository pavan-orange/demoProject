const { generateToken } = require("../middleware/generateToken");
const bcrypt = require("bcrypt")
const AuthUser = require("../models/authModel");

module.exports.userSignUp = async (req, res) => {
  console.log("req",req.body)
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
    const {email} = req.body;
    console.log(email)
}  
module.exports.requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await AuthUser.findOne({ email });
      if (!user) return res.status(404).json({ message: "User doesn't exist" });
      const secret = process.env.JWT + user.password;
      const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });
       const resetURL = `https://your-backend-url/resetpassword?id=${user._id}&token=${token}`;
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 't1129172@gmail.com',
          pass: 'password',
        },
      });
  
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }; 
  module.exports.resetPassword = async (req, res, next) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(400).json({ message: "User not exists!" });
      }
  
      const secret = process.env.JWT + user.password;
  
  
  
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
  
  
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };