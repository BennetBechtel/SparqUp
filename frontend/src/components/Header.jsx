import React, { useContext } from "react";
import Logo from "../assets/Logo.png";
import LogoutButton from "./LogoutButton";
import HamburgerMenuButton from "./HamburgerMenuButton";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NavContext } from "../contexts/NavContext";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { active, setActive } = useContext(NavContext);
  const { auth } = useContext(AuthContext);

  const logoutButtonStyle = "text-center text-2xl font-bold hover:underline";

  const navLinks = !auth
    ? [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Login",
          href: "/login",
        },
      ]
    : [
        { title: "Home", href: "/" },
        { title: "Account", href: "/account" },
      ];

  const menuVars = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.3, ease: [0.12, 0, 0.39, 0] },
    },
    exit: {
      scaleY: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.31, 1] },
    },
  };

  return (
    <nav>
      <div
        className={`flex flex-row items-center justify-between ${active ? "bg-pink-300" : "bg-transparent"} p-2`}
      >
        <Link to="/">
          <section className="flex flex-row items-center gap-2">
            <img src={Logo} className="h-9" />
            <span className="text-2xl font-bold">SparqUp</span>
          </section>
        </Link>

        <span className="flex justify-center lg:hidden">
          <HamburgerMenuButton active={active} setActive={setActive} />
        </span>

        <span className="hidden h-11 flex-row items-center justify-between gap-3 text-center lg:flex">
          {navLinks.map((link, index) => {
            return (
              <Link
                key={index + link.title + link.href}
                to={link.href}
                className="text-center text-2xl font-bold hover:underline"
                onClick={() => setActive(false)}
              >
                {link.title}
              </Link>
            );
          })}
          {auth && <LogoutButton style={logoutButtonStyle} />}
        </span>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-[60px] z-50 flex w-full origin-top flex-col justify-center gap-3 bg-pink-200 pb-28"
            style={{
              height: "calc(100vh - 60px - 44px)",
            }}
          >
            {navLinks.map((link, index) => {
              return (
                <Link
                  key={index + link.title + link.href}
                  to={link.href}
                  className="text-center text-3xl font-semibold"
                  onClick={() => setActive(false)}
                >
                  {link.title}
                </Link>
              );
            })}
            {auth && <LogoutButton style={logoutButtonStyle} />}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
