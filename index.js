var mongdb = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 9000;

mongdb.connect("mongodb+srv://sam123:sam123@sam01.w6ua3lq.mongodb.net/?retryWrites=true&w=majority", (err, res) => {
    if (err) {
        throw err
    } else {
        console.log('Conexion Exitosa');
        app.listen(port, function() {
            console.log(`El servidor esta corriendo en la ruta http://localhost:` + port);
        });
    }
});