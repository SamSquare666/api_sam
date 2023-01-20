const mongoose = require ('mongoose');
var Shema = mongoose.Schema;

var ShemaRecomend = Shema({
    name:String,
    description:String,
    fecha:String
});
module.exports = mongoose.model('Recomed',ShemaRecomend);