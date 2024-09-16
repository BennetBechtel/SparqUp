import express from "express";
import User from "../models/userModel.js";
import verifyToken from "../middleware/verifyToken.js";
import { check, validationResult } from "express-validator";
import isUserValid from "../util/isUserValid.js";
import generateGenderFilter from "../util/generateGenderFilter.js";

const router = express.Router();

router.get("/users", verifyToken, async (req, res) => {
  try {
    const reqUser = await User.findById(req.userId);
    if (!reqUser) {
      return res.status(404).json({ message: "No user found" });
    }

    let users = await User.find({
      ...generateGenderFilter(reqUser),
      verified: true,
      _id: {
        $nin: [
          req.userId,
          ...reqUser.swiped.left,
          ...reqUser.swiped.right,
          ...reqUser.matches,
        ],
      },
    }).select("-password");
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    users = users.filter(
      (user) => !reqUser.matches.includes(user._id.toString()),
    );
    users = users.filter((user) => user._id.toString() !== req.userId);

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
      swipedUser.likedBy.push(req.userId);
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

export default router;
