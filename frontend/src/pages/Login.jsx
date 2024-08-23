import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex grow items-center justify-around">
      <form onSubmit={(e) => onSubmit(e)} className="w-full max-w-xl">
        <input
          type="email"
          placeholder="Email Address"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />

        <button type="submit" className="primary-button w-full">
          Login
        </button>
        <div className="items-center py-2 text-center text-gray-500">
          Don't have an account yet?
          <Link to={"/register"} className="ml-1 text-gray-700 underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
