"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterData } from "../signUp";

interface LoginData {
  email: string;
  password: string;
}

const LogIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>();

  const [loginError, setLoginError] = useState("");

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    const getDataFromLs: RegisterData[] = JSON.parse(
      localStorage.getItem("register") || "[]"
    );

    const user = getDataFromLs.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (user) {
      setLoginError("");
      console.log("✅ Login successful");
      reset();
      router.push("/todo/todoList");
    } else {
      setLoginError("Invalid email or password");
      console.log("❌ Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p className="mt-1 text-sm text-red-600">{errors.password?.message}</p>
          </div>

          {/* Global login error */}
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/todo/signUp" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
