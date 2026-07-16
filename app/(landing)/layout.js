import LandingThemeProvider from "@/theme/landing/provider";
import LandingHeader from "@/components/layout/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import { Box } from "@mui/material";

export default function LandingLayout({ children }) {
  return (
    <LandingThemeProvider>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#070b12",
        }}
      >
        <LandingHeader />
        <Box component="main">{children}</Box>
        <LandingFooter />
      </Box>
    </LandingThemeProvider>
  );
}
