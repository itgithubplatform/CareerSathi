import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const today = new Date()
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(today.getMonth() - 1)
        const questions = await prisma.dailyQuestion.findMany({
            where: {
                userId: session.user.id,
                isAnswered: true,
                expiresAt: {
                    gt: oneMonthAgo,
                },
            },
            select:{
                expiresAt:true,
                isAnswered:true,
            }
        })
        const questionMap: Record<string, number> = {}
        questions.forEach((question) => {
            const date = question.expiresAt.toISOString().split('T')[0]
            if (!questionMap[date]) {
                questionMap[date] = 0;
            }
            questionMap[date] += 1;
    })
    const data = Object.entries(questionMap).map(([date, count]) => ({
        date,
        count
    }))
    return NextResponse.json({ data,total: questions.length }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })        
    }
}