import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const formData = await req.formData();
    const file = formData.get("invoice") as File;
    const transactionId = formData.get("transactionId") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Invoice file is required" },
        { status: 400 },
      );
    }

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 },
      );
    }

    // Validation file type allow common image and pdf types
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    const fileExt = file.name.toLowerCase().split(".").pop();
    const allowedExtensions = ["jpeg", "jpg", "png", "webp", "pdf"];

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExt || "")
    ) {
      return NextResponse.json(
        {
          error: `Only jpg, png and pdf files are allowed. Rrecived ${file.type}`,
        },
        { status: 400 },
      );
    }

    // validate file size
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less then 5MB" },
        { status: 400 },
      );
    }

    // Create upload directory if its does not exists
    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "invoices",
    );
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {}

    // generate unique file name
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop() || "jpg";
    const fileName = `invoice_${userId}_${timestamp}.${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Save fil eto disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Store payment request to in database

    const paymentRequest = await prisma.paymentRequest.create({
      data: {
        userId,
        transactionId: transactionId.trim(),
        invoicePath: `/uploads/invoices/${fileName}`,
        status: "PENDING",
        payment: "$29",
      },
    });

    return NextResponse.json({
      message: "Payment request submitted succesffuly. Awaiting admin approval",
      paymentRequest: {
        id: paymentRequest.id,
        status: paymentRequest.status,
        createdAt: paymentRequest.createdAt,
      },
    });
  } catch (error) {
    console.error("Bank transfer error");
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const paymentRequests = await prisma.paymentRequest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        transactionId: true,
        status: true,
        approvedAt: true,
        rejectedReason: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ paymentRequests });
  } catch (error) {
    console.error("Get payment requeses error", error);
  }
}
