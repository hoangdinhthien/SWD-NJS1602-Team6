/**
 * @swagger
 * tags:
 *   name: Table
 *   description: The API of table
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Table:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [round, long, square]
 *         seat:
 *           type: number
 *         price:
 *           type: number

 *       required:
 *         - seat
 *         - price
 *         - tableNumber
 */

/**
 * @swagger
 * /table:
 *   get:
 *     summary: Get all tables
 *     tags: [Table]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new table
 *     tags: [Table]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Table"
 *     responses:
 *       201:
 *         description: Table created successfully
 *       400:
 *         description: Invalid request
 *   put:
 *     summary: Edit a table
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Table ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Table"
 *     responses:
 *       200:
 *         description: Table updated successfully
 *       400:
 *         description: Invalid request
 *   delete:
 *     summary: Delete a table
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Table ID
 *     responses:
 *       200:
 *         description: Table deleted successfully
 *       400:
 *         description: Invalid request
 */

import express from "express";
import { createTable, deleteTable, editTable, getTable, uploadImg, changeStatus } from "./table.controller.js";

const tabelRouter = express.Router();

tabelRouter.get("/", getTable);
tabelRouter.put("/:id", editTable);
// tabelRouter.put("/status/:id", changeStatus);
tabelRouter.post("/", createTable);
tabelRouter.delete("/:id", deleteTable);
// tabelRouter.post("/upload", uploadImage.single("image"), uploadImg);

export default tabelRouter;
