var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Crear una nueva instancia de Express
const app = express();

// Módulo para generar un log de las peticiones que recibe el servidor
app.use(logger('dev'));
// Middleware para que traduzca todas las peticiones de tipo JSON
app.use(express.json());
// Middleware para decodificar el contenido de los parámetros de las peticiones
app.use(express.urlencoded({ extended: false }));
// Tratamiento de cookies
app.use(cookieParser());
// Tratamiento de recursos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Definición de las rutas de la aplicación
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Capturar excepciones asíncronas
app.get('/', function (req, res, next) {
  Promise.resolve().then(function () {
    throw new Error('Excepción');
  }).catch(next);
});

// Lanzar el error 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Si las cabeceras han sido enviadas, delegar el error en el capturador por defecto
  if (res.headersSent) {
    return next(err)
  }
  // Devolver el status de error
  res.status(err.status || 500);
  res.render('error', { error: err });
});


module.exports = app;
