import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateEmail, updatePassword, updateProfile, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
// .................................................................
// email,password:str
// -->
// registrar_usuario_correo_contrasenya() -->
// 
// .................................................................

export default class FirebaseUtil{
   

    async init()
    {
        var metodo = this;
    }   
    
    // .................................................................
    // email,password:str
    // -->
    // registrar_usuario_correo_contrasenya() -->
    // 
    // .................................................................
    async registrar_usuario_correo_contrasenya( email, password)
    {
        var metodo = this;
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
            window.location.replace("./usuario.html");
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
    async iniciar_sesion_correo_contrasenya( email, password)
    {
        var metodo = this;
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
            window.location.replace("./usuario.html");
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
    async iniciar_sesion_proveedor_google()
    {
        var metodo = this;
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
            window.location.replace("./usuario.html");
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

    async mostrar_nombre()
    {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        // Initialize Firebase Authentication and get a reference to the service
        const auth = getAuth(app);
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

    async editar_perfil()
    {
        var metodo = this;
        //En esta funcion se llama a updateProfile(),  updateEmail(), updatePassword)() funcion de la 
        //api de Firebase que nos permitira entrar con la cuenta de usuario de google siguientes argumentos:
        //updateProfile()
        //user:	currentUser	La instancia del usuario con sesion activa .
        //displayName: str	Nombre del usuario
        //photoURL: str Referencia a la imagen de usuario
        //updateEmail()
        //user:	currentUser	La instancia del usuario con sesion activa .
        //email: str Correo nuevo 
        

        let nombre = document.getElementById("cambiarNombreTXT")
        let email = document.getElementById("cambiarCorreoTXT")

        const auth = getAuth();
        const user = auth.currentUser
        console.log(user)
        if(nombre.value !== "")
        {
            updateProfile(user, {
                displayName: nombre.value, photoURL: ""
            })
            console.log("Nombre cambiado")
        }
        if(email.value !== "")
        {
            updateEmail(user, email.value)
            console.log("Email cambiado")

        }
       
    } 
}


