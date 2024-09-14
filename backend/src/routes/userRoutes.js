import express from "express";
import User from "../models/userModel.js";
import verifyToken from "../middleware/verifyToken.js";
import { check, validationResult } from "express-validator";
import isUserValid from "../util/isUserValid.js";

const router = express.Router();

router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put(
  "/update-user",
  verifyToken,
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("birthDate", "Date of birth is required").isString(),
    check("genderIdentity", "Gender Identity is required").isString(),
    check("genderInterest", "Gender Interest is required").isString(),
    check("about", "About text is required").isString(),
    check("profilePictureUrl", "Profile Picture is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findById(req.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.birthDate = req.body.birthDate;
      user.genderIdentity = req.body.genderIdentity;
      user.genderInterest = req.body.genderInterest;
      user.about = req.body.about;
      user.profilePictureUrl = req.body.profilePictureUrl;

      if (!isUserValid) {
        return res.status(409).json({ message: "Input invalid" });
      }

      user.verified = true;
      await user.save();

      res
        .status(202)
        .json({ message: "User updated and verified successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
);

export default router;
