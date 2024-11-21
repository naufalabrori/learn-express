/*
  Warnings:

  - You are about to alter the column `CategoryName` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `ProductName` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `RoleName` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `Email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `PhoneNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `Username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Changed the type of `OrderStatus` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Completed', 'Cancelled');

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "CategoryName" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "OrderStatus",
ADD COLUMN     "OrderStatus" "OrderStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "ProductName" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "RoleName" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "PhoneNumber" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "Username" SET DATA TYPE VARCHAR(50);
