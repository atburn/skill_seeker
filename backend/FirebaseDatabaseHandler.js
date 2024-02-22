import { getDatabase, ref, onValue } from "firebase/database";

// const API_URL = "https://skill-seeker-460-default-rtdb.firebaseio.com/";

// https://firebase.google.com/docs/database/web/read-and-write
export default class FirebaseDatabaseHandler {

    constructor() {


    }

    static async getDatabaseEntry(key) {
        const db = getDatabase();
        const reference = ref(db, key);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        }, (error) => console.error(error));
    }


}