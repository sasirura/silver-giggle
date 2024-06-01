import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { saltAndHashPassword } from "@/utils/password";

export async function POST(request: Request, response: Response) {
  const body = await request.json();

  try {
    const {
      success,
      data: loginFormData,
      error,
    } = signInSchema.safeParse(body);

    if (!success) {
      return Response.json({
        message: "Please enter valid data",
        errors: error.flatten().fieldErrors,
        status: 400,
      });
    }
    await signIn("credentials", {
      email: loginFormData.email,
      password: saltAndHashPassword(loginFormData.password),
    });
  } catch (error) {
    return Response.json({
      message: "Oops! Something happened. Please try again.",
      status: 500,
    });
  }
}
