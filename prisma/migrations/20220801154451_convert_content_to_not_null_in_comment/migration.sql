/*
  Warnings:

  - Made the column `content` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "content" SET NOT NULL;
