const express = require("express");
const router = express.Router()
const addProductController = require("../controller/addProductController")
const { validateUser } = require("../middleware/generateToken")

router.route("/addProductOne").post(validateUser, addProductController.addProductOne)
router.route("/addProductTwo").post(validateUser, addProductController.addProductTwo)
router.route("/productOneAndTwo").get(validateUser, addProductController.productOneAndProductTwoData)
module.exports = router;