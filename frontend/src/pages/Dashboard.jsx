import React, { useState } from "react";
import SwipeContainer from "../components/SwipeContainer.jsx";
import SideBar from "../components/SideBar.jsx";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient.js";
import { TbCardsFilled } from "react-icons/tb";
import { RiHeartsFill } from "react-icons/ri";
import { IoMdChatboxes } from "react-icons/io";

const Dashboard = () => {
  const { data: currentUser, isLoading } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  );

  const [openElement, setOpenElement] = useState("swipeCards");
  const [currentlyOpen, setCurrentlyOpen] = useState("matches");

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <div className="grid grid-rows-[1fr_44px] lg:hidden">
        <div>
          {openElement === "swipeCards" ? (
            <SwipeContainer currentUser={currentUser} />
          ) : (
            <SideBar
              currentUser={currentUser}
              currentlyOpen={currentlyOpen}
              setCurrentlyOpen={setCurrentlyOpen}
            />
          )}
        </div>

        <div className="flex flex-row items-center justify-around">
          <button
            onClick={() => setOpenElement("swipeCards")}
            className="h-fit w-fit p-[6px]"
          >
            <TbCardsFilled className="size-8" />
          </button>
          <button
            onClick={() => {
              setCurrentlyOpen("matches");
              setOpenElement("sideBar");
            }}
            className="h-fit w-fit p-[6px]"
          >
            <RiHeartsFill className="size-8" />
          </button>
          <button
            onClick={() => {
              setCurrentlyOpen("chat");
              setOpenElement("sideBar");
            }}
            className="h-fit w-fit p-[6px]"
          >
            <IoMdChatboxes className="size-8" />
          </button>
        </div>
      </div>
      <div className="hidden grid-cols-[350px_1fr] lg:grid">
        <SideBar
          currentUser={currentUser}
          currentlyOpen={currentlyOpen}
          setCurrentlyOpen={setCurrentlyOpen}
        />
        <SwipeContainer currentUser={currentUser} />
      </div>
    </>
  );
};

export default Dashboard;
