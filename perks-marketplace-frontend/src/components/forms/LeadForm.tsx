"use client";

import React, { useState } from "react";
import { Input, Textarea, Select, Checkbox } from "@/components/ui/Form";
import { FormField } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { LeadFormData } from "@/lib/types";
import { leadManagement } from "@/services/api";

interface LeadFormProps {
  onSuccess?: () => void;
}

const initialState: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  company: { name: "", size: "", industry: "", website: "" },
  perkId: "",
  message: "",
  interests: [],
  budget: { range: "" },
  timeline: "",
  preferredContactMethod: "email",
  consentGiven: false,
  marketingOptIn: false,
};

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<LeadFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("company.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
    } else if (name === "interests") {
      setFormData((prev) => ({
        ...prev,
        interests: value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
      }));
    } else if (name === "budget.range") {
      setFormData((prev) => ({
        ...prev,
        budget: { range: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await leadManagement.submitLeadForm(formData);
      setSuccess(true);
      setFormData(initialState);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || "Failed to submit lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <FormField label="Name">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField label="Email">
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField label="Phone">
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField label="Company Name">
        <Input
          name="company.name"
          value={formData.company?.name || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Company Size">
        <Input
          name="company.size"
          value={formData.company?.size || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Industry">
        <Input
          name="company.industry"
          value={formData.company?.industry || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Website">
        <Input
          name="company.website"
          value={formData.company?.website || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Perk ID">
        <Input
          name="perkId"
          value={formData.perkId || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Message">
        <Textarea
          name="message"
          value={formData.message || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Interests (comma separated)">
        <Input
          name="interests"
          value={formData.interests?.join(", ") || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Budget Range">
        <Input
          name="budget.range"
          value={formData.budget?.range || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Timeline">
        <Input
          name="timeline"
          value={formData.timeline || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Preferred Contact Method">
        <Select
          name="preferredContactMethod"
          value={formData.preferredContactMethod || "email"}
          onChange={handleChange}
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </Select>
      </FormField>
      <Checkbox
        name="consentGiven"
        label="I consent to be contacted"
        checked={!!formData.consentGiven}
        onChange={handleChange}
      />
      <Checkbox
        name="marketingOptIn"
        label="Subscribe to marketing updates"
        checked={!!formData.marketingOptIn}
        onChange={handleChange}
      />
      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600">Lead submitted successfully!</div>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
