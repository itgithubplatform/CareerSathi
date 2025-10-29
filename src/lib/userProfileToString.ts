interface userProfile {
    education: string;
    stream: string;
    situation: string;
    environment: string;
    activities: string[];
    learningStyles: string[];
    uncertainty: string;
    tradeoff: string;
}
export const userProfileToString = (profile:userProfile): string => {
  const formatArray = (arr: string[] | undefined) => arr && arr.length > 0 ? arr.join('/') : '';
  
  const profileString = 
    `education:${profile.education},` +
    `stream:${profile.stream},` +
    `situation:${profile.situation},` +
    `environment:${profile.environment},` +
    `activities:${formatArray(profile.activities)},` +
    `learningStyles:${formatArray(profile.learningStyles)},` +
    `uncertainty:${profile.uncertainty},` +
    `tradeoff:${profile.tradeoff}`;
    
  return profileString.replace(/,+/g, ',').replace(/,$/, '');
};
