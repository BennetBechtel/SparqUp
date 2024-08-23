import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = auth
    ? () => {
        setAuth(false);
      }
    : () => {
        navigate("/register");
      };

  return (
    <div className="flex min-h-full grow flex-col items-center justify-center gap-5">
      <h1 className="w-fit text-4xl font-extrabold">SparqUp®</h1>
      <button onClick={handleClick} className="primary-button w-fit">
        {auth ? "Logout" : "Create Account"}
      </button>
    </div>
  );
};

export default Home;
