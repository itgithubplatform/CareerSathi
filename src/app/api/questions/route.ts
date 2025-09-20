import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { askVertex } from "@/lib/vertex"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const questions = await prisma.dailyQuestion.findMany({
            where: {
                userId: session.user.id,
                expiresAt: {
                    gt: new Date()
                }
            }
        })
        if (!questions || questions.length === 0) {
            const roadmaps = await prisma.roadmap.findMany({
                where: {
                    userId: session.user.id
                },
                include: {
                    skillsToLearn: true,
                    recommendedProjects: true
                }
            })
            const skills = roadmaps.flatMap(roadmap =>
                roadmap.skillsToLearn?.map(skill => skill.skill) || []
            );

            const projects = roadmaps.flatMap(roadmap =>
                roadmap.recommendedProjects?.map(project => project.title) || []
            );
            const userProfile = await prisma.userProfile.findUnique({
                where: { userId: session.user.id },
            })

           const prompt = `
You are an AI learning assistant. Generate exactly 5 NEW daily learning questions based SPECIFICALLY on the user's current learning roadmap. 

USER'S CURRENT LEARNING CONTEXT:
- User: ${session.user.name}
- User profile: ${JSON.stringify(userProfile)}
- Skills listed: ${skills.join(', ') || 'No specific skills listed'}
- Current projects: ${projects.join(', ') || 'No specific projects listed'}
- Current timestamp: ${new Date().toISOString()}

CRITICAL INSTRUCTIONS:
1. Questions MUST be directly related to the user's specific skills and projects listed above.
2. Each question should be achievable within one day (break big tasks into sub-tasks).
3. Focus on **practical, action-oriented steps**, not essay-style text.
4. Each question must be written in a **short, clear format with bullet points** (avoid long paragraphs).
5. Use **icons/emojis** to highlight keywords (e.g., ⏳ for time, 📝 for writing, 🔍 for research).
6. Include specific references to the user's skills/projects in the questions.
7. Questions should help track progress and identify next immediate steps.
8. GENERATE COMPLETELY NEW QUESTIONS EVERY TIME - avoid repeating patterns.
9. Vary question types: practice, progress checks, conceptual reviews, planning tasks, reflection prompts.
10. Consider different phases of learning: practice, implementation, troubleshooting, documentation, planning, reflection, review.
11. Use the current timestamp to make questions time-relevant.
12. If there are no specific skills or projects listed, suggest tasks that are helpful to find direction and encourage the user to talk to the AI mentor.
13. DO NOT assume the user is a software developer unless their skills/projects indicate that.

REQUIRED OUTPUT FORMAT:
Return ONLY a valid JSON object with this exact structure:
{
  "questions": [
    "### Question 1\\n<your markdown-formatted, bullet-pointed question here>",
    "### Question 2\\n<your markdown-formatted, bullet-pointed question here>",
    "### Question 3\\n<your markdown-formatted, bullet-pointed question here>",
    "### Question 4\\n<your markdown-formatted, bullet-pointed question here>",
    "### Question 5\\n<your markdown-formatted, bullet-pointed question here>"
  ]
}

OUTPUT RULES:
- Use double quotes for all strings
- Each string must include **markdown formatting** (headings, bullet points, icons/emojis)
- No additional text outside the JSON object
- Exactly 5 questions, no more, no less
- Ensure questions are short, distinct, and easy to act on

QUESTION VARIATION STRATEGIES (context-sensitive, not tech-only):
- Practice: "⏳ Spend 20 minutes practicing ${skills[0]} by..."
- Troubleshoot: "🔧 Identify and fix one difficulty you faced yesterday in ${projects[0]}..."
- Plan: "🗺️ Outline the next 3 steps to make progress in ${skills[1]} within ${projects[0]}"
- Review: "📝 Reflect on your work in ${projects[0]} and write down one improvement area"
- Research: "🔍 Look up one best practice in ${skills[0]} and apply it to ${projects[0]}"

EXAMPLE STARTERS (adaptable to any skill/project type):
- "### Practice\\n- ⏳ Spend 25 minutes working on..."
- "### Troubleshooting\\n- 🔧 Find one issue in your recent work and improve it..."
- "### Planning\\n- 🗺️ Define the next phase of..."
- "### Reflection\\n- 📝 Write down what you learned today about..."
- "### Research\\n- 🔍 Look up and apply one new approach for..."

Generate exactly 5 NEW, varied, and specific actionable questions NOW:
`;

            const rawReply = (await askVertex(prompt)).trim()
            console.log(rawReply);

            const match = rawReply.match(/```json\s*([\s\S]*?)```/) || rawReply.match(/\{[\s\S]*\}/);

            if (!match) {
                throw new Error("No JSON found in CareerSathi response");
            }

            let reply;
            reply = JSON.parse(match[1] ?? match[0]);
            console.log(reply);

            if (reply.questions) {
                const expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 24);

                const createdQuestions = await Promise.all(
                    reply.questions.map((question: string) =>
                        prisma.dailyQuestion.create({
                            data: {
                                questionText: question,
                                expiresAt,
                                userId: session.user.id
                            }
                        })
                    )
                )

                return NextResponse.json({ questions: createdQuestions }, { status: 201 })
            }
        }
        return NextResponse.json({ questions }, { status: 200 })
    } catch (error) {
        NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}
