// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// LogicaFake.js
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
import firebaseutil from "./firebase_util.js"
const IP_PUERTO = "http://localhost:8080";
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
export default class LogicaFake {

    // ---------------------------------------------------------
    // ---------------------------------------------------------
    async init() {
        var metodo = this;
   
    }
    // ---------------------------------------------------------
    // ---------------------------------------------------------

    /*
    * brief: Muestra el nombre del usuario
    * @returns mostrarNombre: string
    */

    async mostrar_nombre()
    {
        console.log("HOLA")
        var util = new firebaseutil()
        await util.mostrar_nombre()
    }

    // ---------------------------------------------------------
    // ---------------------------------------------------------

    /*
    * brief:Busca la muestra en la base de datos
    * @param {JSON}: {error: string, mediciones: Medicion[]}
    * @returns Muestra
    * @throws {Error}: Si hay un error en la peticion
    */

    async buscar_muestra() {
        console.log("EMPIEZA LA EJECUCION DE: buscar_muestra()")

		var metodo = this;
        //Se crea la peticion /muestra
		var url = IP_PUERTO + '/Medicion'
		await fetch(url , {
            method: 'GET',
            headers: new Headers(
            //Partes del header que se han añadido para 
            //posibilitar la comunicacion con el servidor REST
            { 'Users-Agent' : 'Daniel',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'}),
            mode: "cors"
            

        }) 
        //Se recoge el JSON de la cabecera de la respuesta 
        .then(response => response.json())
        //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
        .then(data => 
            this.cargarMuestra(data)
            )
        .catch(err => console.error(err));
         
		console.log("ACABA LA EJECUCION DE: buscar_muestra()")
    }

    // ---------------------------------------------------------
    // ---------------------------------------------------------
	
    /*
    * brief: Carga la muestra en la base de datos
    * @param {JSON}: {error: string, mediciones: Medicion[]}
    * @returns {void}
    * @throws {Error}: Si hay un error en la peticion
    */

    cargarMuestra( data ){
        console.log("EMPIEZA LA EJECUCION DE: cargarMuestra()")

        var metodo = this
        console.log(data.toString())
		document.getElementById("valorMuestraTxt").textContent = "Valor de la muestra: " + data[0].muestra  + " : " + data[0].fecha;

        console.log("ACABA LA EJECUCION DE: cargarMuestra()")
	}

    // ---------------------------------------------------------
    // ---------------------------------------------------------

    
    /*
    * brief: Determina si el usuario es administrador 
    * @param {string}: email
    * @returns {boolean}    
    * @throws {Error}: Si hay un error en la peticion
    * @throws {Error}: Si el usuario no existe
    */


    async EsUserAdmin(email) {
		var metodo = this;
        //Se crea la peticion /muestra
		var url = IP_PUERTO + '/Roles?email=' + email
        console.log(url)
		await fetch(url , {
            method: 'GET',
            headers: new Headers(
            //Partes del header que se han añadido para 
            //posibilitar la comunicacion con el servidor REST
            { 'Users-Agent' : 'Carlos',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'}),
            mode: "cors"
            

        }) 
        //Se recoge el JSON de la cabecera de la respuesta 
        .then(response => {console.log(response.json())})
        /*
        //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
        .then(data => 
            this.cargarMuestra(data)
            )
        .catch(err => console.error(err));
         */
    }

    // ---------------------------------------------------------
    // ---------------------------------------------------------

    
    /*
    * brief:Busca la muestra en la base de datos
    * @param {JSON}: {error: string, mediciones: Medicion[]}
    * @returns Muestra
    * @throws {Error}: Si hay un error en la peticion
    */

    async buscar_micro() {
        console.log("EMPIEZA LA EJECUCION DE: Micros()")

		var metodo = this;
        //Se crea la peticion /muestra
		var url = IP_PUERTO + '/Micros'
		await fetch(url , {
            method: 'GET',
            headers: new Headers(
            //Partes del header que se han añadido para 
            //posibilitar la comunicacion con el servidor REST
            { 'Users-Agent' : 'Daniel',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'}),
            mode: "cors"
            

        }) 
        //Se recoge el JSON de la cabecera de la respuesta 
        .then(response => response.json())
        //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
        .then(data => 
            this.cargarMicro(data)
            )
        .catch(err => console.error(err));
         
		console.log("ACABA LA EJECUCION DE: buscar_micro()")
    }

    cargarMicro( data ){
        console.log("EMPIEZA LA EJECUCION DE: cargarMuestra()")

        var metodo = this
        console.log(data) // data es un array que tiene 3 objetos
        
		document.getElementById("idSensor").textContent = data[0].IdMicro;
        document.getElementById("correoUsuario").textContent = data[0].correoUser;
        document.getElementById("ultimaVez").textContent = data[0].UltimaVezActivo;
        document.getElementById("disponibilidad").textContent = data[0].Disponibilidad;

        console.log("ACABA LA EJECUCION DE: cargarMuestra()")
	}

}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

