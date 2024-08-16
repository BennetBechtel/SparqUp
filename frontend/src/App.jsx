import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavContextProvider } from "./contexts/NavContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <NavContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/onboarding" element={<OnBoarding />} />
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
