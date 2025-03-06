const mongoose = require("mongoose");

const blogVideoSchema = new mongoose.Schema({
    videoURL: {
        type: String,
        title: String
    },
    cretedAt:{
        type: Date,
        default: Date.now()
    }
})
const blogVideoSchemaUser = mongoose.model('blogVideo',blogVideoSchema);
module.exports = blogVideoSchemaUser;