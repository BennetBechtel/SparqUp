import React, { useState } from "react";
import ChatDisplay from "./ChatDisplay";
import MatchesDisplay from "./MatchesDisplay";

const SideBar = () => {
  const [currentlyOpen, setCurrentlyOpen] = useState("matches");

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-r-xl bg-black bg-opacity-35">
      <section className="flex items-center gap-1 border-b-2 border-b-black bg-pink-200 p-1">
        <img
          src="https://www.si.com/.image/t_share/MjAyMjc3MjQ4NjUxMjQwNTE2/usatsi_21857042.jpg"
          className="size-10 rounded-full bg-white object-cover"
        />
        <p className="text-xl font-bold text-black">Alex Caruso</p>
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
        {currentlyOpen === "matches" && <MatchesDisplay />}
        {currentlyOpen === "chat" && <ChatDisplay />}
      </section>
    </div>
  );
};

export default SideBar;
