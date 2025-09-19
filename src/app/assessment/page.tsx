import CareerAssessmentPage from '@/components/assessment/careerAssessmentPage'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return <div className='text-red-500 flex justify-center items-center h-screen'>no session</div>
    
  }
  try {
    const existedForm = await prisma.userProfile.findFirst({
      where: {
        userId: session.user.id
      }
    })
    if (existedForm) {
      return <CareerAssessmentPage existedForm={existedForm} />
      
    }
    return <CareerAssessmentPage />
  } catch (error) {
    
  }
}
