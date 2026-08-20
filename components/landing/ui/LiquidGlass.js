"use client";

import { forwardRef } from "react";
import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const GlassRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "intensity" && prop !== "interactive",
})(({ theme, intensity = "medium", interactive = false }) => {
  const blur = { subtle: 14, medium: 24, strong: 38 }[intensity] || 24;
  const isLight = theme.palette.mode === "light";
  const highlight = isLight ? alpha("#ffffff", 0.76) : alpha("#ffffff", 0.13);
  const paper = alpha(theme.palette.background.paper, isLight ? 0.78 : 0.46);
  const border = alpha(isLight ? theme.palette.primary.main : "#ffffff", isLight ? 0.16 : 0.17);

  return {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    background: `linear-gradient(145deg, ${highlight}, ${paper} 48%, ${alpha(theme.palette.primary.main, isLight ? 0.055 : 0.08)})`,
    border: `1px solid ${border}`,
    boxShadow: `inset 0 1px 0 ${alpha("#ffffff", isLight ? 0.9 : 0.22)}, inset 0 -1px 0 ${alpha(
      isLight ? theme.palette.primary.main : "#000000",
      isLight ? 0.06 : 0.2
    )}, 0 18px 55px ${alpha(isLight ? "#143653" : "#000000", isLight ? 0.11 : 0.26)}`,
    backdropFilter: `blur(${blur}px) saturate(${isLight ? 120 : 145}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${isLight ? 120 : 145}%)`,
    transition: theme.transitions.create(["transform", "border-color", "box-shadow"], {
      duration: 350,
    }),
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: -1,
      pointerEvents: "none",
      background: isLight
        ? "radial-gradient(circle at 14% 0%, rgba(var(--landing-contrast-rgb),.88), transparent 34%), linear-gradient(110deg, transparent 15%, rgba(var(--landing-contrast-rgb),.42) 46%, transparent 72%)"
        : "radial-gradient(circle at 14% 0%, rgba(var(--landing-contrast-rgb),.22), transparent 34%), linear-gradient(110deg, transparent 15%, rgba(var(--landing-contrast-rgb),.07) 46%, transparent 72%)",
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
        borderColor: alpha(theme.palette.primary.main, isLight ? 0.28 : 0.32),
        boxShadow: `inset 0 1px 0 ${alpha("#ffffff", isLight ? 0.9 : 0.28)}, 0 22px 64px ${alpha(
          theme.palette.primary.main,
          isLight ? 0.13 : 0.16
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
