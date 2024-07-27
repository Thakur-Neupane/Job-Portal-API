import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name Must Contain at lease 3 Characters."],
      maxLength: [30, "Name cannot exceed more than 30 characters."],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    niches: {
      firstNiche: String,
      secondNiche: String,
      thirdNiche: String,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must contain at least 8 characters."],
      minLength: [32, "Password cant exceed more than 32 characters."],
    },
    resume: {
      public_id: String,
      url: String,
    },
    coverLetter: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["Job Seeker", "Employer"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema); //Users
