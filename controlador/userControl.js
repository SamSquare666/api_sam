var model = require ('../modelo/user');

function registrarUser (req,res){
    const user = new model();
    var datos = req.body;

    user.name = datos.name;
    user.age = datos.age;
    user.email = datos.email;

    if (user.name != null &&user.age != null && user.email != null ){
        user.save ((err,userGuardado)=>{
            if (err) {
                res.status(500).send({
                    message: 'Error al guardar el usuario'
                });
            } else {
                if (!userGuardado) {
                    res.status(404).send({ message: 'No se puede guardar el usuario' });
                } else {
                    res.status(200).send({usuario:userGuardado});
                }
            }
        })
    }else{
        res.status(500).send({
            message: 'Introduce los datos'
        });
    }
}
function getuser(req, res) {
    var userID = req.params.id;
    model.findById(userID, (err, userDB) => {
        if (err) {
            res.status(500).send({ message: 'Error en mostrar los datos' });
        } else if (!userDB) {
            res.status(404).send({ message: `No exitse un poroducto con ese id` });
        } else if (userDB) {
            res.status(200).send({userDB});
        }
    });
}

function mostrarusers(req, res) {

    model.find((err, users) =>{
            if (err) {
                res.status(500).send({ message: 'Error de peticion' });
            } else {
                if (!users) {
                    res.status(404).send({ message: 'No existen usuarios registrados' });
                } else {
                    res.status(200).send({ Usuarios : users});
                }
            }
        });
}
function borraruser(req, res) {
    var userID = req.params.id;
    model.findByIdAndRemove(userID, (err, userRem) => {
        if (err) {
            res.status(500).send({
                message: `Error al eliminar el usuario con el ID: ${userID} `
            });
        } else {
        if (!userRem){
            res.status(404).send({message:`El usuario con el id: ${userID}  ha sido removido`})
        }else{
            res.status(200).send({message:`Se elimino correctamente el usuario ${userRem.name}`});
            console.log(`Se borro correctamente al usuario con el ID: ${userID_id}`)
        }
        }
    });
}
function actualizaruser(req, res) {
    var userID = req.params.id; //EL ID QUE CORRESPONDE A ESA CITA
    var datos = req.body; //post
    model.findByIdAndUpdate(userID, datos, (err, actuuser) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar los datos' });
        } else {
            if (!actuuser) {
                res.status(404).send({ message: 'Se actualizo correctamente el usuario ' });
            } else {
                res.status(200).send({ usuario: actuuser });
            }
        }
    });
}

module.exports = {
    mostrarusers,
    registrarUser,
    actualizaruser,
    borraruser,
    getuser
}