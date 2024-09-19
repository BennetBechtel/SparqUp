import React, { useEffect, useState, useCallback } from "react";
import SwipeCard from "./SwipeCard";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient.js";

const SwipeContainer = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery("fetchRelevantUsers", apiClient.fetchRelevantUsers, {
    staleTime: Infinity, // Prevent automatic refetching
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  const updateUsers = useCallback(() => {
    if (usersData) {
      setUsers(usersData.users);
    }
  }, [usersData]);

  useEffect(() => {
    updateUsers();
  }, [updateUsers]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  if (!usersData || users.length < 1) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="max-w-80 select-none text-center text-2xl font-bold">
          No users found who match your interests... <br /> Try reloading page
        </p>
      </div>
    );
  }

  return (
    <div className="grid min-h-full grid-cols-1 place-items-center overflow-hidden px-3">
      {users.map((user) => (
        <SwipeCard
          currentUser={currentUser}
          user={user}
          users={users}
          setUsers={setUsers}
          key={user._id}
        />
      ))}
    </div>
  );
};

export default SwipeContainer;
