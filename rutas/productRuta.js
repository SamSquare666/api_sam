var express = require ('express');
var control = require('../controlador/poductControl');

var api = express.Router();

api.get('/mostrarTodos',control.mostrarProducts);
api.get('/mostrarUno/:id',control.getProduct);
api.post('/registrarProducto',control.registrarProducto);
api.put('/actualizarProducto/:id',control.actualizarProduct);
api.delete('/borrarProducto/:id',control.borrarProduct);

module.exports= api;