import React, { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

const Footer = () => {
  const { active } = useContext(NavContext);

  return (
    <div
      className={`flex flex-row justify-center gap-5 ${active ? "bg-pink-300" : "bg-transparent"} p-2`}
    >
      <span className="text-lg font-semibold">About</span>
      <span className="text-lg font-semibold">Impressum</span>
      <span className="text-lg font-semibold">FAQ</span>
    </div>
  );
};

export default Footer;
