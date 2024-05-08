import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { GetProfile } from "./lib/server/auth/UserProfileEndpoints"

export default async function middleware(req) {
  const token = req.cookies.get("b_token")?.value
  if (!!token) {
    const res = await GetProfile(token as string)
    const isAuth = !!res.success

    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    console.log(`middleware call...................`)

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (!isAuth && !isAuthPage) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  } else {
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    if (!isAuthPage) {
      return NextResponse.redirect(new URL(`/login`, req.url))
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
