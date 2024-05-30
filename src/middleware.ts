import { NextResponse } from "next/server"
import { GetProfile } from "./lib/server/auth/UserProfileEndpoints"

export default async function middleware(req) {
  const token = req.cookies.get("b_token")?.value
  const url = req.nextUrl.clone()
  const isAuthPage =
    url.pathname.startsWith("/login") || url.pathname.startsWith("/register")

  if (token) {
    const res = await GetProfile(token as string)
    const isAuth = !!res.success

    if (isAuth) {
      const response = NextResponse.next()
      response.cookies.set("user", JSON.stringify(res.data), { path: "/" })

      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url))
      }

      return response
    } else {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }
      const response = NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
      response.cookies.delete("b_token")
      response.cookies.delete("user")
      return response
    }
  } else {
    if (!isAuthPage) {
      const response = NextResponse.redirect(new URL(`/login`, req.url))
      response.cookies.delete("user")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
