import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8001;

// MongoDB Connection
import { connectDb } from "./src/config/dbConfig.js";
connectDb();

// Middlewares
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./src/middlewares/error.js";

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.use(errorMiddleware);

// APIS

// Storing cookie parser

app.use(cookieParser());

// Error Handlers
app.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "server is live",
  });
});

app.use("*", (req, res, next) => {
  const err = new Error("404 Page not Found");
  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500);
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is live at http://localhost:${PORT}`);
});
