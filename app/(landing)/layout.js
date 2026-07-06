import LandingThemeProvider from "@/theme/landing/provider";
import { Box } from "@mui/material";

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <LandingThemeProvider>
            <Box component="main">{children}</Box>
        </LandingThemeProvider>
      </body>
    </html>
  );
}