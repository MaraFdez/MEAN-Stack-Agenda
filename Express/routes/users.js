var express = require('express');
var router = express.Router();
var users_controller = require('../controllers/usersController');
const { check } = require('express-validator');

// Se definen las validaciones
const valid_user = [
    check('nombre', 'El nombre ha de contener un mínimo de 3 caracteres, sin incluir números')
        .isLength({ min: 3 })
        .isAlpha(locale = 'es-ES', { ignore: ' ' }),
    check('apellidos', 'Los apellidos han de contener un mínimo de 3 caracteres, sin incluir números')
        .isLength({ min: 3 })
        .isAlpha(locale = 'es-ES', { ignore: ' ' }),
    check('edad', 'La edad ha de estar comprendida entre 0 y 125')
        .isFloat({ min: 0, max: 125 }),
    check('dni', 'El dni indicado debe contener 9 caracteres alfanuméricos')
        .isLength({ min: 9, max: 9 })
        .isAlphanumeric(),
    check('fechaNacimiento', 'La fecha de nacimiento ha de especificarse en formato aaaa-mm-dd')
        .isISO8601(),
    check('colorFavorito', 'El color favorito ha de contener un mínimo de 3 caracteres, sin incluir números')
        .isLength({ min: 3 })
        .isAlpha(locale = 'es-ES', { ignore: ' ' }),
    check('sexo', 'El campo sexo debe corresponderse con uno de los siguientes: Mujer, Hombre, Otro, No especificado')
        .isIn(['Mujer', 'Hombre', 'Otro', 'No especificado'])
  ];

// Método GET /listar usuarios
router.get('/', users_controller.users_list);

// Método GET /listar por Id
router.get('/:id', users_controller.users_id);

// Método POST /crear usuario
router.post('/', valid_user, users_controller.users_create);

// Método PUT /actualizar usuario
router.put('/:id', valid_user, users_controller.users_update_one);

// Método DELETE /eliminar usuario
router.delete('/:id', users_controller.users_delete_one);

module.exports = router;
