import { Box, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";

export function ScreenWidthIndicator() {
  const theme = useMuiTheme();
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));
  const isXxl = useMediaQuery(theme.breakpoints.up("xl"));

  let size = "xs";
  if (isSm) size = "sm";
  if (isMd) size = "md";
  if (isLg) size = "lg";
  if (isXl) size = "xl";
  if (isXxl) size = "2xl";

  if (process.env.NODE_ENV === "production") return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 8,
        left: 8,
        zIndex: 1500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        borderRadius: "50%",
        bgcolor: "text.primary",
        color: "background.paper",
        fontSize: "0.75rem",
        fontFamily: "monospace",
      }}
    >
      {size}
    </Box>
  );
}
