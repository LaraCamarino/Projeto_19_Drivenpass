-- CreateTable
CREATE TABLE "networks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "networks" ADD CONSTRAINT "networks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
