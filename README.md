# PROYECTO DE BIOMETRIA

# Repositorio web

# EEste repositorio contiene el programa que se encarga de recoger peticiones rest y realizar consultas a una BD, asi como mostrarla por pantalla mediante una web.

Lo primero que se ha de hacer es instalar las dependencias necesarias para cada paquete del proyecto. Para esto utilizaremos el siguiente comando, tanto en la dirección de la carpeta Logica_negocio como en ServidorREST:

npm install

Este comando instalara las dependencias de Mocha y SQLite3 para el paquete de Logica de negocio, que es la que se encargara de las consultas a la base de datos, además de instalar las dependencias de Mocha, CORS, Express, Request y SQLite3

(necesario el uso de los modulos npm y node)

Para poder hacer servir el servicio del servidor REST, uno se ha de colocar en el directorio ServidorREST y ejecutar en la consola el siguiente comando:

npm run servidor.

Este comando se encargara de ejecutar el archivo main_servidor_rest.js, el cual esta escrito para que levante una instancia de Express en el puerto 8080 de la maquina

En cuanto a la parte de la interfaz de la página, sera necesario que se habilite un puerto HTTP para que desde la página se puedan hacer la petición GET al servidor antes descrito. Para esta tarea, en el tiempo de desarrollo, se ha ejecutado el siguiente comando:

python -m http.server 8000

No es necesario que sea precisamente python, con cualquier herramienta que levante un puerto HTTP puede servir


