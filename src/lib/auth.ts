import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'r_liteprofile r_emailaddress'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      if (user) {
        token.uid = String(user.id)
         const profile = await prisma.userProfile.findUnique({
        where: { userId: user.id }})
        token.hasAssessment = !!profile
      }
      if (trigger === "update") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: token.uid } 
      })
      token.hasAssessment = !!profile
    }
      if (account?.provider) {
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string
        session.user.provider = token.provider as string
      }      
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}