const express = require("express");
const router = express.Router()
const authController = require("../controller/authController")
const { validateUser } = require("../middleware/generateToken")

router.route("/signup").post( authController.userSignUp)
router.route("/login").post( authController.userLogin)
router.route("/updatePassword").post( validateUser, authController.updatePassword)


module.exports = router;