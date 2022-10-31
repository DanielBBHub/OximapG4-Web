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
                    ID: "7", Medicion: 5 // Valores de la medicion
                })
            var res = await laLogica.buscarMedicion("7") // Busca la medicion con el ID 5
            assert.equal(res[0].ID, "7", "¿no es 7?") // Comprueba que el ID debe ser 5
            
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