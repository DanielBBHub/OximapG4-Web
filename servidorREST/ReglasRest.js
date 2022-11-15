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
  
  servidorExpress.get("/Medicion", 
    async function (peticion, respuesta){
        console.log(" * GET /Medicion");
        var error = null
        //Llamada a la funcion buscarMedicion() para recoger
        //la muestra introducida en la DB
        try{
          //Buscar la medicion del ultimo id
        
          var res = await laLogica.buscarMedicion()
        }

        catch (e){
          error = e
        }

        if (error != null){   
          if( res.length == 0 ) {
              // 404: not found
              respuesta.status(404).send( "No encontré la muestra" )
              return
          }
      }
        console.log(res)
        respuesta.send( JSON.stringify( res ) )

  }) // get /Medicion
  // .......................................................
  // .......................................................
  // POST /alta
  // .......................................................
  
  servidorExpress.post("/alta", async function (peticion, respuesta) {
    console.log(" * POST /alta ");
    var datos = JSON.parse(peticion.body);
    console.log("Valor de medicion: " + datos.muestra);

    try{

      var ret = await laLogica.insertarMedicion(datos);
      respuesta.json(ret)
      
    }
    catch (e){
      error = e
      console.log(e);
    } 
  }); // post /alta

  servidorExpress.get("/Roles", 
  async function (peticion, respuesta){
      console.log(" * GET /Roles");
      var error = null
      var email = peticion.query.email

      try{
        //Buscar la medicion del ultimo id
      
        var res = await laLogica.EsUsuarioAdmin(email)
      }

      catch (e){
        error = e
      }

      if (error != null){   
        if( res.length == 0 ) {
            // 404: not found
            respuesta.status(404).send( "No encontré " )
            return
        }
    }
      console.log(res)
      respuesta.send( JSON.stringify( res ) )
  })

}; // ()
// .....................................................................
// .....................................................................
