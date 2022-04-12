/*
  Warnings:

  - You are about to drop the column `user_id` on the `Letter` table. All the data in the column will be lost.
  - Added the required column `description` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Letter" DROP CONSTRAINT "Letter_user_id_fkey";

-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "user_id",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image_data" TEXT NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
