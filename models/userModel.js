const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
const User = mongoose.model("User", userSchema);
module.exports = User; 
