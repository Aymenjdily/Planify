import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const existsUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existsUser) {
          return null;
        }

        const passwordsMatching = await bcrypt.compare(
          credentials.password,
          existsUser.password!
        );

        if (!passwordsMatching) {
          return null;
        }

        return existsUser;
      },
    }),
  ],
  callbacks:{
    //@ts-ignore
    async jwt({ token, user, session }){
      console.log("jwt callback", { token, user, session })

      if(user){
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      }

      return token
    },
    //@ts-ignore
    async session({ session, token, user }){
      console.log("session callback", { session, token, user })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
