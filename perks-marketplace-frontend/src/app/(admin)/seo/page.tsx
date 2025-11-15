"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Form";
import { FormField } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { seoService } from "@/services/seo";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function SeoSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // State for file uploads
  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Fetch current SEO settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await seoService.getSeoSettings();
      setSettings(res.data.data || res.data);
    } catch (error: any) {
      const status = error?.response?.status;
      const code =
        error?.response?.data?.error?.code || error?.response?.data?.code;
      // Gracefully handle the case where no active SEO settings exist yet
      if (status === 404 && (code === "SEO_SETTINGS_NOT_FOUND" || true)) {
        const defaultSettings = {
          siteName: "",
          siteDescription: "",
          siteUrl: "",
          defaultMetaTitle: "",
          defaultMetaDescription: "",
          defaultMetaKeywords: [],
          twitterSite: "",
          twitterCreator: "",
          organization: {
            name: "",
            description: "",
            url: "",
            logo: { url: "", publicId: "" },
            contactPoint: {
              telephone: "",
              contactType: "customer service",
              email: "",
            },
            address: {
              streetAddress: "",
              addressLocality: "",
              addressRegion: "",
              postalCode: "",
              addressCountry: "",
            },
            socialMedia: {},
          },
          sitemapSettings: {
            enabled: true,
            includePerks: true,
            includeCategories: true,
            includeBlogPosts: false,
            changeFreq: "daily",
            priority: 0.8,
            lastGenerated: null,
          },
          robotsSettings: {
            enabled: true,
            allowAll: true,
            customRules: [],
            crawlDelay: 1,
            sitemapUrls: [],
          },
          schemaSettings: {
            enableOrganization: true,
            enableWebsite: true,
            enableBreadcrumbs: true,
            enableProducts: true,
            enableOffers: true,
            enableSearchBox: true,
          },
          additionalSettings: {
            enableCanonicalUrls: true,
            enableHreflang: false,
            defaultLanguage: "en",
            enableJsonLd: true,
            customMetaTags: [],
          },
          isActive: true,
        } as any;
        setSettings(defaultSettings);
        showMessage(
          "error",
          "No active SEO settings found. Fill the form and click Save to initialize."
        );
      } else {
        showMessage(
          "error",
          error?.response?.data?.message || "Failed to load SEO settings"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Handle nested fields (e.g., organization.name)
    if (name.includes(".")) {
      const keys = name.split(".");
      setSettings((prev: any) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setSettings((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "ogImage" | "logo"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "ogImage") setOgImageFile(file);
      if (type === "logo") setLogoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Build FormData for multipart upload
      const formData = new FormData();

      // Add text fields
      if (settings.siteName) formData.append("siteName", settings.siteName);
      if (settings.siteDescription)
        formData.append("siteDescription", settings.siteDescription);
      if (settings.siteUrl) formData.append("siteUrl", settings.siteUrl);
      if (settings.defaultMetaTitle)
        formData.append("defaultMetaTitle", settings.defaultMetaTitle);
      if (settings.defaultMetaDescription)
        formData.append(
          "defaultMetaDescription",
          settings.defaultMetaDescription
        );

      // Add keywords as array
      if (
        settings.defaultMetaKeywords &&
        Array.isArray(settings.defaultMetaKeywords)
      ) {
        settings.defaultMetaKeywords.forEach((kw: string) =>
          formData.append("defaultMetaKeywords[]", kw)
        );
      }

      // Add social media
      if (settings.twitterSite)
        formData.append("twitterSite", settings.twitterSite);
      if (settings.twitterCreator)
        formData.append("twitterCreator", settings.twitterCreator);

      // Add organization data as JSON string
      if (settings.organization) {
        formData.append("organization", JSON.stringify(settings.organization));
      }

      // Add settings as JSON strings
      if (settings.sitemapSettings) {
        formData.append(
          "sitemapSettings",
          JSON.stringify(settings.sitemapSettings)
        );
      }
      if (settings.robotsSettings) {
        formData.append(
          "robotsSettings",
          JSON.stringify(settings.robotsSettings)
        );
      }
      if (settings.schemaSettings) {
        formData.append(
          "schemaSettings",
          JSON.stringify(settings.schemaSettings)
        );
      }

      // Add file uploads
      if (ogImageFile) formData.append("defaultOgImage", ogImageFile);
      if (logoFile) formData.append("organizationLogo", logoFile);

      await seoService.updateSeoSettings(formData);
      showMessage("success", "SEO settings updated successfully!");

      // Refresh settings
      await fetchSettings();

      // Clear file inputs
      setOgImageFile(null);
      setLogoFile(null);
    } catch (error: any) {
      showMessage(
        "error",
        error?.response?.data?.message || "Failed to update settings"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerateSitemap = async () => {
    try {
      await seoService.regenerateSitemap();
      showMessage("success", "Sitemap regenerated successfully!");
    } catch (error: any) {
      showMessage(
        "error",
        error?.response?.data?.message || "Failed to regenerate sitemap"
      );
    }
  };

  const handleRegenerateRobots = async () => {
    try {
      await seoService.regenerateRobotsTxt();
      showMessage("success", "Robots.txt regenerated successfully!");
    } catch (error: any) {
      showMessage(
        "error",
        error?.response?.data?.message || "Failed to regenerate robots.txt"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Loading SEO settings...</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <Card>
        <CardContent>
          <p className="text-red-600">Failed to load SEO settings</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center space-x-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader title="Basic SEO Settings" />
          <CardContent className="space-y-4">
            <FormField label="Site Name">
              <Input
                name="siteName"
                value={settings.siteName || ""}
                onChange={handleChange}
                placeholder="Perks Marketplace"
              />
            </FormField>

            <FormField label="Site Description">
              <Textarea
                name="siteDescription"
                value={settings.siteDescription || ""}
                onChange={handleChange}
                placeholder="Discover exclusive deals and perks..."
                rows={3}
              />
            </FormField>

            <FormField label="Site URL">
              <Input
                name="siteUrl"
                value={settings.siteUrl || ""}
                onChange={handleChange}
                placeholder="https://yoursite.com"
              />
            </FormField>

            <FormField label="Default Meta Title">
              <Input
                name="defaultMetaTitle"
                value={settings.defaultMetaTitle || ""}
                onChange={handleChange}
                placeholder="Amazing Perks - Exclusive Deals"
                maxLength={60}
              />
              <span className="text-xs text-gray-500">
                {settings.defaultMetaTitle?.length || 0}/60 characters
              </span>
            </FormField>

            <FormField label="Default Meta Description">
              <Textarea
                name="defaultMetaDescription"
                value={settings.defaultMetaDescription || ""}
                onChange={handleChange}
                placeholder="Find the best deals..."
                maxLength={160}
                rows={3}
              />
              <span className="text-xs text-gray-500">
                {settings.defaultMetaDescription?.length || 0}/160 characters
              </span>
            </FormField>
          </CardContent>
        </Card>

        {/* Social Media & Images */}
        <Card>
          <CardHeader title="Social Media & Open Graph" />
          <CardContent className="space-y-4">
            <FormField label="Default OG Image (1200x630px recommended)">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "ogImage")}
                className="w-full"
              />
              {settings.defaultOgImage?.url && !ogImageFile && (
                <div className="mt-2">
                  <img
                    src={settings.defaultOgImage.url}
                    alt="Current OG"
                    className="max-w-xs rounded border"
                  />
                </div>
              )}
            </FormField>

            <FormField label="Twitter Site Handle">
              <Input
                name="twitterSite"
                value={settings.twitterSite || ""}
                onChange={handleChange}
                placeholder="@yoursite"
              />
            </FormField>

            <FormField label="Twitter Creator Handle">
              <Input
                name="twitterCreator"
                value={settings.twitterCreator || ""}
                onChange={handleChange}
                placeholder="@creator"
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Organization Info */}
        <Card>
          <CardHeader title="Organization Information" />
          <CardContent className="space-y-4">
            <FormField label="Organization Name">
              <Input
                name="organization.name"
                value={settings.organization?.name || ""}
                onChange={handleChange}
                placeholder="Perks Marketplace Inc."
              />
            </FormField>

            <FormField label="Organization Description">
              <Textarea
                name="organization.description"
                value={settings.organization?.description || ""}
                onChange={handleChange}
                placeholder="Leading marketplace for exclusive deals..."
                rows={3}
              />
            </FormField>

            <FormField label="Organization Logo">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "logo")}
                className="w-full"
              />
              {settings.organization?.logo?.url && !logoFile && (
                <div className="mt-2">
                  <img
                    src={settings.organization.logo.url}
                    alt="Current Logo"
                    className="max-w-xs rounded border"
                  />
                </div>
              )}
            </FormField>

            <FormField label="Contact Email">
              <Input
                name="organization.contactPoint.email"
                value={settings.organization?.contactPoint?.email || ""}
                onChange={handleChange}
                placeholder="support@yoursite.com"
              />
            </FormField>

            <FormField label="Contact Phone">
              <Input
                name="organization.contactPoint.telephone"
                value={settings.organization?.contactPoint?.telephone || ""}
                onChange={handleChange}
                placeholder="+1-800-123-4567"
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Tools & Actions */}
        <Card>
          <CardHeader title="SEO Tools" />
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Sitemap.xml</h4>
                <p className="text-sm text-gray-600">
                  Last generated:{" "}
                  {settings.sitemapSettings?.lastGenerated
                    ? new Date(
                        settings.sitemapSettings.lastGenerated
                      ).toLocaleString()
                    : "Never"}
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={handleRegenerateSitemap}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Robots.txt</h4>
                <p className="text-sm text-gray-600">
                  Controls search engine crawling
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={handleRegenerateRobots}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
              <Icon name="search" className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  View your sitemap at:{" "}
                  <a
                    href={`${settings.siteUrl}/sitemap.xml`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {settings.siteUrl}/sitemap.xml
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save SEO Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
