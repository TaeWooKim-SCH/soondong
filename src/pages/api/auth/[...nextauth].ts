import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Kakao from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_SECRET_ID,
      authorization: 'https://kauth.kakao.com/oauth/authorize?lang=ko'
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET, // 프로덕션 모드에서는 시크릿이 필요함
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'kakao' && user.name === 'null') {
        return '/signup';
      }
      return '/home';
    }
  }
};

export default NextAuth(authOptions);
