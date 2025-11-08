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

// Helper to handle axios-like errors
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

// Form input type
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

// Category Form Modal Component
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
  // Initialize form data based on whether we're editing or creating
  const initial: CategoryFormInput = category
    ? {
        name: category.name || "",
        description: category.description || "",
        parentId: category.parentId || "",
        color: category.color || "#000000",
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
  const [keywordsInput, setKeywordsInput] = useState(
    (initial.seoKeywords || []).join(", ")
  );

  // Handle text/select input changes
  const handleTextChange = (
    e: React.ChangeEvent
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse keywords from comma-separated string
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
        {/* Category Name */}
        <FormField label="Name *">
          <Input
            name="name"
            value={formData.name}
            onChange={handleTextChange}
            required
            placeholder="e.g., Productivity"
          />
        </FormField>

        {/* Description */}
        <FormField label="Description">
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleTextChange}
            placeholder="Brief description of this category"
            rows={3}
          />
        </FormField>

        {/* Parent Category and Color in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Parent Category">
            <Select
              name="parentId"
              value={formData.parentId || ""}
              onChange={handleTextChange}
            >
              <option value="">None (root category)</option>
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

        {/* Status, Visible, Featured in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Status">
            <Select
              name="status"
              value={formData.status || "active"}
              onChange={handleTextChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </Select>
          </FormField>

          <FormField>
            <Checkbox
              name="isVisible"
              checked={!!formData.isVisible}
              onChange={handleCheckboxChange}
              label="Visible to users"
            />
          </FormField>

          <FormField>
            <Checkbox
              name="isFeatured"
              checked={!!formData.isFeatured}
              onChange={handleCheckboxChange}
              label="Featured category"
            />
          </FormField>
        </div>

        {/* Image Upload */}
        <FormField label="Category Image (JPEG/PNG/WEBP ≤ 5MB)">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {formData.image && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {formData.image.name}
            </p>
          )}
        </FormField>

        {/* SEO Fields */}
        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            SEO Settings (Optional)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="SEO Title">
              <Input
                name="seoTitle"
                value={formData.seoTitle || ""}
                onChange={handleTextChange}
                placeholder="Max 60 characters"
                maxLength={60}
              />
            </FormField>

            <FormField label="SEO Keywords (comma-separated)">
              <Input
                name="seoKeywords"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
                placeholder="productivity, tools, apps"
              />
            </FormField>
          </div>

          <FormField label="SEO Description">
            <Textarea
              name="seoDescription"
              value={formData.seoDescription || ""}
              onChange={handleTextChange}
              placeholder="Max 160 characters"
              maxLength={160}
              rows={2}
            />
          </FormField>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="secondary" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : category ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// Main Categories Page Component
export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentOptions, setParentOptions] = useState<Category[]>([]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await categoriesAdmin.getAllCategories();
      
      // Handle different response structures
      const list: Category[] = res.data?.data || res.data || [];
      console.log("Fetched categories:", list); // Debug log
      
      setCategories(list);
    } catch (e) {
      const errorMsg = getErrorMessage(e, "Failed to load categories");
      console.error("Fetch error:", e); // Debug log
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Fetch parent category options (root categories)
  const fetchParents = async () => {
    try {
      const res = await categoriesAdmin.getRootCategories();
      const list: Category[] = res.data?.data || res.data || [];
      setParentOptions(list);
    } catch (e) {
      console.error("Failed to fetch parent categories:", e);
      // Non-blocking error, set empty array
      setParentOptions([]);
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Open modal for create/edit
  const handleOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
    fetchParents(); // Load parent options when opening modal
  };

  // Close modal and reset state
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  // Build FormData from form input
  const buildFormData = (data: CategoryFormInput) => {
    const fd = new FormData();
    
    // Required fields
    fd.append("name", data.name);
    
    // Optional text fields
    if (data.description) fd.append("description", data.description);
    if (data.parentId) fd.append("parentId", data.parentId);
    if (data.color) fd.append("color", data.color);
    if (data.status) fd.append("status", data.status);
    
    // Boolean fields - always append as string
    fd.append("isVisible", String(data.isVisible ?? true));
    fd.append("isFeatured", String(data.isFeatured ?? false));
    
    // File upload
    if (data.image) {
      fd.append("image", data.image);
    }
    
    // SEO fields
    if (data.seoTitle) fd.append("seoTitle", data.seoTitle);
    if (data.seoDescription) fd.append("seoDescription", data.seoDescription);
    
    // SEO Keywords array
    if (data.seoKeywords && data.seoKeywords.length > 0) {
      data.seoKeywords.forEach((kw) => fd.append("seoKeywords[]", kw));
    }
    
    return fd;
  };

  // Handle save (create or update)
  const handleSave = async (data: CategoryFormInput) => {
    setIsSubmitting(true);
    setError("");
    
    try {
      const formData = buildFormData(data);
      
      // Log FormData contents for debugging
      console.log("Submitting category data:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      if (editingCategory) {
        // Update existing category
        await categoriesAdmin.updateCategory(editingCategory._id, formData);
        console.log("Category updated successfully");
      } else {
        // Create new category
        await categoriesAdmin.createCategory(formData);
        console.log("Category created successfully");
      }
      
      // Refresh list and close modal
      await fetchCategories();
      handleCloseModal();
      
    } catch (e) {
      const errorMsg = getErrorMessage(e, "Failed to save category");
      console.error("Save error:", e); // Debug log
      setError(errorMsg);
      alert(errorMsg); // Show error to user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    
    try {
      await categoriesAdmin.deleteCategory(id);
      console.log("Category deleted successfully");
      await fetchCategories();
    } catch (e) {
      const errorMsg = getErrorMessage(e, "Failed to delete category");
      console.error("Delete error:", e);
      alert(errorMsg);
    }
  };

  // Check if we have no data
  const emptyState = useMemo(
    () => !loading && categories.length === 0,
    [loading, categories.length]
  );

  return (
    <>
      <Card>
        <CardHeader title="Categories & Subcategories">
          <div className="flex justify-between items-center mt-2">
            {/* Error message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
                {error}
              </div>
            )}
            
            {/* Create button */}
            <div className="ml-auto">
              <Button onClick={() => handleOpenModal()}>
                <Icon name="plus" className="w-4 h-4 mr-2" />
                Create Category
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-gray-600 text-center">
              Loading categories...
            </div>
          ) : emptyState ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-4">No categories yet.</p>
              <Button onClick={() => handleOpenModal()}>
                <Icon name="plus" className="w-4 h-4 mr-2" />
                Create Your First Category
              </Button>
            </div>
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
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {cat.color && (
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: cat.color }}
                          />
                        )}
                        {cat.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {cat.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          cat.status === "active"
                            ? "bg-green-100 text-green-800"
                            : cat.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {cat.status || "active"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {cat.isVisible ? (
                        <span className="text-green-600">✓ Yes</span>
                      ) : (
                        <span className="text-gray-400">✗ No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {cat.isFeatured ? (
                        <span className="text-yellow-600">★ Yes</span>
                      ) : (
                        <span className="text-gray-400">☆ No</span>
                      )}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="ghost"
                        className="p-2"
                        onClick={() => handleOpenModal(cat)}
                        title="Edit category"
                      >
                        <Icon name="edit" className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="p-2 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(cat._id)}
                        title="Delete category"
                      >
                        <Icon name="trash" className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Category Form Modal */}
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