"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HeadsetMicRoundedIcon from "@mui/icons-material/HeadsetMicRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const glowRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handlePointerMove = (event) => {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    if (visualRef.current) visualRef.current.style.transform = `translate3d(${x * 22}px, ${y * 16}px, 0)`;
    if (glowRef.current) {
      glowRef.current.style.left = `${50 + x * 25}%`;
      glowRef.current.style.top = `${45 + y * 25}%`;
    }
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      onPointerMove={handlePointerMove}
      sx={{
        minHeight: { xs: "calc(100svh - 72px)", md: "100svh" },
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        pt: { xs: 12, md: 15 },
        pb: { xs: 14, md: 8 },
        backgroundColor: "background.default",
        backgroundImage:
          "linear-gradient(rgba(143,189,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(143,189,255,.045) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
        "&::after": {
          content: '""', position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, transparent 65%, #070b13 100%)",
        },
      }}
    >
      <Box
        ref={glowRef}
        aria-hidden
        sx={{ position: "absolute", left: "50%", top: "45%", width: 520, height: 520, transform: "translate(-50%,-50%)", transition: "left .35s ease-out, top .35s ease-out", borderRadius: "50%", background: "rgba(0,219,231,.09)", filter: "blur(100px)" }}
      />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.05fr .95fr" }, alignItems: "center", gap: { xs: 4, md: 8 } }}>
          <Stack spacing={{ xs: 2.5, md: 3.5 }} sx={{ order: { xs: 2, md: 1 }, alignItems: "flex-start" }}>
            <Box className="hero-reveal hero-reveal-1">
              <Chip icon={<BoltRoundedIcon />} label="راهکارهای پایدار انرژی" color="primary" variant="outlined" sx={{ bgcolor: "rgba(0,219,231,.06)", borderColor: "rgba(0,219,231,.28)" }} />
            </Box>
            <Box>
              <Typography component="h1" className="hero-reveal hero-reveal-2" variant="h1" sx={{ fontSize: { xs: "2.65rem", sm: "3.6rem", md: "clamp(3.7rem,6vw,6.4rem)" }, maxWidth: 820, letterSpacing: "-.045em", lineHeight: 1.08 }}>
                مدیریت هوشمند
                <Box component="span" sx={{ display: "block", color: "primary.main", textShadow: "0 0 42px rgba(0,219,231,.24)" }}>انرژی بی‌وقفه</Box>
              </Typography>
              <Typography component="p" className="hero-reveal hero-reveal-3" variant="body1" color="text.secondary" sx={{ mt: 2.5, maxWidth: 650, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 2 }}>
                راهکارهای تخصصی یو‌پی‌اس، باتری و ژنراتور برای زیرساخت‌های حیاتی؛ از طراحی و تأمین تا نصب و پشتیبانی شبانه‌روزی.
              </Typography>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: { xs: "100%", sm: "auto" }, "& > span": { width: { xs: "100%", sm: "auto" } }, "& .MuiButton-root": { width: { xs: "100%", sm: "auto" } } }}>
              <MagneticButton href="/categories" variant="contained" endIcon={<ArrowBackRoundedIcon />}>مشاهده محصولات</MagneticButton>
              <MagneticButton href="/contact" variant="outlined" startIcon={<HeadsetMicRoundedIcon />} sx={{ color: "text.primary", borderColor: "rgba(255,255,255,.18)", bgcolor: "rgba(255,255,255,.04)" }}>درخواست مشاوره</MagneticButton>
            </Stack>
            <Typography component={Link} href="tel:+989122201160" variant="caption" sx={{ color: "text.secondary", letterSpacing: ".04em", direction: "ltr" }}>پاسخ‌گویی فوری · ۰۹۱۲ ۲۲۰ ۱۱۶۰</Typography>
          </Stack>

          <Box ref={visualRef} sx={{ order: { xs: 1, md: 2 }, position: "relative", minHeight: { xs: 300, md: 590 }, display: "grid", placeItems: "center", transition: "transform .35s ease-out", willChange: "transform" }}>
            <Box aria-hidden sx={{ position: "absolute", width: "74%", aspectRatio: "1", borderRadius: "50%", border: "1px solid rgba(0,219,231,.18)", animation: reduceMotion ? "none" : "heroSpin 18s linear infinite", "&::before": { content: '""', position: "absolute", inset: "12%", borderRadius: "50%", border: "1px dashed rgba(167,200,255,.22)" } }} />
            <LiquidGlass intensity="strong" sx={{ width: { xs: 230, sm: 290, md: 370 }, aspectRatio: "1", borderRadius: "44% 56% 52% 48% / 50% 42% 58% 50%", display: "grid", placeItems: "center", animation: reduceMotion ? "none" : "glassMorph 8s ease-in-out infinite" }}>
              <Box sx={{ width: "62%", aspectRatio: "1", borderRadius: "50%", display: "grid", placeItems: "center", background: "radial-gradient(circle at 35% 30%, #d9ffff 0 4%, #00dbe7 13%, #01417e 44%, #07101d 72%)", boxShadow: "0 0 36px rgba(0,219,231,.55), inset 0 0 34px rgba(255,255,255,.28)", animation: reduceMotion ? "none" : "corePulse 3.8s ease-in-out infinite" }}>
                <BoltRoundedIcon sx={{ fontSize: { xs: 70, md: 104 }, color: "white", filter: "drop-shadow(0 0 10px rgba(255,255,255,.6))" }} />
              </Box>
            </LiquidGlass>
            <LiquidGlass intensity="subtle" sx={{ position: "absolute", insetInlineEnd: { xs: 0, md: -10 }, top: "18%", px: 2, py: 1.2, borderRadius: 3 }}>
              <Typography variant="caption" color="text.secondary">پایداری سامانه</Typography>
              <Typography variant="h6" sx={{ direction: "ltr", color: "primary.main" }}>99.99%</Typography>
            </LiquidGlass>
            <LiquidGlass intensity="subtle" sx={{ position: "absolute", insetInlineStart: { xs: 0, md: -4 }, bottom: "17%", px: 2, py: 1.2, borderRadius: 3 }}>
              <Typography variant="caption" color="text.secondary">پشتیبانی</Typography>
              <Typography variant="h6">۲۴ / ۷</Typography>
            </LiquidGlass>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
