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
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <Card>
      <CardHeader
        title="Users"
        description="Manage admin accounts, roles, and access."
      />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableHeader>
          <TableBody>
            {[
              {
                name: "Owner",
                email: "owner@example.com",
                role: "Super Admin",
              },
            ].map((u) => (
              <TableRow key={u.email}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Button variant="ghost" className="p-2">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
