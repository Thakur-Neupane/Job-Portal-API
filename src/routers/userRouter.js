import express from "express";
const router = express.Router();
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { insertUser } from "../models/userModel";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.json({
        status: error,
        message: "All fields are required!!!",
      });
    }
    req.body.password = hashPassword(req.body.password);

    const user = await insertUser(req.body);
  } catch (error) {
    next(error);
  }
});

export default router;
