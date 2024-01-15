import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/signup/form') || pathname.startsWith('/signup') || pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }
}

export const config = {
  mather: ['/login', '/signup', '/signup/form']
}