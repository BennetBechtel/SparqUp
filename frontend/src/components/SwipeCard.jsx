import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import calculateAge from "../util/calculateAge.js";
import ImageWithFallback from "./ImageWithFallback";
import * as apiClient from "../apiClient.js";

const SwipeCard = ({ user, users, setUsers }) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-250, 0, 120], [0.1, 1, 0.1]);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 150) {
      // Logic for like or dislike
      if (x.get() > 0) {
        console.log("You Swiped Right");
        apiClient.addSwipedUser(user._id, "right");
      } else {
        console.log("You Swiped Left");
        apiClient.addSwipedUser(user._id, "left");
      }

      // Remove Card from Stack
      setUsers(users.filter((usr) => usr._id !== user._id));
      setUsers(
        users.filter((usr) => usr._id.toString() !== user._id.toString()),
      );
    }
  };

  const userAge = calculateAge(user.birthDate);

  return (
    <motion.div
      className="flex h-[480px] w-[400px] flex-col overflow-y-hidden rounded-xl bg-white hover:cursor-grab active:cursor-grabbing"
      style={{ gridRow: 1, gridColumn: 1, x, opacity, rotate }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <ImageWithFallback
        src={user.profilePictureUrl}
        fallbackSrc={
          "https://ih1.redbubble.net/image.1046392292.3346/tst,medium,507x507-pad,600x600,f8f8f8.jpg"
        }
        alt={"Profile Picture"}
        className="pointer-events-none h-[400px] w-full object-cover"
      />
      <div className="px-4 py-2">
        <p className="text-2xl font-semibold">{`${user.firstName}, ${userAge}`}</p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-medium text-gray-700">
          {user.about}
        </p>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
