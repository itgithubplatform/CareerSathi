import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { askVertex } from '@/lib/vertex'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const assessmentData = await request.json()
 if (!assessmentData) {
  return NextResponse.json({ error: 'No assessment data provided' }, { status: 400 })
 }
    const assessment = await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    update: {
      education: assessmentData.education,
      stream: assessmentData.stream,
      situation: assessmentData.situation,
      environment: assessmentData.environment,
      activities: assessmentData.activities,
      learningStyles: assessmentData.learningStyles,
      uncertainty: assessmentData.uncertainty,
      tradeoff: assessmentData.tradeoff,
      knownCareer: assessmentData.knownCareer,
      preferredIndustries: assessmentData.preferredIndustries
    },
    create: {
      education: assessmentData.education,
      stream: assessmentData.stream,
      situation: assessmentData.situation,
      environment: assessmentData.environment,
      activities: assessmentData.activities,
      learningStyles: assessmentData.learningStyles,
      uncertainty: assessmentData.uncertainty,
      tradeoff: assessmentData.tradeoff,
      user: {
        connect: {
          id: session.user.id
        }
      }
    },
  });
   const prompt = `
You are a 'JSON Career Recommender' service. Your one and only function is to take user data and return a single, valid JSON object.

### CRITICAL OUTPUT RULES:
1. You MUST return ONLY the valid JSON object.
2. DO NOT include any text, explanations, or conversational chat (like "Here is the JSON...") before or after the JSON.
3. DO NOT wrap the JSON in markdown blocks (\`\`\`json).
4. All strings inside the JSON must use double quotes. Any internal double quotes MUST be escaped (e.g., \\"example\\").
5. The output JSON MUST match this exact structure:
   {
     "careerPaths": [
       { "name": "Software Engineer", "description": "Work on **applications**, systems, or platforms." },
       { "name": "Data Scientist", "description": "Analyze data to uncover *insights* and build models." }
     ]
   }

### CONTENT GUIDELINES:
1. Recommend up to 6 suitable career paths based on the User Data.
2. "name": A short, official career title.
3. "description": A **single, concise sentence** explaining the career. (This fixes the "overwhelming" problem).
4. "description" MUST include simple Markdown (like **bold** or *italics*) to highlight one or two key concepts.

### User Data:
${JSON.stringify(assessment)}
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
    return NextResponse.json({ 
      success: true, 
      assessmentId: assessment.id,
      careerPaths: reply.careerPaths,
      message: 'Assessment completed successfully' 
    })

  } catch (error) {
    console.error('Assessment submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit assessment' },
      { status: 500 }
    )
  }
}