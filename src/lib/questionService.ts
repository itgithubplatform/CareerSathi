import { prisma } from "@/lib/prisma";
import { DailyQuestionData } from "@/types/dailyQuestions";

export class QuestionService {
  async generateDailyQuestion(userId: string): Promise<DailyQuestionData> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if user already has an active question today
    const existingQuestion = await prisma.dailyQuestion.findFirst({
      where: {
        userId,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
    });

    if (existingQuestion) {
      return this.formatQuestionData(existingQuestion);
    }

    // TODO: Generate new question using AI
    // const questionText = await generateQuestionWithAI();
    // For now, using a placeholder question
    const questionText = "What's a challenging problem you solved recently and what did you learn from it?";
    
    // Set expiry to 24 hours from now
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const question = await prisma.dailyQuestion.create({
      data: {
        userId,
        questionText,
        expiresAt,
      },
    });

    return this.formatQuestionData(question);
  }

  async markAsAnswered(questionId: string, userId: string): Promise<DailyQuestionData> {
    const question = await prisma.dailyQuestion.findFirst({
      where: {
        id: questionId,
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!question) {
      throw new Error('Question not found or expired');
    }

    if (question.isAnswered) {
      throw new Error('Question already answered');
    }

    const updatedQuestion = await prisma.dailyQuestion.update({
      where: { id: questionId },
      data: {
        isAnswered: true,
      },
    });

    return this.formatQuestionData(updatedQuestion);
  }

  async getActiveQuestion(userId: string): Promise<DailyQuestionData | null> {
    const question = await prisma.dailyQuestion.findFirst({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
        isAnswered: false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return question ? this.formatQuestionData(question) : null;
  }

  async getUserQuestions(userId: string): Promise<DailyQuestionData[]> {
    const questions = await prisma.dailyQuestion.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return questions.map(this.formatQuestionData);
  }

  // Cleanup expired questions (run this as a cron job)
  async cleanupExpiredQuestions(): Promise<void> {
    await prisma.dailyQuestion.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
        isAnswered: false,
      },
    });
  }

  private formatQuestionData(question: any): DailyQuestionData {
    return {
      id: question.id,
      questionText: question.questionText,
      createdAt: question.createdAt,
      expiresAt: question.expiresAt,
      isAnswered: question.isAnswered,
    };
  }
}