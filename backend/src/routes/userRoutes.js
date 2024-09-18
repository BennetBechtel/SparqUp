import express from "express";
import User from "../models/userModel.js";
import verifyToken from "../middleware/verifyToken.js";
import { check, validationResult } from "express-validator";
import isUserValid from "../util/isUserValid.js";
import generateGenderFilter from "../util/generateGenderFilter.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/users", verifyToken, async (req, res) => {
  try {
    const reqUser = await User.findById(req.userId);
    if (!reqUser) {
      return res.status(404).json({ message: "No user found" });
    }

    const excludedIds = [
      new mongoose.Types.ObjectId(req.userId),
      ...reqUser.swiped.left.map((id) => new mongoose.Types.ObjectId(id)),
      ...reqUser.swiped.right.map((id) => new mongoose.Types.ObjectId(id)),
      ...reqUser.matches.map((id) => new mongoose.Types.ObjectId(id)),
    ];

    const users = await User.aggregate([
      {
        $match: {
          ...generateGenderFilter(reqUser),
          verified: true,
          _id: { $nin: excludedIds },
        },
      },
      { $sample: { size: 50 } },
      {
        $project: { password: 0 },
      },
    ]);

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users: users });
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

      return res
        .status(202)
        .json({ message: "User updated and verified successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
);

router.post("/swipe", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const swipedUser = await User.findById(req.body.swipedUserId);
    if (!swipedUser) {
      return res.status(400).json({ message: "Swiped user not found" });
    }

    if (req.body.direction === "left") {
      user.swiped.left.push(req.body.swipedUserId);
    } else if (req.body.direction === "right") {
      user.swiped.right.push(req.body.swipedUserId);

      const match = swipedUser.swiped.right.includes(req.userId);
      if (match) {
        user.matches.push(req.body.swipedUserId);
        swipedUser.matches.push(req.userId);
      }
    } else {
      return res.status(400).json({ message: "Select a direction to add to" });
    }

    await user.save();
    await swipedUser.save();

    return res.status(200).json({ message: "UserIds added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/matches", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchingIds = [
      ...user.matches.map((id) => new mongoose.Types.ObjectId(id)),
    ];

    const matches = await User.find({
      _id: { $in: matchingIds },
    }).select("-password");
    if (!matches) {
      return res.status(400).json({ message: "No matches found" });
    }

    return res.status(200).json({ matches: matches });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
