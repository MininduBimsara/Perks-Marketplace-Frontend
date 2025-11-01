"use client";

import React, { useState } from "react";
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
import { Category, CategoryFormData } from "@/lib/types";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
  category: Category | null;
}) {
  const initial: CategoryFormData = category
    ? {
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        order: category.order,
      }
    : { name: "", slug: "", description: "", order: 0 };
  const [formData, setFormData] = useState<CategoryFormData>(() => initial);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
        <FormField label="Order">
          <Input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
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
  const [categories, setCategories] = useState<Category[]>(
    () => MOCK_CATEGORIES
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleOpenModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSave = (formData: CategoryFormData) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c._id === editingCategory._id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCat: Category = {
        ...(formData as CategoryFormData),
        _id: `c${categories.length + 1}`,
      } as Category;
      setCategories([...categories, newCat]);
    }
    handleCloseModal();
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
              <TableHead>Order</TableHead>
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
                  <TableCell>{cat.order}</TableCell>
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
        </CardContent>
      </Card>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        category={editingCategory}
      />
    </>
  );
}
