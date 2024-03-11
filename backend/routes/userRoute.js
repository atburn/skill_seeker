import express from 'express';
import User from './../objects/User.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       properties:
 *         school:
 *           type: string
 *         degree:
 *           type: string
 *         field_of_study:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         gpa:
 *           type: integer
 *         summary:
 *           type: string
 *     Experience:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         company:
 *           type: string
 *         location:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         summary:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         title:
 *           type: string
 *         summary:
 *           type: string
 *         education:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Education'
 *         experience:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Experience'
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "200":
 *         description: JSON response message indicating the user is updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "404":
 *         description: Error message in JSON format (user not found).
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.put("/users/:id", async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Error updating user.' });
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Use this endpoint to create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: JSON response message indicating the user is created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.post("/users", async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Error creating user.' });
    }
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
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Error deleting user.' });
    }
});

export default router;