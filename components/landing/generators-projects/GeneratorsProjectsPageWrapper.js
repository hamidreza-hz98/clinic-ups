"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import { generatorProjects } from "@/constants/landing/projects";
import { faText, text } from "@/lib/landing/copy";
import FullscreenImage from "../FullscreenImage";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";

export default function GeneratorsProjectsPageWrapper() {
  const rootRef = useRef(null);
  const [fullscreenData, setFullscreenData] = useState({ open: false, slides: [], initialIndex: 0 });
  const totalImages = generatorProjects.reduce((sum, project) => sum + project.images.length, 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll(".generator-page-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .06, rootMargin: "0px 0px -4%" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const openFullscreen = (slides, index) => setFullscreenData({ open: true, slides, initialIndex: index });

  return (
    <Box ref={rootRef} sx={{ overflow: "hidden", bgcolor: "#070B12", color: "text.primary" }}>
      <Box component="section" sx={{ position: "relative", isolation: "isolate", minHeight: { xs: 760, md: 800 }, pt: { xs: 15, md: 17 }, pb: { xs: 9, md: 12 }, display: "flex", alignItems: "center" }}>
        <EnergyShaderBackground />
        <Box className="selected-projects-texture" aria-hidden />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(circle at 22% 45%, rgba(255,156,135,.12), transparent 31%), linear-gradient(180deg, transparent 50%, #070B12 100%)" }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
            <Box>
              <Chip icon={<PrecisionManufacturingRoundedIcon />} label="GENERATOR FIELD ARCHIVE" variant="outlined" className="hero-reveal hero-reveal-1" sx={{ mb: 3, direction: "ltr", color: "#ffb4a9", borderColor: "rgba(255,156,135,.3)", bgcolor: "rgba(255,156,135,.055)", "& .MuiChip-icon": { color: "#ff9c87" } }} />
              <Typography component="h1" variant="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "2.8rem", sm: "3.8rem", md: "5.5rem" }, lineHeight: 1.14, mb: 2.5 }}>
                نیروی اضطراری،
                <Box component="span" sx={{ display: "block", color: "primary.main" }}>اثبات‌شده در میدان</Box>
              </Typography>
              <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ maxWidth: 770, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 2.05 }}>{text("newest_generator_projects")}. مجموعه‌ای واقعی از نصب، تجهیز و نوسازی موتور برق و ژنراتور برای مراکز درمانی و آزمایشگاهی.</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={2.5} className="hero-reveal hero-reveal-3" sx={{ mt: 4.5 }}><MagneticButton href="#generator-archive" variant="contained" endIcon={<ArrowBackRoundedIcon />}>مشاهده آرشیو تصویری</MagneticButton><Button component={Link} href="/contact" variant="outlined">مشاوره پروژه</Button></Stack>
            </Box>

            <SpotlightGlass intensity="strong" className="generator-hero-visual hero-reveal hero-reveal-2" sx={{ minHeight: { xs: 350, md: 520 }, borderRadius: 6, p: 1.2 }}>
              <Box sx={{ display: "contents" }}>
                <Box component="img" className="landing-top-banner-image" src="/images/emergency-electricity/project-generator-swap-70kva/project-generator-swap-70kva-01.webp" alt="پروژه‌های موتور برق و ژنراتور کلینیک یو پی اس" sx={{ position: "absolute", inset: 9, width: "calc(100% - 18px)", height: "calc(100% - 18px)", objectFit: "cover", borderRadius: 5 }} />
                <Box className="landing-top-banner-overlay" sx={{ position: "absolute", inset: 9, borderRadius: 5 }} />
                <Box className="generator-scan-line" aria-hidden />
                <Stack direction="row" justifyContent="space-between" alignItems="end" sx={{ position: "absolute", right: 28, left: 28, bottom: 26 }}><Box><Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "2.7rem", lineHeight: 1 }}>{generatorProjects.length.toLocaleString("fa-IR")}</Typography><Typography color="text.secondary" sx={{ fontSize: ".75rem", mt: .7 }}>پروژه مستند</Typography></Box><Box sx={{ textAlign: "left" }}><Typography sx={{ color: "#ffb4a9", fontFamily: "monospace", fontSize: "1.65rem", lineHeight: 1 }}>{totalImages.toLocaleString("fa-IR")}</Typography><Typography color="text.secondary" sx={{ fontSize: ".7rem", mt: .7 }}>فریم اجرایی</Typography></Box></Stack>
              </Box>
            </SpotlightGlass>
          </Box>
        </Container>
      </Box>

      <Box id="generator-archive" component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "#0A0F17", scrollMarginTop: 100 }}>
        <Box className="generator-archive-grid" aria-hidden />
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "end" }} spacing={2} className="generator-page-reveal" sx={{ mb: { xs: 5, md: 7 } }}><Box><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>FIELD DOCUMENTATION</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.35rem", md: "3.65rem" }, mb: 1.5 }}>آرشیو پروژه‌ها</Typography><Typography color="text.secondary">{text("click_to_magnify")}</Typography></Box><Chip icon={<CollectionsRoundedIcon />} label={`${totalImages.toLocaleString("fa-IR")} تصویر`} variant="outlined" sx={{ color: "primary.light", borderColor: "rgba(0,219,231,.25)" }} /></Stack>

          <Stack spacing={{ xs: 5, md: 7 }}>
            {generatorProjects.map((project, projectIndex) => (
              <SpotlightGlass key={faText(project.title)} intensity="medium" className="generator-page-reveal" sx={{ "--generator-reveal-delay": `${Math.min(projectIndex, 6) * 70}ms`, p: { xs: 2, md: 3 }, borderRadius: 6 }}>
                <Box sx={{ display: "contents" }}>
                  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 2.5, px: { xs: 1, md: 1.5 } }}><Box><Typography sx={{ color: "#ffb4a9", fontFamily: "monospace", direction: "ltr", fontSize: ".68rem", letterSpacing: ".1em" }}>CASE {String(projectIndex + 1).padStart(2, "0")}</Typography><Typography component="h3" variant="h4" sx={{ mt: .8, fontSize: { xs: "1.35rem", md: "1.8rem" } }}>{faText(project.title)}</Typography></Box><Typography color="text.secondary" sx={{ fontSize: ".75rem" }}>{project.images.length.toLocaleString("fa-IR")} تصویر</Typography></Stack>
                  <Box className="generator-photo-grid">
                    {project.images.map((image, imageIndex) => (
                      <Box key={image} component="button" type="button" aria-label={`نمایش تصویر ${imageIndex + 1} از ${faText(project.title)}`} onClick={() => openFullscreen(project.images, imageIndex)} className={`generator-gallery-tile is-${(imageIndex % 5) + 1}`}>
                        <Box component="img" src={image} alt={`${faText(project.title)}، تصویر ${imageIndex + 1}`} loading="lazy" />
                        <Box className="generator-tile-overlay"><OpenInFullRoundedIcon /><Typography>{String(imageIndex + 1).padStart(2, "0")}</Typography></Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </SpotlightGlass>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 9, md: 13 }, bgcolor: "#070B12" }}><Container maxWidth="lg"><LiquidGlass intensity="strong" className="generator-page-reveal" sx={{ p: { xs: 3.5, md: 6 }, borderRadius: 6, textAlign: "center" }}><BoltRoundedIcon sx={{ color: "primary.main", fontSize: 48, mb: 2 }} /><Typography component="h2" variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 1.5 }}>پروژه بعدی می‌تواند برای مجموعه شما باشد</Typography><Typography color="text.secondary" sx={{ maxWidth: 680, mx: "auto", lineHeight: 2, mb: 3.5 }}>برای انتخاب ظرفیت، جانمایی و طراحی مسیر برق اضطراری با کارشناسان کلینیک یو پی اس گفتگو کنید.</Typography><MagneticButton href="/contact" variant="contained">درخواست بررسی پروژه</MagneticButton></LiquidGlass></Container></Box>

      {fullscreenData.open && <FullscreenImage slides={fullscreenData.slides} initialSlide={fullscreenData.initialIndex} onClose={() => setFullscreenData({ open: false, slides: [], initialIndex: 0 })} />}
    </Box>
  );
}
