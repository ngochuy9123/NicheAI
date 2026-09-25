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

    if (!isPro) {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const usage = await prisma.usageLog.findUnique({
        where: {
          userId_month_year: {
            userId: userID,
            month: currentMonth,
            year: currentYear,
          },
        },
      });

      const validationCount = usage?.validationCount || 0;
      const freeLimit = 3;
      if (validationCount >= freeLimit) {
        return NextResponse.json(
          {
            error:
              "Monthly validation limit reached. Upgrade to pro for unlimited validations",
            limit: freeLimit,
            used: validationCount,
          },
          { status: 429 },
        );
      }
    }

    //Parse request body data
    const body = await req.json();
    const { niche, keyword } = body;

    if (!niche || !keyword) {
      return NextResponse.json(
        { error: "Niche and keyword are required" },
        { status: 400 },
      );
    }
    // Create report in pending status
    const report = await prisma.report.create({
      data: {
        userId: userID,
        niche,
        keyword,
        status: ReportStatus.PENDING,
      },
    });

    // Process asynchronously
    return NextResponse.json(
      {
        message: "Validation Started",
        reportId: report.id,
        status: "pending",
      },
      { status: 202 },
    );
  } catch (error) {
    console.error("Validation api error", error);
  }
}
