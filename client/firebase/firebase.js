import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyDeY3kco62ikakUtxmiDvXgkGx0_FkyC-Q",
    authDomain: "anon-social-mobile-app.firebaseapp.com",
    projectId: "anon-social-mobile-app",
    storageBucket: "anon-social-mobile-app.appspot.com",
    messagingSenderId: "82126937195",
    appId: "1:82126937195:web:84de9f0fdb7a5e1a18a52e"
};

let app

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = app.firestore()
const auth = app.auth()

export {
    db,
    auth
}