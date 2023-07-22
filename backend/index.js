import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import createHttpError, { isHttpError } from "http-errors";
import userRouter from "./src/user/user.route.js";
import orderRouter from "./src/order/order.route.js";
import tabelRouter from "./src/table/table.route.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import "./src/config/redis.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/booking").then(() => {
  app.listen(7000, () => {
    console.log("running");
  });
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API docs",
      version: "0.1.0",
      description: "This is API about table reservation",
      contact: {
        name: "SE160516",
        url: "acascas.com",
        email: "thangbvse160516@fpt.edu.vn",
      },
    },
    servers: [
      {
        url: "http://localhost:7000/",
      },
    ],
  },
  apis: ["./src/order/order.route.js", "./src/table/table.route.js", "./src/user/user.route.js"],
};
const spacs = swaggerJSDoc(options);
app.use("/api-docs", serve, setup(spacs));

app.get("/", (req, res) => {
  res.send("hello you");
});
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/table", tabelRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "End point not found"));
});
app.use((err, req, res, next) => {
  let errMessage = "server error";
  let statusCode = 500;
  if (isHttpError(err)) {
    errMessage = err.message;
    statusCode = err.status;
  }
  res.status(statusCode).json({ errMessage });
});
