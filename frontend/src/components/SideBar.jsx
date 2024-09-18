import React, { useState } from "react";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";
import ImageWithFallback from "./ImageWithFallback";

const SideBar = ({ currentUser }) => {
  const [currentlyOpen, setCurrentlyOpen] = useState("matches");

  const [currentChat, setCurrentChat] = useState();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-r-xl bg-black bg-opacity-35">
      <section className="flex items-center gap-1 border-b-2 border-b-black bg-pink-200 p-1">
        <ImageWithFallback
          src={currentUser.profilePictureUrl}
          fallbackSrc={
            "https://ih1.redbubble.net/image.1046392292.3346/tst,medium,507x507-pad,600x600,f8f8f8.jpg"
          }
          alt={"Profile Picture"}
          className="size-10 rounded-full bg-white object-cover"
        />
        <p className="text-xl font-bold text-black">
          {currentUser.firstName} {currentUser.lastName}
        </p>
      </section>

      <section className="grid grid-cols-2">
        <button
          onClick={() => setCurrentlyOpen("matches")}
          className={`px-2 py-1 text-xl font-bold ${currentlyOpen === "matches" ? "bg-pink-300 underline" : "bg-pink-200"}`}
        >
          Matches
        </button>
        <button
          onClick={() => setCurrentlyOpen("chat")}
          className={`px-2 py-1 text-xl font-bold ${currentlyOpen === "chat" ? "bg-pink-300 underline" : "bg-pink-200"}`}
        >
          Chat
        </button>
      </section>

      <section className="flex grow p-2">
        {currentlyOpen === "matches" && (
          <MatchesDisplay setCurrentChat={setCurrentChat} />
        )}
        {currentlyOpen === "chat" && (
          <ChatDisplay user={currentUser} currentChat={currentChat} />
        )}
      </section>
    </div>
  );
};

export default SideBar;
