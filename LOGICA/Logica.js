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
        var textoSQL = 'insert into Medicion values( $ID, $Medicion);' // SQL
        var valoresParaSQL = { $ID: datos.ID, $Medicion: datos.Medicion } // Valores para SQL
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) { // Consulta

                if (err == null) { // Si no hay error
                    resolver() 
                    console.log("Funciona");
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
    buscarMedicion(ID) { // Busca una Medicion en la base de datos
        var textoSQL = "select * from Medicion where ID=$ID"; // SQL
        var valoresParaSQL = { $ID: ID } // Valores para SQL
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.all(textoSQL, valoresParaSQL, // Consulta
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