// src/app/cms/pages/contact/page.tsx
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
import { siteSettings } from "@/services/api";
import { Plus, Trash2 } from "lucide-react";

export default function ContactPageEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    seo: {
      title: "",
      metaDescription: "",
      keywords: [] as string[],
    },
    hero: {
      title: "",
      subtitle: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      address: "",
    },
    form: {
      title: "",
      subtitle: "",
      successMessage: "",
    },
    faqs: [] as Array<{ question: string; answer: string }>,
  });

  // Load existing contact page data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await siteSettings.getStaticPage("contact");
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Failed to load contact page:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      const updated = { ...prev };
      let current: any = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Handle FAQ changes
  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFormData((prev) => {
      const faqs = [...prev.faqs];
      faqs[index][field] = value;
      return { ...prev, faqs };
    });
  };

  // Add new FAQ
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  // Remove FAQ
  const removeFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // Save changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await siteSettings.updateStaticPage("contact", formData);
      alert("Contact page updated successfully!");
    } catch (error) {
      console.error("Failed to update contact page:", error);
      alert("Failed to update contact page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* SEO Settings */}
      <Card>
        <CardHeader title="SEO Settings" />
        <CardContent className="space-y-4">
          <FormField label="Page Title">
            <Input
              name="seo.title"
              value={formData.seo.title}
              onChange={handleChange}
              placeholder="Contact Us | PerkPal"
            />
          </FormField>

          <FormField label="Meta Description">
            <Textarea
              name="seo.metaDescription"
              value={formData.seo.metaDescription}
              onChange={handleChange}
              placeholder="Get in touch with PerkPal..."
              rows={3}
            />
          </FormField>

          <FormField label="Keywords (comma-separated)">
            <Input
              name="seo.keywords"
              value={formData.seo.keywords.join(", ")}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    keywords: e.target.value.split(",").map((k) => k.trim()),
                  },
                }));
              }}
              placeholder="contact, support, help"
            />
          </FormField>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardHeader title="Hero Section" />
        <CardContent className="space-y-4">
          <FormField label="Title">
            <Input
              name="hero.title"
              value={formData.hero.title}
              onChange={handleChange}
              placeholder="Get in Touch"
            />
          </FormField>

          <FormField label="Subtitle">
            <Textarea
              name="hero.subtitle"
              value={formData.hero.subtitle}
              onChange={handleChange}
              placeholder="Have questions about perks?..."
              rows={2}
            />
          </FormField>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader title="Contact Information" />
        <CardContent className="space-y-4">
          <FormField label="Email">
            <Input
              type="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              placeholder="hello@perkpal.com"
            />
          </FormField>

          <FormField label="Phone">
            <Input
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleChange}
              placeholder="+60 12-345 6789"
            />
          </FormField>

          <FormField label="Address">
            <Input
              name="contactInfo.address"
              value={formData.contactInfo.address}
              onChange={handleChange}
              placeholder="Kuala Lumpur, Malaysia"
            />
          </FormField>
        </CardContent>
      </Card>

      {/* Contact Form Settings */}
      <Card>
        <CardHeader title="Contact Form Settings" />
        <CardContent className="space-y-4">
          <FormField label="Form Title">
            <Input
              name="form.title"
              value={formData.form.title}
              onChange={handleChange}
              placeholder="Send us a Message"
            />
          </FormField>

          <FormField label="Form Subtitle">
            <Input
              name="form.subtitle"
              value={formData.form.subtitle}
              onChange={handleChange}
              placeholder="Fill out the form below..."
            />
          </FormField>

          <FormField label="Success Message">
            <Textarea
              name="form.successMessage"
              value={formData.form.successMessage}
              onChange={handleChange}
              placeholder="Thank you for reaching out!..."
              rows={2}
            />
          </FormField>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader title="Frequently Asked Questions">
          <Button type="button" onClick={addFaq} className="mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <span className="font-medium text-sm text-gray-600">
                  FAQ #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeFaq(index)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <FormField label="Question">
                <Input
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  placeholder="How do I redeem a perk?"
                />
              </FormField>

              <FormField label="Answer">
                <Textarea
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  placeholder="Simply click on the perk..."
                  rows={3}
                />
              </FormField>
            </div>
          ))}

          {formData.faqs.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No FAQs yet. Click "Add FAQ" to create one.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
