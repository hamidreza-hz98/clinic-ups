"use client";

import { alpha } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function GlassCard({ children, sx, ...props }) {
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.075)}, ${alpha(theme.palette.common.white, 0.025)})`,
        boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.08)}, 0 26px 70px rgba(0,0,0,.24)`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        ...sx,
      })}
      {...props}
    >
      {children}
    </Box>
  );
}
