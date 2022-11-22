// ....................................................................................................................................
// ....................................................................................................................................
/*
    *   Logica.js
    *   \brief     Logica.js es una libreria de funciones para el manejo de la logica de la aplicacion
    *   \details   Contiene los métodos para Insertar, consultar, abrir y cerrar conexion con la base de datos  
*/
// ....................................................................................................................................
// ....................................................................................................................................
const sqlite3 = require("sqlite3") // Añadimos sqlite3 (gestor de base de datos)
// ....................................................................................................................................
// ....................................................................................................................................
module.exports = class Logica { 
    // .................................................................
     /*
    *   \brief     Constructor de la clase
    *   \details   Abre la base de datos y la guarda en laConexion 
    *  \param     nombreDeLaBaseDeDatos:R Nombre de la base de datos
    * \param     modo:R Modo de apertura de la base de datos
    * \param     callback:R Funcion que se ejecuta al abrir la base de datos
    * \return    Devuelve la conexion con la base de datos
    * \return    Devuelve un error si no se puede abrir la base de datos
    
    nombreBD (datos.bd): Texto
     -->
    constructor () -->
    */
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
   /*
    *   \brief     Inserta valores en la base de datos 
    *   \details   Inserta valores en la base de datos correspondientes a los campos de la tabla Medicion
    * \param     medicion:N Medicion
    * \param     fecha: Date fecha
    * \param     usuario: Str nombre de usuario
    * \return    Devuelve la promesa de la insercion
    * \return    Devuelve un error si no se puede insertar
    datos:{ID:R, Medicion:N}
    -->
    insertarMedicion() -->
    
    */
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
    /*
    *   \brief     Inserta valores en la base de datos
    *   \details   Inserta valores en la base de datos correspondientes a los campos de la tabla Usuario
    * \return    Devuelve el objeto JSON con la informacion de la respuesta
    * \return    Devuelve un error si no se puede insertar
    -->
    buscarMedicion() <--
    <--
    {ID:R, Medicion:N}
    */
    // .................................................................
    buscarMedicion() { // Busca una Medicion en la base de datos
        var textoSQL = "SELECT * FROM Medicion ORDER BY id DESC LIMIT 1"; // SQL
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.all(textoSQL, [], // Consulta
                (err, res) => {
                    (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                })
        })
    }
    // ................................................................................................................................
    // ................................................................................................................................

    /*
    *   \brief     Cerrar conexion con la base de datos
    *   \details   Cierra la conexion con la base de datos mediante la funcion close de laConexion
    * \return    Devuelve la promesa del cierre de la conexion
    * \return    Devuelve un error si no se puede cerrar la conexion
    * 
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
