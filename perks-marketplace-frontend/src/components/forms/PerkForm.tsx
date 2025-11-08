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

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label,
  name,
  onUpload,
}) => {
  return (
    <FormField label={label}>
      <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 relative">
        <Icon name="upload" className="w-8 h-8" />
        <span className="text-sm mt-2">Click or drag to upload</span>
        <input
          type="file"
          name={name}
          className="opacity-0 absolute inset-0 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
          }}
        />
      </div>
    </FormField>
  );
};

export const PerkForm: React.FC<PerkFormProps> = ({ perkId, onSave }) => {
  const isEditing = !!perkId;
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    shortDescription: "",
    longDescription: "",
    location: "Global",
    categoryId: "",
    vendor: { name: "", email: "", website: "", description: "" },
    value: "",
    originalPrice: { amount: 0, currency: "USD" },
    discountedPrice: { amount: 0, currency: "USD" },
    redemption: {
      type: "",
      instructions: "",
      code: "",
      expiryDate: "",
      limitations: "",
    },
    availability: {
      isLimited: false,
      totalQuantity: 0,
      startDate: "",
      endDate: "",
    },
    tags: [],
    features: [],
    status: "Draft",
    isVisible: true,
    isFeatured: false,
    isExclusive: false,
    priority: 0,
    clientId: "",
    mainImage: null,
    vendorLogo: null,
    gallery: [],
    slug: "",
    seo: {
      title: "",
      metaDescription: "",
      description: "",
      keywords: [],
      ogTitle: "",
      ogDescription: "",
      canonicalUrl: "",
      customMetaTags: [],
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
      setFormData((prev: any) => ({
        ...prev,
        seo: { ...prev.seo, [seoField]: value },
      }));
    } else if (name === "tags") {
      setFormData((prev: any) => ({
        ...prev,
        tags: value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }));
    } else if (name === "features") {
      setFormData((prev: any) => ({
        ...prev,
        features: value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }));
    } else if (
      ["isVisible", "isFeatured", "isExclusive", "featured"].includes(name)
    ) {
      setFormData((prev: any) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = (name: string, file: File) => {
    setFormData((prev: any) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    // Basic fields
    data.append("title", formData.title);
    if (formData.description) data.append("description", formData.description);
    if (formData.shortDescription)
      data.append("shortDescription", formData.shortDescription);
    if (formData.longDescription)
      data.append("longDescription", formData.longDescription);
    data.append("location", formData.location);
    if (formData.categoryId) data.append("categoryId", formData.categoryId);
    // Vendor
    if (formData.vendor) {
      Object.entries(formData.vendor).forEach(([k, v]) => {
        if (typeof v === "string" && v) data.append(`vendor.${k}`, v);
      });
    }
    // Value & Prices
    if (formData.value) data.append("value", formData.value);
    if (formData.originalPrice) {
      if (formData.originalPrice.amount)
        data.append(
          "originalPrice.amount",
          String(formData.originalPrice.amount)
        );
      if (formData.originalPrice.currency)
        data.append(
          "originalPrice.currency",
          String(formData.originalPrice.currency)
        );
    }
    if (formData.discountedPrice) {
      if (formData.discountedPrice.amount)
        data.append(
          "discountedPrice.amount",
          String(formData.discountedPrice.amount)
        );
      if (formData.discountedPrice.currency)
        data.append(
          "discountedPrice.currency",
          String(formData.discountedPrice.currency)
        );
    }
    // Redemption
    if (formData.redemption) {
      Object.entries(formData.redemption).forEach(([k, v]) => {
        if (typeof v === "string" && v) data.append(`redemption.${k}`, v);
      });
    }
    // Availability
    if (formData.availability) {
      Object.entries(formData.availability).forEach(([k, v]) => {
        if ((typeof v === "string" || typeof v === "number") && v !== "")
          data.append(`availability.${k}`, String(v));
        if (typeof v === "boolean") data.append(`availability.${k}`, String(v));
      });
    }
    // Arrays
    if (formData.tags && Array.isArray(formData.tags))
      formData.tags.forEach((t: string) => data.append("tags[]", t));
    if (formData.features && Array.isArray(formData.features))
      formData.features.forEach((f: string) => data.append("features[]", f));
    // Booleans & misc
    data.append("status", formData.status);
    data.append("isVisible", String(formData.isVisible));
    data.append("isFeatured", String(formData.isFeatured));
    data.append("isExclusive", String(formData.isExclusive));
    if (formData.priority) data.append("priority", String(formData.priority));
    if (formData.clientId) data.append("clientId", formData.clientId);
    // Files
    if (formData.mainImage) data.append("mainImage", formData.mainImage);
    if (formData.vendorLogo) data.append("vendorLogo", formData.vendorLogo);
    if (formData.gallery && Array.isArray(formData.gallery))
      formData.gallery.forEach((file: File) => data.append("gallery[]", file));
    // Slug
    if (formData.slug) data.append("slug", formData.slug);
    // SEO
    if (formData.seo) {
      Object.entries(formData.seo).forEach(([k, v]) => {
        if (Array.isArray(v))
          v.forEach((item) => data.append(`seo.${k}[]`, String(item)));
        else if (typeof v === "string" && v) data.append(`seo.${k}`, v);
      });
    }
    try {
      if (isEditing && perkId) {
        // @ts-expect-error Accept FormData for multipart
        await perksAdmin.updatePerk(perkId, data);
      } else {
        // @ts-expect-error Accept FormData for multipart
        await perksAdmin.createPerk(data);
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
              label="Main Image (1:1)"
              name="mainImage"
              onUpload={(file) => handleFileUpload("mainImage", file)}
            />
            <FileUploadInput
              label="Vendor Logo"
              name="vendorLogo"
              onUpload={(file) => handleFileUpload("vendorLogo", file)}
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
              name="isFeatured"
              label="Featured Perk"
              checked={!!formData.isFeatured}
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
                value={formData.tags.join ? formData.tags.join(", ") : ""}
                onChange={handleChange}
                placeholder="Comma, separated, tags"
              />
            </FormField>
            <FormField label="Features">
              <Input
                name="features"
                value={
                  formData.features.join ? formData.features.join(", ") : ""
                }
                onChange={handleChange}
                placeholder="Comma, separated, features"
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
