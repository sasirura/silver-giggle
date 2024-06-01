"use client";

import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
import { useForm } from "react-hook-form";

type SignInUser = Omit<User, "firstName" | "lastName">;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUser>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInUser) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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
      <h1 className="text-4xl mt-4">Welcome to Location Device Management</h1>
      <p className="text-lg mt-4 text-center">
        This is a simple application to manage location devices.
      </p>
      <div className="mt-8"></div>
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
        Login
      </button>
    </form>
  );
}
