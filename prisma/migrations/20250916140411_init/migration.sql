/*
  Warnings:

  - You are about to drop the `skillToLearn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "skillToLearn" DROP CONSTRAINT "skillToLearn_roadmapId_fkey";

-- DropTable
DROP TABLE "skillToLearn";

-- CreateTable
CREATE TABLE "SkillToLearn" (
    "id" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "roadmapId" TEXT NOT NULL,

    CONSTRAINT "SkillToLearn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkillToLearn" ADD CONSTRAINT "SkillToLearn_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;
