import ShowRoadmaps from '@/components/roadmap/showRoadmaps'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page({params}: {params: any}) {
    const id = (await params).id?.[0]
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return <div>no session</div>
        
    }
    if (!id) {
        try {
            const roadmaps = await prisma.roadmap.findMany({
                where:{
                    userId: session.user.id
                }
            })
            return <ShowRoadmaps roadmaps={roadmaps} />
        } catch (error) {
            throw error
        }
    }
  return (
    <div>
      
    </div>
  )
}
