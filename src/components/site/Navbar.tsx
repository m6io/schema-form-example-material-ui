import {
  IconButton,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { YouTube, GitHub } from "@mui/icons-material";
import { useThemeContext } from "./ThemeContext";

export function Navbar() {
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            sx={{
              gap: "1rem",
            }}
          >
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              @react-formgen
            </Typography>
            <Box>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton
                href="https://www.youtube.com/@m6io"
                target="_blank"
                color="inherit"
              >
                <YouTube />
              </IconButton>
              <IconButton
                href="https://github.com/m6io/react-formgen"
                target="_blank"
                color="inherit"
              >
                <GitHub />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
