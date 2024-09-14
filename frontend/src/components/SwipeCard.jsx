import React from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

const SwipeCard = ({ card, data, setData }) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-250, 0, 120], [0.1, 1, 0.1]);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 150) {
      setData(data.filter((e) => e.id !== card.id));

      // Logic for like or dislike
      if (x.get() > 0) {
        console.log("You Swiped Right");
      } else {
        console.log("You Swiped Left");
      }
    }
  };

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
      <img
        draggable="false"
        src={card.imageUrl}
        alt="profile picture"
        className="h-[400px] w-full object-cover"
      />
      <div className="px-4 py-2">
        <p className="text-2xl font-semibold">{`${card.name}, ${card.age}`}</p>
        <p className="text-xl font-medium text-gray-700">{card.aboutMe}</p>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
