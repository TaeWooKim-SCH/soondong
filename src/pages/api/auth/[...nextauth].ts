import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        id: { label: "id", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials) {
          const res = await fetch(`${process.env.DOMAIN}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          });
          const user = await res.json();
          if (res.ok && user) {
            return user;
          }
          else {
            return null;
          }
        }
        else {
          return '잘못된 접근';
        }
      }
    })
  ],
  secret: process.env.NEXT_AUTH_SECRET, // 프로덕션 모드에서는 시크릿이 필요함
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.user = user;
        token.id = user.id;
      } 
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
