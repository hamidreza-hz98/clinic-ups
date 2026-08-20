"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import { setImagePath } from "@/lib/landing/general";

function getRelativeIndex(index, activeIndex, length) {
  let distance = index - activeIndex;
  if (distance > length / 2) distance -= length;
  if (distance < -length / 2) distance += length;
  return distance;
}

export default function SelectedProjectsSection({ projects = [] }) {
  const selectedProjects = useMemo(() => projects.slice(0, 5), [projects]);
  const isMobile = useMediaQuery("(max-width:899px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interactionKey, setInteractionKey] = useState(0);

  useEffect(() => {
    if (paused || reduceMotion || selectedProjects.length < 2) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % selectedProjects.length),
      4800,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, selectedProjects.length, interactionKey]);

  const move = (direction) => {
    if (!selectedProjects.length) return;
    setActiveIndex((current) => (current + direction + selectedProjects.length) % selectedProjects.length);
    setInteractionKey((current) => current + 1);
  };

  return (
    <Box
      component="section"
      id="selected-projects"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(var(--landing-secondary-rgb),.08)",
      }}
    >
      <Box className="selected-projects-texture" aria-hidden />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          spacing={3}
          sx={{ mb: { xs: 5, md: 7 } }}
        >
          <Box>
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.35rem", md: "3.7rem" }, mb: 1.5 }}>
              تازه‌ترین پروژه‌های <Box component="span" sx={{ color: "primary.main" }}>منتخب</Box>
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: ".95rem", md: "1.08rem" } }}>
              نمایشی از تخصص فنی و پروژه‌های اجراشده در مقیاس ملی
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ color: "primary.main" }}>
            <Box sx={{ width: 50, height: 1, bgcolor: "primary.main" }} />
            <Typography sx={{ fontFamily: "monospace", fontSize: ".72rem", letterSpacing: ".14em" }}>EDITORIAL SHOWCASE</Typography>
          </Stack>
        </Stack>

        {selectedProjects.length ? (
          <Box
            className="selected-projects-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="پروژه‌های منتخب"
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {selectedProjects.map((project, index) => {
              const relative = getRelativeIndex(index, activeIndex, selectedProjects.length);
              const isActive = relative === 0;
              const image = setImagePath(project?.media?.[0]?.path);
              return (
                <Box
                  key={project._id || project.slug}
                  component="article"
                  className={`selected-project-slide${isActive ? " is-active" : ""}`}
                  style={{
                    transform: `translate3d(${relative * (isMobile ? 270 : 540)}px, 0, 0) scale(${isActive ? 1 : Math.abs(relative) === 1 ? .84 : .7}) rotateY(${relative * (isMobile ? -8 : -14)}deg)`,
                    opacity: Math.abs(relative) > 2 ? 0 : isActive ? 1 : .42,
                    zIndex: 10 - Math.abs(relative),
                    transitionDuration: reduceMotion ? "0ms" : "800ms",
                  }}
                  aria-hidden={!isActive}
                >
                  <LiquidGlass intensity="strong" className="selected-project-glass">
                    <Box className="selected-project-image-wrap">
                      <Box component="img" src={image} alt={project.name} className="selected-project-image" />
                      <Box className="selected-project-overlay" />
                    </Box>
                    <Box className="selected-project-glow-border" aria-hidden />
                    <Stack className="selected-project-copy" justifyContent="flex-end">
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                        {(project.categories || []).slice(0, 2).map((category) => (
                          <Chip key={category._id || category.name} label={category.name} size="small" className="selected-project-chip" />
                        ))}
                        {project.location && <Chip icon={<LocationOnRoundedIcon />} label={project.location} size="small" className="selected-project-chip" />}
                      </Stack>
                      <Typography component="h3" sx={{ fontSize: { xs: "1.6rem", md: "2.15rem" }, fontWeight: 900, mb: 1 }}>
                        {project.name}
                      </Typography>
                      <Typography color="text.secondary" sx={{ maxWidth: 640, lineHeight: 1.9, mb: 2.5, display: { xs: "none", sm: "block" } }}>
                        {project.excerpt || "اجرای تخصصی راهکارهای برق اضطراری و پایداری انرژی متناسب با الزامات پروژه."}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={3} sx={{ pt: 2, borderTop: "1px solid rgba(var(--landing-contrast-rgb),.12)" }}>
                        {project.customer && (
                          <Box>
                            <Typography className="selected-project-meta-label">کارفرما</Typography>
                            <Typography sx={{ fontSize: ".78rem" }}>{project.customer}</Typography>
                          </Box>
                        )}
                        {project.deliveryDate && (
                          <Box>
                            <Typography className="selected-project-meta-label">زمان تحویل</Typography>
                            <Typography sx={{ fontSize: ".78rem" }}>{project.deliveryDate}</Typography>
                          </Box>
                        )}
                        <Typography
                          component={Link}
                          href={`/projects/${project.slug}`}
                          tabIndex={isActive ? 0 : -1}
                          sx={{ mr: "auto !important", color: "primary.main", textDecoration: "none", fontWeight: 900, fontSize: ".8rem" }}
                        >
                          مشاهده پروژه ←
                        </Typography>
                      </Stack>
                    </Stack>
                  </LiquidGlass>
                </Box>
              );
            })}

            {selectedProjects.length > 1 && (
              <>
                <IconButton className="selected-project-nav is-next" aria-label="پروژه بعدی" onClick={() => move(1)}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
                <IconButton className="selected-project-nav is-prev" aria-label="پروژه قبلی" onClick={() => move(-1)}>
                  <ArrowBackRoundedIcon />
                </IconButton>
              </>
            )}
          </Box>
        ) : (
          <LiquidGlass intensity="medium" sx={{ py: 8, px: 3, borderRadius: 4, textAlign: "center" }}>
            <ArchitectureRoundedIcon sx={{ fontSize: 56, color: "primary.main", opacity: .7, mb: 2 }} />
            <Typography sx={{ fontWeight: 800, mb: 1 }}>پروژه منتخبی برای نمایش ثبت نشده است</Typography>
            <Typography color="text.secondary">پروژه‌ها را از پنل مدیریت به‌عنوان «منتخب» علامت‌گذاری کنید.</Typography>
          </LiquidGlass>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, md: 6 } }}>
          <MagneticButton href="/projects" variant="outlined" color="primary">
            مشاهده تمامی پروژه‌ها
          </MagneticButton>
        </Box>
      </Container>
    </Box>
  );
}
