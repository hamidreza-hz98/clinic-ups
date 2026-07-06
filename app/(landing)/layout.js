import LandingThemeProvider from "@/theme/landing/provider";
import { Box } from "@mui/material";

export default async function RootLayout({ children }) {
  return (
    <LandingThemeProvider>
      <Box component="main">{children}</Box>
    </LandingThemeProvider>
  );
}
