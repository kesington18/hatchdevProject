"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword?: string;
}

export const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterData>();

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    const { confirmPassword, ...userData } = data;

    const existingUsers: RegisterData[] = JSON.parse(
      localStorage.getItem("register") || "[]"
    );

    const user = existingUsers.find((user) => user.email === userData.email);

    if (user) {
      alert("Email already exists!");
    } else {
      existingUsers.push(userData);
      localStorage.setItem("register", JSON.stringify(existingUsers));
      reset();
      router.push("/todo/signin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", {
                required: "First name is required",
                validate: (val) =>
                  /^[a-zA-Z]{3,100}$/.test(val) || "Enter a valid first name",
              })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.firstName?.message}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", {
                required: "Last name is required",
                validate: (val) =>
                  /^[a-zA-Z]{3,100}$/.test(val) || "Enter a valid last name",
              })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.lastName?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: (val) =>
                  /^\S+@\S+\.\S+$/.test(val) || "Enter a valid email",
              })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter your age"
              {...register("age", {
                required: "Age is required",
                validate: (val) =>
                  val >= 16 || "You must be at least 16 years old",
              })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-600 text-sm mt-1">{errors.age?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                  message:
                    "At least 8 chars, include uppercase, lowercase & a number",
                },
              })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) =>
                  val === watch("password") || "Passwords do not match",
              })}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => router.push("/todo/signin")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
