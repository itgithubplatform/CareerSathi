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

    // Save assessment data to database
    const assessment = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      update: {
        // Stage 1 - Identity
        dateOfBirth: assessmentData.age ? new Date(new Date().getFullYear() - assessmentData.age, 0, 1) : null,
        location: assessmentData.location,
        education: assessmentData.educationLevel,
        currentStatus: assessmentData.currentYear,
        
        // Stage 2 - Interests
        interests: JSON.stringify(assessmentData.interestDomains),
        careerGoals: assessmentData.motivation,
        
        // Stage 3 - Skills
        skills: JSON.stringify({
          problemSolving: assessmentData.problemSolving,
          codingProficiency: assessmentData.codingProficiency,
          communication: assessmentData.communication,
          teamwork: assessmentData.teamwork,
          techFamiliarity: assessmentData.techFamiliarity,
          hasProjects: assessmentData.hasProjects,
          projectDescription: assessmentData.projectDescription
        }),
        
        // Optional fields
        phone: assessmentData.linkedinUrl || null,
        preferredIndustry: JSON.stringify(assessmentData.dayToDay),
        experienceLevel: assessmentData.hasProjects ? 'beginner' : 'fresher'
      },
      create: {
        userId: session.user.id,
        dateOfBirth: assessmentData.age ? new Date(new Date().getFullYear() - assessmentData.age, 0, 1) : null,
        location: assessmentData.location,
        education: assessmentData.educationLevel,
        currentStatus: assessmentData.currentYear,
        interests: JSON.stringify(assessmentData.interestDomains),
        careerGoals: assessmentData.motivation,
        skills: JSON.stringify({
          problemSolving: assessmentData.problemSolving,
          codingProficiency: assessmentData.codingProficiency,
          communication: assessmentData.communication,
          teamwork: assessmentData.teamwork,
          techFamiliarity: assessmentData.techFamiliarity,
          hasProjects: assessmentData.hasProjects,
          projectDescription: assessmentData.projectDescription
        }),
        phone: assessmentData.linkedinUrl || null,
        preferredIndustry: JSON.stringify(assessmentData.dayToDay),
        experienceLevel: assessmentData.hasProjects ? 'beginner' : 'fresher'
      }
    })

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