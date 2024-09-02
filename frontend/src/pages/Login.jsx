import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import * as apiClient from "../apiClient.js";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.login, {
    onSuccess: () => {
      toast.success("Login successful", {
        position: "top-right",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        position: "top-right",
      });
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  return (
    <div className="flex grow items-center justify-around">
      <form onSubmit={(e) => onSubmit(e)} className="w-full max-w-xl">
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Email Address"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />
        {errors.email && (
          <p className="input-error-message">{errors.email.message}</p>
        )}

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
        {errors.password && (
          <p className="input-error-message">{errors.password.message}</p>
        )}

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
