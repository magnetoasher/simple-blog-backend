/*
  Warnings:

  - Made the column `postId` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "postId" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
