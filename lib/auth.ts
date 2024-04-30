import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { Provider } from "next-auth/providers/index"
import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"

export const authOptions: NextAuthOptions = {
  providers: [
    env.GITHUB_CLIENT_ID &&
      env.GITHUB_CLIENT_SECRET &&
      GitHubProvider({
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      }),
    env.GOOGLE_CLIENT_ID &&
      env.GOOGLE_CLIENT_SECRET &&
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
  ].filter(Boolean) as Provider[],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
  },
  pages: {
    signIn: "/malik",
  },
}
