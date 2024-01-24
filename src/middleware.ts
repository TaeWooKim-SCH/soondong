import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (token) {
    if (pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }
  else {
    if (pathname.startsWith('/my')) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }
}

export const config = {
  mather: ['/', '/login', '/signup', '/my']
}