"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

export default function Reveal({ children, delay = 0, direction = "up", sx, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const offsets = { up: "translate3d(0, 42px, 0)", left: "translate3d(42px, 0, 0)", right: "translate3d(-42px, 0, 0)" };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : offsets[direction],
        transition: `opacity 800ms ${delay}ms cubic-bezier(.2,.8,.2,1), transform 800ms ${delay}ms cubic-bezier(.2,.8,.2,1)`,
        "@media (prefers-reduced-motion: reduce)": { opacity: 1, transform: "none", transition: "none" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
