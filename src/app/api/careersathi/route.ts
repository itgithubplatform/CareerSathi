import { NextResponse } from "next/server";
import { askVertex } from "@/lib/vertex";
import { ChatMessage } from "@/types/chat";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = typeof body.message === "string" ? body.message : "";
    const history: ChatMessage[] = Array.isArray(body.history) ? body.history : [];

    const conversationText = history
      .map((h) =>
        `${h.role === "user" ? "Student" : "CareerSathi"}: ${h.text}`
      )
      .join("\n");

    const prompt = `
You are CareerSathi, a career guidance mentor.

Always respond in **Markdown** for the user interface. Avoid raw HTML.

Conversation context:
${conversationText}

Student says: "${message}"

Your job:
- During the initial conversation:
  - Ask clarifying questions about the student's **interests, strengths, constraints** (family, finances, health, location, preferred work style).
  - Example questions:
    - Do they prefer creative work, technical problem-solving, or people-oriented roles?
    - How soon do they want to start earning money?
    - Remote, in-office, or hybrid preference?
    - What subjects, hobbies, or existing skills do they enjoy?
- Keep responses **warm, encouraging, and concise**.
- Do **not** suggest roadmap yet if you don’t have enough information.

Rules for JSON output:
- Always output a JSON object at the end of your response in the following format:
{
  "title": "only generate a short meaningful title for the first chat; otherwise leave as empty string",
  "content": "the Markdown content of your reply",
  "roadmap": "leave as empty string if not enough info; otherwise an object containing careerPath, skillsToLearn[], recommendedProjects[]"
}

Once you have enough information about the student:
- Suggest realistic **career paths** with learning steps.
- Provide **roadmap** in the JSON object. Example:

{
  "title": "Data Analyst Career Roadmap",
  "content": "Here is what I suggest based on your interests and constraints:\n\n### Career Path\n- Data Analyst\n\n### Skills to Learn\n- Python for Data\n- SQL\n- Power BI\n\n### Recommended Projects\n- Sales Dashboard: Analyze sales data and visualize KPIs\n- Survey Analysis: Analyze survey results and present insights",
  "roadmap": {
    "careerPath": "Data Analyst",
    "skillsToLearn": ["Python for Data", "SQL", "Power BI"],
    "recommendedProjects": [
      { "title": "Sales Dashboard", "description": "Analyze sales data and visualize KPIs" },
      { "title": "Survey Analysis", "description": "Analyze survey results and present insights" }
    ]
  }
}

Important:
- Only output a single JSON object and nothing else. 
- Do not add any explanation or text outside the JSON. 
- Use double quotes " for all keys and string values. Escape newlines as \n.
Only output a single JSON object.
Do NOT include code blocks or any text outside the JSON.
Use double quotes " for all keys and string values. Escape newlines as \n.
- If this is **not the first chat**, set "title" as an empty string.
- If there isn’t enough information to generate a roadmap yet, set "roadmap" to ".
- Always keep the **Markdown content** for the chat in "content" so the UI can render it.
`;


    const rawReply = (await askVertex(prompt)).trim();
    console.log("CareerSathi raw reply:", rawReply);

    const match = rawReply.match(/```json\s*([\s\S]*?)```/) || rawReply.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("No JSON found in CareerSathi response");
    }

    let reply;
    reply = JSON.parse(match[1] ?? match[0]);

    return NextResponse.json({ reply: reply.content, title: reply.title });
  } catch (err) {
    console.error("CareerSathi API error:", err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong while generating advice." },
      { status: 500 }
    );
  }
}
