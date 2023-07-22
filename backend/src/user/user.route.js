/**
 * @swagger
 * tags:
 *   name: User
 *   description: The API of user
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, staff]
 *       required:
 *         - name
 *         - phone
 *         - password
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phone
 *               - password
 *     responses:
 *       200:
 *         description: User login successful
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: User registration
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request
 *       409:
 *         description: User with the same phone number already exists
 */
import express from "express";
import { deleteStaff, forgotPassword, getStaffs, login, otp, register, verify } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/otp", otp);
userRouter.post("/verify", verify);
userRouter.get("/", getStaffs);
userRouter.delete("/:id", deleteStaff);
userRouter.put("/forgotPassword", forgotPassword);

export default userRouter;
