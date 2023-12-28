import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Kakao from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET_ID
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    }
  }
};

export default NextAuth(authOptions);
