// retrieve necessary files (express and cors)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const PORT = 2000;
const app = express(express.json);
app.use(cors());
app.use(bodyParser.json());
import swaggerJSdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import mainRoute from './routes/mainRoute.js';
import jobRoute from './routes/jobRoute.js';
const mongoDBConnectionString =
    "mongodb+srv://skill-seeker-admin:admin@skill-seeker.dbyn3zl.mongodb.net/skill-seeker-db?retryWrites=true&w=majority&appName=skill-seeker";
mongoose.connect(mongoDBConnectionString);

// define the routes for our API
app.use('/', mainRoute);
app.use('/job', jobRoute);


// define the Swagger JS DOc configuration
const APIDocOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RESTful Skill Seeker API',
            description: 'An API for Skill Seeker job index.',
            version: '1.0.0',
            servers: ['http://localhost:' + PORT]
        },
    },
    apis: ['./routes/*.js'], // path to the files containing the API routes.
}

// initialize the Swagger JSDoc
const APIDocs = swaggerJSdoc(APIDocOptions);
// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(APIDocs));

app.listen(PORT, () => {
    console.log("Listening at http://localhost:" + PORT);
});

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving users." });
    }
});

/**
 *  Get: Get a user by UID
 * 
 *  Parameters:
 *      uid: The user ID to query
 *
 *  Sample Response Body:
    {
        "_id": "65e3b880a8e2f3ffad18e684",
        "uid": "CfuuRrQjnGMk8EQKWYKXswj9HDu1",
        "firstName": "Adam",
        "lastName": "Burke",
        "email": "testuser3@email.com",
        "title": "Hardware Engineer Intern at Sample Engineering Company",
        "summary": "Sample summary for Adam Burke",
        "__v": 0,
        "education": [
            {
                "school": "Western Washington Univerisity",
                "degree": "Bachelor of Science",
                "fieldOfStudy": "Hardware Engineering",
                "startDate": "09/2021",
                "endDate": null,
                "summary": "Sample education summary for Adam at the Western Washington Univerisity"
            }
        ],
        "experience": [
            {
                "title": "Hardware Engineer Intern",
                "company": "Sample Engineering Company",
                "location": "Tacoma, WA",
                "startDate": "06/2024",
                "endDate": null,
                "summary": "Sample work experience summary for Cassie at Sample Engineering Company"
            }
        ]
    }
 * 
 * Status Codes:
 *      500: Could not find user.
 *      201: Found user
 *          Returns the user found.
 */
    app.get("/users/:uid", async (req, res) => {
        try {
          const uid = req.params.uid;
          const user = await User.findOne({ uid: uid });
      
          if (!user) {
            res.status(404).json({ error: "No matching user found." });
          } else {
            // Fetch job details for each applied job
            const appliedJobsWithDetails = await Promise.all(
              user.appliedJobs.map(async (job) => {
                const company = await Company.findOne({ uid: job.companyUID });
                const jobDetails = company.jobs[job.jobID];
                return {
                  ...job,
                  title: jobDetails.title,
                  company: company.name,
                };
              })
            );
      
            // Include the applied jobs with details in the response
            res.status(200).json({
              ...user.toObject(),
              appliedJobs: appliedJobsWithDetails,
            });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error retrieving user." });
        }
      });


/**
 *  POST: Sign up with name, email, and password
 *
 *  Sample Request Body:
    {
        "firstName": "Cassie",
        "lastName": "Watts",
        "email": "testuser1@email.com"
    }
 *
 *  Successful response:
    {
        "uid": "<senderUID>",
        "firstName": "<first name>",
        "lastName": "<last name>",
        "email": "<email>",
        "title": "",
        "summary": "",
        "_id": "65dfff17e0e82975efa912ec",
    }
 *
 */
app.post("/users", async (req, res) => {
    const senderUID = req.headers["sender-uid"];
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    try {
        const user = new User({
            uid: senderUID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            summary: "",
            title: "",
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create new user with UID: " + uid });
    }
});

/**
 *  PUT: Updates a user. User must provide all information.
 *
 *  Example request body:
    {
        "firstName": "Adam",
        "lastName": "Burke",
        "email": "testuser3@email.com",
        "title": "Hardware Engineer Intern at Sample Engineering Company",
        "summary": "Sample summary for Adam Burke",
        "education": [
            {
                "school": "Western Washington Univerisity",
                "degree": "Bachelor of Science",
                "fieldOfStudy": "Hardware Engineering",
                "startDate": "09/2021",
                "endDate": null,
                "summary": "Sample education summary for Adam at the Western Washington Univerisity"
            }
        ],
        "experience": [
            {
                "title": "Hardware Engineer Intern",
                "company": "Sample Engineering Company",
                "location": "Tacoma, WA",
                "startDate": "06/2024",
                "endDate": null,
                "summary": "Sample work experience summary for Cassie at Sample Engineering Company"
            }
        ]
    }
 *
 *
 *  Status Codes:
 *      201: Profile has been updated.
 *          Sends updated user, which should be identical to request body
 *      401: Unauthorized: sender UID doesn't match modifed user UID
 *      500: Server error
 *
 */
app.put("/users/:uid", async (req, res) => {
    const parameters = req.params;
    const body = req.body;

    const profileToModify = parameters.uid;
    const senderUID = req.headers["sender-uid"];


    if (profileToModify !== senderUID) {
        res.status(500).json({
            error: "UID of sender doesn't match UID of the modifed profile.",
            senderUid: senderUID,
            requestUid: profileToModify,
        });
        return;
    }

    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const title = body.title;
    const summary = body.summary;
    const education = body.education; // should be an array
    const experience = body.experience; // should be an array

    try {
        const user = {
            uid: profileToModify,
            firstName: firstName,
            lastName: lastName,
            email: email,
            summary: summary,
            title: title,
            experience: experience,
            education: education,
        };
        const updatedUser = await User.findOneAndUpdate(
            { uid: profileToModify },
            user,
            { new: true }
        );
        res.status(201).json(updatedUser);
    } catch (error) {
        console.error(error);
        res
            .status(401)
            .json({ error: "Could not modify contents for UID: " + profileToModify });
    }
});


app.delete("/users/:uid", async (req, res) => {
    try {
        const updatedUser = await User.findOneAndDelete(
            { uid: req.params.uid }
        );
        res.status(201).json({ Success: "Deleted user with UID: " + req.params.uid });
    } catch (error) {
        console.error(error);
        res
            .status(401)
            .json({ error: "Could not modify contents for UID: " + req.params.uid });
    }
})

import Company from "./objects/Company.js";
import axios from "axios";

/**
 *      GET: Get all companies:
 *
 *      Sample Response Body
    [
        {
            "_id": "65e3afc7de3df6877e56dc27",
            "uid": "EfGwH1uRqsUlkQAo4L9WjDv5xCP2",
            "name": "Sample Engineering Company",
            "email": "testcompany1@email.com",
            "summary": "Sample description for the Sample Engineering Company",
            "__v": 0,
            "jobs": {
                "631e646f-51dd-4b14-bc94-aa500284826a": {
                    "title": "Electrical Engineer",
                    "location": "Tacoma, WA",
                    "description": "Sample description for Electrical Engineer"
                },
                "b19a570c-86e7-4dba-998a-a3f98b2327ad": {
                    "title": "Mechanical Engineer",
                    "location": "Tacoma, WA",
                    "description": "Sample Description for Mechanical Engineer"
                }
            }
        },
        {
            "_id": "65e3b0ff99d935b4999d26f7",
            "uid": "XESuFETTURTK9J1KEuB0RXo2x1X2",
            "name": "test company 2",
            "email": "testcompany2@email.com",
            "summary": "",
            "__v": 0,
            "jobs": {
                "4b1fa6c2-87be-4fd2-af43-32786464f751": {
                    "title": "Cashier",
                    "location": "Kent, WA",
                    "description": "Sample description for Cashier"
                },
                "349ec451-214f-4f98-8fc7-11027e826739": {
                    "title": "Stocker",
                    "location": "Kent, WA",
                    "description": "Sample description for Stocker"
                }
            }
        },
        {
            "_id": "65e3b10f99d935b4999d26f9",
            "uid": "gvK6NPpNiHUMuUc3mzp54mBuDBf1",
            "name": "Sample Software Company",
            "email": "testcompany3@email.com",
            "summary": "Sample description for the Sample Software Company",
            "__v": 0,
            "jobs": {
                "3f231bc2-99b7-4111-b775-86df7b8d6252": {
                    "title": "Software Developer",
                    "location": "Seattle, WA",
                    "description": "Sample description for Software Developer"
                },
                "7c3f54ac-4bc0-49df-8a0f-78700c99941c": {
                    "title": "IT Technician",
                    "location": "Seattle, WA",
                    "description": "Sample description for IT Technician"
                }
            }
        }
    ]
 *  Status codes:
 *      200: Success
 *      500: Error
 *
 */
app.get("/companies", async (req, res) => {
    try {
        const company = await Company.find();
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving companies." });
    }
});


/**
 *  GET: Get a company by UID
 *  
 *  Parameters:
 *      uid: UID of the company to find
 * 
 *  Sample Response Body
    {
        "_id": "65e3b10f99d935b4999d26f9",
        "uid": "gvK6NPpNiHUMuUc3mzp54mBuDBf1",
        "name": "Sample Software Company",
        "email": "testcompany3@email.com",
        "summary": "Sample description for the Sample Software Company",
        "__v": 0,
        "jobs": {
            "3f231bc2-99b7-4111-b775-86df7b8d6252": {
                "title": "Software Developer",
                "location": "Seattle, WA",
                "description": "Sample description for Software Developer"
            },
            "7c3f54ac-4bc0-49df-8a0f-78700c99941c": {
                "title": "IT Technician",
                "location": "Seattle, WA",
                "description": "Sample description for IT Technician"
            }
        }
    }
 * 
 */
app.get("/companies/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const company = await Company.findOne({ uid: uid });
        if (company.length === 0) {
            res
                .status(500)
                .json({ Error: "No matching companies with the UID of " + uid });
        } else {
            res.status(200).json(company);
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ Error: "No matching companies with the UID of " + uid });
    }
});

app.delete("/companies/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const company = await Company.findOneAndDelete({ uid: uid });
        if (company.length === 0) {
            res
                .status(500)
                .json({ Error: "No matching companies with the UID of " + uid });
        } else {
            res.status(200).json({ Success: "Successfully deleted company with UID: " + uid });
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ Error: "No matching companies with the UID of " + uid });
    }
});

/**
 *  POST: Create a new company.
 * 
 *  Sample Request Body:
    {
        "senderUID": "EfGwH1uRqsUlkQAo4L9WjDv5xCP2",
        "email": "testcompany1@email.com",
        "name": "Sample Engineering Company",
        "location": "Tacoma, WA",
        "industry": "Engineering"
    }
 * 
 * 
 * Sample Response Body
    {
        "uid": "EfGwH1uRqsUlkQAo4L9WjDv5xCP2",
        "name": "Sample Engineering Company",
        "email": "testcompany1@email.com",
        "summary": "",
        "_id": "65e3c170e146f45252016c83",
        "__v": 0
    }

 */
app.post("/companies", async (req, res) => {
    const uid = req.body.senderUID;
    const email = req.body.email;
    const name = req.body.name;
    const location = req.body.location;
    const industry = req.body.industry;

    try {
        const company = new Company({
            uid: uid,
            name: name,
            email: email,
            location: location,
            industry: industry,
            summary: "",
        });
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not create new company with UID: " + uid });
    }
});

/**
 *  PUT: Update the details of a company
 * 
 *  Parameters:
 *      uid: The company to modify
 * 
 *  Headers:
 *      sender-uid: The UID of the company to modify
 * 
 *  Sample Request Body: 
    {
        "email": "testcompany2@email.com",
        "name": "Sample Grocery Store",
        "summary": "Sample summary for the Sample Grocery Store",
        "location": "Kent, WA",
        "industry": "Retail"
    }
 * 
 * 
 *  Sample Response Body:
    {
        "_id": "65e3b0ff99d935b4999d26f7",
        "uid": "XESuFETTURTK9J1KEuB0RXo2x1X2",
        "name": "Sample Grocery Store",
        "email": "testcompany2@email.com",
        "location": "Kent, WA",
        "industry": "Retail",
        "summary": "Sample summary for the Sample Grocery Store",
        "__v": 0,
        "jobs": {
            "4b1fa6c2-87be-4fd2-af43-32786464f751": {
                "title": "Cashier",
                "location": "Kent, WA",
                "description": "Sample description for Cashier"
            },
            "349ec451-214f-4f98-8fc7-11027e826739": {
                "title": "Stocker",
                "location": "Kent, WA",
                "description": "Sample description for Stocker"
            }
        }
    }
 */
app.put("/companies/:uid", async (req, res) => {
    const parameters = req.params;
    const body = req.body;

    const companyToModify = parameters.uid;
    const senderUID = req.headers["sender-uid"];

    if (companyToModify !== senderUID) {
        res.status(500).json({
            error: "UID of sender doesn't match UID of the modifed company.",
            senderUid: senderUID,
            requestUid: companyToModify,
        });
        return;
    }

    const name = body.name;
    const email = body.email;
    const summary = body.summary;
    const location = body.location;
    const industry = body.industry;

    try {
        const company = {
            uid: companyToModify,
            name: name,
            email: email,
            summary: summary,
            location: location,
            industry: industry
        };
        const updatedCompany = await Company.findOneAndUpdate(
            { uid: companyToModify },
            company,
            { new: true }
        );
        res.status(201).json(updatedCompany);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Could not modify contents for UID: " + companyToModify });
    }
});

/**
 *  GET: Get all job postings from a company.
 * 
 *  Parameters:
 *      uid: The uid of the company to get the jobs from
 * 
 * 
 *  Sample Response Body:
    {
        "631e646f-51dd-4b14-bc94-aa500284826a": {
            "title": "Electrical Engineer",
            "location": "Tacoma, WA",
            "description": "Sample description for Electrical Engineer"
        },
        "b19a570c-86e7-4dba-998a-a3f98b2327ad": {
            "title": "Mechanical Engineer",
            "location": "Tacoma, WA",
            "description": "Sample Description for Mechanical Engineer"
        }
    }
 */
app.get("/companies/:uid/jobs", async (req, res) => {
    const uid = req.params.uid;

    try {
        const company = await Company.findOne({ uid: uid });
        res.status(201).json(company.jobs);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Could not find a company with the UID: " + uid });
    }
});

/**
 * GET: Get a specific job posting by id
 * 
 * Parameters:
 *      uid: Company ID
 *      jobid: Job ID
 * 
 * Example Response Body:
    {
        "631e646f-51dd-4b14-bc94-aa500284826a": {
            "title": "Electrical Engineer",
            "location": "Tacoma, WA",
            "description": "Sample description for Electrical Engineer"
        }
    }
 * 
 */
app.get("/companies/:uid/jobs/:jobid", async (req, res) => {
    const uid = req.params.uid;
    const jobid = req.params.jobid;

    try {
        const company = await Company.findOne({ uid: uid });
        res.status(201).json({
            [jobid]: {
                ...company.jobs[jobid],
            },
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Could not find a company with the UID: " + uid });
    }
});

/**
 * Create a new job under a specific company
 *
 * Parameters:
 *   uid: uid of what company to create a new job for
 *
 * Example Request Body:
    {
        "title": "Stocker",
        "location": "Kent, WA",
        "description": "Sample description for Stocker",
        "responsibilities": "Sample set of responsibilities for a Stocker",
        "qualifications": "Sample set of qualifications for a Stocker"
    }


    Example Response Body:
    {
        "senderUID": "XESuFETTURTK9J1KEuB0RXo2x1X2",
        "title": "Stocker",
        "location": "Kent, WA",
        "description": "Sample description for Stocker",
        "responsibilities": "Sample set of responsibilities for a Stocker",
        "qualifications": "Sample set of qualifications for a Stocker"
    }
 */
app.post("/companies/:uid/jobs", async (req, res) => {
    const uid = req.params.uid;
    const body = req.body;

    if (uid !== req.headers["sender-uid"]) {
        res.status(500).json({
            error: "UID of sender doesn't match UID of the company.",
            senderUID: body.senderUID,
            requestUID: uid,
        });
        return;
    }

    try {
        const newJob = {
            title: body.title,
            location: body.location,
            description: body.description,
            responsibilities: body.responsibilities,
            qualifications: body.qualifications
        };
        const updatedCompany = await Company.findOneAndUpdate(
            { uid: uid },
            { [`jobs.${uuidv4()}`]: newJob },
            { new: true }
        );

        res.status(201).json(updatedCompany);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Could not create job posting for companyUID of " + uid });
    }
});


/**
 *  PUT: Updates a job under a specific company
 *
 *  Parameters:
 *   uid: uid of what company to create a new job for
 *   jobid: id of the job to update
 *
 *  Sample Request Body:
    {
        "title": "Stocker",
        "location": "Kent, WA",
        "description": "Sample description for Stocker",
        "responsibilities": "Sample set of responsibilities for a Stocker",
        "qualifications": "Sample set of qualifications for a Stocker"
    }
 */
app.put("/companies/:uid/jobs/:jobid", async (req, res) => {
    const uid = req.params.uid;
    const jobid = req.params.jobid;

    const body = req.body;
    if (uid !== req.headers["sender-uid"]) {
        res.status(500).json({
            error: "UID of sender doesn't match UID of the company.",
            senderUID: body.senderUID,
            requestUID: uid,
        });
        return;
    }

    try {
        const newJob = {
            title: body.title,
            location: body.location,
            description: body.description,
            responsibilities: body.responsibilities,
            qualifications: body.qualifications
        };
        const updatedCompany = await Company.findOneAndUpdate(
            { uid: uid },
            { [`jobs.${jobid}`]: newJob },
            { new: true }
        );

        res.status(201).json(updatedCompany);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Could not update job posting for companyUID of " + uid });
    }
});


/**
 *  GET: Get all job postings
 * 
 *  Sample Response Body:
    {
        "XESuFETTURTK9J1KEuB0RXo2x1X2": { // COMPANY ID
            "4b1fa6c2-87be-4fd2-af43-32786464f751": {
                "title": "Cashier",
                "location": "Kent, WA",
                "description": "Sample description for Cashier"
            },
            "349ec451-214f-4f98-8fc7-11027e826739": {
                "title": "Stocker",
                "location": "Kent, WA",
                "description": "Sample description for Stocker"
            }
        },
        "gvK6NPpNiHUMuUc3mzp54mBuDBf1": { // COMPANY ID
            "3f231bc2-99b7-4111-b775-86df7b8d6252": {
                "title": "Software Developer",
                "location": "Seattle, WA",
                "description": "Sample description for Software Developer"
            },
            "7c3f54ac-4bc0-49df-8a0f-78700c99941c": {
                "title": "IT Technician",
                "location": "Seattle, WA",
                "description": "Sample description for IT Technician"
            }
        }
    }
 */
app.get("/jobs", async (req, res) => {
    try {
        const company = await Company.find();
        let o = {};
        company.forEach((company) => {
            o[company.uid] = company.jobs;
        });

        res.status(201).json(o);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Error retriving all jobs" })
    }
});




/**
 *  GET: Get external jobs based on a query
 * 
 */
app.get("/jobs/external", async (req, res) => {

    if (true) {
        console.log("CALL TO JSEARCH IS DISABLED TO PREVENT GOING OVER THE 200/MONTH LIMIT");
        res.status(501).json({ Error: "External jobs disabled." });
        return;
    }



    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query: 'Jobs in US', // THIS QUERY CAN CHANGE
            page: '1',
            num_pages: '1'
        },
        headers: {
            'X-RapidAPI-Key': 'd38e356f25msh05bd1a5e0611f46p1d88b2jsnffc3840195d4',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);

        const jobList = response.data.data;
        const formattedJobs = {}
        jobList.forEach(o => {
            formattedJobs[o.job_id] = {
                company: o.employer_name,
                title: o.job_title,
                external_link: o.job_apply_link,
                description: o.job_description,
                location: o.job_city + ", " + o.job_state
            }

            if (o.job_highlights.Responsibilities) {
                formattedJobs[o.jobID] = {
                    ...formattedJobs[o.jobID],
                    responsibilities: o.job_highlights.Responsibilities.join("\n"),
                }
            }

            if (o.job_highlights.Qualifications) {
                formattedJobs[o.jobID] = {
                    ...formattedJobs[o.jobID],
                    responsibilities: o.job_highlights.Qualifications.join("\n"),
                }
            }

        })

        console.log(formattedJobs)

        res.status(201).json(formattedJobs)
    } catch (error) {
        console.error(error);
        res.status(501).json({ Error: "Could not retrieve external jobs" })

    }
});




/**
 *  GET: Get a specific job 
 *  
 *  Parameters:
 *      uid: ID of the job
 * 
 *  Example Response Body
    {
        "company": "Sample Grocery Store",
        "uid": "XESuFETTURTK9J1KEuB0RXo2x1X2",
        "title": "Cashier",
        "location": "Kent, WA",
        "description": "Sample description for Cashier"
    }
 */
app.get("/jobs/:uid", async (req, res) => {
    const jobUID = req.params.uid;
    try {
        const companies = await Company.find();
        let o = null;
        for (const company of companies) {
            console.log(company);
            const job = company.jobs[jobUID];
            if (job) {
                o = { company: company.name, uid: company.uid, ...job };
                res.status(201).json(o);
                return;
            }
        }

        res.status(401).json({ error: "Error retriving all jobs" })

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Error retriving all jobs" })
    }
});


/**
 *  POST: Apply to a specific job
 * 
 *  Parameters:
 *      uid: UID of the job to apply for
 * 
 *  Sample Request Body:
    {
        "senderUID": "<UID of the user applying to the job>",
    }
 */
app.post("/apply/:uid", async (req, res) => {
    const jobUID = req.params.uid;
    const userID = req.body.senderUID;


    try {

        // Find the company that the job is from
        const companies = await Company.find();
        let o = null;
        for (const company of companies) {
            const j = company.jobs[jobUID];
            if (j) {
                o = { company: company.name, companyUID: company.uid, ...j };
                break;
            }
        }

        if (!o) {
            res.status(401).json({ Error: "Error finding job with UID: " + jobUID })
            return;
        }

        // Store the user data under the job posting
        const applicantInfoObject = { // currently only storing user id, can store more as needed
            userID: userID,
        }

        const company = await Company.findOneAndUpdate(
            { uid: o.companyUID },
            { $push: { [`jobs.${jobUID}.applicants`]: applicantInfoObject } },
            { new: true }
        );




        const appliedJobObject = {
            jobID: jobUID,
            companyUID: o.companyUID,
            status: "Under Review"
        }


        // Store that the user applied to this job
        const user = await User.findOneAndUpdate(
            { uid: userID },
            { $push: { appliedJobs: appliedJobObject } },
            { new: true }
        );

        if (!user) {
            res.status(401).json({ Error: "Error adding job to user." })

        } else {
            res.status(201).json({ Success: "Successfully applied to job." })

        }


    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Error retriving all jobs" })
    }
});





/**
 *  GET: Search for things by first name
 * 
 *  Parameters:
 *      type: Either companies, users, or jobs
 *      name: Name to search for
 * 
 *  Note:
 *      Currently, this only matches from the first name. It's not very good.
 * 
 */
app.get("/search/:type/:name", async (req, res) => {
    const type = req.params.type;
    const name = req.params.name;
    try {
        const regex = new RegExp('^' + name, 'i');
        if (type === "users") {
            const users = await User.find({ firstName: regex });
            res.status(201).json(users);
        } else if (type === "jobs") {
            const company = await Company.find();
            let o = [];
            company.forEach((company) => {
                for (const uid in company.jobs) {
                    if (company.jobs[uid].title.match(regex)) {
                        o.push({
                            [uid]: { ...company.jobs[uid] }
                        })
                    }
                }
            });

            res.status(201).json(o);

        } else if (type === "companies") {
            const companies = await Company.find({ name: regex });
            res.status(201).json(companies);
        } else {
            res.status(401).json({ error: "Invalid search paramters of " + type + ". Must be either jobs, companies, or users." })
        }
    } catch (error) {
        res.status(401).json({
            error: "Error executing search.",
            name: req.params.name,
            type: req.params.type

        })

    }

});

