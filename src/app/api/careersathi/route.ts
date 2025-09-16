import { NextResponse } from "next/server";
import { askVertex } from "@/lib/vertex";
import { ChatMessage } from "@/types/chat";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      
    }
    const body = await req.json();
    const message = typeof body.message === "string" ? body.message : "";
    const history: ChatMessage[] = Array.isArray(body.history) ? body.history : [];

    const conversationText = history
      .map((h) =>
        `${h.role === "user" ? "Student" : "CareerSathi"}: ${h.text}`
      )
      .join("\n");
const userProfile = await prisma.userProfile.findUnique({
  where: { userId: session.user.id },select: {
    createdAt:false,
    updatedAt: false,
    id: false,
    userId: false,
    education: true,
    stream: true,
    situation: true,
    environment: true,
    activities: true,
    learningStyles: true,
    uncertainty: true,
    tradeoff: true
  } 
})
   const prompt = `
You are CareerSathi, a friendly but practical career guidance mentor.

Output rules:
- Always return a single JSON object.
- No text or code blocks outside the JSON.
- JSON format:
{
  "title": "short title only for first message when no conversation so far; otherwise empty string",
  "content": "Markdown-formatted reply shown in chat. Keep it concise, warm, and clear.",
  "roadmap": "" OR {
    "careerPath": "string",
    "skillsToLearn": ["skill1", "skill2"],
    "recommendedProjects": [
      { "title": "string", "description": "string" }
    ]
  }
}
- Use double quotes for all strings.
- Escape newlines as \\n.

User profile context (from form submission):
${JSON.stringify(userProfile)}

Conversation so far:
${conversationText}

Student says: "${message}"

Guidelines:
1. Early stage:
   - Ask **1–2 clarifying questions only** about interests, strengths, or constraints.
   - Keep it conversational and not overwhelming.
   - Don’t suggest a roadmap until you have enough info.
2. Once enough info is clear:
   - Suggest **1 realistic career path** (not too many options at once).
   - Add **skills to learn** and **small starter projects** in roadmap.
3. Always keep responses concise, encouraging, expressive with emojis, and easy to read in Markdown.
`;

    const rawReply = (await askVertex(prompt)).trim();
    console.log("CareerSathi raw reply:", rawReply);

    const match = rawReply.match(/```json\s*([\s\S]*?)```/) || rawReply.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("No JSON found in CareerSathi response");
    }

    let reply;
    reply = JSON.parse(match[1] ?? match[0]);
    if (reply.roadmap) {
      const roadmap = reply.roadmap
      const newRoadmap = await prisma.roadmap.create({
        data: {
          careerPath: roadmap.careerPath,
          skillsToLearn: {
            create: roadmap.skillsToLearn.map((skill: string) => ({ skill, done: false })),
          },
          recommendedProjects: {
            create: roadmap.recommendedProjects.map((project: any) => ({
              title: project.title,
              description: project.description,
            })),
          },
        },
      })
      return NextResponse.json({ reply: `${reply.content}\n\n[View roadmap](/roadmap/${newRoadmap.id})`, title: reply.title});
    }
    return NextResponse.json({ reply: reply.content, title: reply.title });
  } catch (err) {
    console.error("CareerSathi API error:", err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong while generating advice." },
      { status: 500 }
    );
  }
}
