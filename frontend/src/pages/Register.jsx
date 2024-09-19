import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../apiClient.js";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Registration successful", {
        position: "top-right",
      });
      navigate("/account");
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
    <div className="flex grow items-center justify-center px-3">
      <form onSubmit={(e) => onSubmit(e)} className="w-full max-w-xl">
        <input
          {...register("firstName", {
            required: "First Name is required",
          })}
          type="text"
          placeholder="First Name"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />
        {errors.firstName && (
          <p className="input-error-message">{errors.firstName.message}</p>
        )}

        <input
          {...register("lastName", {
            required: "Last Name is required",
          })}
          type="text"
          placeholder="Last Name"
          className="my-2 w-full rounded-2xl border px-3 py-2"
        />
        {errors.lastName && (
          <p className="input-error-message">{errors.lastName.message}</p>
        )}

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
