"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { Input, Textarea } from "@/components/ui/Form";
import { Modal, FormField } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { categoriesAdmin as api } from "@/services/api";
import { Category, CategoryFormData } from "@/lib/types";

function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category,
  parentCategories,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  category: Category | null;
  parentCategories: Category[];
}) {
  const initial: CategoryFormData = useMemo(
    () =>
      category
        ? {
            name: category.name,
            slug: category.slug,
            description: category.description || "",
            parentId: category.parentId || "",
            color: category.color || "",
            status: category.status || "active",
            isVisible: category.isVisible ?? true,
            isFeatured: category.isFeatured ?? false,
            image: null,
            seoTitle: category.seoTitle || "",
            seoDescription: category.seoDescription || "",
            seoKeywords: category.seoKeywords || [],
          }
        : {
            name: "",
            slug: "",
            description: "",
            parentId: "",
            color: "",
            status: "active",
            isVisible: true,
            isFeatured: false,
            image: null,
            seoTitle: "",
            seoDescription: "",
            seoKeywords: [],
          },
    [category]
  );
  const [formData, setFormData] = useState<CategoryFormData>(() => initial);
  const [seoKeywordsInput, setSeoKeywordsInput] = useState("");

  useEffect(() => {
    // Avoid direct setState in effect body: use a microtask
    Promise.resolve().then(() => {
      setFormData(initial);
      setSeoKeywordsInput((initial.seoKeywords || []).join(", "));
    });
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { name, value } = target;
    if (target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file || null }));
  };

  const handleSeoKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeoKeywordsInput(e.target.value);
    setFormData((prev) => ({
      ...prev,
      seoKeywords: e.target.value
        .split(",")
        .map((kw) => kw.trim())
        .filter(Boolean),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    if (formData.description) data.append("description", formData.description);
    if (formData.parentId) data.append("parentId", formData.parentId);
    if (formData.color) data.append("color", formData.color);
    if (formData.status) data.append("status", formData.status);
    data.append("isVisible", String(formData.isVisible));
    data.append("isFeatured", String(formData.isFeatured));
    if (formData.image) data.append("image", formData.image);
    if (formData.seoTitle) data.append("seoTitle", formData.seoTitle);
    if (formData.seoDescription)
      data.append("seoDescription", formData.seoDescription);
    if (formData.seoKeywords && formData.seoKeywords.length > 0)
      formData.seoKeywords.forEach((kw) => data.append("seoKeywords[]", kw));
    onSave(data);
  };

  return (
    <Modal
      key={category?._id ?? "new"}
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Edit Category" : "Create Category"}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <FormField label="Name">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField label="Slug">
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField label="Description">
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="Parent Category">
          <select
            name="parentId"
            value={formData.parentId || ""}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">None</option>
            {parentCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Color">
          <Input
            type="color"
            name="color"
            value={formData.color || "#000000"}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="Status">
          <select
            name="status"
            value={formData.status || "active"}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
        <FormField label="Visible">
          <input
            type="checkbox"
            name="isVisible"
            checked={!!formData.isVisible}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="Featured">
          <input
            type="checkbox"
            name="isFeatured"
            checked={!!formData.isFeatured}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="Image">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormField>
        <FormField label="SEO Title">
          <Input
            name="seoTitle"
            value={formData.seoTitle || ""}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="SEO Description">
          <Textarea
            name="seoDescription"
            value={formData.seoDescription || ""}
            onChange={handleChange}
          />
        </FormField>
        <FormField label="SEO Keywords (comma separated)">
          <Input
            name="seoKeywords"
            value={seoKeywordsInput}
            onChange={handleSeoKeywordsChange}
          />
        </FormField>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await api.getAllCategories();
      setCategories(res.data.data || res.data); // handle both paginated and non-paginated
    } catch {
      // ignore
    }
  };

  const fetchParentCategories = async () => {
    try {
      const res = await api.getRootCategories();
      setParentCategories(res.data.data || res.data);
    } catch {
      setParentCategories([]);
    }
  };

  useEffect(() => {
    // Avoid direct setState in effect body: use a microtask
    Promise.resolve().then(() => {
      fetchCategories();
      fetchParentCategories();
    });
  }, []);

  const handleOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSave = async (formData: FormData) => {
    try {
      if (editingCategory) {
        // @ts-expect-error Accept FormData for multipart
        await api.updateCategory(editingCategory._id, formData);
      } else {
        // @ts-expect-error Accept FormData for multipart
        await api.createCategory(formData);
      }
      fetchCategories();
      handleCloseModal();
    } catch {
      // ignore
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error("Failed to delete category", error);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader title="Categories (CMS)">
          <div className="flex justify-end items-center mt-2">
            <Button onClick={() => handleOpenModal()}>
              <Icon name="plus" className="w-4 h-4 mr-2" />
              Create Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Color</TableHead>
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
                  <TableCell>{cat.description}</TableCell>
                  <TableCell>
                    {cat.parentId
                      ? parentCategories.find((p) => p._id === cat.parentId)
                          ?.name || "-"
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        background: cat.color || "#eee",
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {cat.color || "-"}
                    </span>
                  </TableCell>
                  <TableCell>{cat.status || "active"}</TableCell>
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
                    <Button
                      variant="ghost"
                      className="p-2"
                      onClick={() => handleDelete(cat._id)}
                    >
                      <Icon name="trash" className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        category={editingCategory}
        parentCategories={parentCategories}
      />
    </>
  );
}
