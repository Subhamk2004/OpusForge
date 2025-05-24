import GithubProvider from "next-auth/providers/github";
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import connectDB from "./mongodb.mjs";
import User from "@/models/User.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
const client = new MongoClient(process.env.MONGODB_URI);

export const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email repo workflow",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        try {
          await connectDB();
          const user = await User.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("No user found with the given email");
          }
          const isValidPassword = await user.comparePassword(
            credentials.password
          );
          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            profession: user.profession,
            links: user.links,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    strategy: "jwt",
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && account.provider === "github") {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      if (user) {
        token.id = user.id;
      }
      console.log("JWT Callback - Token:", token);
      console.log("JWT Callback - Account:", account);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.provider = token.provider;
      }
        console.log("Session Callback - Session:", session);
      return session;
    },
  },
};
