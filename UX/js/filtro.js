import logicaFake from "./logica_fake.js"


export default class Filtro {

    async init() {
        var metodo = this
        
    }

    filtrar_por_correo(datos, correo)
    {
        var logica = new logicaFake();  
        console.log(datos)
        console.log("Comienza el filtrado")
        var datos_cargar = []
        correo = correo.replace(" ", "")
        for( var i = 0; i< datos.length; i++){
            console.log(datos[i].correoUser)
            if(datos[i].correoUser === correo){
                datos_cargar.push(datos[i])
            }
        }
        
        console.log("Filtrada por correo")
        console.log( datos_cargar)
        logica.cargarMicro(datos_cargar)
        
    }

    filtrar_por_disponibilidad(datos)
    {         
        var logica = new logicaFake();  
        console.log(datos)
        console.log("Comienza el filtrado")
        var datos_cargar = []
        for( var i = 0; i< datos.length; i++){
            console.log(datos[i])
            if(datos[i].Disponibilidad == false){
                datos_cargar.push(datos[i])
            }
        }
        
        console.log("Filtrada por disponibilidad")
        console.log( datos_cargar)
        logica.cargarMicro(datos_cargar)
         
    }

    filtrar_por_idMicro(datos, idMicro)
    {
        var logica = new logicaFake();  
        console.log(datos)
        console.log("Comienza el filtrado")
        var datos_cargar = []
        for( var i = 0; i< datos.length; i++){
            console.log(datos[i])
            if(datos[i].IdMicro == idMicro){
                datos_cargar.push(datos[i])
            }
        }
        
        console.log("Filtrada por micro")
        console.log( datos_cargar)
        logica.cargarMicro(datos_cargar)
    }

}