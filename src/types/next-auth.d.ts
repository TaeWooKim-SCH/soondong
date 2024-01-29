import NextAuth from 'next-auth';
import { JWT } from "next-auth/jwt"

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  };
  interface User {
    name: string;
    id: string;
  }
}