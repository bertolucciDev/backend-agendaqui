/*
  Warnings:

  - The values [USER] on the enum `PlatformRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlatformRole_new" AS ENUM ('CLIENT', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "platformRole" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "platformRole" TYPE "PlatformRole_new" USING ("platformRole"::text::"PlatformRole_new");
ALTER TYPE "PlatformRole" RENAME TO "PlatformRole_old";
ALTER TYPE "PlatformRole_new" RENAME TO "PlatformRole";
DROP TYPE "public"."PlatformRole_old";
ALTER TABLE "User" ALTER COLUMN "platformRole" SET DEFAULT 'CLIENT';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "platformRole" SET DEFAULT 'CLIENT';
