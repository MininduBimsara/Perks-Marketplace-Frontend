"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Form";

export default function Page() {
  return (
    <Card>
      <CardHeader
        title="Display"
        description="Manage homepage sections, hero banners, and ordering."
      />
      <CardContent className="space-y-4">
        <FormField label="Homepage hero banner URL">
          <Input placeholder="https://..." />
        </FormField>
        <FormField label="Featured section title">
          <Input placeholder="Featured" />
        </FormField>
        <Button>Save</Button>
      </CardContent>
    </Card>
  );
}
