import express from "express";
import { connectDb } from "./src/config/dbConfig.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./src/middlewares/error.js";
import routers from "./src/routers/routers.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = process.env.PORT || 8001;

// Connect to MongoDB
connectDb();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Route Handlers
routers.forEach(({ path, middlewares }) => app.use(path, ...middlewares));

// Error Handlers
app.get("/", (req, res) => {
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
app.use(errorMiddleware);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log(`Server is live at http://localhost:${PORT}`);
  }
});
