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
You are CareerSathi, a career guidance bot.

Please respond in **clean Markdown** with:

- Headings where appropriate
- Bulleted or numbered lists
- **Bold important terms**
- Use line breaks for readability
- Avoid raw HTML

Conversation context:
${conversationText}

Now the student says: "${message}"

Your job:
1. Understand their situation, including constraints (health, family, finances, location).
2. Gently clarify if needed.
3. Suggest realistic career paths or next steps.
4. Keep answers short, warm, and encouraging.
`;

    const reply = (await askVertex(prompt)).trim();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("CareerSathi API error:", err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong while generating advice." },
      { status: 500 }
    );
  }
}
