"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/Modal";
import { Input, Select } from "@/components/ui/Form";

export default function Page() {
  return (
    <Card>
      <CardHeader
        title="Forms"
        description="Configure popup lead forms and 'Partner With Us' submission form."
      />
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Popup Lead Form</h3>
            <FormField label="Name field label">
              <Input placeholder="Name" />
            </FormField>
            <FormField label="Email field label">
              <Input placeholder="Email" />
            </FormField>
            <Button className="mt-2">Save</Button>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Partner With Us</h3>
            <FormField label="Type of Offer">
              <Select>
                <option value="">Select</option>
                <option value="SaaS/AI Tools">SaaS/AI Tools</option>
                <option value="B2B Services">B2B Services</option>
                <option value="Lifestyle">Lifestyle</option>
              </Select>
            </FormField>
            <Button className="mt-2">Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
