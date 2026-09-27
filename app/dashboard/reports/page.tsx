"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react";
import Link from "next/link";

interface Report {
  id: string;
  niche: string;
  keyword: string;
  status: string;
  overallScore: number | null;
  viabilityRating: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchReports();
  // }, []);

  // Auto refesh only when there are processing reports
  // useEffect(() => {
  //   const hasProcessing = reports.some(
  //     (r) => r.status === "PROCESSING" || r.status === "PENDING",
  //   );

  //   if (!hasProcessing) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     fetchReports();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [
  //   reports.length,
  //   reports.filter((r) => r.status === "PROCESSING" || r.status === "PENDING")
  //     .length,
  // ]);

  const fetchReports = async () => {
    try {
      const reponse = await axios.get("/api/reports");
      setReports(reponse.data.reports); // Show only 5 report
      //console.log(reponse.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report? this action cannot be undone",
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await axios.delete(`/api/reports/${id}`);
      setReports(reports.filter((r) => r.id !== id));
      alert("Report deleted successfully");
    } catch (error) {
      console.error("Error deleting report", error);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        );

      case "PROCESSING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Processing
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );

      case "FAILED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Failed
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {status}
          </span>
        );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4 text-green-600" />;

      case "PROCESSING":
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;

      case "PENDING":
        return <Clock className="w-4 h-4 text-yellow-600" />;

      case "FAILED":
        return <AlertCircle className="w-4 h-4 text-red-600" />;

      default:
        return null;
    }
  };

  const filteredReports = reports.filter((report) => {
    if (filter === "all") return true;
    return report.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Reports</h1>
          <p className="text-gray-600 mt-1">
            View and manage your niche validation reports
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
        >
          New Validation
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 text-sm rounded-lg transition bg-blue-600 text-white`}
              >
                All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}

      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="py-6 px-6">
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="py-12 px-6">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-600 mb-4">
              Start validating your first niche to see reports here
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
            >
              Create First Validation
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="py-6 px-6">
            <div className="flex items-start justify-between">
              {/* Report Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  status
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      niche
                    </h3>
                    <p className="text-sm text-gray-600">keyword</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                    >
                      Viability
                    </span>
                  </div>

                  <span className="font-medium">Score: report/100</span>

                  <span>Created: createdAt</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/dashboard/reports/id`}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Link>

                <button className="inline-flex items-center justify-center p-1.5 text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <Clock className="w-4 h-4 animate-spin" />

                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600">Total</p>
          <div className="text-2xl font-bold">Total</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600">Completed</p>
          <div className="text-2xl font-bold text-green-600">COMPLETED</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600">Processing</p>
          <div className="text-2xl font-bold text-blue-600">PROCESSING</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600">Failed</p>
          <div className="text-2xl font-bold text-red-600">Failed</div>
        </div>
      </div>
    </div>
  );
}
