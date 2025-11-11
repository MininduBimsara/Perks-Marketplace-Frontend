// src/app/(admin)/leads/page.tsx - Enhanced version needed

"use client";

import React, { useState, useEffect } from "react";
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
import { Input, Select, Textarea } from "@/components/ui/Form";
import { Modal, FormField, StatusBadge } from "@/components/ui/Modal";
import { Icon } from "@/components/icons/Icon";
import { Lead } from "@/lib/types";
import { leadManagement as api } from "@/services/api";
import {
  Search,
  Filter,
  Calendar,
  User,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export default function Page() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(20);

  // Form states
  const [noteContent, setNoteContent] = useState("");
  const [noteType, setNoteType] = useState("general");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");

  // Fetch leads with filters and pagination
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });

      if (statusFilter !== "all") params.append("status", statusFilter);
      if (priorityFilter !== "all") params.append("priority", priorityFilter);

      const res = await api.getAllLeads();
      const data = res.data.data || res.data;
      setLeads(Array.isArray(data) ? data : []);

      // Handle pagination metadata if returned
      if (res.data.pagination) {
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch leads", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = leads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLeads(filtered);
    } else {
      setFilteredLeads(leads);
    }
  }, [searchQuery, leads]);

  useEffect(() => {
    fetchLeads();
  }, [currentPage, statusFilter, priorityFilter]);

  // Update lead status
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await api.updateLeadStatus(leadId, { status: newStatus });
      fetchLeads();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // Add note to lead
  const handleAddNote = async () => {
    if (!selectedLead || !noteContent.trim()) return;

    try {
      await api.addNoteToLead(selectedLead._id, {
        content: noteContent,
        type: noteType,
      });
      setNoteContent("");
      setNoteType("general");
      setIsNoteModalOpen(false);
      fetchLeads();
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  // Schedule follow-up
  const handleScheduleFollowUp = async () => {
    if (!selectedLead || !followUpDate) return;

    try {
      await api.scheduleFollowUp(selectedLead._id, {
        followUpDate,
        notes: followUpNotes,
      });
      setFollowUpDate("");
      setFollowUpNotes("");
      setIsFollowUpModalOpen(false);
      fetchLeads();
    } catch (error) {
      console.error("Failed to schedule follow-up", error);
    }
  };

  // Convert lead
  const handleConvertLead = async (leadId: string) => {
    if (!window.confirm("Convert this lead to customer?")) return;

    try {
      await api.convertLead(leadId);
      fetchLeads();
    } catch (error) {
      console.error("Failed to convert lead", error);
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await api.deleteLead(leadId);
      fetchLeads();
    } catch (error) {
      console.error("Failed to delete lead", error);
    }
  };

  // Open lead detail modal
  const handleViewDetails = async (leadId: string) => {
    try {
      const res = await api.getLeadById(leadId);
      setSelectedLead(res.data.data || res.data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch lead details", error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader title="Lead Management">
          <div className="mt-4 space-y-4">
            {/* Search and Filters Row */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-40"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </Select>

              {/* Priority Filter */}
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full md:w-40"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {leads.filter((l) => l.status === "new").length}
                </div>
                <div className="text-sm text-gray-600">New Leads</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {leads.filter((l) => l.status === "contacted").length}
                </div>
                <div className="text-sm text-gray-600">Contacted</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {leads.filter((l) => l.status === "qualified").length}
                </div>
                <div className="text-sm text-gray-600">Qualified</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {leads.filter((l) => l.status === "converted").length}
                </div>
                <div className="text-sm text-gray-600">Converted</div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Perk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.company?.name || "—"}</TableCell>
                    <TableCell>{lead.perk?.title || "—"}</TableCell>
                    <TableCell>
                      <Select
                        value={lead.status || "new"}
                        onChange={(e) =>
                          handleStatusChange(lead._id, e.target.value)
                        }
                        className="w-32"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={lead.priority || "medium"} />
                    </TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* View Details Button */}
                        <Button
                          variant="ghost"
                          className="p-2"
                          onClick={() => handleViewDetails(lead._id)}
                          title="View Details"
                        >
                          <Icon name="search" className="w-4 h-4" />
                        </Button>

                        {/* Add Note Button */}
                        <Button
                          variant="ghost"
                          className="p-2"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsNoteModalOpen(true);
                          }}
                          title="Add Note"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>

                        {/* Schedule Follow-up Button */}
                        <Button
                          variant="ghost"
                          className="p-2"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsFollowUpModalOpen(true);
                          }}
                          title="Schedule Follow-up"
                        >
                          <Calendar className="w-4 h-4" />
                        </Button>

                        {/* Convert Button */}
                        {lead.status === "qualified" && (
                          <Button
                            variant="ghost"
                            className="p-2 text-green-600"
                            onClick={() => handleConvertLead(lead._id)}
                            title="Convert Lead"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          className="p-2 text-red-600"
                          onClick={() => handleDeleteLead(lead._id)}
                          title="Delete Lead"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Lead Details"
      >
        {selectedLead && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="mt-1">{selectedLead.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1">{selectedLead.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="mt-1">{selectedLead.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Company
                </label>
                <p className="mt-1">{selectedLead.company?.name || "—"}</p>
              </div>
            </div>

            {selectedLead.message && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <p className="mt-1 p-3 bg-gray-50 rounded">
                  {selectedLead.message}
                </p>
              </div>
            )}

            {selectedLead.notes && (
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notes
                </label>
                <div className="mt-1 space-y-2">
                  {/* Notes would be an array, map through them */}
                  <p className="text-sm text-gray-500">No notes yet</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Add Note Modal */}
      <Modal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title="Add Note"
      >
        <div className="space-y-4">
          <FormField label="Note Type">
            <Select
              value={noteType}
              onChange={(e) => setNoteType(e.target.value)}
            >
              <option value="general">General</option>
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="meeting">Meeting</option>
            </Select>
          </FormField>

          <FormField label="Note Content">
            <Textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={4}
              placeholder="Enter note details..."
            />
          </FormField>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsNoteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNote}>Add Note</Button>
          </div>
        </div>
      </Modal>

      {/* Schedule Follow-up Modal */}
      <Modal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        title="Schedule Follow-up"
      >
        <div className="space-y-4">
          <FormField label="Follow-up Date">
            <Input
              type="datetime-local"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </FormField>

          <FormField label="Notes">
            <Textarea
              value={followUpNotes}
              onChange={(e) => setFollowUpNotes(e.target.value)}
              rows={3}
              placeholder="Add follow-up notes..."
            />
          </FormField>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsFollowUpModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleScheduleFollowUp}>Schedule</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
