const mongoose = require("mongoose");
const blogDataSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    rating: {
        type: Number
    },
    title: {
        type: String
    },
    companyName: {
        type: String
    },
    content: {
        type: String
    }
})
const blogDataModel = mongoose.model('blogData',blogDataSchema);
module.exports = blogDataModel;