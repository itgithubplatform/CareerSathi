import { JobType } from "@/types/jobsType";
import { Roadmap } from "@/types/roadmap";
import { atom } from "jotai";

export const recommendedJobsAtom = atom<null|JobType[]>(null)
export const roadmapAtom = atom<Roadmap>()
export const questionsAtom = atom<any>(null)