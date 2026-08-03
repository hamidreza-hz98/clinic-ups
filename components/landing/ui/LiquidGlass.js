"use client";

import { forwardRef } from "react";
import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const GlassRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "intensity" && prop !== "interactive",
})(({ theme, intensity = "medium", interactive = false }) => {
  const blur = { subtle: 14, medium: 24, strong: 38 }[intensity] || 24;

  return {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    background: `linear-gradient(145deg, ${alpha("#ffffff", 0.13)}, ${alpha(
      theme.palette.background.paper,
      0.46
    )} 48%, ${alpha(theme.palette.primary.main, 0.08)})`,
    border: `1px solid ${alpha("#ffffff", 0.17)}`,
    boxShadow: `inset 0 1px 0 ${alpha("#ffffff", 0.22)}, inset 0 -1px 0 ${alpha(
      "#000000",
      0.2
    )}, 0 18px 55px ${alpha("#000000", 0.26)}`,
    backdropFilter: `blur(${blur}px) saturate(145%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(145%)`,
    transition: theme.transitions.create(["transform", "border-color", "box-shadow"], {
      duration: 350,
    }),
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: -1,
      pointerEvents: "none",
      background:
        "radial-gradient(circle at 14% 0%, rgba(255,255,255,.22), transparent 34%), linear-gradient(110deg, transparent 15%, rgba(255,255,255,.07) 46%, transparent 72%)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 1,
      zIndex: -1,
      borderRadius: "inherit",
      pointerEvents: "none",
      boxShadow: `inset 0 0 24px ${alpha(theme.palette.primary.main, 0.06)}`,
    },
    ...(interactive && {
      "&:hover": {
        transform: "translateY(-2px)",
        borderColor: alpha(theme.palette.primary.light, 0.32),
        boxShadow: `inset 0 1px 0 ${alpha("#ffffff", 0.28)}, 0 22px 64px ${alpha(
          theme.palette.primary.main,
          0.16
        )}`,
      },
    }),
  };
});

const LiquidGlass = forwardRef(function LiquidGlass(
  { children, intensity = "medium", interactive = false, ...props },
  ref,
) {
  return (
    <GlassRoot ref={ref} intensity={intensity} interactive={interactive} {...props}>
      {children}
    </GlassRoot>
  );
});

export default LiquidGlass;
