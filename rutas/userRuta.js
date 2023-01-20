var express = require ('express');
var control = require('../controlador/userControl');

var api = express.Router();

api.get('/mostrarUsuarios',control.mostrarusers);
api.get('/mostrarUsuario/:id',control.getuser);
api.post('/registrarUsuario',control.registrarUser);
api.put('/actualizarUsario/:id',control.actualizaruser);
api.delete('/borrarUsuario/:id',control.borraruser);

module.exports= api;