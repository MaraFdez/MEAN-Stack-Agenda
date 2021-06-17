// Fichero con la definición de la BD
var db = require('../db');
var mongodb = require('mongodb');

// Constante que permite el uso de los módulos de validación
const { validationResult } = require('express-validator');

// Conectar a la base de datos MongoDB
db.connect('mongodb://localhost:27017', function (err) {
    if (err) {
        throw ('Fallo en la conexión con la BD');
    }
});

//Funciones del CRUD:

// Mostrar todos los usuarios almacenados en la BD (GET)
module.exports.users_list = function (req, res) {
    db.get().db('apidb').collection('users').find().toArray(function (err, result) {
        // Si se produjo un error
        if (err) {
            next (new Error ('Fallo en la conexión con la BD'));
            return;
        } else {
        // Si todo fue bien se devuelve el resultado
            res.send(result);
        }
    });
};

// Mostrar un usuario almacenado en la BD (GET by Id)
module.exports.users_id = function (req, res) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};
    db.get().db('apidb').collection('users').findOne(filter, function (err, result) {
        // Si se produjo un error
        if (err) {
            next (new Error ('Fallo en la conexión con la BD'));
            return;
        } else {
        // Si todo fue bien se devuelve el resultado
            res.send(result);
        }
    });
};

// Crear un nuevo usuario (POST)
module.exports.users_create = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const user = {};
    user.nombre = req.body.nombre;
    user.apellidos = req.body.apellidos;
    user.edad = req.body.edad;
    user.dni = req.body.dni;
    user.fechaNacimiento = req.body.fechaNacimiento;
    user.colorFavorito = req.body.colorFavorito;
    user.sexo = req.body.sexo;
    
    db.get().db('apidb').collection('users').insertOne(user, function (err, result) {
        // Si se produjo un error
        if (err) {
            next (new Error ('Fallo en la conexión con la BD'));
            return;
        } else {
        // Si todo fue bien se devuelve el resultado
            res.send(result);
        }
    });
};


// Actualizar un usuario ya existente en la BD (PUT)
module.exports.users_update_one = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};
    const update = {
        $set: {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            edad: req.body.edad,
            dni: req.body.dni,
            fechaNacimiento: req.body.fechaNacimiento,
            colorFavorito: req.body.colorFavorito,
            sexo: req.body.sexo
        }
    };
    db.get().db('apidb').collection('users').updateOne(filter, update, function (err, result) {
        // Si se produjo un error
        if (err) {
            next ( new Error('Fallo en la conexión con la BD') );
            return;
        } else {
        // Si todo fue bien se devuelve el resultado
            res.send(result);
        }
    });
};


// Borrar un usuario de la BD (DELETE)
module.exports.users_delete_one = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};
    db.get().db('apidb').collection('users').deleteOne(filter, function (err, result) {
        // Si se produjo un error
        if (err) {
            next (new Error ('Fallo en la conexión con la BD'));
            return;
        } else {
        // Si todo fue bien se devuelve el resultado
            res.send(result);
        }
    });
};