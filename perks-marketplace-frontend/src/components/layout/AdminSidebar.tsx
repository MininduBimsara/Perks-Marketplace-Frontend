"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import React from "react";

type NavItem = {
  href: string;
  label: string;
  icon: "dashboard" | "users" | "category" | "leads" | "reports" | "settings";
};

// Admin routes are nested under /admin in the app router.
const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/users", label: "Users", icon: "users" },
  { href: "/leads", label: "Leads", icon: "leads" },
  { href: "/categories", label: "Categories", icon: "category" },
  { href: "/reports", label: "Reports", icon: "reports" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0">
      <div className="text-2xl font-bold text-gray-900 mb-6 px-2">Admin</div>
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          // treat the item as active when the current pathname starts with the href
          // this handles nested routes like /admin/dashboard/metrics
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon name={item.icon} className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
