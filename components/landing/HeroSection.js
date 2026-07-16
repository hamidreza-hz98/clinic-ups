"use client";

import Image from "next/image";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import HeadsetMicRounded from "@mui/icons-material/HeadsetMicRounded";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import HeroShaderBackground from "./HeroShaderBackground";
import Magnet from "@/components/react-bits/Magnet";

const floatAnimation = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0); }
  25% { transform: translate3d(-18px, 12px, 0) rotate(-1deg); }
  50% { transform: translate3d(14px, -14px, 0) rotate(1deg); }
  75% { transform: translate3d(-10px, -18px, 0) rotate(-.75deg); }
`;

const enter = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function HeroSection() {
  return (
    <Box component="section" id="hero" sx={{ position: "relative", minHeight: { md: "100svh" }, overflow: "hidden", color: "white" }}>
      <Box sx={{ position: "absolute", inset: 0 }}><HeroShaderBackground /></Box>
      <Box sx={(theme) => ({ position: "absolute", inset: 0, background: `radial-gradient(circle at 75% 30%,${alpha("#00dbe7", .12)},transparent 22%),radial-gradient(circle at 15% 55%,${alpha(theme.palette.primary.main, .28)},transparent 28%),linear-gradient(180deg,rgba(4,8,14,.46),rgba(4,8,14,.78))` })} />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, pt: { xs: 14, md: 19 }, pb: { xs: 10, md: 12 }, minHeight: { md: "100svh" }, display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", display: "grid", direction: "ltr", gridTemplateColumns: { xs: "1fr", md: "minmax(0,1.05fr) minmax(0,.95fr)" }, alignItems: "center", gap: { xs: 3, md: 2 } }}>
          <Box sx={{ order: 1, position: "relative", width: "100%", maxWidth: 730, mx: "auto", aspectRatio: "1.12 / 1", animation: `${floatAnimation} 18s ease-in-out infinite`, filter: "drop-shadow(0 28px 60px rgba(0,219,231,.22))", "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>
            <Image src="/images/static/hero-power-platform.png" alt="زیرساخت هوشمند تأمین برق اضطراری" fill priority sizes="(max-width:900px) 94vw, 52vw" style={{ objectFit: "contain" }} />
          </Box>
          <Stack spacing={3.5} sx={{ order: 2, direction: "rtl", alignItems: "flex-start", animation: `${enter} .9s .15s both cubic-bezier(.2,.8,.2,1)` }}>
            <Typography sx={{ color: "#00dbe7", fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>راهکارهای UPS</Typography>
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.75rem", md: "5rem" }, fontWeight: 900, lineHeight: 1.12, mb: 2 }}>مدیریت هوشمند انرژی</Typography>
              <Typography variant="h2" sx={{ color: "#79aef8", fontSize: { xs: "1.45rem", md: "2rem" }, fontWeight: 700 }}>تضمین پایداری در حساس‌ترین لحظات</Typography>
            </Box>
            <Typography sx={{ color: "rgba(226,232,240,.72)", maxWidth: 620, fontSize: { xs: 17, md: 20 }, lineHeight: 2 }}>ارائه راهکارهای نوین یو پی اس، باتری و ژنراتور برای مراکز حیاتی کشور با فناوری روز دنیا.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Magnet padding={50} magnetStrength={18} sx={{ width: { xs: "100%", sm: "auto" } }}><Button fullWidth variant="contained" endIcon={<ArrowBackRounded />} size="large" href="#products" sx={{ px: 4, py: 1.5, borderRadius: 2 }}>مشاهده محصولات</Button></Magnet>
              <Magnet padding={50} magnetStrength={16} sx={{ width: { xs: "100%", sm: "auto" } }}><Button fullWidth variant="outlined" size="large" href="#contact" sx={{ px: 4, py: 1.5, borderRadius: 2, color: "white", borderColor: "rgba(255,255,255,.2)", bgcolor: "rgba(255,255,255,.05)", backdropFilter: "blur(18px)" }}>درخواست مشاوره</Button></Magnet>
            </Stack>
            <Button startIcon={<HeadsetMicRounded />} href="#contact" sx={{ color: "#00dbe7", px: 0 }}>تماس فوری</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
