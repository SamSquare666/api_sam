var model = require ('../modelo/recomend');

let mostrarDatos = async (req,res)=>{
    let info = await model.find({});
    res.render('index',{info});

}

function registrar (req,res){
    const recomend = new model ();
    var datos = req.body;

    recomend.name = datos.name;
    recomend.description= datos.description;
    recomend.fecha = datos.fecha;

    if (recomend.name!= null && recomend.description != null && recomend.fecha != null){
        recomend.save((err,RecoGuardada)=>{
            if(err){
                res.status(500).send(err);
            }else{
                if(!RecoGuardada){
                    res.status(404).send({message:'Error no se pudo guardar'});
                }else{
                    res.status(200).send({recomend:RecoGuardada});
                    console.log(RecoGuardada);
                }
            }
        });
    }else{
        res.status(500).send({message:'Introduce los datos'});
    }
}
//ingresar datos como administrador
let ingresar = (req,res)=>{
    res.render('ingresar');
}
//registrar como administrador
function registrarComoAdmin (req,res){
    var datos = req.body;
    model.create(datos,(err,RecoGuardada)=>{
        if(err){
            res.status(500).send({message:err});
        }else{
            if(!RecoGuardada){
                res.status(404).send({message:'No se pudo guardar'});
            }else{
                console.log(`Se guardo correcatamenbte la informacion ID:${RecoGuardada._id}, nombre: ${RecoGuardada.name}, Descripcion:${RecoGuardada.description} con la fecha: ${RecoGuardada.fecha}`);
                res.status(200).redirect('/api/admin');
            }
        }
    })
}
//mostrar datos en Postman
function mostrarTodos (req,res){
model.find((err,recomendaciones)=>{
    if (err) {
        res.status(500).send({ message: 'Error de peticion' });
    } else {
        if (!recomendaciones) {
            res.status(404).send({ message: 'La cita no existe' });
        } else {
            res.status(200).send({  recomendaciones });
        }
    }
})
}
//Accedar a editar como administrador 
let editarComoAdmin = async ( req,res)=>{
    var recomendId = req.params.id;
    const info = await model.findById(recomendId);
    res.render('editar',{info});
}
//guardar cambios como adaministrador 
function guardarCambios (req,res){
    const recomendID = req.body.id;
    var DatosNuevos = req.body;
    model.findByIdAndUpdate(recomendID,{
        name:DatosNuevos.name,
        description:DatosNuevos.description,
        fecha:DatosNuevos.fecha
    },(err,RecoActualizada)=>{
        console.log(DatosNuevos);
        console.log(`Se actalizaron los cambios del Id ${recomendID} con los siguientes datos:${RecoActualizada} `);
        res.status(200).redirect('/api/admin');
    })
}
//actualizar por Postman con id
function actualizarRecomend (req,res){
    var recomendID = req.params.id;
    var Datos = req.body;
    model.findByIdAndUpdate (recomendID,Datos,(err,actReco)=>{
        if (err) {
            res.status(500).send({ message: 'Error al guardar los datos' });
        } else {
            if (!actReco) {
                res.status(404).send({ message: 'No se ha podido actualizar' });
            } else {
                res.status(200).send({NuevaRecomendacion: actReco });
            }
        }
    })
}
//borrar como admin 
let borrar = async(req,res)=>{
    var datos = req.params.id;
    var info = await model.findById(datos);
    res.render('borrar',{info});
}
function borrarDefiniti (req,res){
    const recomendID = req.body.id;
    model.findByIdAndRemove(recomendID,function(err){
        if(err){
            res.send(err)
        }else{
            console.log(`Cita eliminada correctamente con el Id:${recomendID}`);
            res.redirect('/api/admin');
        }
    });
}

function borrarR(req, res) {
    var recomendID = req.params.id;
    model.findByIdAndRemove(recomendID, (err, recoBorrada) => {
        if (err) {
            res.status(500).send({
                message: `Error al eliminar la cita con el id  ${recomendID}`
            });
        } else {
            console.log(recoBorrada);
            res.status(200).send({message:`Se elimino corrrectamente la recomendacion de ${recoBorrada.name}`
                
            });
            console.log(`Se borro correctamente la cita con el ID: ${recomendID}`)
        }
    });
}

module.exports = {
    registrar,
    mostrarDatos,
    ingresar,
    registrarComoAdmin,
    mostrarTodos,
    editarComoAdmin,
    guardarCambios, 
    actualizarRecomend,
    borrar,
    borrarDefiniti,
    borrarR
};