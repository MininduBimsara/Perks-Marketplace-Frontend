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
import { StatusBadge } from "@/components/ui/Modal";
import { BlogPost } from "@/lib/types";
import { MOCK_POSTS } from "@/lib/mock-data";

export default function Page() {
  const [posts] = useState<BlogPost[]>(() => MOCK_POSTS);

  return (
    <Card>
      <CardHeader title="Journal (CMS)" />
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published At</TableHead>
            <TableHead>Actions</TableHead>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <StatusBadge status={post.status} />
                </TableCell>
                <TableCell>{post.publishedAt || "—"}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" className="p-2">
                    <Icon name="edit" className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="p-2 text-red-600 hover:bg-red-100"
                  >
                    <Icon name="trash" className="w-4 h-4" />
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
