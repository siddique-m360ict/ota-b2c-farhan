import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { GetProfile } from "./lib/server/auth/UserProfileEndpoints"

export default withAuth(
  async function middleware(req) {
    const token = req.cookies.get("b_token")?.value
    // if (!!token) {
    //   const res = await GetProfile(token as string)
    //   const isAuth = !!res.success

    //   const isAuthPage =
    //     req.nextUrl.pathname.startsWith("/login") ||
    //     req.nextUrl.pathname.startsWith("/register")

    //   console.log(`middleware call...................`)

    //   if (isAuthPage && isAuth) {
    //     return NextResponse.redirect(new URL("/", req.url))
    //   }

    //   if (!isAuth && !isAuthPage) {
    //     let from = req.nextUrl.pathname
    //     if (req.nextUrl.search) {
    //       from += req.nextUrl.search
    //     }

    //     return NextResponse.redirect(
    //       new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    //     )
    //   }
    // } else {
    //   const isAuthPage =
    //     req.nextUrl.pathname.startsWith("/login") ||
    //     req.nextUrl.pathname.startsWith("/register")
    //   if (!isAuthPage) {
    //     return NextResponse.redirect(new URL(`/login`, req.url))
    //   }
    // }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/flight-revalidate",
    "/dashboard/:path*",
    "/editor/:path*",
    "/login",
    "/register",
  ],
}
