import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full grow flex-col items-center justify-center gap-5">
      <h1 className="w-fit text-4xl font-extrabold">SparqUp®</h1>
      {auth ? (
        <LogoutButton style={"primary-button w-fit"} />
      ) : (
        <button
          onClick={() => navigate("/register")}
          className="primary-button w-fit"
        >
          Create Account
        </button>
      )}
    </div>
  );
};

export default Home;
