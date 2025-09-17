-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SkillToLearn" ALTER COLUMN "done" SET DEFAULT false;
