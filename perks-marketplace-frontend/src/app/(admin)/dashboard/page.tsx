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

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await api.getDashboardOverview();
        setOverview(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard overview", error);
      }
    };
    fetchOverview();
  }, []);

  if (!overview) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
