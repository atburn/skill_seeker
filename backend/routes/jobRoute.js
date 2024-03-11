import express from "express";
const router = express.Router();
import cors from 'cors';

import Company from "./../objects/Company.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         company:
 *           type: string
 *         location:
 *           type: string
 *         description:
 *           type: string
 *         responsibilities:
 *           type: string
 *         qualifications:
 *           type: string
 *     Company:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *         name:
 *           type: string
 *         summary:
 *           type: string
 *         jobs:
 *           type: object
 *           properties:
 *             jobId:
 *               $ref: '#/components/schemas/Job'
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       "200":
 *         description: JSON response message indicating the company is updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       "404":
 *         description: Error message in JSON format (company not found).
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.put("/companies/:id", async (req, res) => {
    const companyId = req.params.id;
    const companyData = req.body;
    try {
        const updatedCompany = await Company.findByIdAndUpdate(companyId, companyData, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ error: "Company not found" });
        }
        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Error updating company.' });
    }
});

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     description: Use this endpoint to create a new company.
 *     tags:
 *       - Companies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       "201":
 *         description: JSON response message indicating the company is created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       "500":
 *         description: Error message in JSON format (an error has occurred).
 */
router.post("/companies", async (req, res) => {
    const companyData = req.body;
    try {
        const newCompany = await Company.create(companyData);
        res.status(201).json(newCompany);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Error creating company.' });
    }
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
    try {
        const deletedCompany = await Company.findByIdAndDelete(companyId);
        if (!deletedCompany) {
            return res.status(404).json({ error: "Company not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Error deleting company.' });
    }
});

export default router;