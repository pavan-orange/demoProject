const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { validateUser } = require("../middleware/generateToken");
router.route("/signup").post(authController.userSignUp);
router.route("/login").post(authController.userLogin);
router.route("/updatePassword").post(validateUser, authController.updatePassword);
// Route to request password reset
router.post('/requestPasswordReset', authController.requestPasswordReset);
// Route to reset password
router.post('/resetPassword', authController.resetPassword);
module.exports = router;   