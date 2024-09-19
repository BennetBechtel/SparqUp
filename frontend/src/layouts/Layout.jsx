import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { NavContext } from "../contexts/NavContext";

const Layout = () => {
  const { active } = useContext(NavContext);

  return (
    <>
      <ToastContainer />
      <div className="grid h-fit min-h-screen grid-rows-[auto_1fr_auto] bg-gradient-to-b from-pink-300 to-orange-300">
        <Header />
        <Outlet />
        <section className="hidden lg:inline">
          <Footer />
        </section>
      </div>
      {active && (
        <div className="fixed bottom-0 z-50 w-full lg:hidden">
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
