import { Roadmap } from "@/types/roadmap";
import { atom } from "jotai";

export const recommendedJobsAtom = atom<null>(null)
export const roadmapAtom = atom<Roadmap>()