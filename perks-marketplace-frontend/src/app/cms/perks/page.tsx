"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/Form";
import { StatusBadge } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { Perk } from "@/lib/types";
import { MOCK_PERKS } from "@/lib/mock-data";

export default function Page() {
  const router = useRouter();
  const [perks, setPerks] = useState<Perk[]>(() => MOCK_PERKS);
  const [search, setSearch] = useState("");

  const filteredPerks = useMemo(() => {
    return perks.filter((perk) =>
      perk.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [perks, search]);

  const handleDelete = (id: string) => {
    console.log("Delete perk:", id);
    setPerks(perks.filter((p) => p._id !== id));
  };

  const handleCreateNew = () => router.push("/cms/perks/create");
  const handleEdit = (id: string) => router.push(`/cms/perks/${id}`);

  return (
    <Card>
      <CardHeader title="Perks (CMS)">
        <div className="flex justify-between items-center mt-2">
          <div className="relative w-full max-w-sm">
            <Input
              type="text"
              placeholder="Search perks..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
          </div>
          <Button onClick={handleCreateNew}>
            <Icon name="plus" className="w-4 h-4 mr-2" />
            Create Perk
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableHeader>
          <TableBody>
            {filteredPerks.map((perk) => (
              <TableRow key={perk._id}>
                <TableCell className="font-medium">{perk.title}</TableCell>
                <TableCell>
                  <StatusBadge status={perk.status} />
                </TableCell>
                <TableCell>{perk.location}</TableCell>
                <TableCell>{perk.category.name}</TableCell>
                <TableCell>{perk.featured ? "Yes" : "No"}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="ghost"
                    className="p-2"
                    onClick={() => handleEdit(perk._id)}
                  >
                    <Icon name="edit" className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="p-2 text-red-600 hover:bg-red-100"
                    onClick={() => handleDelete(perk._id)}
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
