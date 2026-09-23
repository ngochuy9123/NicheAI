"use client";

import axios from "axios";
import {
  Activity,
  CheckCircle,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Platform overview and key metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-row items-center justify-between px-6 pt-4 pb-2">
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="px-6 pb-4">
            <div className="text-2xl font-bold">totalUsers</div>
            <p className="text-xs text-gray-500 mt-1">
              +newUsersThisMonth this month
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-row items-center justify-between px-6 pt-4 pb-2">
            <p className="text-sm font-medium text-gray-600">Total Reports</p>
            <FileText className="h-4 w-4 text-green-600" />
          </div>
          <div className="px-6 pb-4">
            <div className="text-2xl font-bold">totalReports</div>
            <p className="text-xs text-gray-500 mt-1">
              recentReportsin last 7 days
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-row items-center justify-between px-6 pt-4 pb-2">
            <p className="text-sm font-medium text-gray-600">Pro Users</p>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </div>
          <div className="px-6 pb-4">
            <div className="text-2xl font-bold">PRO</div>
            <p className="text-xs text-gray-500 mt-1">FREE free users</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-row items-center justify-between px-6 pt-4 pb-2">
            <p className="text-sm font-medium text-gray-600">MRR</p>
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
          <div className="px-6 pb-4">
            <div className="text-2xl font-bold">$4</div>
            <p className="text-xs text-gray-500 mt-1">
              Monthly recurring revenue
            </p>
          </div>
        </div>
      </div>

      {/* Reports Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Reports by Status
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Current state of all validation reports
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  COMPLETED
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Processing</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  PROCESSING
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium">Pending</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  PENDING
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">Failed</span>
                </div>
                <div className="text-2xl font-bold text-red-600">FAILED</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Platform Statistics
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Additional metrics and insights
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Monthly Validations
                  </span>
                  <span className="text-lg font-bold">monthlyValidations</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Average Report Score
                  </span>
                  <span className="text-lg font-bold">10/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Pro Conversion Rate
                  </span>
                  <span className="text-lg font-bold">4 %</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Success Rate:</span> % of
                  reports completed successfully
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Common administrative tasks
          </p>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/users"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition text-center"
            >
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Manage Users</h3>
              <p className="text-sm text-gray-600">
                View and edit user accounts
              </p>
            </a>
            <a
              href="/admin/analytics"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition text-center"
            >
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">View Analytics</h3>
              <p className="text-sm text-gray-600">
                Detailed platform insights
              </p>
            </a>
            <a
              href="/admin/settings"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition text-center"
            >
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Settings</h3>
              <p className="text-sm text-gray-600">Platform configuration</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
