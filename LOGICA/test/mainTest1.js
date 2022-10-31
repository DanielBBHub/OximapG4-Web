// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../Logica.js") // Añadimos la clase Logica 
var assert = require("assert") // Añadimos assert para hacer pruebas
// ........................................................
// main ()
// ........................................................
describe("Test 1: Conectar, añadir, comprobar y cerrar", function () { // Test 1 
    // ....................................................
    // ....................................................
    var laLogica = null // La clase Logica vale null para poder asignarle un valor
    // ....................................................
    // ....................................................
    it("conectar a la base de datos", function (hecho) { // Conectar a la base de datos 
        laLogica = new Logica(
            "../bd/datos.bd", // Nombre de la base de datos
            function (err) { // Callback
                if (err) { // Si hay error
                    throw new Error("No he podido conectar con datos.db") // Lanza un error
                }
                hecho() // Sino, termina
            })
    }) // it
    // ....................................................
    // ....................................................
    it("puedo insertar una medicion", // Puedo insertar una NUEVA medicion en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            await laLogica.insertarMedicion( // Inserta una medicion llamando a la función insertarMedicion de la clase Logica (a la promesa)
                {
                    // Valores de la medicion a insertar
                    id: 2, // ID de la medicion 
                    muestra: 456, // Muestra de la medicion
                    fecha: "2020-01-01", // Fecha de la medicion
                    usuario: "carlos" // Usuario de la medicion
                })
            //Busca la medicion con el ID 2
            var medicion = await laLogica.buscarMedicion(2) // Busca la medicion con el ID 2 llamando a la función buscarMedicion de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            assert.equal(medicion[0].id, 2) // Comprueba que el ID de la medicion es 2
            
        }) // it
    // ....................................................
    // ....................................................
    it("cerrar conexión a la base de datos", // Cierra la conexión a la base de datos 
        async function () { // Función asíncrona para cerrar la conexión a la base de datos
            try { // Intenta cerrar la conexión a la base de datos
                await laLogica.cerrar() // Cierra la conexión a la base de datos
            } catch (err) { // Si hay error
                throw new Error("cerrar conexión a BD fallada: " + err) // Lanza un error
            }
        }) // it
}) // describe