import React, { createContext, useState } from "react";

const NavContext = createContext(false);

const NavContextProvider = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <NavContext.Provider value={{ active, setActive }}>
      {children}
    </NavContext.Provider>
  );
};

export { NavContext, NavContextProvider };
