import { notFound } from 'next/navigation';
import ShowRoadmaps from '@/components/roadmap/showRoadmaps'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import React from 'react'
import RenderRoadmap from '@/components/roadmap/RenderRoadmap';

export default async function page({params}: {params: any}) {
    const id = (await params).id?.[0]
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return <div className='text-red-500 flex justify-center items-center h-screen'>no session</div>
    }
    if (!id) {
        try {
            const roadmaps = await prisma.roadmap.findMany({
                where:{
                    userId: session.user.id
                },
                include: {
                    skillsToLearn: true,
                    recommendedProjects: true
                }
            })
            return <ShowRoadmaps roadmaps={roadmaps} />
        } catch (error) {
            throw error
        }
    }

try {
  const roadmap = await prisma.roadmap.findUnique({
    where: {
      id,
      userId: session.user.id
    },
    include: {
      skillsToLearn: true,
      recommendedProjects: true
    }
  });
  console.log(roadmap);
  

  if (!roadmap) {
    notFound();
  }

  return (
    <RenderRoadmap roadmap={roadmap} />
  );
} catch (error) {
  console.error(error);
  throw error;
}
}
