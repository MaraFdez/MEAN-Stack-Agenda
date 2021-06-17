// Crea el cliente de MongoDB:
var MongoClient = require('mongodb').MongoClient;

// Crea una variable que almacene la conexión
var db = null;

// Función para conectar con la base de datos
module.exports.connect = function (url, callback) {
    // En caso de estar conectados que no se vuelve a conectar
    if (db) {
        return callback();
    }

    // Crea una instancia del cliente MongoDB
    const client = new MongoClient(url,  { useUnifiedTopology: true }, { useNewUrlParser: true });

    // Conecta el cliente al servidor
    client.connect(function (err, result) {
        if (err) {
            return callback(err);
        }
        console.log("Conectado a BD");
        db = result;
        callback();
    });
};

// Función para cerrar la conexión con la base de datos
module.exports.close = function (callback) {
    if (db) {
        db.close(function (err, result) {
            console.log("Desconectado de BD");
            db = null;
            callback(err);
        });
    }
};

// Función para obtener el cliente de MongoDB conectado a la base de datos
module.exports.get = function () {
  return db;
}