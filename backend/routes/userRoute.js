import express from 'express';
import User from './../objects/User.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Use this endpoint to retrieve all users.
 *     tags:
 *       - Users
 *     responses:
 *       "200":
 *         description: JSON array containing all users.
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({error: 'Error retrieving users.'});
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Use this endpoint to update a user by its ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update.
 *     responses:
 *       "200":
 *         description: JSON response message indicating the user is updated successfully.
 *       "404":
 *         description: Error message in JSON format (user not found).
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.put("/users/:id", async (req, res) => {
    const userId = req.params.id;
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Use this endpoint to create a new user.
 *     tags:
 *       - Users
 *     responses:
 *       "201":
 *         description: JSON response message indicating the user is created successfully.
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.post("/users", async (req, res) => {
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Use this endpoint to delete a user by its ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       "204":
 *         description: No content. The user is deleted successfully.
 *       "404":
 *         description: Error message in JSON format (user not found).
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.delete("/users/:id", async (req, res) => {
    const userId = req.params.id;
});

export default router;