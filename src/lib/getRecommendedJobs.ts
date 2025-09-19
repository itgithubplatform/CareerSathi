import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";
import { askVertex } from "./vertex";

const jobCache: Map<string, { data: any[]; expiry: number }> = new Map();

const CACHE_TTL = 72 * 60 * 60 * 1000;

export const getRecommendedJobs = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    // 🔹 Step 1: Check cache
    const cached = jobCache.get(userId);
    if (cached && Date.now() < cached.expiry) {
      return cached.data;
    }

    const roadmap = await prisma.roadmap.findMany({
      where: { userId },
      include: { skillsToLearn: true },
    });

    const keyWords = roadmap.flatMap((roadmap) =>
      roadmap.skillsToLearn.map((skill) => skill.skill)
    );

    if (keyWords.length === 0) {
      throw new Error("No skills found in roadmap");
    }

   const prompt = `
You are a career advisor AI. Generate job search parameters for someone with these technical skills: ${keyWords.join(', ')}

GUIDELINES:
- Focus on entry-level, junior, mid-level and senior positions in India based on their skills.
- Include a mix of technical and non-technical roles that value these skills
- Suggest roles where technical skills are assets but not necessarily the primary requirement
- Include business-facing roles, support positions, and hybrid technical-non-technical positions
- Consider transferable skills and adjacent career paths
- Return 3-5 comma-separated search terms

EXAMPLES:
For skills [React, Node.js, MongoDB] return:
"Technical Support Engineer,IT Business Analyst,Quality Assurance Tester,Digital Solutions Associate,Junior Project Coordinator"

For skills [Python, Data Analysis, SQL] return:
"Business Intelligence Analyst,Operations Analyst,Customer Success Specialist,Data Quality Assistant,Junior Data Coordinator"

For skills [UI/UX Design, Figma, Adobe Creative Suite] return:
"Digital Content Creator,Marketing Coordinator,Product Support Specialist,Junior Design Associate,Customer Experience Assistant"

Generate diverse search terms that leverage technical skills in broader roles:`;

    const aiReply = await askVertex(prompt);

    const params = aiReply
      .split(",")
      .map((param) => param.trim())
      .filter((param) => param && param.length > 2)
      .slice(0, 5);

    if (params.length === 0) {
      params.push(...keyWords.slice(0, 3));
    }

    const jobs = await Promise.all(
      params.map(async (param) => {
        try {
          const encodedParam = encodeURIComponent(param);
          const res = await fetch(
            `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${
              process.env.JOB_API_APP_ID
            }&app_key=${
              process.env.JOB_API_APP_KEY
            }&what=${encodedParam}&where=India&content-type=application/json&max_days_old=30`,
            { next: { revalidate: 86400 } }
          );

          if (!res.ok) throw new Error(`Failed to fetch jobs for: ${param}`);

          const data = await res.json();
          return data.results || [];
        } catch (error) {
          console.error(`Error fetching jobs for ${param}:`, error);
          return [];
        }
      })
    );

    const allJobs = jobs.flat();

    const uniqueJobs = allJobs.filter(
      (job, index, self) =>
        index === self.findIndex(
          (j) => j.id === job.id || j.title === job.title
        )
    );

    const randomJobs = uniqueJobs.sort(() => Math.random() - 0.5).slice(0, 10);

    jobCache.set(userId, {
      data: randomJobs,
      expiry: Date.now() + CACHE_TTL,
    });

    return randomJobs;
  } catch (error) {
    console.error("Error in getRecommendedJobs:", error);
    throw error;
  }
};
