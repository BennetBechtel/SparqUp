import React from "react";
import { useQuery } from "react-query";
import * as apiClinet from "../apiClient.js";
import calculateAge from "../util/calculateAge.js";
import ImageWithFallback from "./ImageWithFallback.jsx";

const MatchesDisplay = ({ setCurrentChat }) => {
  const { data: matches, isLoading } = useQuery(
    "fetchAllMatches",
    apiClinet.fetchAllMatches,
  );

  if (isLoading) {
    return <div></div>;
  }

  if (matches?.matches.length < 1) {
    return <div>No matches yet...</div>;
  }

  return (
    <div
      className="scrollbar-hide grid w-full grid-cols-2 gap-1 overflow-y-scroll"
      style={{
        height: "calc(100vh - (206px)",
      }}
    >
      {matches?.matches.map((match) => (
        <div
          key={match._id + Math.random()}
          onClick={() => setCurrentChat(match._id)}
          className="relative h-52 overflow-hidden rounded-md hover:cursor-pointer"
        >
          <ImageWithFallback
            src={match.profilePictureUrl}
            fallbackSrc={
              "https://ih1.redbubble.net/image.1046392292.3346/tst,medium,507x507-pad,600x600,f8f8f8.jpg"
            }
            alt={"Profile Picture"}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-25 p-2 text-white">
            {match.firstName}, {calculateAge(match.birthDate)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
