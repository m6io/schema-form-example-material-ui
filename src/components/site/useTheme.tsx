import { useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const useTheme = (storageKey = "vite-ui-theme") => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(storageKey);
    return savedTheme
      ? savedTheme === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, isDarkMode.toString());
  }, [isDarkMode, storageKey]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const ThemeProviderWithCssBaseline: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );

  return { isDarkMode, toggleDarkMode, ThemeProviderWithCssBaseline };
};

export default useTheme;
