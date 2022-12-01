
// ...............................................................................................................
// ...............................................................................................................

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateEmail, updatePassword, updateProfile, onAuthStateChanged, setPersistence, browserSessionPersistence , sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

// ...............................................................................................................
// ............................................................................................................... 

import logica_fake from "./logica_fake.js"
var logica = new logica_fake();

// ...............................................................................................................
// ...............................................................................................................

export default class FirebaseUtil{
   
    // .................................................................
    // .................................................................

    async init(user)
    {
        var metodo = this;
    }   
    
    // .................................................................
    // .................................................................
    // email,password:str
    // -->
    // registrar_usuario_correo_contrasenya() -->
    //En esta funcion se llama a createUserWithEmailAndPassword(), funcion de la api de Firebase
        //que nos permitira crear un usuario nuevo con los siguientes argumentos:
        //auth:	Autorización	La instancia de autenticación .
        //Email: str	La dirección de correo electrónico de los usuarios.
        //password: str	La contraseña de los usuarios. 
    // .................................................................
    // .................................................................

    /*
        @biref: Funcion que se encarga de cerrar la sesion del usuario
        @param {string} email
        @param {string} password
        @return {string} mensaje de error

    */
    async registrar_usuario_correo_contrasenya( email, password)
    {
        var metodo = this;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                logica.asignarRol(email)
                modal3.showModal();
                // ...
            });
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.escribir_mensaje_error(errorMessage)
            return errorMessage
        });
    }

    // .................................................................
    // .................................................................
    // email,password:str
    // -->
    // iniciar_sesion_correo_contrasenya() -->
    // En esta funcion se llama a signInWithEmailAndPassword(), funcion de la api de Firebase
        //que nos permitira iniciar la sesion de un usuario registrado con los siguientes argumentos:
        //auth:	Autorización	La instancia de autenticación .
        //Email: str	La dirección de correo electrónico de los usuarios.
        //password: str	La contraseña de los usuarios.
    // .................................................................
    // .................................................................

    /*

        @biref: Funcion que se encarga de iniciar sesion con el correo y la contrasenya
        @param {string} email
        @param {string} password
        @return {string} mensaje de error
    */

    async iniciar_sesion_correo_contrasenya( email, password)
    {
        var metodo = this;
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            if (auth.currentUser.emailVerified) {
                // Signed in 
                const user = auth.currentUser.user;
  
                var respuesta = await logica.EsUserAdmin(email);
                
                // ...
            } else {
                // User is signed out
                // ...
                //window.location.replace("./correo_no_confirmado.html");
                no_confirmado.showModal();
            }
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.escribir_mensaje_error(errorMessage)
            return errorMessage
        });
        
    }

    // .................................................................
    // .................................................................
    // email,password:str
    // -->
    // iniciar_sesion_correo_contrasenya() -->
    //En esta funcion se llama a updateProfile(),  updateEmail(), updatePassword)() funcion de la 
        //api de Firebase que nos permitira entrar con la cuenta de usuario de google siguientes argumentos:
        //updateProfile()
        //user:	currentUser	La instancia del usuario con sesion activa .
        //displayName: str	Nombre del usuario
        //photoURL: str Referencia a la imagen de usuario
        //updateEmail()
        //user:	currentUser	La instancia del usuario con sesion activa .
        //email: str Correo nuevo
    // .................................................................
    // .................................................................

    /*
        @biref: Funcion que se encarga de iniciar sesion con la cuenta de google
        @return {string} mensaje de error
    */
    async iniciar_sesion_proveedor_google()
    {
        var metodo = this;

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        
        signInWithPopup(auth, provider)
        .then((result) => {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                if (auth.currentUser.emailVerified) {
                    // Signed in 
                    const user = auth.currentUser.user;
                    console.log(user)

                    //var respuesta = logica.EsUserAdmin(email);
                   /* 
                   var respuesta = await logica.EsUserAdmin(email);
                    if(respuesta.rol == "admin"){ ejecutar pagina de administrador} else{ pagina de usuaario}
                    */

                    window.location.replace("./usuario.html");
                    // ...
                } else {
                    // User is signed out
                    // ...
                    window.location.replace("./correo_no_confirmado.html");
                }
            });
            
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
        
        
    }

    // .................................................................
    // .................................................................
    // mostrar_nombre() --> nombre:str
    // .................................................................
    // .................................................................

    /*
        @biref: Funcion que se encarga de mostrar el nombre del usuario
        @return {string} nombre del usuario
    */

    async mostrar_nombre()
    {
        const auth = getAuth();
        document.onreadystatechange = function () {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    console.log(user.getCreationTimestamp)
                    document.getElementById("nombreUsuarioTxt").textContent = user.displayName
                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            });

        }
    }

    // .................................................................
    // .................................................................
    // url --> editar_perfil() --> url:str
    // .................................................................
    // .................................................................

    /*
        @biref: Funcion que se encarga de actualizar el perfil
        @param {string} url
        @return {string} mensaje de error

    */

    async editar_perfil()
    {
        var metodo = this;
        let nombre = document.getElementById("cambiarNombreTXT")
        let email = document.getElementById("cambiarCorreoTXT")

        const auth = getAuth();
        const user = auth.currentUser
        console.log(nombre.value)
        if(nombre.value !== "")
        {
            updateProfile(user, {
                displayName: nombre.value
            })
            console.log("Nombre cambiado")
        }
        if(email.value !== "")
        {
            updateEmail(user, email.value).then((result) => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                        window.location.replace("./index.html");
                        // ...
                });
                
            })
            console.log("Email cambiado")

        } 
       
    } 

    // .................................................................
    // .................................................................
    // url --> mostrar_info_usuario() --> url:str
    // .................................................................
    // .................................................................

    /*
        @biref: Funcion que se encarga de mostrar la informacion del usuario
        @param {string} url
        @return {string} mensaje de error

    */

    async mostrar_info_usuario(user)
    {
             console.log(user)
                if (user) {
                    console.log("Info puesta")
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    document.getElementById("nombreUsuarioTxt").textContent = user.displayName
                    document.getElementById("correoUsuarioTxt").textContent = user.email
                    if(document.getElementById("fechaUsuarioTxt")){
                        document.getElementById("fechaUsuarioTxt").textContent = new Date(user.metadata.creationTime)
                    }
                    // ...
                    
                } else {
                    // User is signed out
                    // ...
                }

    }

    // .................................................................
    // .................................................................
    // imagesref --> mostrar_imagen_usuario() --> url:str
    // .................................................................
    // .................................................................

    /*
        @biref: Funcion que se encarga de mostrar la imagen del usuario
        @param {string} url
        @return {string} mensaje de error

    */
    
    async mostrar_imagen_usuario(imagesRef)
    {
        
        const storage = getStorage();
        getDownloadURL(imagesRef)
                .then((url) => {
                    // `url` is the download URL for 'images/{uid}'
                    document.getElementById("imgUsuario").setAttribute('src', url);
                })
                .catch((error) => {
                    // Handle any errors
                });
    }

    // .................................................................
    // .................................................................
    // error --> mostrar_error() --> error:str
    // .................................................................
    // .................................................................

    /*
        @biref: Funcion que se encarga de mostrar el error
        @param {string} error
        @return {string} mensaje de error

    */
   
    async escribir_mensaje_error(errorMessage)
    {
        var metodo = this;
        console.log(errorMessage)

        if(errorMessage.includes("email"))
        {
            console.log("Mail: " + errorMessage)
            var email = document.getElementById("error").textContent = "Compruebe que ha introducido bien la direccion de correo."
            return
        } 
        if(errorMessage.includes("password"))
        {
            console.log("Pass: " + errorMessage)
            var email = document.getElementById("error").textContent = "Compruebe que ha introducido bien las contraseñas. \n Deben tener 6 caracteres minimo"
            return

        }
        else{
            var email = document.getElementById("error").textContent = "Rellene los campos correctamente."
            return
        }
    }
}


