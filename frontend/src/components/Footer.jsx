import React, { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

const Footer = () => {
  const { active } = useContext(NavContext);

  return (
    <div
      className={`flex flex-row justify-center h-fit gap-5 ${active ? "bg-pink-300" : "bg-transparent"} p-2`}
    >
      <span className="text-lg font-semibold h-fit">About</span>
      <span className="text-lg font-semibold h-fit">Impressum</span>
      <span className="text-lg font-semibold h-fit">FAQ</span>
    </div>
  );
};

export default Footer;
