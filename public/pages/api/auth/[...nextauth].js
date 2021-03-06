import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { check, getUserByEmail, login } from "../../../utils/APIRoutes";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token = user);
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;

      if (!session) return;

      // const client = await connectToDatabase();
      // const usersCollection = client.db().collection("users");
      const { data } = await axios.post(getUserByEmail, {
        email: session.user.email,
      });

      if (data.msg == false) {
        return;
      }

      // var userData = data.user;
      return {
        ...session,
        user: {
          ...session.user,
          ...data.user,
        },
      };
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        console.log(user);

        const body = {
          name: user.name,
          email: user.email,
          provider: account.provider,
        };

        const { data } = await axios.post(check, body);
        if (data.status === true) {
          return true;
        } else {
          return `/login?error=${data.msg}`;
        }
      }

      return true;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(login, {
          method: "POST",
          body: JSON.stringify({
            password: credentials.password,
            email: credentials.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.status) {
          return {
            ...data.user,
          };
        }

        throw new Error("Invalid email/username or password");
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
});
