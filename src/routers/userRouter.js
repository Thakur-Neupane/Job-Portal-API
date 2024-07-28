import express from "express";
const router = express.Router();
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
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
    req.body.password = hashPassword(req.body.password);

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All Fields are required!!!", 400));
    }

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler("Please Provide your preferred Job niches.", 400)
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new ErrorHandler(
          "The given email is already registered!! Try again with different Email please!!"
        )
      );
    }
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
              folder: "Job_Seekers_Resume",
            }
          );
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(new ErrorHandler("Failed to Upload resume to cloud"));
          }
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Failed to upload Resume!!"));
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

export default router;
