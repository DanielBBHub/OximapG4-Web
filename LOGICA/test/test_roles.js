// ........................................................
// mainTest1.js
// ........................................................
const Logica = require("../LogicaRol.js") // Añadimos la clase Logica 
var assert = require("assert") // Añadimos assert para hacer pruebas
// ........................................................
// main ()
// ........................................................
describe("Test 3: Conectar, añadir, comprobar y cerrar [Roles]", function () { // Test 1 
    // ....................................................
    // ....................................................
    var laLogicaRol = null // La clase Logica vale null para poder asignarle un valor
    // ....................................................
    // ....................................................
    it("conectar a la base de datos", function (hecho) { // Conectar a la base de datos 
        laLogicaRol = new Logica(
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
    it("puedo buscar un admin", // Puedo buscar la ultimamedicion en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            var usuario = await laLogicaRol.esUsuarioAdmin("carlosipiens@gmail.com") // Busca la medicion con el ID 2 llamando a la función buscarMedicion de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            assert.equal(usuario[0].rol, "admin") // Comprueba que el ID de la medicion es 2
            
        }) // it
    // ....................................................
    // ....................................................
    it("puedo insertar un admin", // Puedo insertar una NUEVA medicion en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            await laLogicaRol.asignarRol( // Inserta una medicion llamando a la función insertarMedicion de la clase Logica (a la promesa)
                {
                    correo: "damnriven00@gmail.com", 
                    rol: "admin",    
                })
            //Busca la medicion con el ID 2
            var usuario = await laLogicaRol.esUsuarioAdmin("damnriven00@gmail.com") // Busca la medicion con el ID 2 llamando a la función buscarMedicion de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            assert.equal(usuario[0].rol, "admin") // Comprueba que el ID de la medicion es 2
            
        }) // it
    // ....................................................
    // ....................................................
    it("cerrar conexión a la base de datos", // Cierra la conexión a la base de datos 
        async function () { // Función asíncrona para cerrar la conexión a la base de datos
            try { // Intenta cerrar la conexión a la base de datos
                await laLogicaRol.cerrar() // Cierra la conexión a la base de datos
            } catch (err) { // Si hay error
                throw new Error("cerrar conexión a BD fallada: " + err) // Lanza un error
            }
        }) // it
}) // describe