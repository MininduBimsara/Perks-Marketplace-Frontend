// src/contexts/ThemeContext.tsx
"use client"; // Required for Context API in Next.js App Router

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

// Define the shape of your theme
interface Theme {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    // Add other colors as needed
  };
  // Add other theme properties like fonts, spacing, etc.
}

// Define your themes
const lightTheme: Theme = {
  colors: {
    background: "#ffffff",
    foreground: "#171717",
    primary: "#0070f3",
    secondary: "#1db954",
    // additional aliases (not in Theme type) will be present at runtime
    // @ts-ignore
    accent: "#ff4081",
    // @ts-ignore
    card: "#ffffff",
  },
};

const darkTheme: Theme = {
  colors: {
    background: "#0a0a0a",
    foreground: "#ededed",
    primary: "#3b82f6",
    secondary: "#22c55e",
    // @ts-ignore
    accent: "#ec4899",
    // @ts-ignore
    card: "#0f1724",
  },
};

// Define the context shape
interface ThemeContextProps {
  theme: Theme;
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

// Create the context with a default value (can be null or a default theme)
const ThemeContext = createContext<ThemeContextProps | null>(null);

// Create the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light"); // Default to light theme

  const toggleTheme = useCallback(() => {
    setThemeName((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(
    () => (themeName === "light" ? lightTheme : darkTheme),
    [themeName]
  );

  // Apply theme variables to the root element (optional but useful)
  React.useEffect(() => {
    const root = document.documentElement;
    // set data-theme so existing CSS rules like [data-theme='dark'] apply
    root.dataset.theme = themeName;

    root.style.setProperty("--color-background", (theme as any).colors.background);
    root.style.setProperty("--color-text", (theme as any).colors.foreground);
    root.style.setProperty("--color-primary", (theme as any).colors.primary);
    root.style.setProperty("--color-secondary", (theme as any).colors.secondary);
    root.style.setProperty("--color-accent", (theme as any).colors.accent || "#ff4081");
    root.style.setProperty("--color-card", (theme as any).colors.card || (theme as any).colors.background);
    // keep legacy aliases
    root.style.setProperty("--background", (theme as any).colors.background);
    root.style.setProperty("--foreground", (theme as any).colors.foreground);
  }, [theme, themeName]);

  const value = useMemo(
    () => ({ theme, themeName, toggleTheme }),
    [theme, themeName, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Create a custom hook to use the theme context
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
