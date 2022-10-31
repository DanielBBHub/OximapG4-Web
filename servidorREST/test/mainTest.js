// ........................................................
// mainTest1.js
// ........................................................
var request = require("request");
var assert = require("assert");
//const request = require('supertest');
// ........................................................
// ........................................................
const IP_PUERTO = "http://localhost:8080";
// ........................................................
// main ()
// ........................................................
describe("Test 1 : Recuerda arrancar el servidor", function () {
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
  // ....................................................
  it("probar POST /alta", function (hecho) { // Probar Post
    var datosMedicion = { // Datos de la medicion a enviar al servidor REST
      ID: "10",
      Medicion: "25.4" ,
    };
    request.post(
      {
        headers: { "User-Agent": "carlos", "Content-Type": "application/json" }, // Cabeceras de la peticion
        url: IP_PUERTO + "/alta", // URL del servidor REST
        body: JSON.stringify(datosMedicion), // Datos de la medicion a enviar al servidor REST en formato JSON
      }, 
      function (err, respuesta, carga) { // Callback de la peticion POST al servidor REST 
        console.log("asserts"); // Mensaje de depuracion para ver que se ejecuta el callback
        assert.equal(err, null, "¿ha habido un error?"); // Comprobar que no hay error
        assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)"); // Comprobar que el codigo de respuesta es 200 (OK) 
        assert.equal(carga, "OK", "¿La carga no es OK"); // Comprobar que la carga es "OK" 
        hecho(); // Indicar que el test ha terminado 
      } // callback
    ); // .post
    //console.log("llega?");
  })//it

}); // describe
