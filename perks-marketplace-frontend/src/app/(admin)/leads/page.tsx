"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { Lead } from "@/lib/types";
import { MOCK_LEADS } from "@/lib/mock-data";

export default function Page() {
  const [leads] = useState<Lead[]>(() => MOCK_LEADS);

  const handleExport = () => {
    console.log("Exporting leads...");
  };

  return (
    <Card>
      <CardHeader title="Captured Leads">
        <div className="flex justify-end items-center mt-2">
          <Button variant="secondary" onClick={handleExport}>
            <Icon name="download" className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableHead>Perk</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell className="font-medium">{lead.perk.title}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  {new Date(lead.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
