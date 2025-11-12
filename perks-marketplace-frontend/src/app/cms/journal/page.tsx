"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/ui/Table";

export default function Page() {
  return (
    <Card>
      <CardHeader title="Journal (CMS)" />
      <CardContent className="p-0">
        {/* TODO: Replace with real data source */}
        <Table>
          <TableHeader>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published At</TableHead>
            <TableHead>Actions</TableHead>
          </TableHeader>
          <TableBody>
            {/* No data available. Implement data fetching logic. */}
            <></>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
