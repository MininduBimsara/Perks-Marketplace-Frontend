// src/app/(public)/page.tsx
"use client"; // Make this a client component to use hooks

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext"; // Import the hook

export default function Home() {
  const { theme, themeName, toggleTheme } = useTheme(); // Use the theme context

  return (
    // Use theme colors directly or via CSS variables/Tailwind utility classes
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
      }}
      className="flex min-h-screen items-center justify-center font-sans"
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 px-4 py-2 rounded border"
          style={{ borderColor: theme.colors.foreground }} // Use theme color
        >
          Switch to {themeName === "light" ? "Dark" : "Light"} Mode
        </button>

        <Image
          className={themeName === "dark" ? "invert" : ""} // Conditionally apply invert class
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1
            className="max-w-xs text-3xl font-semibold leading-10 tracking-tight"
            style={{ color: theme.colors.foreground }}
          >
            To get started, edit the page.tsx file.
          </h1>
          <p
            className="max-w-md text-lg leading-8"
            style={{ color: theme.colors.secondary }}
          >
            {" "}
            {/* Example using secondary color */}
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium"
              style={{ color: theme.colors.primary }} // Example using primary color
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium"
              style={{ color: theme.colors.primary }} // Example using primary color
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors hover:opacity-80 md:w-[158px]"
            style={{
              backgroundColor: theme.colors.foreground,
              color: theme.colors.background,
            }} // Use theme colors
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={themeName === "light" ? "invert" : ""} // Adjust based on theme
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid px-5 transition-colors hover:bg-opacity-10 md:w-[158px]"
            style={{
              borderColor: theme.colors.foreground + "20",
              color: theme.colors.foreground,
            }} // Use theme colors with opacity
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
