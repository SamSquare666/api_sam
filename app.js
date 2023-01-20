var express = require('express');
const {config,engine} = require ('express-edge');
const bodyParser = require('body-parser');

const app = new express();

var recomend_routers = require('./rutas/recomendRuta');
var product_routers = require ('.//rutas/productRuta');
var user_routers = require('./rutas/userRuta')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configurar cabeceras http
app.use(engine);
app.set('views',`${__dirname}/views`);

//ruta base

app.use('/api', recomend_routers);
app.use('/api',product_routers);
app.use('/api',user_routers);



module.exports = app;