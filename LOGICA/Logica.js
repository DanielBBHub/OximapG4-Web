// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3") // Añadimos
// .....................................................................
// .....................................................................
// Cremos la clase Logica con el constructor que abre la base de datos
// .....................................................................
// .....................................................................
module.exports = class Logica { 
    // .................................................................
    // nombreBD (datos.bd): Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor(nombreBD, cb) { // El constructor abre la base de datos
        this.laConexion = new sqlite3.Database( nombreBD,
            (err) => { // Callback
                if (!err) { // Si no hay error
                    this.laConexion.run("PRAGMA foreign_keys = ON") // Activa las claves foráneas
                }
                cb(err) // Sino devuelve el error
            })
    }
    // .................................................................
    // datos:{ID:R, Medicion:N}
    // -->
    // insertarMedicion() -->
    // .................................................................
    insertarMedicion(datos) { // Inserta una Medicion en la base de datos
        var textoSQL = 'insert into Medicion values( NULL, $muestra, $fecha, $usuario);' // SQL
        var valoresParaSQL = {$muestra: datos.muestra, $fecha: datos.fecha, $usuario: datos.usuario } // Valores para SQL
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) { // Consulta

                if (err == null) { // Si no hay error
                    resolver() 
                } else {
                    console.log("No funciona");
                    console.log(err);
                    rechazar(err) // Sino devuelve el error
                    
                }
                //(err ? rechazar(err) : resolver()) // Devuelve la promesa
            })
        })
    } // ()
    // .................................................................
    // ID:R
    // -->
    // buscarMedicion() <--
    // <--
    // {ID:R, Medicion:N}
    // .................................................................
    buscarMedicion() { // Busca una Medicion en la base de datos
        var textoSQL = "SELECT * FROM Medicion ORDER BY id DESC LIMIT 1"; // SQL
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.all(textoSQL, [], // Consulta
                (err, res) => {
                    (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                })
        })
    } // ()
    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() { // Cierra la base de datos 
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.close((err) => { // Cierra la base de datos
                (err ? rechazar(err) : resolver()) // Devuelve la promesa
            })
        })
    } // ()
} // class
// .....................................................................
// .....................................................................