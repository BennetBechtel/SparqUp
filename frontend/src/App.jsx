import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
function App() {
  const { auth } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {auth && (
            <>
              <Route path="/account" element={<Account />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
