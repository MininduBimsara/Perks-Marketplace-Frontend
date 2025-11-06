"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { analytics as api } from "@/services/api";

interface OverviewData {
  totalPerks: number;
  newLeads: number;
  totalCategories: number;
}

export default function Page() {
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
        // Provide a safe fallback so the page renders even if analytics is down
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
