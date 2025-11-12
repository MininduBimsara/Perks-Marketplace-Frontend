import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Analytics from "@/components/analytics/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Perks Marketplace",
  description: "Find the best perks here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* This children prop will be your (public) or admin layout */}
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
