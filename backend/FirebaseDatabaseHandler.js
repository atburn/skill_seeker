import axios from "axios";

const API_URL = "https://skill-seeker-460-default-rtdb.firebaseio.com/";


export default class FirebaseDatabaseHandler {

    constructor() {


    }

    static async getDatabaseEntry(key) {
        if (!key) {
            console.error("Error with key: " + key);
            return;
        }
        
        axios.get(`${API_URL}${key}.json`, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                
                console.log(response.data);
            })
            .catch(error => {
                console.error(`Error retrieving entry with key: ${key}`);
                console.error(error.response.statusText);

            });
    }







}