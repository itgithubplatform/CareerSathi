export type AssessmentFormData = {
  // Stage 1
  education: string;
  stream: string;
  situation: string;
  environment: string;
  // Stage 2
  activities: string[];
  // Stage 3
  learningStyles: string[];

  // Stage 4
  uncertainty: string;
  tradeoff: string;
};