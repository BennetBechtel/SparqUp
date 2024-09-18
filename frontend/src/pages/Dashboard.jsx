import React from "react";
import SwipeContainer from "../components/SwipeContainer.jsx";
import SideBar from "../components/SideBar.jsx";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient.js";

const Dashboard = () => {
  const { data: currentUser, isLoading } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="grid grid-cols-[350px_1fr]">
      <SideBar currentUser={currentUser} />
      <SwipeContainer currentUser={currentUser} />
    </div>
  );
};

export default Dashboard;
