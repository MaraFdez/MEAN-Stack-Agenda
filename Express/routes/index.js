var express = require('express');
var router = express.Router();

// Definición de las respuestas
router.get('/', (request, response) => {
    response.send('<h1 style="text-align: center; margin-top: 50px;">¡Bienvenidos a la práctica de API REST con Express!</h1>');
  });

module.exports = router;
