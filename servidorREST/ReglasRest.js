// .....................................................................
// ReglasREST.js
// .....................................................................

module.exports.cargar = function (servidorExpress, laLogica) {
  // .......................................................
  // GET /prueba
  // .......................................................
  servidorExpress.get("/prueba/", function (peticion, respuesta) {
    console.log(" * GET /prueba ");
    respuesta.send("¡Funciona!");
  }); // get /prueba
  // .......................................................
  // .......................................................
  servidorExpress.get("/Medicion", async function (peticion, respuesta){
    console.log(" * GET / Medicion");
    var error = null
    //Llamada a la funcion buscarMedicion() para recoger
    //la muestra introducida en la DB
    try{
      //Buscar la medicion del ultimo id
    
      var res = await laLogica.buscarMedicion("2")
    }

    catch (e){
      error = e
    }

    console.log(res)
    respuesta.send( JSON.stringify( res ) )

  }) // get / prueba
  // .......................................................
  // .......................................................
  // POST /alta
  // .......................................................
  servidorExpress.post("/alta", async function (peticion, respuesta) {
    console.log(" * POST /alta ");
    var datos = JSON.parse(peticion.body);
    console.log("ID: " + datos.id);
    console.log("Valor de medicion: " + datos.muestra);

    try{

      await laLogica.insertarMedicion(datos);
      console.log("Termina el metodo");
      //done()
      //console.log("tiempo?");
    }
    catch (e){
      error = e
      console.log(e);
    } 
  }); // get /dividir

}; // ()
// .....................................................................
// .....................................................................
