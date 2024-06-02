import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { comparePasswords } from "@/utils/password";
import { NextResponse } from "next/server";

const getUserFromDb = async (email: string) => {
  try {
    const response = await fetch(process.env.BACKEND_URL + `/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function POST(request: Request, response: Response) {
  const body = await request.json();

  const { success, data: loginFormData, error } = signInSchema.safeParse(body);

  if (!success) {
    return NextResponse.json({
      message: "Invalid data provided. Please check your data and try again.",
      errors: error.flatten().fieldErrors,
      status: 400,
    });
  }

  try {
    const user = await getUserFromDb(loginFormData.email);

    if (!user) {
      return NextResponse.json({
        message: "User not found. Please register first.",
        status: 404,
      });
    }

    const isPasswordCorrect = await comparePasswords(
      loginFormData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json({
        message: "Your password is incorrect. Please try again.",
        status: 400,
      });
    }

    await signIn("credentials", {
      email: loginFormData.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NEXT_REDIRECT") {
        return NextResponse.redirect(
          new URL("/dashboard", process.env.NEXT_PUBLIC_URL as string)
        );
      }
      return NextResponse.json({
        message: "An error occurred.",
        status: 500,
      });
    }
  }
}
