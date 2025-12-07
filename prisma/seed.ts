import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, UserRole, RequestPriority, RequestStatus, RequestType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({
  adapter, 
  log: ['info','warn','error'],
});

async function main() {
  console.log("🌱 Starting seed...");

  // Limpiar tablas
  await prisma.request.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Tables cleared.");

  // Crear usuarios
  const admin = await prisma.user.create({
    data: { email: "admin@test.com", username: "admin", name: "Administrador", role: UserRole.admin },
  });

  const inventarioUser = await prisma.user.create({
    data: { email: "inv@test.com", username: "inv_user", name: "Encargado Inventario", role: UserRole.inventario },
  });

  const normalUser = await prisma.user.create({
    data: { email: "user@test.com", username: "usuario", name: "Usuario Normal", role: UserRole.usuario },
  });

  console.log("👤 Users created.");

  // Crear items
  const item1 = await prisma.item.create({
    data: { name:"Papel A4" ,descripcion: "Resma de papel A4", quantity: 100, img: "/images/papel-a4.jpg" },
  });

  const item2 = await prisma.item.create({
    data: {name:"Tinta de impresora", descripcion: "Tinta para impresora HP", quantity: 20, img: null },
  });

  const item3 = await prisma.item.create({
    data: {name:"Papel Oficio", descripcion: "Resma de papel Oficio", quantity: 50, img: "/images/papel-a4.jpg" },
  });

  console.log("📦 Items created.");

  // Crear requests
  await prisma.request.create({
    data: {
      soliciterId: normalUser.id,
      requiredItemId: item1.id,
      quantity: 10,
      details: "Necesito papel para impresión de informes",
      requestType: RequestType.Impresion,
      priority: RequestPriority.media,
      status: RequestStatus.pendiente,
    },
  });

  await prisma.request.create({
    data: {
      soliciterId: inventarioUser.id,
      requiredItemId: item2.id,
      quantity: 2,
      details: "Reponer tinta en oficina 4A",
      requestType: RequestType.Fotocopia,
      priority: RequestPriority.alta,
      status: RequestStatus.pendiente,
    },
  });

  console.log("📝 Requests created.");

  console.log("✅ Seed completed successfully!");
}

main()
  .catch(e => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
