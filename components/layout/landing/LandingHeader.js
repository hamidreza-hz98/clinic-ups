"use client";

import { Box } from "@mui/material";
import DesktopHeader from "@/components/layout/landing/DesktopHeader";
import MobileHeader from "@/components/layout/landing/MobileHeader";

export default function LandingHeader() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar + 20,
      }}
    >
      <DesktopHeader />
      <MobileHeader />
    </Box>
  );
}
