export interface Roadmap {
  id: string;
  careerPath: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  skillsToLearn: SkillToLearn[];
  recommendedProjects: Project[];
}

export interface SkillToLearn {
  id: string;
  skill: string;
  done: boolean;
  roadmapId: string;
}

export interface Project {
  id: string;
  title: string;
  done: boolean;
  description: string;
  roadmapId: string;
}
