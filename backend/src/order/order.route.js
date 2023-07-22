/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API for managing orders
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [success,verified]
 *         required: false
 *         description: Order status (success or verify)
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Order"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 *
 * /order/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid request
 *
 * /order/cancel/{id}:
 *   delete:
 *     summary: Cancel an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Invalid request
 *
 * /order/verify/{id}:
 *   put:
 *     summary: Verify an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order verified successfully
 *       400:
 *         description: Invalid request
 *
 * /order/finish/{id}:
 *   put:
 *     summary: Finish an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order finished successfully
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *           enum: [success, verify, finish, cancel]
 *         people:
 *           type: number
 *         userId:
 *           type: string
 *         note:
 *           type: string
 *         bookedTable:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/BookedTable"
 *     BookedTable:
 *       type: object
 *       properties:
 *         tableNumber:
 *           type: number
 *         timeSlot:
 *           type: string
 */
import express from "express";
import { cancelOrder, createOrder, finishOrder, getOrder, getOrderByPhone, verifyOrder } from "./order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/", getOrder);
orderRouter.get("/:phone", getOrderByPhone);
orderRouter.post("/", createOrder);
orderRouter.delete("/cancel/:id", cancelOrder);
orderRouter.put("/verify/:id", verifyOrder);
orderRouter.put("/finish/:id", finishOrder);

export default orderRouter;
