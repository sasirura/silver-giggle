import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { comparePasswords, saltAndHashPassword } from "./utils/password";
import { redirect } from "next/navigation";

const getUserFromDb = async (email: string) => {
  const response = await fetch(process.env.BACKEND_URL + `/user/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const saltedPassword = await saltAndHashPassword(password as string);
        const user = await getUserFromDb(email as string);

        if (!user) {
          throw new Error("User not found.");
        }

        const isPasswordCorrect = comparePasswords(
          saltedPassword,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLogged = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const onApiRoute = nextUrl.pathname.startsWith("/api");
      if (isOnDashboard) {
        if (isLogged) return true;
        return false;
      } else if (isLogged) {
        if (onApiRoute) return true;
        return Response.redirect(
          new URL("/dashboard", process.env.NEXT_PUBLIC_URL as string)
        );
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
});
