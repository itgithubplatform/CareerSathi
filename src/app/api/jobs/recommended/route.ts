import { getRecommendedJobs } from "@/lib/getRecommendedJobs";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
        const jobs = await getRecommendedJobs();
        return NextResponse.json({ jobs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching recommended jobs:", error);
        return NextResponse.json({ error: "Failed to fetch recommended jobs" }, { status: 500 });
    }
}