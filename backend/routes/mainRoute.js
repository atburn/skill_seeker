import express from 'express';
import cors from 'cors';
const router = express.Router();

router.use(express.json());
router.use(cors());


/**
 * @swagger
 *  /:
 *  get:
 *      summary: Retrieve default (root) API response message
 *      description: Use this endpoint to retrieve default message of the API.
 *      tags:
 *          - Main (root path)
 *      responses:
 *          "200":
 *              description: JSON response message that request is successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              api:
 *                                  type: string
 *                                  description: general message for the API.
 *          "500":
 *              description: Error message in JSON format (an error has occured).
 */
router.get("/", async (req, res) => {
    try {
        res.json({'api' : 'Skill Seeker RESTful API.'});
    }
    catch (error)
    {
        console.error('Error: ' , error);
        res.status(500).json({error: 'Error receiving job records'});
    }
});

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update an existing resource
 *     description: Use this endpoint to update an existing resource.
 *     tags:
 *       - Main (root path)
 *     responses:
 *       "200":
 *         description: JSON response message indicating the resource is updated successfully.
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.put("/", async (req, res) => {
    try {
        res.status(200).json({message: 'Resource updated successfully.'});
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({error: 'Error updating the resource.'});
    }
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new resource
 *     description: Use this endpoint to create a new resource.
 *     tags:
 *       - Main (root path)
 *     responses:
 *       "201":
 *         description: JSON response message indicating the resource is created successfully.
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.post("/", async (req, res) => {
    // Implement your POST logic here
    try {
        // Your POST logic
        res.status(201).json({message: 'Resource created successfully.'});
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({error: 'Error creating the resource.'});
    }
});

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete an existing resource
 *     description: Use this endpoint to delete an existing resource.
 *     tags:
 *       - Main (root path)
 *     responses:
 *       "204":
 *         description: No content. The resource is deleted successfully.
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.delete("/", async (req, res) => {
    // Implement your DELETE logic here
    try {
        // Your DELETE logic
        res.status(204).end();
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({error: 'Error deleting the resource.'});
    }
});


// module.exports = router;
export default router;