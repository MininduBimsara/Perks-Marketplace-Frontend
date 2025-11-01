"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";

export default function Page() {
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
              <TableCell>—</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Inactive Deals</TableCell>
              <TableCell>—</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Most Viewed Perk</TableCell>
              <TableCell>—</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Top Category</TableCell>
              <TableCell>—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
