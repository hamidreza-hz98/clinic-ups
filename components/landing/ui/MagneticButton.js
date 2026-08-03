"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function MagneticButton({ href, children, sx, ...props }) {
  const rootRef = useRef(null);

  const handleMove = (event) => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = rootRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.22;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.22;
    rootRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (rootRef.current) rootRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ display: "inline-flex", transition: "transform 320ms cubic-bezier(.2,.8,.2,1)", willChange: "transform" }}
    >
      <Button
        component={href ? Link : "button"}
        href={href}
        {...props}
        sx={{
          minHeight: 48,
          px: 3,
          borderRadius: 999,
          gap: 1,
          position: "relative",
          overflow: "hidden",
          transition: "transform .18s ease, box-shadow .25s ease",
          "&:active": { transform: "scale(.96)" },
          "&::after": {
            content: '""', position: "absolute", inset: 0,
            transform: "translateX(110%) skewX(-18deg)",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent)",
            transition: "transform .65s ease",
          },
          "&:hover::after": { transform: "translateX(-110%) skewX(-18deg)" },
          ...sx,
        }}
      >{children}</Button>
    </span>
  );
}
