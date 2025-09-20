import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token?.hasAssessment) {
      return NextResponse.redirect(new URL('/assessment', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*',"/jobs/:path*","/chat/:path*","/api/careersathi/:path*","/assessment/:path*"],
}