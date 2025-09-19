import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { askVertex } from "@/lib/vertex"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json() as { name: string, description: string }
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: session.user.id
            }, select: {
                createdAt: false,
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
                tradeoff: true,
                knownCareer: true,
                preferredIndustries: true
            }
        })
        const prompt = `
You are CareerSathi, a practical and supportive career mentor.
Your job is to create a roadmap for a user based on their profile and roadmap details. 
The roadmap is based on the following inputs:

- Roadmap name: "${data.name}"
- Roadmap description: "${data.description}"
- User profile: ${JSON.stringify(userProfile)}

### Output Requirements:
1. Return ONLY valid JSON, no explanations or text outside the JSON.
2. The example output is:

{
  "roadmap": {
    "careerPath": string,
    "skillsToLearn": [ "string (markdown with heading, explanation, and how to learn it)"],
    "recommendedProjects": [
      {
        "title": string,
        "description": "string (markdown explaining the project, why it helps, and practical guidance)"
      }
    ]
  }
}

3. Guidelines:
- Each skill must be written in markdown with a clear heading, explanation, and step-by-step learning approach tailored to the user.
- Each project must have a helpful title and a markdown description that explains what the project is, why it matters, and practical guidance (with links, resources, or hints).
- Ensure the content is realistic, actionable, and not generic filler.
- IMPORTANT: Output strictly valid JSON. 
  Escape all double quotes inside string values (use \\" instead of ").
  Do not include explanations or text outside the JSON.

Now, generate the roadmap JSON.
`
        const rawReply = (await askVertex(prompt)).trim()
        console.log(rawReply);
    
        const match = rawReply.match(/```json\s*([\s\S]*?)```/) || rawReply.match(/\{[\s\S]*\}/);
    
        if (!match) {
            throw new Error("No JSON found in CareerSathi response");
        }
    
        let reply;
        reply = JSON.parse(match[1] ?? match[0]);
        console.log(reply.roadmap.skillsToLearn[0]);
        
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
                    user: {
                        connect: {
                            id: session.user.id
                        }
                    }
                },
            })
            return NextResponse.json({message:"Roadmap created successfully", roadmapId: newRoadmap.id }, { status: 200 });
        }
        throw new Error("Failed to create roadmap")
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: "Failed to create roadmap" }, { status: 500 })
    }
}