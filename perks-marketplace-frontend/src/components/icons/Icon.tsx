import React from "react";

type IconName =
  | "dashboard"
  | "perk"
  | "category"
  | "leads"
  | "blog"
  | "settings"
  | "users"
  | "reports"
  | "logout"
  | "search"
  | "plus"
  | "edit"
  | "trash"
  | "download"
  | "upload";

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const common = "stroke-current";
  switch (name) {
    case "dashboard":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path
            className={common}
            d="M3 13h8V3H3v10zm10 8h8v-6h-8v6zM3 21h8v-6H3v6zm10-10h8V3h-8v8z"
          />
        </svg>
      );
    case "perk":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path
            className={common}
            d="M12 2l3 7h7l-5.5 4 2 7-6.5-4-6.5 4 2-7L2 9h7z"
          />
        </svg>
      );
    case "category":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <rect className={common} x="3" y="3" width="7" height="7" />
          <rect className={common} x="14" y="3" width="7" height="7" />
          <rect className={common} x="3" y="14" width="7" height="7" />
          <rect className={common} x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "leads":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path
            className={common}
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          />
          <circle className={common} cx="9" cy="7" r="4" />
          <path className={common} d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path className={common} d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "blog":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path className={common} d="M4 4h16v16H4z" />
          <path className={common} d="M8 8h8M8 12h8M8 16h6" />
        </svg>
      );
    case "settings":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path className={common} d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
          <path
            className={common}
            d="M2 12h2m16 0h2M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
      );
    case "users":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path
            className={common}
            d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
          />
          <circle className={common} cx="10" cy="7" r="4" />
          <path className={common} d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path className={common} d="M18 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "reports":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path className={common} d="M3 3h18v18H3z" />
          <path className={common} d="M7 14l3-3 2 2 4-4" />
          <path className={common} d="M7 19h10" />
        </svg>
      );
    case "logout":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path
            className={common}
            d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
          />
          <path className={common} d="M16 17l5-5-5-5" />
          <path className={common} d="M21 12H9" />
        </svg>
      );
    case "search":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <circle className={common} cx="11" cy="11" r="8" />
          <path className={common} d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "plus":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path className={common} d="M12 5v14M5 12h14" />
        </svg>
      );
    case "edit":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path
            className={common}
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
          />
          <path className={common} d="M14.06 4.94l3.75 3.75" />
        </svg>
      );
    case "trash":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path className={common} d="M3 6h18" />
          <path className={common} d="M8 6V4h8v2" />
          <path className={common} d="M6 6l1 14h10l1-14" />
        </svg>
      );
    case "download":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path className={common} d="M12 3v12" />
          <path className={common} d="M7 10l5 5 5-5" />
          <path className={common} d="M5 21h14" />
        </svg>
      );
    case "upload":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          strokeWidth="2"
        >
          <path className={common} d="M12 21V9" />
          <path className={common} d="M7 14l5-5 5 5" />
          <path className={common} d="M5 3h14v4H5z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
