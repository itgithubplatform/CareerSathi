import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { userProfileToString } from "@/lib/userProfileToString";
import { askVertex } from "@/lib/vertex";
import { Roadmap } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const { roadmapId } = await req.json();
        if (!roadmapId) {
            return NextResponse.json({ error: "Roadmap ID is required" }, { status: 400 })
            
        }
        const existedRoadmap = await prisma.roadmap.findUnique({
            where: { 
                id: roadmapId, 
                userId: session.user.id 
            },
            include: {
                skillsToLearn: true,
                recommendedProjects: true
            }
        })
        
        if (!existedRoadmap) {
            return NextResponse.json({ error: "Roadmap not found" }, { status: 404 })
        }
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: session.user.id
            }
        })
        if (!userProfile) {
            return NextResponse.json({ error: "User profile not found" }, { status: 404 })
        }
        const cleanProfileContext = "UserName: " + session.user.name+ " " + userProfileToString(userProfile)
        const cleanRoadmapContext = `
      - Career Path: ${existedRoadmap.careerPath}
      - Current Skills:
        ${existedRoadmap.skillsToLearn.map(skill => `  - ${skill.skill}`).join('\n')}
      - Current Projects:
        ${existedRoadmap.recommendedProjects.map(project => `  - ${project.title}: ${project.description}`).join('\n')}
    `;
const prompt = `
You are an expert 'JSON Curriculum Upgrader' service. Your one and only function is to take the provided inputs and return a single, valid JSON object.

**User's Profile (Tailor to this):**
\${cleanProfileContext}

**User's Existing Roadmap (Upgrade this):**
\${cleanRoadmapContext}

**Your Task:**
You must regenerate this roadmap to be for a more "Intermediate" or "Advanced" level.
- Use the user's profile to tailor the difficulty.
- Make the new skills a logical *next step* from their "Current Skills".
- Make the new projects more complex and impressive, building on their "Current Projects".
- Keep the same career path: "\${existedRoadmap.careerPath}".

**CRITICAL OUTPUT REQUIREMENTS:**
1.  **CRITICAL:** You MUST return **ONLY** the valid JSON object.
2.  **DO NOT** include any text, markdown, explanations, or conversational chat.
3.  **DO NOT** wrap the JSON in markdown code blocks (like \`\`\`json).
4.  The output JSON **MUST** match this exact structure:
 {
"careerPath": "\${existedRoadmap.careerPath}",
"skillsToLearn": ["string (A markdown string. **MUST** follow format: '**Skill Title** Concise description.\\n**Est. Time: 1-2 weeks**'. **If the user has a base skill, suggest an advanced upskill**.)"],
"recommendedProjects": [
{
"title": "string (A markdown string with a **bolded title** (e.g., '**Advanced Project Title**'). **Do NOT** use '##' headings.)",
"description": "string (A concise markdown explanation. **MUST** follow format: 'Project goal description.\\n**Est. Time: 1-2 weeks**'. **If the user has a similar project, suggest a 'stretch' version**.)"
}
]
}

**CONTENT GUIDELINES (How to write the content):**
1.  **Upskilling Logic:**
    - **IF** "Current Skills" has "Learn React basics", a new \`title\` should be "**Master React State Management**" or "**Learn Next.js**".
    - **IF** "Current Projects" has "Build a To-Do App", a new \`title\` should be "**Build a Real-Time Collaborative To-Do App**".

2.  **Timelines:** Every skill and project **MUST** include a **bolded** suggested timeline on a **new line** (using \`\n\`).

3.  **Personalization:** The roadmap MUST be tailored to the "User Profile", but **this tailoring must be concise.**

4.  **Skill Formatting (Concise):**
    - **DO NOT** write long paragraphs.
    - Each skill in "skillsToLearn" **MUST** be a single markdown string.
    - The format **MUST** be: \`**Skill Title** A single, concise sentence description.\n**Est. Time: 1-2 weeks**\`
    - **Example:** "**Advanced Python: Concurrency** Learn asyncio and threading to build high-performance applications.\n**Est. Time: 2-3 weeks**"
    - **Do NOT** use \`##\` headings.

5.  **Project Formatting (Concise):**
    - **DO NOT** write long paragraphs.
    - The \`title\` string **MUST** be a **bolded title** (e.g., "**Simple Inventory Manager**"). **Do NOT** use \`##\` headings.
    - The \`description\` string **MUST** follow this format: \`One or two concise sentences explaining the goal.\n**Est. Time: 1-2 weeks**\`
    - **Example \`description\`:** "Build a real-time chat API using WebSockets and Node.js, and deploy it.\n**Est. Time: 3-4 weeks**"
`;
        const rawReply = (await askVertex(prompt)).trim();

    const match = rawReply.match(/```json\s*([\s\S]*?)```/) || rawReply.match(/\{[\s\S]*\}/);
    
    if (!match) {
      throw new Error("No JSON found in CareerSathi response");
    }
    
    const roadmap = JSON.parse(match[1] ?? match[0]);
      const skillsToLearn = Array.isArray(roadmap.skillsToLearn) ? roadmap.skillsToLearn : [];
      const recommendedProjects = Array.isArray(roadmap.recommendedProjects) ? roadmap.recommendedProjects : [];
      const deleteOldSkills = prisma.skillToLearn.deleteMany({
  where: { roadmapId: roadmapId },
});

const deleteOldProjects = prisma.project.deleteMany({
  where: { roadmapId: roadmapId },
});
      const newRoadmap = prisma.roadmap.update({
        where: {
            id: roadmapId,
            userId: session.user.id
        },
        data: {
          careerPath: roadmap.careerPath,
          skillsToLearn: {
            create: skillsToLearn.map((skill: string) => ({ skill, done: false })),
          },
          recommendedProjects: {
            create: recommendedProjects.map((project: any) => ({
              title: project.title || "Untitled Project",
              description: project.description || "No description.",
            })),
          }
        },
      });
      await prisma.$transaction([deleteOldSkills, deleteOldProjects, newRoadmap]);
      revalidatePath("/roadmap")
      revalidatePath("/roadmap/"+roadmapId)
      return NextResponse.json({ message: "Roadmap updated successfully" }, { status: 200 })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: "Failed to update roadmap" }, { status: 500 })
    }
}