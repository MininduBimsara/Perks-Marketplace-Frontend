import React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  children,
  className,
}: {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-100", className)}>
      {(title || description) && (
        <div className="mb-2">
          {typeof title === "string" ? (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          ) : (
            title
          )}
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-gray-100 flex items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
