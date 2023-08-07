-- CreateTable
CREATE TABLE "customers_prisma" (
    "id" TEXT NOT NULL,
    "firstName" CHAR(255) NOT NULL,
    "lastName" CHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "customers_prisma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts_prisma" (
    "id" TEXT NOT NULL,
    "networth" DECIMAL(9,2) NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "bank_accounts_prisma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "customers_prisma_firstName_lastName_idx" ON "customers_prisma"("firstName", "lastName");

-- CreateIndex
CREATE INDEX "bank_accounts_prisma_customer_id_idx" ON "bank_accounts_prisma"("customer_id");

-- AddForeignKey
ALTER TABLE "bank_accounts_prisma" ADD CONSTRAINT "bank_accounts_prisma_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers_prisma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
