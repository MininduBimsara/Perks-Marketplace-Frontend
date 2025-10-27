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
    secondary: "#ff4081",
  },
};

const darkTheme: Theme = {
  colors: {
    background: "#0a0a0a",
    foreground: "#ededed",
    primary: "#3b82f6", // Example blue for dark theme
    secondary: "#ec4899", // Example pink for dark theme
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
    root.style.setProperty("--background", theme.colors.background);
    root.style.setProperty("--foreground", theme.colors.foreground);
    root.style.setProperty("--primary", theme.colors.primary);
    root.style.setProperty("--secondary", theme.colors.secondary);
    // Set other CSS variables if needed
  }, [theme]);

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
