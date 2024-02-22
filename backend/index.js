// ----------------------------------------------
// TCSS 460: Winter 2024
// Backend REST Service Module
// ----------------------------------------------
// Express is a Node.js web application framework
// that provides a wide range of APIs and methods
// Express API Reference:
// https://expressjs.com/en/resources/middleware/cors.html

// ----------------------------------------------
// retrieve necessary files (express and cors)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


// retrieve the MySQL DB Configuration Module
// const dbConnection = require("./config")
// use this library for parsing HTTP body requests


// ----------------------------------------------
// (A)  Create an express application instance
//      and parses incoming requests with JSON
//      payloads
// ----------------------------------------------
const app = express(express.json); 

// ----------------------------------------------
// (B)  Use the epxress cors middleware
//      Cross-origin resource sharing (CORS)
//      is a technique that restricts specified
//      resources within web page to be accessed
//      from other domains on which the origin
//      resource was initiated the HTTP request
//      Also use the bodyParser to parse in 
//      format the body of HTTP Requests
// ----------------------------------------------
app.use(cors());
app.use(bodyParser.json());



import FirebaseAuthHandler from "./FirebaseAuthHandler.js";
import FirebaseDatabaseHandler from "./FirebaseDatabaseHandler.js";
FirebaseAuthHandler.start();
FirebaseAuthHandler.signInUser("testuser@test.com", "testpassword");

FirebaseDatabaseHandler.getDatabaseEntry("test");


// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app
// (C)  Create a server such that it binds and
//      listens on a specified host and port.
//      We will use default host and port 3000.
app.listen(2000, () => {
    console.log("Express server is running and listening");
}); 




app.get("/", (request, response) => {
    console.log("here");
})

