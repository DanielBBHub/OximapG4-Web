// .....................................................................
// mainServidorREST.js
// .....................................................................
const express = require("express");
const bodyParser = require("body-parser");
const Logica = require( "../logica/Logica.js" ) // Importar la logica y el objeto Logica
const cors = require('cors') // Importo el cors para el servidor
// .....................................................................
// .....................................................................
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
// .....................................................................
// main()
// .....................................................................
async function main() {

  // Carga la logica y la base de datos 
  var laLogica = await cargarLogica( "../BD/datos.bd" ) 
  // creo el servidor
  var servidorExpress = express();
  // para poder acceder a la carga de la petición http, asumiendo que es JSON
  servidorExpress.use(bodyParser.text({ type: "application/json" }));
  //inicio el cors
  servidorExpress.use(cors())
  // cargo las reglas REST
  var reglas = require("./ReglasREST.js");
  reglas.cargar(servidorExpress, laLogica);
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
