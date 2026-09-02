import { PlanType, PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding");

  const adminEmail = "admin@gmail.com";
  const adminPassword = "test123";

  const existingEmail = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingEmail) {
    console.log("Email already exist!!!");
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Admin User",
        role: Role.ADMIN,
        image: "/default-avatar.png",
        subscription: {
          create: {
            planType: PlanType.PRO,
            isActive: true,
          },
        },
        usage: {
          create: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            validationCount: 0,
          },
        },
      },
    });

    console.log("Admin Created Successfully");
  }

  // Create default User
  const userEmail = "user@gmail.com";
  const userPassword = "udemy12345";

  // Check if User already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (existingUser) {
    console.log("User already exists");
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 12);

    // Create admin user
    await prisma.user.create({
      data: {
        email: userEmail,
        password: hashedPassword,
        name: "User",
        role: Role.USER,
        image: "/default-avatar.png",
        subscription: {
          create: {
            planType: PlanType.FREE,
            isActive: true,
          },
        },
        usage: {
          create: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            validationCount: 0,
          },
        },
      },
    });
    console.log("Test user created successfully");
  }

  console.log("\n Database seeding completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding database", e);
    await prisma.$disconnect();
    process.exit(1);
  });
