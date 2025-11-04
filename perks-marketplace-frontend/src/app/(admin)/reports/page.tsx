"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { analytics as api } from "@/services/api";

interface AnalyticsData {
  perkPerformance: any[];
  leadAnalytics: any;
}

export default function Page() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [perkRes, leadRes] = await Promise.all([
          api.getPerkPerformanceAnalytics(),
          api.getLeadAnalytics(),
        ]);
        setAnalytics({ perkPerformance: perkRes.data, leadAnalytics: leadRes.data });
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  const activeDeals = analytics.perkPerformance.filter(p => p.status === 'active').length;
  const inactiveDeals = analytics.perkPerformance.filter(p => p.status !== 'active').length;
  const mostViewedPerk = analytics.perkPerformance.sort((a, b) => b.views - a.views)[0];
  const topCategory = analytics.leadAnalytics.topCategory;

  return (
    <Card>
      <CardHeader
        title="Reports"
        description="Overview of active/inactive deals and performance."
      />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableHead>Metric</TableHead>
            <TableHead>Value</TableHead>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Active Deals</TableCell>
              <TableCell>{activeDeals}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Inactive Deals</TableCell>
              <TableCell>{inactiveDeals}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Most Viewed Perk</TableCell>
              <TableCell>{mostViewedPerk ? mostViewedPerk.title : '—'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Top Category</TableCell>
              <TableCell>{topCategory ? topCategory : '—'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
