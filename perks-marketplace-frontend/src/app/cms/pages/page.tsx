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
        title="Pages"
        description="Manage static pages and SEO (About, Contact, FAQ, Terms, Privacy, Partner)."
      />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableHead>Page</TableHead>
            <TableHead>SEO Title</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableHeader>
          <TableBody>
            {[
              "About",
              "Contact",
              "FAQ",
              "Terms",
              "Privacy",
              "Partner With Us",
            ].map((name) => (
              <TableRow key={name}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>—</TableCell>
                <TableCell>—</TableCell>
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
