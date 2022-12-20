
// ....................................................................................................................................
// ....................................................................................................................................
/*
    *   LogicaMicros.js
    *   \brief     LogicaMicros.js es una libreria de funciones para el manejo de la logica correspondiente a los micros de la aplicacion  
*/
// ....................................................................................................................................
// ....................................................................................................................................
const sqlite3 = require("sqlite3") // Añadimos sqlite3 (gestor de base de datos)
// ....................................................................................................................................
// ....................................................................................................................................
module.exports = class LogicaMicros {

    // .................................................................
    /*
    *   \brief     Constructor de la clase
    *   \details   Abre la base de datos y la guarda en laConexion 
    *  @param     nombreDeLaBaseDeDatos:R Nombre de la base de datos
    *  @param     modo:R Modo de apertura de la base de datos
    *  @param    callback:R Funcion que se ejecuta al abrir la base de datos
    *  @return    Devuelve la conexion con la base de datos
    *  @return    Devuelve un error si no se puede abrir la base de datos
    
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
     *  \brief     Inserta valores en la base de datos
     * \details   Inserta valores en la base de datos correspondientes a los campos de la tabla Micro
     * @param     id
     * @param     CorreoUser 
     * @param     IDMicro
     * @param     Disponibilidad
     * @param     UltimaVezActivo
    

    datos:{id: int, correoUser: string, IDMicro: int, Disponibilidad: bool, UltimaVezActivo: date}
    --> AñadirDatos()

    */
    // .................................................................
    anyadirDatos(datos) { // Añade datos a la base de datos
        var textoSQL = "INSERT INTO Micros VALUES (NULL, $correoUser, $IdMicro, $Disponibilidad, $UltimaVezActivo)"
        var valoresParaSQL = {$correoUser: datos.correoUser, $IdMicro: datos.IdMicro, $Disponibilidad: datos.Disponibilidad, $UltimaVezActivo: datos.UltimaVezActivo}
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

    // .................................................................
    /*
        *  \brief     Elimina valores de la base de datos
        * \details   Elimina valores de la base de datos correspondientes a los campos de la tabla Micro
        * @param     id
        * @param     CorreoUser
        * @param     IDMicro
        * @param     Disponibilidad
        * @param     UltimaVezActivo
        * @param     callback
        * @return    Devuelve un error si no se puede eliminar los datos
        * @return    Devuelve la promesa
        * @return    Devuelve la consulta
        * // datos:{id: int, correoUser: string, IDMicro: int, Disponibilidad: bool, UltimaVezActivo: date}
        * --> EliminarDatos()
        */
    // .................................................................
    eliminarDatos(datos) { // Elimina datos de la base de datos
        var textoSQL = "DELETE FROM Micros WHERE id = $id",
            valoresParaSQL = {$id: datos.id}
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) { // Consulta
                if (err == null) { // Si no hay error
                    resolver() 
                } else {
                    console.log("No funciona");
                    console.log(err);
                    rechazar(err) // Sino devuelve el error
                    
                }
            })
        })
    }

    // .................................................................
    /*
        *  \brief     Modifica valores de la base de datos
        * \details   Modifica valores de la base de datos correspondientes a los campos de la tabla Micro
        * @param     id
        * @param     CorreoUser
        * @param     IDMicro
        * @param     Disponibilidad
        * @param     UltimaVezActivo
        * @param     callback
        * @return    Devuelve un error si no se puede modificar los datos
        * @return    Devuelve la promesa
        * @return    Devuelve la consulta
        * // datos:{id: int, correoUser: string, IDMicro: int, Disponibilidad: bool, UltimaVezActivo: date}
        * --> ModificarDatos()
        */
    // .................................................................
    modificarDatos(datos) { // Modifica datos de la base de datos
        var textoSQL = "UPDATE Micros"
        textoSQL += " SET CorreoUser = $CorreoUser, IDMicro = $IDMicro, Disponibilidad = $Disponibilidad, UltimaVezActivo = $UltimaVezActivo"
        textoSQL += " WHERE id = $id"
        var valoresParaSQL = {$CorreoUser: datos.CorreoUser, $IDMicro: datos.IDMicro, $Disponibilidad: datos.Disponibilidad, $UltimaVezActivo: datos.UltimaVezActivo, $id: datos.id}
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) { // Consulta
                if (err == null) { // Si no hay error
                    resolver()
                } else {
                    console.log("No funciona");
                    console.log(err);
                    rechazar(err) // Sino devuelve el error
                    
                }
            })
        })
    }

    // .................................................................
    /*
        *  \brief     Obtener los micros activos de la bbdd
        * \details   Obtener los micros activos de la bbdd
        * @param     callback
        * @param     Dispobibilidad
        * @return    Devuelve un error si no se puede obtener los datos
        * @return    Devuelve la promesa
        * @return    Devuelve la consulta
        * --> ObtenerMicrosActivos()
    */
    // .................................................................
    obtenerMicrosActivos() { // Obtiene los micros activos de la base de datos
        var textoSQL = "SELECT * FROM Micros WHERE Disponibilidad = TRUE"
            return new Promise((resolver, rechazar) => { // Promesa
                this.laConexion.all(textoSQL, [], // Consulta
                    (err, res) => {
                        (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                    })
            })
    }

     // .................................................................
    /*
        *  \brief     Obtener los micros activos de la bbdd
        * \details   Obtener los micros activos de la bbdd
        * @param     callback
        * @param     Dispobibilidad
        * @return    Devuelve un error si no se puede obtener los datos
        * @return    Devuelve la promesa
        * @return    Devuelve la consulta
        * --> ObtenerMicrosActivos()
    */
    // .................................................................
    obtenerMicros() { // Obtiene los micros activos de la base de datos
        var textoSQL = "SELECT * FROM Micros"
            return new Promise((resolver, rechazar) => { // Promesa
                this.laConexion.all(textoSQL, [], // Consulta
                    (err, res) => {
                        (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                    })
            })
    }
    // .................................................................
    /*
     * 
     * @returns Devuelve la promesa de la consulta
     * @returns Devuelve un error si no se puede consultar
     * buscarMedicion() --> {IdMicro:R}
     */
    
    // .................................................................
    actualizarDisponibilidad(IdMicro) { // Busca una Medicion en la base de datos
        var textoSQL = "UPDATE Micros SET Disponibilidad = 0 WHERE IdMicro=$IdMicro"; // SQL
        var valoresParaSQL = {$IdMicro:IdMicro}
        return new Promise((resolver, rechazar) => { // Promesa
            this.laConexion.all(textoSQL, valoresParaSQL, // Consulta
                (err, res) => {
                    (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                })
        })
    }

    // .................................................................
    obtenerMicrosPorCorreo(correo) { // Obtiene los micros activos de la base de datos
        var textoSQL = "SELECT * FROM Micros WHERE correoUser=$correoUser"
        var valoresParaSQL ={$correoUser:correo }
            return new Promise((resolver, rechazar) => { // Promesa
                this.laConexion.all(textoSQL, valoresParaSQL, // Consulta
                    (err, res) => {
                        (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                    })
            })
    }

    // .................................................................
    /*
        *  \brief    Obtener la ultima vezz que un micro fue activado
        * \details   Obtener los micros activos de la bbdd
        * @param     callback
        * @param     IDMicro
        * @return    Devuelve un error si no se puede obtener los datos
        * @return    Devuelve la promesa
        * @return    Devuelve la consulta
        * --> ObtenerUltimaVezActivo()
    */
    // .................................................................
    obtenerUltimaVezActivo( ) { // Obtiene los micros activos de la base de datos
        var textoSQL = "SELECT UltimaVezActivo FROM Micros WHERE IDMicro=$IDMicro"
            return new Promise((resolver, rechazar) => { // Promesa
                this.laConexion.all(textoSQL, [], // Consulta
                    (err, res) => {
                        (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                    })
            })
    }

    // .................................................................
    /*
        *  \brief    Obtener de que user es un micro
        * \details   Obtener los micros activos de la bbdd
        * @param     callback
        * @param     IDMicro
        * @return    Devuelve un error si no se puede obtener los datos
        * @return    Devuelve la promesa
        * @return    Devuelve la consulta
        * --> ObtenerQueUser()
    */
    // .................................................................
    obtenerqueuser(cb) { // Obtiene los micros activos de la base de datos
        var textoSQL = "SELECT CorreoUser FROM Micros WHERE IDMicro=$IDMicro"
            return new Promise((resolver, rechazar) => { // Promesa
                this.laConexion.all(textoSQL, [], // Consulta
                    (err, res) => {
                        (err ? rechazar(err) : resolver(res)) // Devuelve la promesa
                    })
            })
    }

    // .................................................................
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
    // .................................................................

}