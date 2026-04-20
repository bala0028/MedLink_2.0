import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({ 
    where: { email: 'admin@medlink.com' }
  })
  console.log("Admin user:", user)
}

main().catch(console.error)
