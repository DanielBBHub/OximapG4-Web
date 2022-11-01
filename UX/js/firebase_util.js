import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
// .................................................................
// email,password:str
// -->
// registrar_usuario_correo_contrasenya() -->
// 
// .................................................................
export async function registrar_usuario_correo_contrasenya( email, password)
{
    //En esta funcion se llama a createUserWithEmailAndPassword(), funcion de la api de Firebase
    //que nos permitira crear un usuario nuevo con los siguientes argumentos:
    //auth:	Autorización	La instancia de autenticación .
    //Email: str	La dirección de correo electrónico de los usuarios.
    //password: str	La contraseña de los usuarios. 
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
    });
}

// .................................................................
// email,password:str
// -->
// iniciar_sesion_correo_contrasenya() -->
// 
// .................................................................
export async function iniciar_sesion_correo_contrasenya( email, password)
{
    //En esta funcion se llama a signInWithEmailAndPassword(), funcion de la api de Firebase
    //que nos permitira iniciar la sesion de un usuario registrado con los siguientes argumentos:
    //auth:	Autorización	La instancia de autenticación .
    //Email: str	La dirección de correo electrónico de los usuarios.
    //password: str	La contraseña de los usuarios.
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });
}

