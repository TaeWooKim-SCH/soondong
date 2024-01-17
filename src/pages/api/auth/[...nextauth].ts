import { db } from "@/utills/database";
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
    async jwt({ token, account, profile }) {
      if (account) {
        console.log(`token: ${token}`);
        console.log(`account: ${profile?.email}`);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // token.profile = profile;
      }
      return token;
    },
    // async signIn({ user, account ,credentials }) {
    //   // 사용자가 이미 데이터베이스에 존재하는지 확인
    //   const connectDb = await db.promise().getConnection();
    //   const result = await connectDb.query(`select id from tb_member where name = '${user.email}';`);
    //   console.log(result);
    //   if (Array.isArray(result[0]) &&  !result[0].length) {
    //     connectDb.release();
    //     return `/signup/form?access_token=${account?.access_token}&id=${user.email}`;
    //   } else {
    //     connectDb.release();
    //     return `/home?access_token=${account?.access_token}&id=${user.email}`;
    //   }
    // },
    
    // async redirect({ url, baseUrl }) {
    //   return `${baseUrl}/signup/form`;
    // }
  },
};

export default NextAuth(authOptions);
