const express = require("express");
const multer = require("multer");
const path = require('path');
const router = express.Router();
const userController = require("../controller/userController")
const { validateUser } = require("../middleware/generateToken")
const upload = require("../middleware/multer")
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage });

// controller level middleware & also called protect their route
router.route("/viewBlog").get(validateUser, userController.viewUserBlog);
router.route("/search-blog").get(validateUser, userController.searchBlog);
router.route("/blogPage").get(userController.getBlogDataPage);
router.route("/addBlog").post(validateUser, userController.addBlog);
router.route("/photos/upload").post(upload.single('avatar'), userController.addCertificate);
router.route("/vedio/upload").post(upload.single("blogVedio"), userController.addBlogVideo);
router.route("/deleteBlog/:id").delete(validateUser, userController.deleteBlogData);
router.route("/updateBlog/:id").patch(validateUser, userController.updateBlogData);

module.exports = router; 