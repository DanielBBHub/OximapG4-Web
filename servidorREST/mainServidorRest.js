// .....................................................................
// mainServidorREST.js
// .....................................................................
/*
 *  \brief     mainServidorREST.js
 * \details   mainServidorREST.js es el punto de entrada de la aplicacion
 * \details   Carga la logica y la base de datos y arranca el servidor REST
 * \details   Carga las reglas REST
 * \details   Arranca el servidor REST
 * \details   Captura control-c para cerrar el servicio ordenadamente
*/

const express = require("express");
const bodyParser = require("body-parser");
const Logica = require( "../logica/Logica.js" ) // Importar la logica y el objeto Logica
const LogicaMicros = require( "../logica/LogicaMicros.js" ) // Importar la logica y el objeto Logica
const LogicaRol = require( "../logica/LogicaRol.js" ) 
const cors = require('cors') // Importo el cors para el servidor
// .....................................................................
// .....................................................................

/*
 * 
 * @param {GuardarLogica} fichero 
 * @returns Objeto Logica
 * @throws Error
 */

function cargarLogica( fichero ) { // Metodo para cargar la logica
  return new Promise( (resolver, rechazar) => { // Creo una promesa para cargar la logica 

  var laLogica = new Logica( fichero,

  function( err ) {
      if ( err ) {
          rechazar( err )
      } else {
          resolver( laLogica ) // Devuelve la logica objeto
      }
      }) // new
  }) // Promise
  } // ()

  function cargarLogicaMicros( fichero ) { // Metodo para cargar la logica
    return new Promise( (resolver, rechazar) => { // Creo una promesa para cargar la logica 
  
    var laLogica = new LogicaMicros( fichero,
  
    function( err ) {
        if ( err ) {
            rechazar( err )
        } else {
            resolver( laLogica ) // Devuelve la logica objeto
        }
        }) // new
    }) // Promise
    } // ()

    function cargarLogicaRol( fichero ) { // Metodo para cargar la logica
      return new Promise( (resolver, rechazar) => { // Creo una promesa para cargar la logica 
    
      var laLogica = new LogicaRol( fichero,
    
      function( err ) {
          if ( err ) {
              rechazar( err )
          } else {
              resolver( laLogica ) // Devuelve la logica objeto
          }
          }) // new
      }) // Promise
      } // ()
// .....................................................................
// main()
// .....................................................................
async function main() {

  // Carga la logica y la base de datos 
  var laLogica = await cargarLogica( "../BD/datos.bd" ) 
  var laLogicaMicros = await cargarLogicaMicros( "../BD/datos.bd" ) 
  var laLogicaRol = await cargarLogicaRol( "../BD/datos.bd" ) 
  // creo el servidor
  var servidorExpress = express();
  // para poder acceder a la carga de la petición http, asumiendo que es JSON
  servidorExpress.use(bodyParser.text({ type: "application/json" }));
  //inicio el cors
  servidorExpress.use(cors())
  // cargo las reglas REST
  var reglas = require("./ReglasREST.js");
  reglas.cargar(servidorExpress, laLogica, laLogicaMicros, laLogicaRol);
  // arrancao el servidor
  var servicio = servidorExpress.listen(8080, function () {
    console.log("servidor REST escuchando en el puerto 8080 ");
  });
  // capturo control-c para cerrar el servicio ordenadamente
  process.on("SIGINT", function () {
    console.log(" terminando ");
    servicio.close();
  });
} // ()
// .....................................................................
// .....................................................................
main();
// .....................................................................
// .....................................................................
