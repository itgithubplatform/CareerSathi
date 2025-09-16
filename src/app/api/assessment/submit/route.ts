import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const assessmentData = await request.json()
    const assessment = await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    update: {
      education: assessmentData.education,
      stream: assessmentData.stream,
      situation: assessmentData.situation,
      environment: assessmentData.environment,
      activities: assessmentData.activities,
      learningStyles: assessmentData.learningStyles,
      uncertainty: assessmentData.uncertainty,
      tradeoff: assessmentData.tradeoff,
    },
    create: {
      education: assessmentData.education,
      stream: assessmentData.stream,
      situation: assessmentData.situation,
      environment: assessmentData.environment,
      activities: assessmentData.activities,
      learningStyles: assessmentData.learningStyles,
      uncertainty: assessmentData.uncertainty,
      tradeoff: assessmentData.tradeoff,
      user: {
        connect: {
          id: session.user.id
        }
      }
    },
  });
    
    return NextResponse.json({ 
      success: true, 
      assessmentId: assessment.id,
      message: 'Assessment completed successfully' 
    })

  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit assessment' },
      { status: 500 }
    )
  }
}