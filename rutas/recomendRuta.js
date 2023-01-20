const { application } = require('express');
var express = require ('express');
var RecomendControl = require('../controlador/recomendControl');

var api = express.Router();

//api Adminitrador 
api.get('/admin',RecomendControl.mostrarDatos);
api.get('/ingresar',RecomendControl.ingresar);
api.post('/registrar/guardar',RecomendControl.registrarComoAdmin);
api.get('/editar/:id',RecomendControl.editarComoAdmin);
api.post('/editar/guardar',RecomendControl.guardarCambios);
api.get('/borrar/:id',RecomendControl.borrar);
api.post('/borrar',RecomendControl.borrarDefiniti);

//Api Aplicacion 
api.post('/registrarRecomend',RecomendControl.registrar);
api.get('/mostrarTodo',RecomendControl.mostrarTodos);
api.put('/actualizar/:id',RecomendControl.actualizarRecomend);
api.delete('/borrarR/:id',RecomendControl.borrarR);
module.exports= api;