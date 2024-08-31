import React from "react";
import SwipeContainer from "../components/SwipeContainer.jsx";
import SideBar from "../components/SideBar.jsx";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-[350px_1fr]">
      <SideBar />
      <SwipeContainer />
    </div>
  );
};

export default Dashboard;
