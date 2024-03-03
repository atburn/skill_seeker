// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

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



/**
 * HOW TO USE:
 * 
 * FIRST THING YOU NEED TO CALL IS FirebaseAuthHandler.start() INITIALLY.
 * 
 * TO SIGN IN USER:
 *  FirebaseAuthHandler.signInUser("some email", "some password")
 *      .then((data) => console.log(data)) 
 * 
 * // DATA WILL EITHER BE NULL OR A UID. IF ITS NULL, UNSUCCESSFUL LOGIN. IF ITS A UID, SAVE IT SOMEWHERE.
 * 
 */
export default class FirebaseAuthHandler {

    constructor() {

    }

    static start() {
        const firebaseApp = initializeApp(firebaseConfig);
        this.hasStarted = true;
    }


    static async createUser(email, password) {
        if (this.hasStarted == false) {
            console.error("createUser() has been called before start()");
            return;
        }

        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                return data.user.uid;
            })
            .catch((error) => {
                return null;
            });

    }

    static async signInUser(email, password) {
        if (this.hasStarted == false) {
            console.error("createUser() has been called before start()");
            return;
        }
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((data) => {
                return data.user.uid;
            })
            .catch((error) => {
                return null;
            });

    }

    static async sendPasswordResetEmail(email) {
        const auth = getAuth();
        return sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Password reset email sent');
            })
            .catch((error) => {
                console.error('Error sending password reset email:', error);
            });
    }
}

