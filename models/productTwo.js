const mongoose = require("mongoose")

const productTwoSchema = new mongoose.Schema({
    product_id_2: {
        type: Number,
        required: [true, 'Plese enter product description_2 ):']
    },
    product_name_2: {
        type: String,
        required: [true, 'Plese enter product name_2 ):']
    }, 
    product_description_2: {
        type: String,
        required: [true, 'Plese enter product description_2 ):']
    }
})

const productTwoUser = mongoose.model('productTwo', productTwoSchema);
module.exports = productTwoUser