"use client";

import React, { useState, useEffect } from "react";
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
import { leadManagement as api } from "@/services/api";

export default function Page() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.getAllLeads();
        setLeads(res.data);
      } catch (error) {
        console.error("Failed to fetch leads", error);
      }
    };
    fetchLeads();
  }, []);

  return (
    <Card>
      <CardHeader title="Captured Leads" />
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
