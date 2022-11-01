import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
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

// .................................................................
// email,password:str
// -->
// iniciar_sesion_correo_contrasenya() -->
// 
// .................................................................
export async function iniciar_sesion_proveedor_google()
{
    //En esta funcion se llama a signInWithPopup(), funcion de la api de Firebase
    //que nos permitira entrar con la cuenta de usuario de google siguientes argumentos:
    //auth:	Autorización	La instancia de autenticación .
    //provider: GoogleAuthProvider	El proveedor de la autentificación
    
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
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