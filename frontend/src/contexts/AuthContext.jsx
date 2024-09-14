import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient.js";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AuthContext.Provider value={{ auth: !isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
