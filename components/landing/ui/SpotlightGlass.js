"use client";

import { useRef } from "react";
import LiquidGlass from "./LiquidGlass";

export default function SpotlightGlass({ children, sx, onPointerMove, onPointerLeave, ...props }) {
  const rootRef = useRef(null);

  const handlePointerMove = (event) => {
    const node = rootRef.current;
    if (node && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const bounds = node.getBoundingClientRect();
      node.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
      node.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
      node.style.setProperty("--spotlight-opacity", "1");
    }
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event) => {
    rootRef.current?.style.setProperty("--spotlight-opacity", "0");
    onPointerLeave?.(event);
  };

  return (
    <LiquidGlass
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      sx={{
        "--spotlight-x": "50%",
        "--spotlight-y": "50%",
        "--spotlight-opacity": 0,
        "&::before": (theme) => ({
          background: theme.palette.mode === "light"
            ? "radial-gradient(420px circle at var(--spotlight-x) var(--spotlight-y), rgba(1,65,126,.12), transparent 42%), linear-gradient(110deg, transparent 15%, rgba(var(--landing-contrast-rgb),.48) 46%, transparent 72%)"
            : "radial-gradient(420px circle at var(--spotlight-x) var(--spotlight-y), rgba(120,245,255,.18), transparent 42%), linear-gradient(110deg, transparent 15%, rgba(var(--landing-contrast-rgb),.055) 46%, transparent 72%)",
          opacity: "var(--spotlight-opacity)",
          transition: "opacity .35s ease",
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </LiquidGlass>
  );
}
