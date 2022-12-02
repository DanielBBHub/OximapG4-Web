function obtenerMedicion() {
    var temp = Math.random() * (30 - 10) + 10;
    var hum = Math.random() * (100 - 10) + 10;
    var lum = Math.random() * (100 - 10) + 10;
    var sal = Math.random() * (100 - 10) + 10;
    var fecha = new Date()
    var segundos = fecha.getSeconds()
    var minutos = fecha.getMinutes()
    var horas = fecha.getHours()
    var mes= fecha.getUTCMonth()+1
    var año=fecha.getFullYear()
    var dia=fecha.getDate()
    var tiempo = horas + ":" + minutos + ":" + segundos
    var Fecha= año+'-'+mes+'-'+dia;
    return {
        temperatura: Math.round(temp),
        humedad: Math.round(hum),
        luminosidad: Math.round(lum),
        salinidad: Math.round(sal),
        fecha: Fecha,
        hora: tiempo
    }

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function f1() {

    var medicion = obtenerMedicion()
    console.log(medicion)
    //document.getElementById("output").textContent = medicion;
    let datasensor = new FormData();

    datasensor.append("temperatura", medicion.temperatura.toString());
    datasensor.append("humedad", medicion.humedad.toString());
    datasensor.append("luminosidad", medicion.luminosidad.toString());
    datasensor.append("salinidad", medicion.salinidad.toString());
    datasensor.append("fecha", medicion.fecha.toString())
    datasensor.append("hora", medicion.hora.toString())

//?temp=' + medicion.temperatura +'&'+ 'hum=' + medicion.humedad +';'+ '$lum='+
//     medicion.luminosidad +';'+ '$sal=' + medicion.salinidad +';'
    fetch('../api/v1.0/anyadirmedicion.php', {
            method: "POST",
            body: datasensor
        }
    ).then(function (respuesta) {
        if (respuesta.ok) {
            location.reload()
            //document.getElementById("output").textContent = "Tarea realizada con éxito";
        } else {
            alert("error")
            //document.getElementById("output").textContent = "Algo ha fallado";
        }
    })
}

