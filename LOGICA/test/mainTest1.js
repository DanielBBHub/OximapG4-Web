// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js"); // Añadimos la clase Logica
var assert = require("assert"); // Añadimos assert para hacer pruebas
const { randomInt } = require("crypto");
// ........................................................
// main ()
// ........................................................
describe("Test 1: Conectar, añadir, comprobar y cerrar [Muestras]", function () {
  // Test 1
  // ....................................................
  // ....................................................
  var laLogica = null; // La clase Logica vale null para poder asignarle un valor
  // ....................................................
  // ....................................................
  it("conectar a la base de datos", function (hecho) {
    // Conectar a la base de datos
    laLogica = new Logica(
      "../bd/datos.bd", // Nombre de la base de datos
      function (err) {
        // Callback
        if (err) {
          // Si hay error
          throw new Error("No he podido conectar con datos.db"); // Lanza un error
        }
        hecho(); // Sino, termina
      }
    );
  }); // it
  // ....................................................
  // ....................................................
  it("puedo buscar una medicion", async function () {
    // Puedo buscar la ultimamedicion en la base de datos
    // Función asíncrona para insertar valores y comprobar que se han insertado con callback
    var medicion = await laLogica.buscarMedicion(); // Busca la medicion con el ID 2 llamando a la función buscarMedicion de la clase Logica (a la promesa)
    //Comprueba que el ID debe ser 2
    assert.equal(medicion[0].muestra, 1234); // Comprueba que el ID de la medicion es 2
  }); // it
  // ....................................................
  // ....................................................
  it("puedo insertar una medicion", async function () {
    // Puedo insertar una NUEVA medicion en la base de datos
    // Función asíncrona para insertar valores y comprobar que se han insertado con callback
    await laLogica.insertarMedicion(
      // Inserta una medicion llamando a la función insertarMedicion de la clase Logica (a la promesa)
      {
        // Valores de la medicion a insertar
        muestra: 53, // Muestra de la medicion
        tipo: "Ozono", // Tipo de la medicion
        fecha: "2020-01-02", // Fecha de la medicion
        usuario: "Carlos", // Usuario de la medicion
        latitud: 30.999512724144 + 0.01125,
        longitud: -1.1640109 + 0.12125,
      }
    );
    //Busca la medicion con el ID 2
    var medicion = await laLogica.buscarMedicion(); // Busca la medicion con el ID 2 llamando a la función buscarMedicion de la clase Logica (a la promesa)
    //Comprueba que el ID debe ser 2
    assert.equal(medicion[0].muestra, 1234); // Comprueba que el ID de la medicion es 2
  }); // it
  // ....................................................
  // ....................................................
  it("cerrar conexión a la base de datos", async function () {
    // Cierra la conexión a la base de datos
    // Función asíncrona para cerrar la conexión a la base de datos
    try {
      // Intenta cerrar la conexión a la base de datos
      await laLogica.cerrar(); // Cierra la conexión a la base de datos
    } catch (err) {
      // Si hay error
      throw new Error("cerrar conexión a BD fallada: " + err); // Lanza un error
    }
  }); // it
}); // describe
