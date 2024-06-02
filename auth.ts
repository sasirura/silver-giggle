import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        const { email } = credentials;

        const user = await getUserFromDb(email as string);

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnApiRoute = nextUrl.pathname.startsWith("/api");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        if (isOnApiRoute) return true;
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
