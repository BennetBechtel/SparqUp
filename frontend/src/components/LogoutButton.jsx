import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../apiClient.js";
import { toast } from "react-toastify";

const LogoutButton = ({ style }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Logout successful", {
        position: "top-right",
      });
      navigate("/account");
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        position: "top-right",
      });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button onClick={handleClick} className={style}>
      Logout
    </button>
  );
};

export default LogoutButton;
