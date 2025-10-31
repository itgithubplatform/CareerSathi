import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const { roadmapId } = await request.json();
        if (!roadmapId) {
            return NextResponse.json({ error: "Roadmap ID is required" }, { status: 400 })
            
        }
        const deletedRoadmap = await prisma.roadmap.delete({
            where:{
                id: roadmapId,
                userId: session.user.id
            }
        })
        if (!deletedRoadmap) {
            return NextResponse.json({ error: "Roadmap not found" }, { status: 404 })
        }
        revalidatePath("/roadmap")
        return NextResponse.json({ message: "Roadmap deleted successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete roadmap" }, { status: 500 })
    }
}