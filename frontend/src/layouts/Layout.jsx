import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import React from "react";

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <div className="grid h-fit min-h-screen grid-rows-[auto_1fr_auto] bg-gradient-to-b from-pink-300 to-orange-300">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
