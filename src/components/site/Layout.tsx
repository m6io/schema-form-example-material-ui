import { Navbar } from "./Navbar";
import {
  Container,
  Box,
  Typography,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { useThemeContext } from "./ThemeContext";
import { ScreenWidthIndicator } from "./ScreenWidthIndicator";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Navbar />
        <Container sx={{ py: 10 }}>
          <Box sx={{ mx: "auto", maxWidth: 800 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              @m6oss/schema-form - Material UI Example
            </Typography>
            {children}
          </Box>
        </Container>
      </Box>
      <ScreenWidthIndicator />
    </ThemeProvider>
  );
};
