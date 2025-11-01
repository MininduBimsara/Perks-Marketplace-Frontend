"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { MOCK_PERKS, MOCK_LEADS, MOCK_CATEGORIES } from "@/lib/mock-data";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader title="Total Perks" />
        <CardContent>
          <div className="text-4xl font-bold text-gray-900">
            {MOCK_PERKS.length}
          </div>
          <p className="text-sm text-gray-600">Total perks in the system</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="New Leads" />
        <CardContent>
          <div className="text-4xl font-bold text-gray-900">
            {MOCK_LEADS.length}
          </div>
          <p className="text-sm text-gray-600">Leads captured this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Total Categories" />
        <CardContent>
          <div className="text-4xl font-bold text-gray-900">
            {MOCK_CATEGORIES.length}
          </div>
          <p className="text-sm text-gray-600">Active perk categories</p>
        </CardContent>
      </Card>
    </div>
  );
}
