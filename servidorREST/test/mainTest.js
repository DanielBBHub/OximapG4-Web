// ........................................................
// mainTest1.js
// ........................................................
var request = require("request");
var assert = require("assert");

// ........................................................
// ........................................................
const IP_PUERTO = "http://localhost:8080";
// ........................................................
// main ()

  describe("Test 2 : Recuerda arrancar el servidor", function () {
    // ....................................................
    // ....................................................
    it("probar que GET /prueba responde ¡Funciona!", function (hecho) { 
      request.get( 
        { url: IP_PUERTO + "/prueba", headers: { "User-Agent": "carlos" } }, // headers
        function (err, respuesta, carga) { // callback 
          assert.equal(err, null, "¿ha habido un error?"); //
          assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
          assert.equal(carga, "¡Funciona!", "¿La carga no es ¡Funciona!?");
          hecho();
        } // callback()
      ); // .get
    }); // it

    // ....................................................
    // ....................................................
    it( "probar GET /Medicion", function( hecho ) {
      request.get(
      { url : IP_PUERTO+"/Medicion",
      headers : { 'User-Agent' : 'Daniel'}},
          function( err, respuesta, carga ) {
              var solucion = JSON.parse(carga)
              assert.equal( solucion[0].muestra, '1234', "¿La muestra no es 1234?" )
              hecho()
              } // callback
          ) // .get
      }) // it

      // ....................................................
    // ....................................................
    it("probar POST /alta", function (hecho) { // Probar Post
      var datosMedicion = { // Datos de la medicion a enviar al servidor REST
        muestra: 12345, // Muestra de la medicion
        tipo: "CO2",
        fecha: "2020-01-01", // Fecha de la medicion
        usuario: "Daniel", // Usuario de la medicion
        latitud: 38.999794344442414,
        longitud: -0.16320239995270047
      };
      request.post(
        {
          headers: { "User-Agent": "Daniel", "Content-Type": "application/json" }, // Cabeceras de la peticion
          url: IP_PUERTO + "/alta", // URL del servidor REST
          body: JSON.stringify(datosMedicion), // Datos de la medicion a enviar al servidor REST en formato JSON
        }, 
        function (err, respuesta, carga) { // Callback de la peticion POST al servidor REST 
          //console.log("asserts"); Mensaje de depuracion para ver que se ejecuta el callback
          assert.equal(err, null, "¿ha habido un error?"); // Comprobar que no hay error
          assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)"); // Comprobar que el codigo de respuesta es 200 (OK) 
          hecho(); // Indicar que el test ha terminado
        } // callback
      ); // .post
      //console.log("llega?");
    })//it

    // ....................................................
    // ....................................................
    it( "probar GET /Micros", function( hecho ) {
      request.get(
      { url : IP_PUERTO+"/Micros",
      headers : { 'User-Agent' : 'Daniel'}},
          function( err, respuesta, carga ) {
              var solucion = JSON.parse(carga)
              assert.equal( solucion[0].correoUser, 'alba.olivern@gmail.com', "¿El registro no coincide?" )
              hecho()
              } // callback
          ) // .get
      }) // it

      it("probar POST /ActualizarDisponibilidad", function (hecho) { // Probar Post
        var datos = { // Datos de la medicion a enviar al servidor REST
          IdMicro: 123456 // Muestra de la medicion
        };
        request.post(
          {
            headers: { "User-Agent": "Daniel", "Content-Type": "application/json" }, // Cabeceras de la peticion
            url: IP_PUERTO + "/ActualizarDisponibilidad", // URL del servidor REST
            body: JSON.stringify(datos), // Datos de la medicion a enviar al servidor REST en formato JSON
          }, 
          function (err, respuesta, carga) { // Callback de la peticion POST al servidor REST 
            //console.log("asserts"); Mensaje de depuracion para ver que se ejecuta el callback
            assert.equal(err, null, "¿ha habido un error?"); // Comprobar que no hay error
            assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)"); // Comprobar que el codigo de respuesta es 200 (OK) 
            hecho(); // Indicar que el test ha terminado
          } // callback
        ); // .post

        
        //console.log("llega?");
      })//it

      it("probar POST /asignarRol", function (hecho) { // Probar Post
        var datos = {idUsuario: "owVboXcSaHafSKBmkf9TKw1RPa52", rol: "user"}
        request.post(
          {
            headers: { "User-Agent": "Daniel", "Content-Type": "application/json" }, // Cabeceras de la peticion
            url: IP_PUERTO + "/asignarRol", // URL del servidor REST
            body: JSON.stringify(datos), // Datos de la medicion a enviar al servidor REST en formato JSON
          }, 
          function (err, respuesta, carga) { // Callback de la peticion POST al servidor REST 
            //console.log("asserts"); Mensaje de depuracion para ver que se ejecuta el callback
            assert.equal(err, null, "¿ha habido un error?"); // Comprobar que no hay error
            assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)"); // Comprobar que el codigo de respuesta es 200 (OK) 
            hecho(); // Indicar que el test ha terminado
          } // callback
        ); // .post

        
        //console.log("llega?");
      })//it
  }); // describe

