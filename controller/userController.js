const User = require("../models/userModel")
const blogDataModel = require("../models/blogData")
const path = require("path");
// const fs = require("fs")
// const express = require("express")
// const app = express()
// app.use(express.static('views')) 

module.exports.viewUserBlog = async (req, res) => {
    // step to add pagination (with onj destructuring)
    // 1. get page_no and page_size
    const { pageNo, size, sortVal, blog_id } = req.query;
    var query;
    if (sortVal !== undefined && (sortVal.toLowerCase() !== 'asc' || sortVal.toLowerCase() !== 'dsc')) {
        return res.status(400).json({
            status: "fail",
            message: "You can only sort in form of asc or dsc"
        })
    }
    if (blog_id && blog_id !== undefined && blog_id.length > 0) {
        query = blogDataModel.find({ _id: blog_id })
    }
    //2. then implement logic to skip()
    if (blog_id === undefined) {
        query = blogDataModel.find()
            .skip(pageNo > 0 ? ((pageNo - 1) * size) : 0)
            .limit(size);
    }
    //3. apply sorting
    if (sortVal) {
        query.sort({ rating: sortVal.toLowerCase() === 'asc' ? 1 : -1 });
    }
    //4. return response
    const users = await query
    // const allUsers = await blogDataModel.find();
    res.status(201).json({
        status: 'success',
        totalBlogs: users.length,
        data: {
            users
        }
    })
}
module.exports.addBlog = async (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    await user.save()
    res.status(201).json({
        status: "success",
        data: {
            userData
        }
    })
}
module.exports.updateBlogData = async (req, res) => {
    const id = req.params.id
    if (!req.body.title || !req.body.content) {
        return res.status(401).json({
            status: "fails",
            message: "Please Enter Title or Content"
        })
    }
    if (req.body.authorName) {
        return res.status(401).json({
            status: "fails",
            message: "You cannot update authorName, Soooooooooooory!"
        })
    }
    const user = await User.findByIdAndUpdate(id, { title: req.body.title, content: req.body.content }, { new: true })
    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    })
}
module.exports.deleteBlogData = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id)
    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    })
}
module.exports.searchBlog = async (req, res) => {
    // 1. get data from query string
    try {
        const { rating } = req.query;
        console.log("rating", rating)
        const result = await blogDataModel.find({ rating: rating });
        if (!rating) {
            return res.status(400).json({
                status: 'success',
                message: "No result found"
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Record has been founded!",
            data: {
                result
            }
        });
    } catch (err) {
        return res.status(400).json({ status: "fail", message: "something is error to find", error: err });
    }
    //2.apply searching techniquie
    //return response 
}
exports.getBlogDataPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/blogData.html"));
};


