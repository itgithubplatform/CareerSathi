/*
  Warnings:

  - You are about to drop the column `careerGoals` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `currentStatus` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `experienceLevel` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `preferredIndustry` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `environment` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situation` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stream` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeoff` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uncertainty` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `education` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "careerGoals",
DROP COLUMN "currentStatus",
DROP COLUMN "dateOfBirth",
DROP COLUMN "experienceLevel",
DROP COLUMN "interests",
DROP COLUMN "location",
DROP COLUMN "phone",
DROP COLUMN "preferredIndustry",
DROP COLUMN "skills",
ADD COLUMN     "activities" TEXT[],
ADD COLUMN     "environment" TEXT NOT NULL,
ADD COLUMN     "learningStyles" TEXT[],
ADD COLUMN     "situation" TEXT NOT NULL,
ADD COLUMN     "stream" TEXT NOT NULL,
ADD COLUMN     "tradeoff" TEXT NOT NULL,
ADD COLUMN     "uncertainty" TEXT NOT NULL,
ALTER COLUMN "education" SET NOT NULL;
