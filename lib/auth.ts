import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        user_email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@yahoo.com",
        },
        user_password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
      }
      return true
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session }
      }
      if (account?.provider === "google") {
        const email = user?.email
        const id = user?.id
        const name = user?.name

        token.user_id = 1
      }
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
}
