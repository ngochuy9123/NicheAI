import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GoogleTrendsService } from "@/lib/services/googleTrends";
import { OpenAIService } from "@/lib/services/openai";
import { PlanType, ReportStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Check Authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userID = (session.user as any).id;

    // Get user with subscription
    const user = await prisma.user.findUnique({
      where: { id: userID },
      include: { subscription: true },
    });

    if (!user || !user.subscription) {
      return NextResponse.json(
        { error: "User or subscription not found" },
        { status: 404 },
      );
    }

    const isPro = user.subscription.planType === PlanType.PRO;

    // Check usage limits for Free users
  } catch (error) {}
}
