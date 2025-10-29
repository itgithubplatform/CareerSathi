type RoadmapSummary = {
    skillsToLearn: {
        skill: string;
    }[];
    recommendedProjects: {
        title: string;
    }[];
    id: string;
    careerPath: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
};
export function summarizeRoadmapsToString(activeRoadmaps: RoadmapSummary[]) {
    if (!activeRoadmaps || activeRoadmaps.length === 0) {
        return {
            activePaths: "",
            completedSkills: "",
            completedProjects: ""
        };
    }
    const allSkills = new Set<string>();
    const allProjects = new Set<string>();
    const allPaths = new Set<string>();

    for (const roadmap of activeRoadmaps) {
        allPaths.add(roadmap.careerPath);
        for (const skillItem of roadmap.skillsToLearn) {
            allSkills.add(skillItem.skill);
        }
        for (const projectItem of roadmap.recommendedProjects) {
            allProjects.add(projectItem.title);
        }
    }

    const skillList = Array.from(allSkills);
    const projectList = Array.from(allProjects);
    const pathList = Array.from(allPaths);

    const parts: string[] = [];

    if (pathList.length > 0) {
        parts.push(`User Active Career Paths: ${pathList.join(', ')}`);
    }
    if (skillList.length > 0) {
        parts.push(`User Known Skills: ${skillList.join(', ')}`);
    }
    if (projectList.length > 0) {
        parts.push(`User Done Projects: ${projectList.join(', ')}`);
    }
    return {
        activePaths: pathList.join(', '),
        completedSkills: skillList.join(', '),
        completedProjects: projectList.join(', ')
    };
}