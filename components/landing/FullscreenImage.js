"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import LiquidGlass from "./ui/LiquidGlass";

export default function FullscreenImage({ slides = [], initialSlide = 0, onClose }) {
  const normalizedSlides = useMemo(
    () => slides.map((slide, index) => (
      typeof slide === "string"
        ? { src: slide, alt: `تصویر ${index + 1}`, title: "" }
        : { src: slide?.src || slide?.image || "", alt: slide?.alt || slide?.title || `تصویر ${index + 1}`, ...slide }
    )).filter((slide) => slide.src),
    [slides],
  );
  const [activeIndex, setActiveIndex] = useState(() => Math.min(initialSlide, Math.max(normalizedSlides.length - 1, 0)));
  const [zoomed, setZoomed] = useState(false);
  const activeSlide = normalizedSlides[activeIndex];

  const move = (direction) => {
    if (normalizedSlides.length < 2) return;
    setZoomed(false);
    setActiveIndex((current) => (current + direction + normalizedSlides.length) % normalizedSlides.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
      if (event.key === "ArrowLeft") move(1);
      if (event.key === "ArrowRight") move(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!activeSlide) return null;

  return (
    <Dialog
      open
      fullScreen
      onClose={onClose}
      aria-label="نمایش تمام‌صفحه تصویر"
      slotProps={{
        backdrop: { sx: { bgcolor: "rgba(2,6,12,.86)" } },
        paper: { sx: { bgcolor: "transparent", backgroundImage: "none", overflow: "hidden" } },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateRows: "auto minmax(0,1fr) auto",
          p: { xs: 1.5, md: 3 },
          background: "radial-gradient(circle at 50% 45%, rgba(var(--landing-accent-rgb),.1), transparent 42%), #04070d",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: "relative", zIndex: 5 }}>
          <LiquidGlass intensity="strong" sx={{ borderRadius: 99, px: 2, py: 1 }}>
            <Typography sx={{ direction: "ltr", fontSize: ".78rem", fontFamily: "monospace" }}>
              {activeIndex + 1} / {normalizedSlides.length}
            </Typography>
          </LiquidGlass>
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label={zoomed ? "بازگرداندن اندازه تصویر" : "بزرگ‌نمایی تصویر"}
              onClick={() => setZoomed((value) => !value)}
              sx={{ color: "white", bgcolor: "rgba(var(--landing-contrast-rgb),.08)", border: "1px solid rgba(var(--landing-contrast-rgb),.14)" }}
            >
              {zoomed ? <ZoomOutRoundedIcon /> : <ZoomInRoundedIcon />}
            </IconButton>
            <IconButton
              aria-label="بستن نمایش تمام‌صفحه"
              onClick={onClose}
              sx={{ color: "white", bgcolor: "rgba(var(--landing-contrast-rgb),.08)", border: "1px solid rgba(var(--landing-contrast-rgb),.14)" }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Box sx={{ position: "relative", minHeight: 0, display: "grid", placeItems: "center", overflow: zoomed ? "auto" : "hidden", py: 2 }}>
          <Box
            component="img"
            src={activeSlide.src}
            alt={activeSlide.alt}
            onClick={() => setZoomed((value) => !value)}
            sx={{
              display: "block",
              maxWidth: zoomed ? "none" : "min(92vw, 1280px)",
              maxHeight: zoomed ? "none" : "calc(100vh - 190px)",
              width: activeSlide.fullscreenWidth || "auto",
              height: zoomed ? "auto" : "auto",
              objectFit: "contain",
              cursor: zoomed ? "zoom-out" : "zoom-in",
              transform: zoomed ? "scale(1.35)" : "scale(1)",
              transformOrigin: "center",
              transition: "transform .45s cubic-bezier(.2,.8,.2,1)",
              filter: "drop-shadow(0 28px 70px rgba(0,0,0,.55))",
            }}
          />

          {normalizedSlides.length > 1 && (
            <>
              <IconButton className="fullscreen-nav is-right" aria-label="تصویر قبلی" onClick={() => move(-1)}>
                <ChevronRightRoundedIcon />
              </IconButton>
              <IconButton className="fullscreen-nav is-left" aria-label="تصویر بعدی" onClick={() => move(1)}>
                <ChevronLeftRoundedIcon />
              </IconButton>
            </>
          )}
        </Box>

        <Stack alignItems="center" spacing={1.3} sx={{ position: "relative", zIndex: 5 }}>
          {(activeSlide.title || activeSlide.caption) && (
            <Typography sx={{ fontWeight: 800, textAlign: "center" }}>{activeSlide.title || activeSlide.caption}</Typography>
          )}
          {activeSlide.href && (
            <Button
              component="a"
              href={activeSlide.href}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              endIcon={<OpenInNewRoundedIcon />}
              sx={{ borderRadius: 99 }}
            >
              {activeSlide.linkLabel || "مشاهده مرجع"}
            </Button>
          )}
          {normalizedSlides.length > 1 && (
            <Stack direction="row" spacing={1} sx={{ maxWidth: "min(90vw, 620px)", overflowX: "auto", pb: 0.5 }}>
              {normalizedSlides.map((slide, index) => (
                <Box
                  component="button"
                  type="button"
                  key={`${slide.src}-${index}`}
                  aria-label={`نمایش تصویر ${index + 1}`}
                  onClick={() => { setActiveIndex(index); setZoomed(false); }}
                  sx={{
                    flex: "0 0 auto",
                    width: 50,
                    height: 38,
                    p: 0,
                    overflow: "hidden",
                    borderRadius: 1.5,
                    border: index === activeIndex ? "2px solid var(--landing-accent)" : "1px solid rgba(var(--landing-contrast-rgb),.18)",
                    bgcolor: "rgba(var(--landing-contrast-rgb),.06)",
                    cursor: "pointer",
                  }}
                >
                  <Box component="img" src={slide.src} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </Dialog>
  );
}
