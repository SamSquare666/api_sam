const { restart } = require('nodemon');
var model = require ('../modelo/products');

function registrarProducto (req,res){
    const product = new model();
    var datos = req.body;

    product.name = datos.name;
    product.description = datos.description;
    product.price = datos.price;

    if (product.name != null &&product.description != null && product.price != null ){
        product
        .save ((err,ProductGuardado)=>{
            if (err) {
                res.status(500).send({
                    message: 'Error al guardar el producto'
                });
            } else {
                if (!ProductGuardado) {
                    res.status(404).send({ message: 'No se puede guardar el producto' });
                } else {
                    res.status(200).send({Producto:ProductGuardado});
                }
            }
        })
    }else{
        res.status(500).send({
            message: 'Introduce los datos'
        });
    }
}
function getProduct(req, res) {
    var productID = req.params.id;
    model.findById(productID, (err, productDB) => {
        if (err) {
            res.status(500).send({ message: 'Error en mostrar los datos' });
        } else if (!productDB) {
            res.status(404).send({ message: `No exitse un poroducto con ese id` });
        } else if (productDB) {
            res.status(200).send({productDB});
        }
    });
}

function mostrarProducts(req, res) {

    model.find((err, products) =>{
            if (err) {
                res.status(500).send({ message: 'Error de peticion' });
            } else {
                if (!products) {
                    res.status(404).send({ message: 'No existen productos en stock' });
                } else {
                    res.status(200).send({ Productos : products});
                }
            }
        });
}
function borrarProduct(req, res) {
    var productID = req.params.id;
    model.findByIdAndRemove(productID, (err, productRem) => {
        if (err) {
            res.status(500).send({
                message: `Error al eliminar el producto con el ID: ${productID} `
            });
        } else {
        if (!productRem){
            res.status(404).send({message:`El producto con el id: ${productID}  ha sido removido`})
        }else{
            res.status(200).send({message:`Se elimino correctamente el producto ${productRem.name}`});
            console.log(`Se borro correctamente la cita con el ID: ${productID_id}`)
        }
        }
    });
}
function actualizarProduct(req, res) {
    var productID = req.params.id; //EL ID QUE CORRESPONDE A ESA CITA
    var datos = req.body; //post
    model.findByIdAndUpdate(productID, datos, (err, actuProduct) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar los datos' });
        } else {
            if (!actuProduct) {
                res.status(404).send({ message: 'Se actualizo correctamente el producto ' });
            } else {
                res.status(200).send({ Producto: actuProduct });
            }
        }
    });
}

module.exports = {
    mostrarProducts,
    registrarProducto,
    actualizarProduct,
    borrarProduct,
    getProduct
}