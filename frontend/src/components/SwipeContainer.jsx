import React, { useEffect, useState } from "react";
import SwipeCard from "./SwipeCard";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient.js";

const SwipeContainer = () => {
  const [users, setUsers] = useState([]);

  const { data: usersData } = useQuery(
    "fetchRelevantUsers",
    apiClient.fetchRelevantUsers,
  );

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.users);
    }
  }, [usersData]);

  if (!usersData || users.length < 1) {
    return (
      <div className="flex items-center justify-center">
        <p className="max-w-80 select-none text-center text-2xl font-bold">
          No users found who match your interests
        </p>
      </div>
    );
  }

  return (
    <div className="grid min-h-full grid-cols-1 place-items-center overflow-hidden">
      {users?.map((user) => (
        <SwipeCard
          user={user}
          users={users}
          setUsers={setUsers}
          key={user._id + Math.random()}
        />
      ))}
    </div>
  );
};

export default SwipeContainer;
