export type AssessmentFormData = {
  // Stage 1
  education: string;
  stream: string;
  situation: string;
  // Stage 2
  environment: string;
  activities: string[];
  // Stage 3
  learningStyles: string[];
  knownCareer: string|null,
  preferredIndustries: string[], 
  // Stage 4
  uncertainty: string;
  tradeoff: string;
};