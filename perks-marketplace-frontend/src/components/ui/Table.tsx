import React from "react";
import { cn } from "@/lib/utils";

export function Table({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-50 text-sm text-gray-600">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-medium border-b border-gray-200">
      {children}
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="text-sm text-gray-800">{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-gray-50/60">{children}</tr>;
}

export function TableCell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <td className={cn("px-4 py-3 border-b border-gray-100", className)}>
      {children}
    </td>
  );
}
