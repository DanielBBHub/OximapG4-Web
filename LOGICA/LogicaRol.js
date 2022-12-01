const sqlite3 = require("sqlite3")

module.exports = class LogicaRol{

    //nombreBD (datos.bd): Texto
    // -->
    //constructor () -->
    //
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

    asignarRol(datos)
    {
        var textoSQL = 'insert into Roles values( NULL, $correo, $rol);' // SQL
        var valoresParaSQL = {$correo: datos.correo, $rol: datos.rol} // Valores para SQL
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
    }

    /*
     * 
     * @param {email} email 
     * @returns 
     */

    esUsuarioAdmin(email) {
        var textoSQL = "SELECT rol FROM Roles WHERE CorreoUsuario=$email"; // SQL
        var valores = {$email: email}
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.all(textoSQL, valores, // Consulta
                (err, res) => {
                    (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                })
        })
    }

     /*
     * @returns Devuelve la promesa de la consulta
     * @returns Devuelve un error si no se puede consultar
     */
     cerrar() { // Cierra la base de datos 
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.close((err) => { // Cierra la base de datos
                (err ? rechazar(err) : resolver()) // Devuelve la promesa
            })
        })
    } // ()
}