"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

export default function Magnet({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 28,
  activeTransition = "transform 120ms ease-out",
  resetTransition = "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
  sx,
  ...props
}) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const animateTo = (x, y, transition) => {
    if (!innerRef.current) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      innerRef.current.style.transition = transition;
      innerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const handleMove = (event) => {
    if (disabled || !rootRef.current) return;

    const bounds = rootRef.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    const nextX = (offsetX / (bounds.width / 2 + padding)) * magnetStrength;
    const nextY = (offsetY / (bounds.height / 2 + padding)) * magnetStrength;

    animateTo(nextX, nextY, activeTransition);
  };

  const handleLeave = () => {
    animateTo(0, 0, resetTransition);
  };

  return (
    <Box
      ref={rootRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      sx={{ display: "inline-flex", ...sx }}
      {...props}
    >
      <Box ref={innerRef} sx={{ display: "inline-flex", willChange: "transform" }}>
        {children}
      </Box>
    </Box>
  );
}
