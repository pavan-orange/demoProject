const mongoose = require("mongoose");
const certificateSchema = new mongoose.Schema({
    certificatePictureURL: {
        type: String
    },
    videoURL: {
        type: String,
        title: String
    },
    cretedAt: {
        type: Date,
        default: Date.now()
    }
})
const CertificateUser = mongoose.model('CertificateUser', certificateSchema);
module.exports = CertificateUser;