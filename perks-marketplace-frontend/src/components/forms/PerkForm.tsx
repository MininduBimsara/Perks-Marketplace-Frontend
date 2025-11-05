"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select, Checkbox } from "@/components/ui/Form";
import { FormField } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { PerkFormData, Category } from "@/lib/types";
import { perksAdmin, categoriesAdmin } from "@/services/api";

interface PerkFormProps {
  perkId?: string;
  onSave: () => void;
}

interface FileUploadInputProps {
  label: string;
  name: string;
  onUpload: (url: string) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label,
  name,
  onUpload,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // This is a placeholder for the actual upload API call
      // You would replace this with your actual file upload logic
      const res = await new Promise<{ url: string }>((resolve) =>
        setTimeout(() => resolve({ url: URL.createObjectURL(file) }), 1000)
      );
      onUpload(res.url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormField label={label}>
      <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 relative">
        {isUploading ? (
          <p>Uploading...</p>
        ) : (
          <>
            <Icon name="upload" className="w-8 h-8" />
            <span className="text-sm mt-2">Click or drag to upload</span>
          </>
        )}
        <input
          type="file"
          name={name}
          className="opacity-0 absolute inset-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
    </FormField>
  );
};

export const PerkForm: React.FC<PerkFormProps> = ({ perkId, onSave }) => {
  const isEditing = !!perkId;
  const [formData, setFormData] = useState<PerkFormData>({
    title: "",
    shortDescription: "",
    longDescription: "",
    location: "Global",
    redemptionMethod: "Affiliate",
    affiliateUrl: "",
    couponCode: "",
    validFrom: "",
    validTo: "",
    tags: "",
    categoryId: "",
    status: "Draft",
    featured: false,
    slug: "",
    seo: {
      title: "",
      metaDescription: "",
    },
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await categoriesAdmin.getAllCategories();
        setCategories(catRes.data);

        if (isEditing && perkId) {
          const perkRes = await perksAdmin.getPerkById(perkId);
          setFormData(perkRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [isEditing, perkId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    if (name.startsWith("seo.")) {
      const seoField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        seo: { ...prev.seo, [seoField]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileUpload = (name: string, url: string) => {
    setFormData((prev) => ({ ...prev, [name]: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && perkId) {
        await perksAdmin.updatePerk(perkId, formData);
      } else {
        await perksAdmin.createPerk(formData);
      }
      onSave();
    } catch (error) {
      console.error("Failed to save perk", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader title="Perk Details" />
          <CardContent className="space-y-4">
            <FormField label="Title">
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormField>
            <FormField label="Short Description">
              <Textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="Long Description">
              <Textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows={8}
                placeholder="Rich text editor will be here..."
              />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Redemption" />
          <CardContent className="space-y-4">
            <FormField label="Redemption Method">
              <Select
                name="redemptionMethod"
                value={formData.redemptionMethod}
                onChange={handleChange}
              >
                <option value="Affiliate">Affiliate Link</option>
                <option value="Coupon">Coupon Code</option>
                <option value="Form">Lead Form</option>
              </Select>
            </FormField>
            {formData.redemptionMethod === "Affiliate" && (
              <FormField label="Affiliate URL">
                <Input
                  name="affiliateUrl"
                  value={formData.affiliateUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </FormField>
            )}
            {formData.redemptionMethod === "Coupon" && (
              <FormField label="Coupon Code">
                <Input
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleChange}
                  placeholder="SAVE20"
                />
              </FormField>
            )}
            {formData.redemptionMethod === "Form" && (
              <FormField label="Lead Form">
                <Select name="leadFormId">
                  <option value="">Select a form</option>
                  {/* TODO: Populate from API */}
                </Select>
              </FormField>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Media" />
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadInput
              label="Logo (1:1)"
              name="logoUrl"
              onUpload={(url) => handleFileUpload("logoUrl", url)}
            />
            <FileUploadInput
              label="Banner (16:9)"
              name="bannerUrl"
              onUpload={(url) => handleFileUpload("bannerUrl", url)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Search Engine Optimization (SEO)" />
          <CardContent className="space-y-4">
            <FormField label="SEO Title">
              <Input
                name="seo.title"
                value={formData.seo.title}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="SEO Meta Description">
              <Textarea
                name="seo.metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleChange}
              />
            </FormField>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Column */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader title="Publishing" />
          <CardContent className="space-y-4">
            <FormField label="Status">
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </FormField>
            <FormField label="Slug">
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. slack-30-off"
              />
            </FormField>
            <Checkbox
              name="featured"
              label="Featured Perk"
              checked={formData.featured}
              onChange={handleChange}
            />
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="secondary" type="button" onClick={onSave}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Create Perk"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader title="Organization" />
          <CardContent className="space-y-4">
            <FormField label="Location">
              <Select
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="Global">Global</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapore">Singapore</option>
              </Select>
            </FormField>
            <FormField label="Category">
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Subcategory">
              <Select name="subcategoryId" onChange={handleChange} disabled>
                <option value="">Select subcategory</option>
              </Select>
            </FormField>
            <FormField label="Tags">
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Comma, separated, tags"
              />
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Validity" />
          <CardContent className="space-y-4">
            <FormField label="Valid From">
              <Input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="Valid To">
              <Input
                type="date"
                name="validTo"
                value={formData.validTo}
                onChange={handleChange}
              />
            </FormField>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};
