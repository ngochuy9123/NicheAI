import prisma from "@/lib/prisma";
import { PlanType, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
      include: {
        subscription: true,
        usage: true,
      },
    });

    // Remove password from the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body. Error: " + error.message },
      { status: 400 },
    );
  }
}
