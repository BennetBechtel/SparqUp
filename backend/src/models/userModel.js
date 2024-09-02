import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthData: {
    type: Date,
    required: false,
  },
  genderIdentity: {
    type: String,
    required: false,
  },
  genderInterest: {
    type: String,
    required: false,
  },
  showGender: {
    type: Boolean,
    required: false,
  },
  profilePictureUrl: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  matches: [
    {
      type: String,
      required: false,
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
