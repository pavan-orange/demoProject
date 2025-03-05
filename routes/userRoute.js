const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const { validateUser } = require("../middleware/generateToken")

// controller level middleware & also called protect their route
router.route("/viewBlog").get(validateUser, userController.viewUserBlog);
router.route("/search-blog").get(validateUser, userController.searchBlog)
router.route("/blogPage").get(userController.getBlogDataPage);
router.route("/addBlog").post( validateUser, userController.addBlog)
router.route("/deleteBlog/:id").delete(validateUser, userController.deleteBlogData)
router.route("/updateBlog/:id").patch(validateUser, userController.updateBlogData)

module.exports = router; 