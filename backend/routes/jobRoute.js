import express from "express";
const router = express.Router();

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Retrieve all companies
 *     description: Use this endpoint to retrieve all companies.
 *     tags:
 *       - Companies
 *     responses:
 *       "200":
 *         description: JSON array containing all companies.
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.get("/companies", async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({error: 'Error retrieving companies.'});
    }
});

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company by ID
 *     description: Use this endpoint to update a company by its ID.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the company to update.
 *     responses:
 *       "200":
 *         description: JSON response message indicating the company is updated successfully.
 *       "404":
 *         description: Error message in JSON format (company not found).
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.put("/companies/:id", async (req, res) => {
    const companyId = req.params.id;
});

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     description: Use this endpoint to create a new company.
 *     tags:
 *       - Companies
 *     responses:
 *       "201":
 *         description: JSON response message indicating the company is created successfully.
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.post("/companies", async (req, res) => {
});

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     description: Use this endpoint to delete a company by its ID.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the company to delete.
 *     responses:
 *       "204":
 *         description: No content. The company is deleted successfully.
 *       "404":
 *         description: Error message in JSON format (company not found).
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.delete("/companies/:id", async (req, res) => {
    const companyId = req.params.id;
});

export default router;