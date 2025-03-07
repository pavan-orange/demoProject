const fs = require('fs');
const blogData = require("../services/data")
const blogDataModel = require("../models/blogData")
const importBlogData = async () => {
    // const data = fs.readFileSync(blogDataModel, 'utf-8', (err)=>{
    //     return console.log("Error in reading the file!",err)
    // })
    // console.log("data",data)
    // services\data.js
    const data = JSON.parse(fs.readFileSync('services/data.json', 'utf-8'))
    // const user = new blogDataModel(blogData);
    // await user.save()
}
importBlogData()