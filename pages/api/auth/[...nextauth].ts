import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import RandomPasswordGenerator from "@/components/Sidebar/PasswordGenerator";
import { v4 as uuidv4 } from "uuid";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

// import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text", label: "email", placeholder: "Email" },
        password: {
          type: "password",
          label: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ profile, account, user, credentials }) {
      try {
        if (account?.provider === "google" && profile) {
          const { name, email, image } = profile;
          const username = name?.toLowerCase();
          const password = RandomPasswordGenerator();
          const id = uuidv4();
          const hashedPassword = await bcrypt.hash(password, 12);

          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                id,
                name,
                username,
                email,
                hashedPassword,
                profileImage: image,
              },
            });
          }

          return true;
        }

        if (account?.provider === "credentials" && user) {
          return true;
        }

        return false;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }
      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
