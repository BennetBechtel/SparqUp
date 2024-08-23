import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMutation } from "react-query";

const Register = () => {
  const navigate = useNavigate();

  const successToast = () => {
    toast.success("Registration successful", {
      position: "top-right",
    });
  };

  const errorToast = () => {
    toast.error("Something went wrong", {
      position: "top-right",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex grow items-center justify-around">
      <form onSubmit={(e) => onSubmit(e)} className="w-full max-w-xl">
        <ToastContainer />
        <input
          {...register("firstName", {
            required: "First Name is required",
          })}
          type="text"
          placeholder="First Name"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />
        <input
          {...register("lastName", {
            required: "Last Name is required",
          })}
          type="text"
          placeholder="Last Name"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Email Address"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />
        <input
          {...register("password", {
            required: "Password is required",
            validate: (value) => {
              if (value.length < 8)
                return "Password must be at least 8 characters";
            },
          })}
          type="password"
          placeholder="Password"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />

        <button type="submit" className="primary-button w-full">
          Register
        </button>
        <div className="items-center py-2 text-center text-gray-500">
          Already have an account?
          <Link to={"/login"} className="ml-1 text-gray-700 underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
