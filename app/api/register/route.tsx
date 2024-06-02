import { registerSchema } from "@/lib/zod";
import { saltAndHashPassword } from "@/utils/password";

export async function POST(request: Request, response: Response) {
  const body = await request.json();

  try {
    const {
      success,
      data: registerFormData,
      error,
    } = registerSchema.safeParse(body);

    if (!success) {
      return Response.json({
        message: "Invalid data provided. Please check your data and try again.",
        errors: error.flatten().fieldErrors,
        status: 400,
      });
    }

    const hashedPassword = await saltAndHashPassword(registerFormData.password);

    const payload = {
      firstName: registerFormData.firstName,
      lastName: registerFormData.lastName,
      email: registerFormData.email,
      password: hashedPassword,
    };

    const response = await fetch(process.env.BACKEND_URL + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return Response.json({
      message: "User registered successfully. Please login.",
      data,
      status: 200,
    });
  } catch (error) {
    return Response.json({
      message: "Oops! Something happened. Please try again.",
      status: 500,
    });
  }
}
