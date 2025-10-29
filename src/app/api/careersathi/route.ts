import { NextResponse } from "next/server";
import { askVertex, textEmbedding } from "@/lib/vertex";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { VectorDb } from "@/lib/vectorDb";
import { userProfileToString } from "@/lib/userProfileToString";
import { UserProfileMap } from "@/lib/userProfileMap";
import { summarizeRoadmapsToString } from "@/lib/summerizeRoadmapToString";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const message = typeof body.message === "string" ? body.message : "";
    const chatId: string = body.chatId;

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID not provided" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Message not provided" }, { status: 400 });
    }

    // Task 1: Get Conversation History (Embedding + Vector Search)
    const conversationHistoryPromise = (async () => {
      const embaddedMessage = await textEmbedding(message);
      const vectorDb = VectorDb.getInstance();
      const conversationEmbeddings = await vectorDb.getFromVectorDb(session.user.id, embaddedMessage, chatId);
      const conversationText = conversationEmbeddings.map((embedding) => embedding.payload?.text_content).join("\n");
      
      return { conversationText, embaddedMessage };
    })();
    
    // Task 2: Get User Profile (Cache or DB)
    const userProfilePromise = (async () => {
      const userProfileMap = UserProfileMap.getInstance();
      let userProfileString = userProfileMap.getUserProfile(session.user.id);
      if (userProfileString) return userProfileString; // Cache hit

      // Cache miss
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId: session.user.id },
        select: {
          education: true,
          stream: true,
          situation: true,
          environment: true,
          activities: true,
          learningStyles: true,
          uncertainty: true,
          tradeoff: true
        }
      });
      
      if (!userProfile) {
        // This error will be caught by the main try/catch block
        throw new Error("User profile not found");
      }
      userProfileString = userProfileToString(userProfile);
      userProfileMap.setUserProfile(session.user.id, userProfileString);
      return userProfileString;
    })();
    
    // Task 3: Get Roadmap Context (Cache or DB)
    const roadmapContextPromise = (async () => {
      const userProfileMap = UserProfileMap.getInstance();
      let completedItemsContext = userProfileMap.getUserRoadmap(session.user.id);
      if (completedItemsContext) return completedItemsContext; // Cache hit
      
      // Cache miss
      const activeRoadmaps = await prisma.roadmap.findMany({
        where: {
          userId: session.user.id
        },
        include: {
          skillsToLearn: { 
            where: { done: true },
            select: { skill: true }
          },
          recommendedProjects: {
            where: { done: true },
            select: { title: true }
          }, 
        }
      });
      
      completedItemsContext = JSON.stringify(summarizeRoadmapsToString(activeRoadmaps));
      userProfileMap.setUserRoadmap(session.user.id,completedItemsContext);
      return completedItemsContext;
    })();
    
    // Await all tasks to complete in parallel
    const [
      historyResult,
      userProfileString,
      completedItemsContext
    ] = await Promise.all([
      conversationHistoryPromise,
      userProfilePromise,
      roadmapContextPromise
    ]);
    
    // Destructure the results from Task 1
    const { conversationText, embaddedMessage } = historyResult;
    // --- 2. CONSTRUCT SINGLE PROMPT ---
const {activePaths, completedSkills, completedProjects} = JSON.parse(completedItemsContext);
console.log(activePaths);

  const prompt = `
You are CareerSathi, a friendly but practical career and learning guidance mentor.
Output rules:
- Always return a single JSON object.
- No text or code blocks outside the JSON.
- JSON format:
{
"title": "string (short title if new convo, else \"\")",
"content": "Markdown-formatted reply shown in chat. Keep it concise, warm, clear, expressive and under 60 words.",
"roadmap": "" OR {
"careerPath": "string",
"skillsToLearn": ["string (use Markdown heading for skill title, bold important parts, and include step-by-step learning guidance. **Each skill MUST include a suggested timeline** (e.g., 'Est. Time: 2-3 weeks'). **If the user has already completed a base skill (from the context), suggest an advanced upskill** (e.g., '## Advanced Python: Concurrency & Asyncio').)"],
"recommendedProjects": [
{
"title": "string (Markdown heading, bold main focus)",
"description": "string (Markdown explanation of project, why it helps, and practical guidance. **Each project MUST include a suggested timeline** (e.g., 'Est. Time: 1-2 weeks'). **If the user has completed a similar project (from the context), suggest a more difficult 'stretch' project**.)"
}]}}
- Use double quotes for all strings.
- Escape all double quotes inside string values using \\".
- Escape newlines as \\n.
- content must be under 60 words.
- Use Markdown headings (#, ##) for skill/project titles.
- Use **bold** for emphasizing key text. Do not put escaped quotes inside bold.

UserName:${session.user.name}
User profile context (from form submission):${userProfileString}
Conversation so far:${conversationText}

--- User's Current Progress (Use this for logic) ---
Active Career Path: ${activePaths} 
Completed Skills: [${completedSkills}]
Completed Projects: [${completedProjects}]
--- End of User's Progress ---

User says: "${message}"

Guidelines:
0. General Advice & Chat:
- **This guideline runs first.** If the "User says" message is NOT a request for a new roadmap (e.g., "create," "make," "build") and NOT a confirmation (e.g., "confirm new"), it is general chat or a request for advice (e.g., "should I," "what is," "how do I").
- **Action:** The bot MUST provide a direct, helpful, and concise answer to the user's question in the "content" field.
- It should use its persona (CareerSathi) to give a clear recommendation or explanation.
- "roadmap" MUST be "".
1. Early stage (not enough info):
- **Only proceed to this guideline if the user is NOT requesting a specific roadmap (Guideline 3) AND NOT providing a confirmation (Guideline 5).**
- Ask 1-2 clarifying questions about interests, strengths, or constraints.
- Make the questions clear, specific, and bold the important parts using a markdown list.
- "roadmap" MUST be "".

2. Mid stage (enough info, but no clear path chosen):
- Suggest 3 realistic career paths with profile match in percentage (e.g., "Data Analyst (85%)").
- Let the user choose a path.
- "roadmap" MUST be "".

3. Roadmap Request Check (User has chosen a path):
- If the "User says" message indicates a clear choice of career path (let's call this the **requestedPath**) OR contains a confirmation phrase like **"confirm new"**, proceed to Guideline 4/5.
- If the "User says" is just a general chat, respond normally (e.g., "How can I help with your 'activePaths' path today?").

4. Mismatch/Revisit Warning Logic (IMPORTANT):
- First, the AI must determine the **requestedPath** (the career path the user is asking about) from the "User says" message.
- If the requestedPath is ALREADY present in the Active Career Paths List, you must WARN the user.
- **Warning Response:**
- "content" MUST be a confirmation question (e.g., "You already have an active roadmap for **'requestedPath'**. Are you sure you want to create a new one? Say **'confirm new'** to proceed, or ask a question about your current path.").
- "roadmap" MUST be "".
5. Roadmap Generation & Upskilling Logic:
- Generate a full "roadmap" object ONLY IF:
  - The \`${activePaths}\` variable is **EMPTY** (it's their first roadmap).
  - **OR** The "User says" message IS a clear confirmation to a warning from Guideline 4 (e.g., it contains "confirm new", "yes proceed", "generate new", **ignoring case**).
- **When generating the roadmap:**
  - **If generation is triggered by a "confirm new" message:**
    - The bot MUST look at its *own last message* within the \`'conversation so far:'\`.
    - It MUST find the career path it *asked the user to confirm* (e.g., from its own question "...a new one for **Java Developer**?").
    - This extracted path (e.g., "Java Developer") is the one to use for the new roadmap.
    - **CRITICAL: Do NOT use the \`${activePaths}\` ("MERN Stack...", etc.) as the subject for this new roadmap.**
  - **If generation is for a new user (empty \`activePaths\`):**
    - Use the \`requestedPath\` from the user's *current* message.
  - **For all roadmap generation:**
    - Use the JSON definition rules to add **timelines**.
    - Check the \`Completed Skills\` and \`Completed Projects\` context to provide **advanced upskill** suggestions and **more difficult 'stretch' projects**.
6. Always keep responses concise, encouraging, expressive with emojis, and easy to read in Markdown.

7. IMPORTANT: Output strictly valid JSON.
- **Only use internet search if you need to find *current, external information like a job description and for checking paths or skills are relavent or not***.
- **Do not** use search for simple conversation or to answer questions about the user's profile/history/greeting.
- If you use search, include the date and a "## Sources" section in your "content".
`;

    // --- 3. CALL LLM ---

    const rawReply = (await askVertex(prompt)).trim();
    // console.log("CareerSathi raw reply:", rawReply);

    const match = rawReply.match(/```json\s*([\s\S]*?)```/) || rawReply.match(/\{[\s\S]*\}/);
    
    if (!match) {
      throw new Error("No JSON found in CareerSathi response");
    }
    
    const reply = JSON.parse(match[1] ?? match[0]);

    // --- 4. RUN BACKGROUND TASKS ---
    const background = (async() => {
      try {
        const vectorDb = VectorDb.getInstance();
        const embaddedReply = await textEmbedding(reply.content);
        await vectorDb.saveToVectorDb(session.user.id, embaddedMessage, `User: ${message}`, chatId);
        await vectorDb.saveToVectorDb(session.user.id, embaddedReply, `CareerSathi: ${reply.content}`, chatId);
      } catch (bgErr) {
        console.error("Background vector save error:", bgErr);
      }
    })();

    // --- 5. PROCESS THE SINGLE REPLY ---
    if (reply.roadmap && typeof reply.roadmap === 'object' && reply.roadmap.careerPath) {
      const roadmap = reply.roadmap;
      const skillsToLearn = Array.isArray(roadmap.skillsToLearn) ? roadmap.skillsToLearn : [];
      const recommendedProjects = Array.isArray(roadmap.recommendedProjects) ? roadmap.recommendedProjects : [];

      const newRoadmap = await prisma.roadmap.create({
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
          },
          user: {
            connect: {
              id: session.user.id
            }
          }
        },
      });
      const replyContent = `${reply.content}\n\nI've created a new roadmap for you! 🚀\n\n[View your ${roadmap.careerPath} roadmap](/roadmap/${newRoadmap.id})`;
      return NextResponse.json({ reply: replyContent, title: reply.title });
    }
    return NextResponse.json({ reply: reply.content, title: reply.title });

  } catch (err) {
    console.error("CareerSathi API error:", err);
    if (err instanceof Error) {
        console.error(err.message);
    }
    return NextResponse.json(
      { reply: "Sorry, something went wrong while generating advice. Please try again." },
      { status: 500 }
    );
  }
}