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
        if (!questions|| questions.length === 0) {
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
    
            
           const prompt = `
    You are an AI learning assistant. Generate exactly 5 NEW daily learning questions based SPECIFICALLY on the user's current learning roadmap. 
    
    USER'S CURRENT LEARNING CONTEXT:
    - User: ${session.user.name}
    - Skills being learned: ${skills.join(', ') || 'No specific skills listed'}
    - Current projects: ${projects.join(', ') || 'No specific projects listed'}
    - Current timestamp: ${new Date().toISOString()}
    
    CRITICAL INSTRUCTIONS:
    1. Questions MUST be directly related to the user's specific skills and projects listed above
    2. Each question should be achievable within one day (break big tasks into sub-tasks)
    3. Focus on practical, actionable steps rather than generic learning advice
    4. Include specific references to the user's skills/projects in the questions
    5. Questions should help track progress and identify next immediate steps
    6. GENERATE COMPLETELY NEW QUESTIONS EVERY TIME - avoid repeating patterns
    7. Vary question types: practical exercises, progress checks, conceptual reviews, planning tasks
    8. Consider different phases of learning: practice, implementation, debugging, documentation, planning
    9. Use the current timestamp to make questions time-relevant
    
    REQUIRED OUTPUT FORMAT:
    Return ONLY a valid JSON object with this exact structure:
    {
      "questions": [
        "question 1",
        "question 2", 
        "question 3",
        "question 4",
        "question 5"
      ]
    }
    
    OUTPUT RULES:
    - Use double quotes for all strings
    - No markdown formatting (no \`\`\`json)
    - No additional text outside the JSON object
    - Exactly 5 questions, no more, no less
    - Ensure questions are distinct from each other
    
    QUESTION VARIATION STRATEGIES (use these approaches):
    - Practice: "Build a small function using ${skills[0]} that..."
    - Debug: "Identify and fix one issue in ${projects[0]} related to..."
    - Plan: "Outline the next 3 steps for implementing ${skills[1]} in ${projects[0]}"
    - Review: "Test the ${skills[2]} implementation in ${projects[0]} and document findings"
    - Learn: "Research best practices for ${skills[0]} and apply one to ${projects[0]}"
    
    EXAMPLE STARTERS (mix and vary these):
    - "Spend 25 minutes implementing..."
    - "Create a test case for..."
    - "Debug the issue with..."
    - "Document the progress on..."
    - "Research and apply..."
    - "Optimize the existing..."
    - "Plan the next phase of..."
    - "Review the code quality of..."
    - "Set up monitoring for..."
    - "Learn one new aspect of..."
    
    Generate exactly 5 NEW, varied, and specific actionable questions NOW:`;
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
    
            const questions = await prisma.dailyQuestion.createMany({
                data: reply.questions.map((question: string) => ({
                    questionText: question,
                    expiresAt,
                    userId: session.user.id
                   })),  
            })
            return NextResponse.json({questions: questions}, {status: 201})
        }
    }
        return NextResponse.json({questions}, {status: 200})
    } catch (error) {
        NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}
