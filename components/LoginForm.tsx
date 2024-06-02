"use client";

import Image from "next/image";
import Link from "next/link";

import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

type SignInUser = Omit<User, "firstName" | "lastName">;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUser>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignInUser) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        enqueueSnackbar(
          "Please check if you have a stable internet connection, if you have please contact us via our phone number",
          { variant: "error" }
        );
        throw new Error(error.message);
      }
      if (response.redirected) {
        router.push(response.url);
      } else {
        const res = await response.json();
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(
          "Something went wrong, Please contact us via our phone number",
          { variant: "error" }
        );
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden sm:block sm:w-1/3 md:w-7/12 bg-cover bg-center">
        <Image
          src="https://source.unsplash.com/random?wallpapers"
          alt="Background"
          height={1000}
          width={1000}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full sm:w-2/3 md:w-5/12 p-8 bg-white shadow-lg">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold">Sign in</h1>
        </div>
        <form className="w-full" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              autoFocus
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
          <div className="mt-6 flex justify-between">
            <Link
              href="/register"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
