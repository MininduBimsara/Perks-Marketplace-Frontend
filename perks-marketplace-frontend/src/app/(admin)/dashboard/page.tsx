"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { dashboard } from "@/services/api";

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

// Types for tab payloads
type CategoriesOverview = {
  total: number;
  rootCategories: number;
  subcategories: number;
  withPerks: number;
  avgPerksPerCategory: number | string;
};
type TopCategory = {
  id: string;
  name: string;
  level: number;
  perkCount: number;
  totalPerkCount?: number;
  image?: string;
};
type CategoriesData = {
  overview: CategoriesOverview;
  topCategories: TopCategory[];
};

type LeadsOverview = {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
  conversionRate: number | string;
  avgLeadScore: number;
  totalValue: number;
};
type FunnelItem = { stage: string; count: number; percentage: number };
type SourceItem = { source: string; count: number; percentage: number };
type LeadsData = {
  overview: LeadsOverview;
  conversionFunnel: FunnelItem[];
  sources: SourceItem[];
};

type AnalyticsData = {
  activeUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
};

type BlogOverview = {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  totalComments: number;
  avgReadTime: number;
};
type BlogData = {
  overview: BlogOverview;
};

type ActivityItem = {
  type: string;
  action: string;
  title: string;
  description: string;
  timestamp: string;
  data?: unknown;
};

type PerformancePerks = {
  clickThroughRate?: number | string;
};
type PerformanceLeads = {
  conversionRate?: number | string;
};
type PerformanceTraffic = {
  bounceRate?: number | string;
};
type PerformanceOverall = {
  overallScore?: number | string;
};
type PerformanceData = {
  perks?: PerformancePerks;
  leads?: PerformanceLeads;
  traffic?: PerformanceTraffic;
  overall?: PerformanceOverall;
};

type SummaryData = {
  perks?: { total?: number };
  leads?: { total?: number };
  traffic?: { activeUsers?: number };
};

type DashboardParams = {
  period?: "1d" | "7d" | "30d" | "90d" | "365d";
  startDate?: string; // ISO8601
  endDate?: string; // ISO8601
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("overview");
  const [period, setPeriod] = useState<DashboardParams["period"]>("30d");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col md:flex-row md:items-end gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Period
          </label>
          <select
            className="border rounded px-3 py-2"
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as DashboardParams["period"])
            }
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="365d">Last year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

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
        {activeTab === "overview" && (
          <OverviewTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
        {activeTab === "perks" && (
          <PerksTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
        {activeTab === "categories" && (
          <CategoriesTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
        {activeTab === "leads" && (
          <LeadsTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
        {activeTab === "analytics" && (
          <AnalyticsTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
        {activeTab === "blog" && (
          <BlogTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
        {activeTab === "activity" && <ActivityTab params={{ limit: 20 }} />}
        {activeTab === "performance" && (
          <PerformanceTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
        {activeTab === "summary" && <SummaryTab params={{ period }} />}
        {activeTab === "export" && (
          <ExportTab
            params={{
              ...(startDate && endDate ? { startDate, endDate } : { period }),
            }}
          />
        )}
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

function OverviewTab({ params }: { params: DashboardParams }) {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { period, startDate, endDate } = params;

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await dashboard.getOverview({ period, startDate, endDate });
        setOverview(
          res.data?.data?.summary
            ? {
                totalPerks: res.data.data.summary.totalPerks ?? 0,
                newLeads: res.data.data.leads?.overview?.new ?? 0,
                totalCategories: res.data.data.summary.totalCategories ?? 0,
              }
            : {
                totalPerks: 0,
                newLeads: 0,
                totalCategories: 0,
              }
        );
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load overview";
        console.error("Failed to fetch dashboard overview", err);
        setError(message);
        setOverview({ totalPerks: 0, newLeads: 0, totalCategories: 0 });
      }
    };
    fetchOverview();
  }, [period, startDate, endDate]);

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

function PerksTab({ params }: { params: DashboardParams }) {
  const [data, setData] = useState<PerksData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { period, startDate, endDate } = params;

  useEffect(() => {
    const fetchPerks = async () => {
      try {
        const res = await dashboard.getPerks({ period, startDate, endDate });
        setData(res.data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load perks analytics";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchPerks();
  }, [period, startDate, endDate]);

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
function CategoriesTab({ params }: { params: DashboardParams }) {
  const [data, setData] = useState<CategoriesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { period, startDate, endDate } = params;

  useEffect(() => {
    const run = async () => {
      try {
        const res = await dashboard.getCategories({
          period,
          startDate,
          endDate,
        });
        setData(res.data?.data as CategoriesData);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load categories analytics"
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [period, startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border">
        {error}
      </div>
    );
  if (!data) return null;

  const ov = data.overview ?? ({} as CategoriesOverview);
  const top = (data.topCategories ?? []) as TopCategory[];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader title="Total" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.total ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Root" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.rootCategories ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Subcategories" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.subcategories ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="With Perks" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.withPerks ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Avg Perks/Category" />
          <CardContent>
            <div className="text-2xl font-bold">
              {ov.avgPerksPerCategory ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Top Categories</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Perks</th>
                <th className="border px-3 py-2">Level</th>
              </tr>
            </thead>
            <tbody>
              {top.length === 0 ? (
                <tr>
                  <td className="text-center py-3" colSpan={3}>
                    No data
                  </td>
                </tr>
              ) : (
                top.map((c: TopCategory) => (
                  <tr key={c.id}>
                    <td className="border px-3 py-2">{c.name}</td>
                    <td className="border px-3 py-2">{c.perkCount}</td>
                    <td className="border px-3 py-2">{c.level}</td>
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

function LeadsTab({ params }: { params: DashboardParams }) {
  const [data, setData] = useState<LeadsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { period, startDate, endDate } = params;

  useEffect(() => {
    const run = async () => {
      try {
        const res = await dashboard.getLeads({ period, startDate, endDate });
        setData(res.data?.data as LeadsData);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load lead analytics"
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [period, startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border">
        {error}
      </div>
    );
  if (!data) return null;

  const ov = data.overview ?? ({} as LeadsOverview);
  const sources = (data.sources ?? []) as SourceItem[];
  const funnel = (data.conversionFunnel ?? []) as FunnelItem[];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader title="Total" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.total ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="New" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.new ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Qualified" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.qualified ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Converted" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.converted ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Conv. Rate" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.conversionRate ?? 0}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Avg Score" />
          <CardContent>
            <div className="text-2xl font-bold">{ov.avgLeadScore ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Conversion Funnel</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">Stage</th>
                  <th className="border px-3 py-2">Count</th>
                  <th className="border px-3 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {funnel.length === 0 ? (
                  <tr>
                    <td className="text-center py-3" colSpan={3}>
                      No data
                    </td>
                  </tr>
                ) : (
                  funnel.map((f: FunnelItem) => (
                    <tr key={f.stage}>
                      <td className="border px-3 py-2">{f.stage}</td>
                      <td className="border px-3 py-2">{f.count}</td>
                      <td className="border px-3 py-2">{f.percentage}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Sources</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">Source</th>
                  <th className="border px-3 py-2">Count</th>
                  <th className="border px-3 py-2">%</th>
                </tr>
              </thead>
              <tbody>
                {sources.length === 0 ? (
                  <tr>
                    <td className="text-center py-3" colSpan={3}>
                      No data
                    </td>
                  </tr>
                ) : (
                  sources.map((s: SourceItem) => (
                    <tr key={s.source}>
                      <td className="border px-3 py-2">{s.source}</td>
                      <td className="border px-3 py-2">{s.count}</td>
                      <td className="border px-3 py-2">{s.percentage}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab({ params }: { params: DashboardParams }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { period, startDate, endDate } = params;

  useEffect(() => {
    const run = async () => {
      try {
        const res = await dashboard.getAnalytics({
          period,
          startDate,
          endDate,
        });
        setData(res.data?.data as AnalyticsData);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load GA4 analytics"
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [period, startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border">
        {error}
      </div>
    );
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <Card>
        <CardHeader title="Active Users" />
        <CardContent>
          <div className="text-2xl font-bold">{data.activeUsers ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="New Users" />
        <CardContent>
          <div className="text-2xl font-bold">{data.newUsers ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Sessions" />
        <CardContent>
          <div className="text-2xl font-bold">{data.sessions ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Page Views" />
        <CardContent>
          <div className="text-2xl font-bold">{data.pageViews ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Bounce Rate" />
        <CardContent>
          <div className="text-2xl font-bold">{data.bounceRate ?? 0}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Avg Session (s)" />
        <CardContent>
          <div className="text-2xl font-bold">
            {data.avgSessionDuration ?? 0}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BlogTab({ params }: { params: DashboardParams }) {
  const [data, setData] = useState<BlogData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { period, startDate, endDate } = params;

  useEffect(() => {
    const run = async () => {
      try {
        const res = await dashboard.getBlog({ period, startDate, endDate });
        setData(res.data?.data as BlogData);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load blog analytics"
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [period, startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border">
        {error}
      </div>
    );
  if (!data) return null;

  const ov = data.overview ?? ({} as BlogOverview);
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <Card>
        <CardHeader title="Total Posts" />
        <CardContent>
          <div className="text-2xl font-bold">{ov.totalPosts ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Published" />
        <CardContent>
          <div className="text-2xl font-bold">{ov.publishedPosts ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Drafts" />
        <CardContent>
          <div className="text-2xl font-bold">{ov.draftPosts ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Views" />
        <CardContent>
          <div className="text-2xl font-bold">{ov.totalViews ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Comments" />
        <CardContent>
          <div className="text-2xl font-bold">{ov.totalComments ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Avg Read (m)" />
        <CardContent>
          <div className="text-2xl font-bold">{ov.avgReadTime ?? 0}</div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityTab({ params }: { params: { limit?: number } }) {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const limit = params.limit ?? 20;

  useEffect(() => {
    const run = async () => {
      try {
        const res = await dashboard.getActivity({ limit });
        setItems((res.data?.data ?? []) as ActivityItem[]);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load activity"
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [limit]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border">
        {error}
      </div>
    );

  return (
    <div className="space-y-3">
      {items.map((it: ActivityItem, idx: number) => (
        <div key={idx} className="border rounded p-3">
          <div className="text-sm text-gray-600">
            {new Date(it.timestamp).toLocaleString()}
          </div>
          <div className="font-semibold">
            [{it.type}] {it.action} - {it.title}
          </div>
          <div className="text-gray-700">{it.description}</div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-sm text-gray-600">No recent activity</div>
      )}
    </div>
  );
}

function PerformanceTab({ params }: { params: DashboardParams }) {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { period, startDate, endDate } = params;

  useEffect(() => {
    const run = async () => {
      try {
        const res = await dashboard.getPerformance({
          period,
          startDate,
          endDate,
        });
        setData(res.data?.data as PerformanceData);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load performance metrics"
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [period, startDate, endDate]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border">
        {error}
      </div>
    );
  if (!data) return null;

  const pk = data.perks ?? ({} as PerformancePerks);
  const ld = data.leads ?? ({} as PerformanceLeads);
  const tf = data.traffic ?? ({} as PerformanceTraffic);
  const ov = data.overall ?? ({} as PerformanceOverall);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader title="Perk CTR" />
        <CardContent>
          <div className="text-2xl font-bold">{pk.clickThroughRate ?? 0}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Lead Conv." />
        <CardContent>
          <div className="text-2xl font-bold">{ld.conversionRate ?? 0}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Bounce Rate" />
        <CardContent>
          <div className="text-2xl font-bold">{tf.bounceRate ?? 0}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Overall Score" />
        <CardContent>
          <div className="text-2xl font-bold">{ov.overallScore ?? 0}</div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryTab({
  params,
}: {
  params: { period?: DashboardParams["period"] };
}) {
  const [data, setData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const period = params.period ?? "7d";

  useEffect(() => {
    const run = async () => {
      try {
        const res = await dashboard.getSummary({ period });
        setData(res.data?.data as SummaryData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load summary");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [period]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="p-3 rounded bg-yellow-50 text-yellow-700 border">
        {error}
      </div>
    );
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader title="Perks (total)" />
        <CardContent>
          <div className="text-2xl font-bold">{data.perks?.total ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Leads (total)" />
        <CardContent>
          <div className="text-2xl font-bold">{data.leads?.total ?? 0}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Active Users" />
        <CardContent>
          <div className="text-2xl font-bold">
            {data.traffic?.activeUsers ?? 0}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExportTab({ params }: { params: DashboardParams }) {
  const [module, setModule] = useState<string>("overview");
  const [format, setFormat] = useState<string>("json");
  const { period, startDate, endDate } = params;

  const onExport = async () => {
    try {
      const { default: api } = await import("@/services/api");
      const res = await api.get("/v1/dashboard/export", {
        params: {
          module,
          format,
          ...(startDate && endDate ? { startDate, endDate } : { period }),
        },
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: format === "csv" ? "text/csv" : "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ts = Date.now();
      a.download = `${module}-analytics-${ts}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to export data");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-end gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Module
        </label>
        <select
          className="border rounded px-3 py-2"
          value={module}
          onChange={(e) => setModule(e.target.value)}
        >
          <option value="overview">Overview</option>
          <option value="perks">Perks</option>
          <option value="categories">Categories</option>
          <option value="leads">Leads</option>
          <option value="ga4">GA4</option>
          <option value="blog">Blog</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Format
        </label>
        <select
          className="border rounded px-3 py-2"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>
      </div>
      <button
        type="button"
        onClick={onExport}
        className="px-4 py-2 rounded bg-slate-900 text-white"
      >
        Export
      </button>
    </div>
  );
}
