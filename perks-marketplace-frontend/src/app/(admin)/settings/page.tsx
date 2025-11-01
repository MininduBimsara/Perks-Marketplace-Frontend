"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Form";
import { FormField } from "@/components/ui/Modal";
import { SiteSettings } from "@/lib/types";
import { MOCK_SETTINGS } from "@/lib/mock-data";

export default function Page() {
  const [settings, setSettings] = useState<SiteSettings>(MOCK_SETTINGS);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings:", settings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          title="Site Settings"
          description="Global configuration for the marketplace."
        />
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Site Name">
              <Input
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="Contact Email">
              <Input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <FormField label="Default Meta Title">
            <Input
              name="defaultMetaTitle"
              value={settings.defaultMetaTitle}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Default Meta Description">
            <Textarea
              name="defaultMetaDescription"
              value={settings.defaultMetaDescription}
              onChange={handleChange}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Google Analytics 4 ID (GA4)">
              <Input
                name="ga4Id"
                value={settings.ga4Id}
                onChange={handleChange}
                placeholder="G-XXXXXXXXXX"
              />
            </FormField>
            <FormField label="Meta Pixel ID">
              <Input
                name="metaPixelId"
                value={settings.metaPixelId}
                onChange={handleChange}
                placeholder="123456789"
              />
            </FormField>
          </div>

          <FormField label="robots.txt">
            <Textarea
              name="robotsTxt"
              value={settings.robotsTxt}
              onChange={handleChange}
              rows={8}
              className="font-mono text-sm bg-slate-50 text-slate-700"
            />
          </FormField>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit">Save Settings</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
