-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'inventario', 'usuario');

-- CreateEnum
CREATE TYPE "RequestPriority" AS ENUM ('baja', 'media', 'alta');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pendiente', 'aprobada', 'rechazada');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('Impresion', 'Fotocopia');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL DEFAULT 'usuario',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "img" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "soliciterId" INTEGER NOT NULL,
    "requiredItemId" INTEGER NOT NULL,
    "requestType" "RequestType" NOT NULL DEFAULT 'Impresion',
    "details" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pendiente',
    "priority" "RequestPriority" NOT NULL DEFAULT 'baja',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_soliciterId_fkey" FOREIGN KEY ("soliciterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requiredItemId_fkey" FOREIGN KEY ("requiredItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
