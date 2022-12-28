// .....................................................................
// ReglasREST.js
// .....................................................................


module.exports.cargar = function (servidorExpress, laLogica, laLogicaMicros,laLogicaRol) {
  // .......................................................
  // .......................................................
  // GET /prueba
  // .......................................................
  // .......................................................

  /*
   * brief: Devuelve un mensaje de prueba
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   * @returns {void}
  */

  servidorExpress.get("/prueba/", function (peticion, respuesta) {
    console.log(" * GET /prueba ");
    respuesta.send("¡Funciona!");
  }); // get /prueba


  // .......................................................
  // .......................................................
  // GET /Medicion
  // .......................................................
  // .......................................................

  /*
   * brief: Devuelve todas la medicion
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   * @returns {JSON}: {error: string, mediciones: Medicion[]}
  */

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
        respuesta.send( JSON.stringify( res ) )

  }) // get /Medicion

  // .......................................................
  // .......................................................
  // POST /alta
  // .......................................................
  // .......................................................

  /*
   * brief: Recibe los datos de una nueva medicion
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
  */
  
  servidorExpress.post("/alta", async function (peticion, respuesta) {
    console.log(" * POST /alta ");
    var datos = JSON.parse(peticion.body);

    try{

      var ret = await laLogica.insertarMedicion(datos);
      respuesta.json(ret)
      
    }
    catch (e){
      error = e
      console.log(e);
    } 
  }); // post /alta

  servidorExpress.post("/asignarRol", async function (peticion, respuesta) {
    console.log(" * POST /asignarRol ");
    var datos = JSON.parse(peticion.body);

    try{

      var ret = await laLogicaRol.asignarRol(datos);
      respuesta.json(ret)
      
    }
    catch (e){
      error = e
      console.log(e);
    } 
  }); // post /alta

  // .......................................................
  // .......................................................
  // POST /login
  // .......................................................
  // .......................................................

  /*
    * brief: Recibe los datos de un usuario y devuelve su rol
    * @param {express.Request} req
    * @param {express.Response} res
    * @param {express.NextFunction} next
    * @returns {JSON}: {error: string, rol: string}
  */

  servidorExpress.get("/Roles", 
  async function (peticion, respuesta){
      console.log(" * GET /Roles");
      var error = null
      var idUsuario = peticion.query.idUsuario

      try{
        //Buscar la medicion del ultimo id
        var res = await laLogicaRol.esUsuarioAdmin(idUsuario)
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
      respuesta.send( JSON.stringify( res ) )
  })

  // .......................................................
  // .......................................................

  /*
    * brief: Regla que extraiga todos los campos de la bbdd
    * @param {express.Request} req
    * @param {express.Response} res
    * @param {express.NextFunction} next
    * @returns {JSON}: {error: string, rol: string}
  */

  servidorExpress.get("/Micros", 
  async function (peticion, respuesta){
      console.log(" * GET /Micros");
      var error = null

      try{
        
        //buscar todos los registros de la base
        var res = await laLogicaMicros.obtenerMicros();
        
        
      }

      catch (e){
        error = e
      }

      if (error != null){   
        if( res.length == 0 ) {
            // 404: not found
            respuesta.status(404).send( "No encontré registros" )
            return
        }
    }

    console.log(res)
    respuesta.send( JSON.stringify( res ) )

  })

  // .......................................................
  // .......................................................

  servidorExpress.post("/ActualizarDisponibilidad", 
  async function (peticion, respuesta) {
    console.log(" * POST /ActualizarDisponibilidad ");
    var datos = JSON.parse(peticion.body);

    try{

      var ret = await laLogicaMicros.obtenerMicrosActivos(datos.idMicro);
      respuesta.json(ret)
      
    }
    catch (e){
      error = e
      console.log(e);
    } 
  }); // post /alta

}; // ()
// .....................................................................
// .....................................................................
