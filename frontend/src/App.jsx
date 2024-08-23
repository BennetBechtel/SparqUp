import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavContextProvider } from "./contexts/NavContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <NavContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/register" element={<Register />} />
              <Route path="login" element={<Login />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </NavContextProvider>
  );
}

export default App;
