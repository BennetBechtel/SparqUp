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
  birthDate: {
    type: String,
    required: false,
    default: "",
  },
  genderIdentity: {
    type: String,
    required: false,
    default: "",
  },
  genderInterest: {
    type: String,
    required: false,
    default: "",
  },
  profilePictureUrl: {
    type: String,
    required: false,
    default: "",
  },
  about: {
    type: String,
    required: false,
    default: "",
  },
  matches: [
    {
      type: String,
      required: false,
    },
  ],
  swiped: {
    left: [
      {
        type: String,
        required: false,
      },
    ],
    right: [
      {
        type: String,
        required: false,
      },
    ],
  },
  likedBy: [
    {
      type: String,
      required: false,
    },
  ],
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
