import { NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    // Check Firebase Admin connection
    await adminDb.collection('health').doc('test').set({
      timestamp: new Date().toISOString(),
      status: 'healthy'
    })

    // Check environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'FIREBASE_PRIVATE_KEY',
      'FIREBASE_CLIENT_EMAIL',
      'NEXTAUTH_SECRET',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET'
    ]

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      firebase: 'connected',
      environment: {
        missing: missingVars,
        hasLinkedIn: !!(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET)
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}