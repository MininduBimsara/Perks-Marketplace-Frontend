"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { analytics as api } from "@/services/api";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "perks", label: "Perks" },
  { key: "categories", label: "Categories" },
  { key: "leads", label: "Leads" },
  { key: "analytics", label: "Analytics" },
  { key: "blog", label: "Blog" },
  { key: "activity", label: "Activity" },
  { key: "performance", label: "Performance" },
  { key: "summary", label: "Summary" },
  { key: "export", label: "Export" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-gray-600 hover:text-slate-900"
            }`}
            onClick={() => setActiveTab(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "perks" && <PerksTab />}
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "leads" && <LeadsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "blog" && <BlogTab />}
        {activeTab === "activity" && <ActivityTab />}
        {activeTab === "performance" && <PerformanceTab />}
        {activeTab === "summary" && <SummaryTab />}
        {activeTab === "export" && <ExportTab />}
      </div>
    </div>
  );
}

// Placeholder components for each tab. These will be implemented in the next steps.
interface OverviewData {
  totalPerks: number;
  newLeads: number;
  totalCategories: number;
}

function OverviewTab() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await api.getDashboardOverview();
        setOverview(res.data);
      } catch (err: any) {
        console.error("Failed to fetch dashboard overview", err);
        setError(err?.message || "Failed to load overview");
        setOverview({ totalPerks: 0, newLeads: 0, totalCategories: 0 });
      }
    };
    fetchOverview();
  }, []);

  if (!overview) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {error && (
        <div className="md:col-span-3 p-3 rounded bg-yellow-50 text-yellow-700 border border-yellow-200">
          Analytics failed to load. Showing defaults.
        </div>
      )}
      <Card>
        <CardHeader title="Total Perks" />
        <CardContent>
          <div className="text-4xl font-bold text-gray-900">
            {overview.totalPerks}
          </div>
          <p className="text-sm text-gray-600">Total perks in the system</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="New Leads" />
        <CardContent>
          <div className="text-4xl font-bold text-gray-900">
            {overview.newLeads}
          </div>
          <p className="text-sm text-gray-600">Leads captured this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Total Categories" />
        <CardContent>
          <div className="text-4xl font-bold text-gray-900">
            {overview.totalCategories}
          </div>
          <p className="text-sm text-gray-600">Active perk categories</p>
        </CardContent>
      </Card>
    </div>
  );
}
interface PerksOverview {
  total: number;
  active: number;
  pending: number;
  rejected: number;
  featured: number;
  exclusive: number;
  totalViews: number;
  totalClicks: number;
  totalRedemptions: number;
  avgConversionRate: number;
}

interface TopPerk {
  id: string;
  title: string;
  vendor: string;
  views: number;
  clicks: number;
  conversions: number;
  conversionRate: number;
  category: string;
}

interface PerksData {
  overview: PerksOverview;
  topPerformingPerks: TopPerk[];
}

function PerksTab() {
  const [data, setData] = useState<PerksData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerks = async () => {
      try {
        // You may want to add period/date range params here
        const { dashboard } = await import("@/services/api");
        const res = await dashboard.getPerks();
        setData(res.data);
      } catch (err: any) {
        setError(err?.message || "Failed to load perks analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchPerks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border border-yellow-200">
        {error}
      </div>
    );
  if (!data) return null;

  const { overview, topPerformingPerks } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Total Perks" />
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {overview.total}
            </div>
            <p className="text-sm text-gray-600">Total perks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Active Perks" />
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              {overview.active}
            </div>
            <p className="text-sm text-gray-600">Active perks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Pending Perks" />
          <CardContent>
            <div className="text-3xl font-bold text-yellow-700">
              {overview.pending}
            </div>
            <p className="text-sm text-gray-600">Pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Rejected Perks" />
          <CardContent>
            <div className="text-3xl font-bold text-red-700">
              {overview.rejected}
            </div>
            <p className="text-sm text-gray-600">Rejected perks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Featured Perks" />
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              {overview.featured}
            </div>
            <p className="text-sm text-gray-600">Featured perks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Exclusive Perks" />
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">
              {overview.exclusive}
            </div>
            <p className="text-sm text-gray-600">Exclusive perks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Total Views" />
          <CardContent>
            <div className="text-3xl font-bold">{overview.totalViews}</div>
            <p className="text-sm text-gray-600">Total views</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Total Clicks" />
          <CardContent>
            <div className="text-3xl font-bold">{overview.totalClicks}</div>
            <p className="text-sm text-gray-600">Total clicks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Total Redemptions" />
          <CardContent>
            <div className="text-3xl font-bold">
              {overview.totalRedemptions}
            </div>
            <p className="text-sm text-gray-600">Total redemptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Avg. Conversion Rate" />
          <CardContent>
            <div className="text-3xl font-bold">
              {overview.avgConversionRate}%
            </div>
            <p className="text-sm text-gray-600">Average conversion rate</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Top Performing Perks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Title</th>
                <th className="px-3 py-2 border">Vendor</th>
                <th className="px-3 py-2 border">Views</th>
                <th className="px-3 py-2 border">Clicks</th>
                <th className="px-3 py-2 border">Conversions</th>
                <th className="px-3 py-2 border">Conversion Rate</th>
                <th className="px-3 py-2 border">Category</th>
              </tr>
            </thead>
            <tbody>
              {topPerformingPerks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No data
                  </td>
                </tr>
              ) : (
                topPerformingPerks.map((perk) => (
                  <tr key={perk.id}>
                    <td className="border px-3 py-2">{perk.title}</td>
                    <td className="border px-3 py-2">{perk.vendor}</td>
                    <td className="border px-3 py-2">{perk.views}</td>
                    <td className="border px-3 py-2">{perk.clicks}</td>
                    <td className="border px-3 py-2">{perk.conversions}</td>
                    <td className="border px-3 py-2">{perk.conversionRate}%</td>
                    <td className="border px-3 py-2">{perk.category}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function CategoriesTab() {
  return <div>Categories analytics coming soon...</div>;
}
function LeadsTab() {
  return <div>Leads analytics coming soon...</div>;
}
function AnalyticsTab() {
  return <div>GA4 analytics coming soon...</div>;
}
function BlogTab() {
  return <div>Blog analytics coming soon...</div>;
}
function ActivityTab() {
  return <div>Recent activity coming soon...</div>;
}
function PerformanceTab() {
  return <div>Performance metrics coming soon...</div>;
}
function SummaryTab() {
  return <div>Summary analytics coming soon...</div>;
}
function ExportTab() {
  return <div>Export analytics coming soon...</div>;
}
