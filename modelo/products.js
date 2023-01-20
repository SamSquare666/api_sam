const mongoose = require ('mongoose');
const Shema = mongoose.Schema;

var ShemaProduct = Shema({
    name : String,
    description: String,
    price: Number
});
module.exports = mongoose.model('Product',ShemaProduct);