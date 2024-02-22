// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArlJtYhZe_hquSJNo8NUGpoPeGGWxOYyY",
    authDomain: "skill-seeker-460.firebaseapp.com",
    databaseURL: "https://skill-seeker-460-default-rtdb.firebaseio.com",
    projectId: "skill-seeker-460",
    storageBucket: "skill-seeker-460.appspot.com",
    messagingSenderId: "447956707903",
    appId: "1:447956707903:web:cb2b5acdbde7c5cc33268a",
    measurementId: "G-CM8KQ7NWMB"
};

export default class FirebaseAuthHandler {

    constructor() {

    }

    static start() {
        const firebaseApp = initializeApp(firebaseConfig);
        this.hasStarted = true;

    }


    static createUser(email, password) {
        if (this.hasStarted == false) {
            console.error("createUser() has been called before start()");
            return;
        }

        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Created a new user with email: " + email)
                // console.log(userCredential.user);
                FirebaseAuthHandler.user = userCredential.user;
            })
            .catch((error) => {
                console.error("Error creating a new user:");
                console.error(`Error code: ${error.code}`);
                console.error(error.message);
            });
    }

    static signInUser(email, password) {
        if (this.hasStarted == false) {
            console.error("createUser() has been called before start()");
            return;
        }
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Signed in user with email: " + email);
                FirebaseAuthHandler.user = userCredential.user;
                // console.log(userCredential.user);
            })
            .catch((error) => {
                console.error(`Error signing in user with email (${email}):`);
                console.error(`Error code: ${error.code}`);
                console.error(error.message);
            });
    }
}















