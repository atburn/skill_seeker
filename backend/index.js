
// retrieve necessary files (express and cors)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const PORT = 2000;
const app = express(express.json);
app.use(cors());
app.use(bodyParser.json());


const mongoDBConnectionString = "mongodb+srv://skill-seeker-admin:admin@skill-seeker.dbyn3zl.mongodb.net/skill-seeker-db?retryWrites=true&w=majority&appName=skill-seeker";
mongoose.connect(mongoDBConnectionString);


app.listen(PORT, () => {
    console.log("Listening at http://localhost:" + PORT);
})

import User from "./objects/User.js";




/**
 * GET: Get all users:
 * http://localhost:2000/users/
 * 
 * Status codes:
 *  200: Success
 *  500: Error
 * 
 */
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving users." })
    }
})


/**
 * Get: Get a user by UID
 * http://localhost:2000/users/{UID}
 * 
 * Status Codes:
 *      500: Could not find user.
 *      201: Found user
 *          Returns the user found.
 */
app.get("/users/:uid", async (req, res) => {

    try {
        const uid = req.params.uid;
        const users = await User.find({ uid: uid });
        if (users.length === 0) {
            res.status(500).json({ "Error": "No matching users with the UID of " + uid });
        } else {
            res.status(200).json(users);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "No matching users with the UID of " + uid });
    }
});


/**
 * POST: Sign up with name, email, and password
 * http://localhost:2000/users/signup
 *
 * Expected body:
 * {
 *  uid: "uid",
 *  displayName: "<name>",
 *  email: "<email>",
 * }
 *
 * Successful response:
 * {
 *  Success: "Successfully logged in user.",
 *  user: {
 *      displayName: <name>,
 *      email: <email>,
 *      uid: <uid>
 *  }
 * }
 *
 */
app.post("/users/signup", async (req, res) => {
    const uid = req.body.uid;
    const email = req.body.email;
    const name = req.body.name;

    try {
        const user = new User(
            {
                uid: uid,
                name: name,
                email: email,
                summary: "",
                title: "",
                experience: [],
                education: []
            });
        await user.save();
        res.status(201).json(user);


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create new user with UID: " + uid })

    }

});

/**
 * PUT: Updates a user. User must provide all information.
 * 
 * Example request body:
 * {
 *  "uid": <uid>,
 *  "name": <name>,
 *  "email": <email>,
 *  "title": Supervisor,
 *  "summary": "I am a supervisor",
 *  "education": {
 *      "school": "UW",
 *      "degree": "BS",
 *      "fieldOfStudy": "Comp Sci",
 *      "startDate": "03/2022",
 *      "endDate": null,
 *      "summary": "learned CS",
 *      "GPA": 3.9
 *  },
 *  "experience": {
 *      "title": "Supervisor",
 *      "company": "UW",
 *      "location": "Tacoma, WA",
 *      "startDate": "04/2022",
 *      "endDate": null,
 *      "summary": "Supervised things"
 *  }
 * }
 * 
 * 
 * Status Codes:
 *  201: Profile has been updated.
 *      Sends updated user
 *  401: Unauthorized: sender UID doesn't match modifed user UID
 *  500: Server error
 * 
 */
app.put("/users/:uid", async (req, res) => {
    const parameters = req.params;
    const body = req.body;

    const profileToModify = parameters.uid;
    const senderUid = body.uid;

    if (profileToModify !== senderUid) {
        res.status(500).json({
            error: "UID of sender doesn't match UID of the modifed profile.",
            senderUid: senderUid,
            requestUid: profileToModify
        })
        return;
    }

    const name = body.name;
    const email = body.email;
    const title = body.title;
    const summary = body.summary;
    const education = body.education;
    const experience = body.experience;

    try {
        const user = {
            uid: profileToModify,
            name: name,
            email: email,
            summary: summary,
            title: title,
            experience: experience,
            education: education
        };
        const updatedUser = await User.findOneAndUpdate({ uid: profileToModify }, user, { new: true })
        res.status(201).json(updatedUser);

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Could not modify contents for UID: " + profileToModify })

    }


});




import Company from "./objects/Company.js";

/**
 * GET: Get all companies:
 * http://localhost:2000/companies/
 * 
 * Status codes:
 *  200: Success
 *  500: Error
 * 
 */
app.get("/companies", async (req, res) => {
    try {
        const company = await Company.find();
        res.status(200).json(company);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving companies." })
    }
});



app.get("/companies/:uid", async (req, res) => {

    try {
        const uid = req.params.uid;
        const company = await Company.find({ uid: uid });
        if (company.length === 0) {
            res.status(500).json({ "Error": "No matching users with the UID of " + uid });
        } else {
            res.status(200).json(company);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "No matching users with the UID of " + uid });
    }
});


app.post("/companies/new", async (req, res) => {
    const uid = req.body.uid;
    const email = req.body.email;
    const name = req.body.name;

    try {
        const company = new Company(
            {
                uid: uid,
                name: name,
                email: email,
                summary: "",
            });
        await company.save();
        res.status(201).json(company);


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create new company with UID: " + uid })

    }

});



app.put("/companies/:uid", async (req, res) => {
    const parameters = req.params;
    const body = req.body;

    const companyToModify = parameters.uid;
    const senderUid = body.uid;

    if (companyToModify !== senderUid) {
        res.status(500).json({
            error: "UID of sender doesn't match UID of the modifed company.",
            senderUid: senderUid,
            requestUid: companyToModify
        })
        return;
    }

    const name = body.name;
    const email = body.email;
    const summary = body.summary;

    try {
        const company = {
            uid: companyToModify,
            name: name,
            email: email,
            summary: summary,
        };
        const updatedCompany = await Company.findOneAndUpdate({ uid: companyToModify }, company, { new: true })
        res.status(201).json(updatedCompany);

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Could not modify contents for UID: " + companyToModify })

    }


});