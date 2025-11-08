"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { Input, Textarea, Select, Checkbox } from "@/components/ui/Form";
import { Modal, FormField } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { Category } from "@/lib/types";
import { categoriesAdmin } from "@/services/api";

interface AxiosLikeErrorData {
  message?: string;
}
interface AxiosLikeErrorResponse {
  data?: AxiosLikeErrorData;
}
interface AxiosLikeError {
  response?: AxiosLikeErrorResponse;
}
function getErrorMessage(err: unknown, fallback: string) {
  const maybe = err as AxiosLikeError;
  const msg = maybe?.response?.data?.message;
  return typeof msg === "string" ? msg : fallback;
}

type CategoryFormInput = {
  name: string;
  description?: string;
  parentId?: string;
  color?: string;
  status?: string;
  isVisible?: boolean;
  isFeatured?: boolean;
  image?: File | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category,
  parents,
  isSubmitting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormInput) => void;
  category: Category | null;
  parents: Category[];
  isSubmitting: boolean;
}) {
  const initial: CategoryFormInput = category
    ? {
        name: category.name,
        description: category.description || "",
        parentId: category.parentId,
        color: category.color,
        status: category.status || "active",
        isVisible: category.isVisible ?? true,
        isFeatured: category.isFeatured ?? false,
        image: null,
        seoTitle: category.seoTitle,
        seoDescription: category.seoDescription,
        seoKeywords: category.seoKeywords || [],
      }
    : {
        name: "",
        description: "",
        parentId: "",
        color: "#000000",
        status: "active",
        isVisible: true,
        isFeatured: false,
        image: null,
        seoTitle: "",
        seoDescription: "",
        seoKeywords: [],
      };
  const [formData, setFormData] = useState<CategoryFormInput>(() => initial);

  const handleTextChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const [keywordsInput, setKeywordsInput] = useState(
    (initial.seoKeywords || []).join(", ")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData: CategoryFormInput = {
      ...formData,
      seoKeywords: keywordsInput
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };
    onSave(finalData);
  };

  return (
    <Modal
      key={category?._id ?? "new"}
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Edit Category" : "Create Category"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Name">
          <Input
            name="name"
            value={formData.name}
            onChange={handleTextChange}
            required
          />
        </FormField>

        <FormField label="Description">
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleTextChange}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Parent Category">
            <Select
              name="parentId"
              value={formData.parentId || ""}
              onChange={handleTextChange}
            >
              <option value="">None (root)</option>
              {parents.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label="Color">
            <Input
              type="color"
              name="color"
              value={formData.color || "#000000"}
              onChange={handleTextChange}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Status">
            <Select
              name="status"
              value={formData.status || "active"}
              onChange={handleTextChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </FormField>

          <FormField>
            <Checkbox
              name="isVisible"
              checked={!!formData.isVisible}
              onChange={handleCheckboxChange}
              label="Visible"
            />
          </FormField>

          <FormField>
            <Checkbox
              name="isFeatured"
              checked={!!formData.isFeatured}
              onChange={handleCheckboxChange}
              label="Featured"
            />
          </FormField>
        </div>

        <FormField label="Image (JPEG/PNG/WEBP ≤ 5MB)">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="SEO Title">
            <Input
              name="seoTitle"
              value={formData.seoTitle || ""}
              onChange={handleTextChange}
            />
          </FormField>
          <FormField label="SEO Keywords (comma-separated)">
            <Input
              name="seoKeywords"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="SEO Description">
          <Textarea
            name="seoDescription"
            value={formData.seoDescription || ""}
            onChange={handleTextChange}
          />
        </FormField>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentOptions, setParentOptions] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoriesAdmin.getAllCategories();
      const list: Category[] = res.data?.data || [];
      setCategories(list);
      setError("");
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load categories"));
    } finally {
      setLoading(false);
    }
  };

  const fetchParents = async () => {
    try {
      const res = await categoriesAdmin.getRootCategories();
      const list: Category[] = res.data?.data || [];
      setParentOptions(list);
    } catch {
      // non-blocking
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
    fetchParents();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const buildFormData = (data: CategoryFormInput) => {
    const fd = new FormData();
    fd.append("name", data.name);
    if (data.description) fd.append("description", data.description);
    if (data.parentId) fd.append("parentId", data.parentId);
    if (data.color) fd.append("color", data.color);
    if (data.status) fd.append("status", data.status);
    if (typeof data.isVisible === "boolean")
      fd.append("isVisible", String(data.isVisible));
    if (typeof data.isFeatured === "boolean")
      fd.append("isFeatured", String(data.isFeatured));
    if (data.image) fd.append("image", data.image);
    if (data.seoTitle) fd.append("seoTitle", data.seoTitle);
    if (data.seoDescription) fd.append("seoDescription", data.seoDescription);
    if (data.seoKeywords && data.seoKeywords.length) {
      data.seoKeywords.forEach((kw) => fd.append("seoKeywords[]", kw));
    }
    return fd;
  };

  const handleSave = async (data: CategoryFormInput) => {
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await categoriesAdmin.updateCategory(
          editingCategory._id,
          buildFormData(data)
        );
      } else {
        await categoriesAdmin.createCategory(buildFormData(data));
      }
      await fetchCategories();
      handleCloseModal();
    } catch (e) {
      alert(getErrorMessage(e, "Failed to save category"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const emptyState = useMemo(
    () => !loading && categories.length === 0,
    [loading, categories.length]
  );

  return (
    <>
      <Card>
        <CardHeader title="Categories & Subcategories">
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-red-600">{error}</div>
            <div>
              <Button onClick={() => handleOpenModal()}>
                <Icon name="plus" className="w-4 h-4 mr-2" />
                Create Category
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-gray-600">Loading...</div>
          ) : emptyState ? (
            <div className="p-6 text-sm text-gray-600">No categories yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat._id}>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell>
                      <code>{cat.slug}</code>
                    </TableCell>
                    <TableCell>{cat.status || "-"}</TableCell>
                    <TableCell>{cat.isVisible ? "Yes" : "No"}</TableCell>
                    <TableCell>{cat.isFeatured ? "Yes" : "No"}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="ghost"
                        className="p-2"
                        onClick={() => handleOpenModal(cat)}
                      >
                        <Icon name="edit" className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        category={editingCategory}
        parents={parentOptions}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
