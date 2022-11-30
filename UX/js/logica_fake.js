// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// LogicaFake.js
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
import firebaseutil from "./firebase_util.js";
import filtro from "./filtro.js"
const IP_PUERTO = "http://localhost:8080";
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
export default class LogicaFake {
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  async init() {
    var metodo = this;
    var data;
  }
  // ---------------------------------------------------------
  // ---------------------------------------------------------

  /*
   * brief: Muestra el nombre del usuario
   * @returns mostrarNombre: string
   */

  async mostrar_nombre() {
    console.log("HOLA");
    var util = new firebaseutil();
    await util.mostrar_nombre();
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
    console.log("EMPIEZA LA EJECUCION DE: buscar_muestra()");

    var metodo = this;
    //Se crea la peticion /muestra
    var url = IP_PUERTO + "/Medicion";
    await fetch(url, {
      method: "GET",
      headers: new Headers(
        //Partes del header que se han añadido para
        //posibilitar la comunicacion con el servidor REST
        {
          "Users-Agent": "Daniel",
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      ),
      mode: "cors",
    })
      //Se recoge el JSON de la cabecera de la respuesta
      .then((response) => response.json())
      //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
      .then((data) => this.cargarMuestra(data))
      .catch((err) => console.error(err));

    console.log("ACABA LA EJECUCION DE: buscar_muestra()");
  }

  // ---------------------------------------------------------
  // ---------------------------------------------------------

  /*
   * brief: Carga la muestra en la base de datos
   * @param {JSON}: {error: string, mediciones: Medicion[]}
   * @returns {void}
   * @throws {Error}: Si hay un error en la peticion
   */

  cargarMuestra(data) {
    console.log("EMPIEZA LA EJECUCION DE: cargarMuestra()");

    var metodo = this;
    console.log(data.toString());
    document.getElementById("valorMuestraTxt").textContent =
      "Valor de la muestra: " + data[0].muestra + " : " + data[0].fecha;

    console.log("ACABA LA EJECUCION DE: cargarMuestra()");
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
    var url = IP_PUERTO + "/Roles?email=" + email;
    console.log(url);
    await fetch(url, {
      method: "GET",
      headers: new Headers(
        //Partes del header que se han añadido para
        //posibilitar la comunicacion con el servidor REST
        {
          "Users-Agent": "Carlos",
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      ),
      mode: "cors",
    })
      //Se recoge el JSON de la cabecera de la respuesta
      .then((response) => response.json())
      .then((data) => this.cargarPagina(data));
   
  }

  cargarPagina(data){
    console.log(data[0].rol)
    if (data[0].rol == "admin") {
      console.log("PAGINA ADMIN");
      window.location.replace("./admin.html");
    } else {
      console.log("PAGINA USUARIO");
      window.location.replace("./usuario.html");
    }
   
    
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
    console.log("EMPIEZA LA EJECUCION DE: Micros()");

    var metodo = this;
    //Se crea la peticion /muestra
    var url = IP_PUERTO + "/Micros";
    await fetch(url, {
      method: "GET",
      headers: new Headers(
        //Partes del header que se han añadido para
        //posibilitar la comunicacion con el servidor REST
        {
          "Users-Agent": "Daniel",
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      ),
      mode: "cors",
    })
      //Se recoge el JSON de la cabecera de la respuesta
      .then((response) => response.json())
      //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
      .then((data) => this.cargarMicro(data))
      .catch((err) => console.error(err));

    console.log("ACABA LA EJECUCION DE: buscar_micro()");
  }

  filtrar_tabla()
  {
    let filtro_tabla = new filtro()
    filtro_tabla.filtrar_por_disponibilidad(this.data)
  }

  filtrar_tabla_correo(correo_buscar)
  {
    console.log(correo_buscar)
    let filtro_tabla = new filtro()
    filtro_tabla.filtrar_por_correo(this.data, correo_buscar)
  }

  filtrar_tabla_id(id_buscar)
  {
    console.log(id_buscar)
    let filtro_tabla = new filtro()
    filtro_tabla.filtrar_por_idMicro(this.data, id_buscar)
  }

  cargarMicro(data) {
    console.log("EMPIEZA LA EJECUCION DE: cargarMicros()");

    var metodo = this;
    this.data = data
    console.log(this.data); // data es un array que tiene 3 objetos
    var tam = data.length;

    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.getElementById("tablaBD");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < tam; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");

      if((i+1) % 2 != 0){
        hilera.bgColor = "#eaf4fb";
        console.log(hilera);
      }else{
        hilera.bgColor = "#cdefff";
      }

      for (var j = 0; j < 4; j++) {

        var celda = document.createElement("td");
        if (j == 0) {
          var textoCelda = document.createTextNode(data[i].IdMicro);
        }

        if (j == 1) {
            var textoCelda = document.createTextNode(data[i].correoUser);
            }
        if (j == 2) {
            var textoCelda = document.createTextNode(data[i].UltimaVezActivo);
            }
        if (j == 3) {
            var textoCelda = document.createTextNode(data[i].Disponibilidad);
            }
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }

      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }

    tabla.appendChild(tblBody);

    body.appendChild(tabla);

    console.log("ACABA LA EJECUCION DE: cargarMicros()");
  }

}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
