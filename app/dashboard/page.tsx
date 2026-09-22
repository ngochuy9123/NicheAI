"use client";
import {
  FileText,
  LayoutDashboard,
  Icon,
  Menu,
  ArrowRight,
  TrendingUp,
  Search,
  Sparkle,
  Clock,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const niche = "AI productivity tools for writers";
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name?.split(" ")[0] || "there"}!
        </h1>
        <p className="text-gray-600 mt-1">
          Validate your niche ideas with AI-powered market research
        </p>
      </div>

      {/* Pending Payment Notice */}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900">
                Payment Request Pending
              </h3>
              <p className="text-sm text-yellow-800 mt-1">
                Your payment request is awaiting admin approval. You will be
                automatically upgraded to Pro once your payment is approved.
              </p>
              <Link
                href="/dashboard/settings"
                className="text-sm text-yellow-700 underline mt-2 inline-block"
              >
                View payment status →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Status Card */}

      <div
        className={`rounded-lg border shadow-sm border-purple-200 bg-gradient-to-br`}
      >
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-purple-100`}>
                <Sparkles className={`w-6 h-6 text-purple-600`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Pro Plan
                  </h2>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-600`}
                  >
                    ACTIVE
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  validations used this month`
                </p>
              </div>
            </div>

            <Link href="/dashboard/settings">
              <button className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
        <div className="px-6 pb-4">
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">
                  Usage Progress
                </span>
                <span className="text-gray-900 font-semibold">percentage%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-300 bg-red-600`}
                />
              </div>
              <p className="text-xs text-gray-600">No validations</p>
            </div>

            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ Monthly limit reached! Upgrade to Pro for unlimited
                validations.
              </p>
            </div>
          </>

          <div className="p-4 bg-white/60 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 text-purple-900">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <p className="font-medium">Unlimited access to all features</p>
            </div>
            <p className="text-sm text-purple-700 mt-1 ml-7">
              Enjoy unlimited niche validations with advanced AI insights
            </p>
          </div>
        </div>
      </div>

      {/* Validation Form */}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Search className="w-6 h-6 text-blue-600" />
            Validate New Niche
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Enter your niche and keyword to get comprehensive market insights
          </p>
        </div>
        <div className="px-6 py-4">
          <form className="space-y-4">
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">error</p>
            </div>

            <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">success</p>
            </div>

            <div>
              <label
                htmlFor="niche"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Niche Description
              </label>
              <input
                id="niche"
                type="text"
                value="niche"
                placeholder="e.g., AI productivity tools for writers"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe your niche in a few words
              </p>
            </div>

            <div>
              <label
                htmlFor="keyword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Primary Keyword
              </label>
              <input
                id="keyword"
                type="text"
                value="keyword"
                placeholder="e.g., AI writing assistant"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                The main keyword people would search for
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Starting Validation...
              </>

              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Validate Niche
              </>
            </button>
          </form>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Validations
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Your latest niche validation reports
              </p>
            </div>
            <Link
              href="/dashboard/reports"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-3">
            <div className="animate-pulse">
              <div className="h-20 bg-gray-100 rounded-lg"></div>
            </div>
          </div>

          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No validations yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start validating your first niche to see results here
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href={`/dashboard/reports/id`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    status
                    <h4 className="font-medium text-gray-900">niche</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">keyword</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>createdAt</span>

                    <span>Score: overallScore/100</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                  >
                    viabilityRating
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-500">Total Validations</p>
          <div className="text-3xl font-bold text-gray-900">length</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-500">This Month</p>
          <div className="text-3xl font-bold text-gray-900">used</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-500">Completed</p>
          <div className="text-3xl font-bold text-gray-900">COMPLETED</div>
        </div>
      </div>
    </div>
  );
}
