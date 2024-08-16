import React from "react";
import { motion, MotionConfig } from "framer-motion";

const HamburgerMenuButton = ({ active, setActive }) => {
  return (
    <MotionConfig
      transition={{
        duration: "0.3",
        ease: "easeInOut",
      }}
    >
      <motion.button
        onClick={() => setActive(!active)}
        animate={active ? "open" : "closed"}
        className="relative h-11 w-11 rounded-full bg-white/0 transition-colors hover:bg-white/20"
      >
        <motion.span
          style={{
            left: "50%",
            top: "35%",
            x: "-50%",
            y: "-50%",
          }}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              top: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              top: ["50%", "50%", "35%"],
            },
          }}
          className="absolute h-[3px] w-6 bg-black"
        />

        <motion.span
          style={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
            },
          }}
          className="absolute h-[3px] w-6 bg-black"
        />

        <motion.span
          style={{
            left: "calc(50% + 3px)",
            bottom: "35%",
            x: "-50%",
            y: "50%",
          }}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              bottom: ["35%", "50%", "50%"],
              left: ["calc(50% + 3px)", "calc(50% + 3px)", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              bottom: ["50%", "50%", "35%"],
              left: ["50%", "50%", "calc(50% + 3px)"],
            },
          }}
          className="absolute h-[3px] w-[18px] bg-black"
        />
      </motion.button>
    </MotionConfig>
  );
};

export default HamburgerMenuButton;
