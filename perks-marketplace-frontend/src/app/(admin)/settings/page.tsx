"use client";

import React, { useState, useEffect } from "react";
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
import { settings as api } from "@/services/api";

export default function Page() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSiteSettings();
        setSettings(res.data);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (settings) {
      setSettings((prev) => ({ ...prev!, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      try {
        await api.updateSiteSettings(settings);
        alert("Settings saved successfully!");
      } catch (error) {
        console.error("Failed to save settings", error);
        alert("Failed to save settings");
      }
    }
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

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
