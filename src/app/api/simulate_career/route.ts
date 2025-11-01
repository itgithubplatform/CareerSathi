// app/api/simulate_career/route.ts
import { NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/vertexai";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const { careerRole } = await req.json();
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!careerRole) {
      return NextResponse.json({ error: "Missing 'careerRole' in request body." }, { status: 400 });
    }
    const userContext = await prisma.userProfile.findUnique({
      where: {
        userId: session.user.id,
      }
    })
    // Initialize Vertex AI client
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_PROJECT_ID,
      location: process.env.LOCATION || "us-central1",
    });

    const geminiModel = vertexAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const imageModel = vertexAI.getGenerativeModel({ model: "gemini-2.5-flash-image" }); 

    // Prompt: ask Gemini to return JSON only. NOTE: Do NOT compute overall readiness here.
    // THIS IS THE MODIFIED PROMPT
  const prompt = `
You are "Hars_h", a Career Mentor AI. Your purpose is to provide a blunt, unfiltered "Reality Check" simulation. You must avoid generic praise. You identify weaknesses directly and provide tough, actionable feedback.

Generate a single JSON object (no extra text) for the career "${careerRole}", **critically tailored** to the user's specific context. The user's level (student, professional, switcher) and background (arts, science, sports, unemployed) MUST determine the complexity, stakes, and theme of the scenarios.

User Context: ${JSON.stringify(userContext)}

Example of tailoring:
- If user is a 'school student' asking for 'Doctor', scenario should be about a tough biology exam or volunteering dilemma.
- If user is a 'career switcher' asking for 'Doctor', scenario should be about patient-family conflict or hierarchical team stress.
- If user is an 'aspiring actor', scenario should be about handling rejection or a difficult director, not corporate teamwork.
- If user is 'unemployed', scenario should focus on resilience, re-skilling, or networking challenges.

Schema:
{
  "careerRole": "<title>",
  "overview": "<1-2 sentence career snapshot targeted for this user's level>",
  "average_daily_routine": "<one paragraph describing the typical daily routine (hours, major tasks)>",
  "core_soft_skills": ["skill1","skill2", "..."],

  "scenarios": [
    {
      "id": 1,
      "title": "Short, realistic scenario title",
      "description": "3-4 sentence realistic dilemma representing a common, high-impact challenge for this role, *tailored to the user's context*. (e.g., tech, non-tech, arts, sports, army)",
      "skill_focus": "Primary soft skill tested (e.g., 'Resilience', 'Ethical Judgment', 'Stress Tolerance', 'Adaptability')",
      "stakeholder_persona": {
        "role": "Stakeholder role (e.g., 'Angry Client', 'Dismissive Colonel', 'Rival Athlete', 'Casting Director')",
        "initial_message": "One-line urgent message from stakeholder"
      },
      "visual_prompt": "A photorealistic, context-aware image prompt (max 80 words) visualizing the scenario (lighting, emotion, environment).",
      "choices": [
        {"choice_id": 1, "action": "Choice text"},
        {"choice_id": 2, "action": "Choice text"},
        {"choice_id": 3, "action": "Choice text"}
      ],
      "expected_choice_evaluations": {
        "1": {"evaluation_hint":"...", "impact_score": 0-100},
        "2": {"evaluation_hint":"...", "impact_score": 0-100},
        "3": {"evaluation_hint":"...", "impact_score": 0-100}
      }
    }
    // Repeat 4-5 items
  ],

  "related_roles": [
    {"role":"Alternative role suggested if fit is low","reason":"one-line reason based on user's context"}
  ]
}

**CRITICAL EVALUATION FORMAT:**
For each "evaluation_hint", you must first internally decide on 4 points:
1.  reality_check: The blunt, unfiltered truth about this choice.
2.  identified_weakness: The specific weakness this choice reveals (e.g., 'Impulsivity', 'Avoidance of Conflict', 'Lack of Strategic Thinking'). If a good choice, state the strength.
3.  micro_task: A single, concrete, 1-2 sentence actionable task to address the weakness (e.g., 'For 3 days, practice the '5-Why' technique on a small problem before acting.').
4.  inspiration_quote: A short, tough, inspiring line (e.g., 'The obstacle is the way.', 'Hard choices, easy life.').

Then, you MUST combine these 4 points into a **single JSON string** for the "evaluation_hint" field using this exact HTML format:
"<b>Reality Check:</b> [reality_check text]<br><b>Weakness:</b> [weakness text]<br><b>Micro-Task:</b> [micro_task text]<br><b>Inspiration:</b> [inspiration_quote text]"

Example for a bad choice:
"evaluation_hint": "<b>Reality Check:</b> This is a-level avoidance. In the real world, this problem will return twice as large tomorrow, and your boss will see you as unreliable.<br><b>Weakness:</b> Conflict Aversion.<br><b>Micro-Task:</b> Tomorrow, find one small, uncomfortable conversation you've been avoiding (email or in-person) and initiate it.<br><b>Inspiration:</b> The comfort zone is a beautiful place, but nothing ever grows there."

Example for a good choice:
"evaluation_hint": "<b>Reality Check:</b> This is a solid, professional response. You've addressed the core issue without creating new ones. This builds trust.<br><b>Weakness:</b> Confident Decision-Making (A Strength).<br><b>Micro-Task:</b> Mentor someone else on your team for 15 minutes this week on how you reached this conclusion.<br><b>Inspiration:</b> You are what you repeatedly do. Excellence is a habit."

---
**CRITICAL OUTPUT CONSTRAINTS (MANDATORY):**
1.  **JSON ONLY:** Your *entire* response MUST be a single, valid JSON object.
2.  **NO EXTRA TEXT:** Do NOT add *any* text, commentary, or markdown (like \`\`\`json) before the opening \`{\` or after the closing \`}\`.
3.  **ESCAPE ALL STRINGS:** This is the most common error. All string values within the JSON *must* be properly escaped. Pay extreme attention to the "evaluation_hint" string. Any double-quotes (\`"\`) inside that string *must* be escaped as \`\\"\`. Any literal newlines *must* be escaped as \`\\n\` (or just use the \`<br>\` tag as instructed).
4.  **CHECK SYNTAX:** Ensure there are no trailing commas in your lists or objects.
---
`;

    const result = await geminiModel.generateContent(
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      // @ts-ignore
      {
        
        responseMimeType: "application/json",
      }
    );

    const jsonText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini:", cleaned);
      return NextResponse.json({ error: "Failed to parse JSON from Gemini.", raw: cleaned }, { status: 500 });
    }

    // Basic validation
    if (!parsed.scenarios || !Array.isArray(parsed.scenarios) || parsed.scenarios.length < 1) {
      return NextResponse.json({ error: "Gemini returned invalid scenario structure.", raw: parsed }, { status: 500 });
    }

    // Optionally generate a primary image using the first scenario visual_prompt
    console.log(parsed);
    
    const firstScenario = parsed.scenarios[0];
    let primaryImageBase64: string | undefined = undefined;

    try {
      if (firstScenario.visual_prompt && firstScenario.visual_prompt.length > 10) {
        console.log("visual prompt:", firstScenario.visual_prompt);
        
        const imageResult = await imageModel.generateContent(
          {
            contents: [{ role: "user", parts: [{ text: firstScenario.visual_prompt }] }],
          },
          // @ts-ignore
          {
            numberOfImages: 1,
            aspectRatio: "16:9",
            outputMimeType: "image/jpeg",
          }
        );

        const base64Img = imageResult.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Img) {
          primaryImageBase64 = `data:image/jpeg;base64,${base64Img}`;
        }
      }
    } catch (imgErr) {
      console.warn("Image generation issue (non-fatal):", imgErr);
    }

    // Convert expected_choice_evaluations into per-choice fields (kept in payload, but frontend will hide evaluation until submission)
    // This code remains UNCHANGED because the prompt is now formatting the data for it.
    for (const s of parsed.scenarios) {
      const evals = s.expected_choice_evaluations || {};
      const choices = s.choices || [];
      s.choices = choices.map((ch: any) => {
        const key = String(ch.choice_id);
        const ev = evals[key] || {};
        return {
          choice_id: ch.choice_id,
          action: ch.action,
          evaluation_hint: ev.evaluation_hint || null, // This now contains the rich, formatted HTML string
          impact_score: typeof ev.impact_score === "number" ? ev.impact_score : null,
        };
      });
      // remove heavy field
      delete s.expected_choice_evaluations;
    }

    const responsePayload = {
      careerRole: parsed.careerRole || careerRole,
      overview: parsed.overview || `A day-in-the-life snapshot for ${careerRole}.`,
      average_daily_routine: parsed.average_daily_routine || "",
      core_soft_skills: parsed.core_soft_skills || [],
      scenarios: parsed.scenarios,
      related_roles: parsed.related_roles || [],
      primary_image: primaryImageBase64 ?? null
    };

    return NextResponse.json(responsePayload);
  } catch (err) {
    console.error("Error generating career simulation:", err);
    return NextResponse.json({
      error: `Failed to generate simulation: ${(err as Error).message}`,
      details: (err as any).details ?? null
    }, { status: 500 });
  }
}