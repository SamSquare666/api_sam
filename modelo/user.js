var mongoose = require ('mongoose');
var Shema = mongoose.Schema;

var ShemaUser = Shema({
    name:String,
    age:Number,
    email:String
});

module.exports = mongoose.model('User',ShemaUser);