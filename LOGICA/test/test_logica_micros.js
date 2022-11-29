// ........................................................
// test_logica_micros.js
// ........................................................
const LogicaMicros = require("../Logicamicros.js") // Añadimos la clase Logica 
var assert = require("assert") // Añadimos assert para hacer pruebas
// ........................................................
// main ()
// ........................................................
describe("Test 2: Conectar, añadir, comprobar y cerrar [Micros]", function () { // Test 1 
    // ....................................................
    // ....................................................
    var laLogica = null // La clase Logica vale null para poder asignarle un valor
    // ....................................................
    // ....................................................
    it("conectar a la base de datos", function (hecho) { // Conectar a la base de datos 
        laLogicaMicros = new LogicaMicros(
            "../bd/datos.bd", // Nombre de la base de datos
            function (err) { // Callback
                if (err) { // Si hay error
                    throw new Error("No he podido conectar con datos.db") // Lanza un error
                }
                hecho() // Sino, termina
            })
    }) // it

    it("puedo insertar un micro", // Puedo insertar un micro nuevo en la base de datos
    async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
        await laLogicaMicros.anyadirDatos( 
            {   correoUser: 'prueba23@gmail.com',
                IdMicro: 123456,
                Disponibilidad: true, 
                UltimaVezActivo: '2020-01-01' 
            })
        var micro = await laLogicaMicros.obtenerMicrosPorCorreo('prueba23@gmail.com') 
        assert.equal(micro[0].correoUser, "prueba23@gmail.com") 
        
    }) // it
// ....................................................
// ....................................................
    it("puedo buscar un micro activo", // Puedo buscar la ultimamedicion en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            var micro = await laLogicaMicros.obtenerMicrosActivos() // Busca la medicion con el ID 2 llamando a la función buscarMedicion de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            assert.equal(micro[0].IdMicro, 111)
            
        }) // it
    // ....................................................
    // ....................................................
    
    it("puedo actualizar disponibilidad", // Puedo buscar la ultimamedicion en la base de datos
    async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
        await laLogicaMicros.actualizarDisponibilidad("123456") // Busca la medicion con el ID 2 llamando a la función buscarMedicion de la clase Logica (a la promesa)
        var micro = await laLogicaMicros.obtenerMicrosPorCorreo('prueba23@gmail.com') 
        console.log(micro)
        assert.equal(micro[0].Disponibilidad, 0) // Comprueba que el ID de la medicion es 2
        
    }) // it
    // ....................................................
    // ....................................................

    
    it("cerrar conexión a la base de datos", // Cierra la conexión a la base de datos 
        async function () { // Función asíncrona para cerrar la conexión a la base de datos
            try { // Intenta cerrar la conexión a la base de datos
                await laLogicaMicros.cerrar() // Cierra la conexión a la base de datos
            } catch (err) { // Si hay error
                throw new Error("cerrar conexión a BD fallada: " + err) // Lanza un error
            }
        }) // it
}) // describe