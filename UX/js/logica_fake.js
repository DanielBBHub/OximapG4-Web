// ---------------------------------------------------------------------
// LogicaFake.js
// ---------------------------------------------------------------------

const IP_PUERTO = "http://localhost:8080";
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
export default class LogicaFake {

    async init() {
        var metodo = this;
    }

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

	
    // .................................................................
    // muestra,fecha:Texto
    // -->
    // cargarMuestra() -->
    // .................................................................
    cargarMuestra( data ){
        console.log("EMPIEZA LA EJECUCION DE: cargarMuestra()")

        var metodo = this
		document.getElementById("valorMuestraTxt").textContent = "Valor de la muestra: " + data[0].muestra  + " : " + data[0].fecha;

        console.log("ACABA LA EJECUCION DE: cargarMuestra()")
	}
}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

