import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
    // next auth let's you make a form from here
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mobarrez@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return { id: user._id, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
