const productOneUser = require("../models/productOne")
const productTwoUser = require("../models/productTwo")

module.exports.addProductOne = async (req, res) => {
    const userData = req.body;
    const user = new productOneUser(userData);
    await user.save()
    res.status(201).json({
        status: "success",
        data: {
            userData
        }
    })
}

module.exports.addProductTwo = async (req, res) => {
    const userData = req.body;
    const user = new productTwoUser(userData);
    await user.save()
    res.status(201).json({
        status: "success",
        data: {
            userData
        }
    })
}
module.exports.productOneAndProductTwoData = async (req, res) => {
    const {product_one_id, product_two_id} = req.query;
    // const allData = await productOneUser.aggregate.lookup({
    //     from: "productTwoUser", 
    //     as: "productTwoUsers"
    //   });
      const allData  =  await productOneUser.aggregate([
        {
             $unionWith: { coll: "producttwos", pipeline: [ ]} 
        }
     ])
      console.log("allData",allData)
    // const userData = req.body;
    // const user = new productTwoUser(userData);
    // await user.save()
    res.status(201).json({
        status: "success",
        length: allData.length,
        data: {
            allData
        }
    })
}

