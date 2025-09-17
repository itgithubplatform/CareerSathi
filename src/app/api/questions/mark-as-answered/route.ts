import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { questionId } = await request.json();
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const question = await prisma.dailyQuestion.findFirst({
            where: {
                id: questionId,
                userId: session.user.id,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!question) {
            return NextResponse.json({ error: "Question not found or expired" }, { status: 404 })
            
        }
        const updatedQuestion = await prisma.dailyQuestion.update({
            where: { id: questionId },
            data: {
                isAnswered: true,
            },
        });
        return NextResponse.json({ message: "Question marked as answered" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}