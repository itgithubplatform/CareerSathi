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
You are a career guidance AI. 
Your task: Recommend up to 6 suitable career paths for the user. 

CRITICAL RULES:
- Respond ONLY with a valid JSON object.
- Do NOT include any text outside the JSON.
- Each career must have:
   - "name": A short string (career title).
   - "description": A string that must include Markdown formatting to explain the career in three sentences include jargons if any.

Output format (strict):
{
  "careerPaths": [
    { "name": "Software Engineer", "description": "Work on **applications**, systems, or platforms." },
    { "name": "Data Scientist", "description": "Analyze data to uncover *insights* and build models." }
  ]
}

User Data:
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