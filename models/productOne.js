const mongoose = require("mongoose")

const productOneSchema = new mongoose.Schema({
    product_id_1: {
        type: Number,
        required: [true, 'Plese enter product id_1 ):']
    },
    product_name_1: {
        type: String,
        required: [true, 'Plese enter product name_1 ):']
    }, 
    product_description_1: {
        type: String,
        required: [true, 'Plese enter product description_1 ):']
    }
})

const productOneUser = mongoose.model('productOne', productOneSchema);
module.exports = productOneUser