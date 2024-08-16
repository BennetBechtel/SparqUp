import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

import React from "react";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-pink-400 to-orange-400">
      <Header />
      <div className="flex grow px-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
