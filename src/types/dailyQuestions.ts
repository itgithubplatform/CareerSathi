export interface DailyQuestionData {
  id: string;
  questionText: string;
  createdAt: Date;
  expiresAt: Date;
  isAnswered: boolean;
}