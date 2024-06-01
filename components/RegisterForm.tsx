"use client";

import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/lib/zod";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl mt-4 text-center">
        Welcome to Location Device Management
      </h1>
      <p className="text-lg mt-4 text-center">
        This is a simple application to manage location devices.
      </p>
      <div className="mt-4">
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
      </div>
      <div className="mt-4">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mt-4">
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Register
      </button>
    </form>
  );
}
