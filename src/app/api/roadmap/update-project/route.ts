import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        
        const data = await request.json() as { roadmapId: string, projectId: string }
        
        const existedRoadmap = await prisma.roadmap.findUnique({
            where: { 
                id: data.roadmapId, 
                userId: session.user.id 
            }
        })
        
        if (!existedRoadmap) {
            return NextResponse.json({ error: "Roadmap not found" }, { status: 404 })
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: data.projectId,
                roadmapId: data.roadmapId 
            },
            data: {
                done: true
            }
        })

        const roadmaps = await prisma.roadmap.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        skillsToLearn: true,
        recommendedProjects: true
      }
    });

    return NextResponse.json({roadmaps}, { status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}