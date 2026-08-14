"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import moment from "jalali-moment";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { getProjectDetails } from "@/app/actions/project";
import { setImagePath } from "@/lib/landing/general";
import { toPersianNumber } from "@/lib/landing/number";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import FullscreenImage from "../FullscreenImage";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";
import ProjectShowcaseCard from "./ProjectShowcaseCard";

function MetadataCard({ icon: Icon, label, value }) {
  return (
    <SpotlightGlass className="project-page-reveal" intensity="subtle" sx={{ p: 2.5, borderRadius: 3.5, minHeight: 125 }}>
      <Icon sx={{ color: "primary.main", fontSize: 27, mb: 1.5 }} />
      <Typography sx={{ color: "text.secondary", fontSize: ".72rem", mb: 0.7 }}>{label}</Typography>
      <Typography sx={{ fontWeight: 800, lineHeight: 1.7 }}>{value || "—"}</Typography>
    </SpotlightGlass>
  );
}

function ProjectGallery({ project, activeIndex, setActiveIndex, onOpen, onPause }) {
  const media = project.media || [];
  const activeMedia = media[activeIndex] || media[0];
  const move = (direction) => {
    if (media.length < 2) return;
    setActiveIndex((current) => (current + direction + media.length) % media.length);
  };

  return (
    <SpotlightGlass
      intensity="strong"
      className="hero-reveal hero-reveal-2"
      onPointerEnter={() => onPause(true)}
      onPointerLeave={() => onPause(false)}
      sx={{ minHeight: { xs: 420, md: 590 }, borderRadius: 6, p: 1.3 }}
    >
      <Box
        component="button"
        type="button"
        aria-label="نمایش تمام‌صفحه تصویر پروژه"
        onClick={() => onOpen(activeIndex)}
        sx={{ position: "absolute", inset: 10, p: 0, border: 0, bgcolor: "transparent", borderRadius: 5, overflow: "hidden", cursor: "zoom-in" }}
      >
        <Box
          component="img"
          src={setImagePath(activeMedia?.path)}
          alt={activeMedia?.mediaAlt || `${project.name}، تصویر ${activeIndex + 1}`}
          sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .8s cubic-bezier(.2,.8,.2,1)", "&:hover": { transform: "scale(1.035)" } }}
        />
      </Box>
      <Box sx={{ position: "absolute", inset: 10, borderRadius: 5, pointerEvents: "none", background: "linear-gradient(180deg, rgba(4,8,14,.05), rgba(4,8,14,.08) 54%, rgba(4,8,14,.88))" }} />

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: "absolute", top: 28, right: 28, left: 28 }}>
        <LiquidGlass intensity="strong" sx={{ px: 2, py: 1, borderRadius: 99 }}>
          <Typography sx={{ direction: "ltr", fontFamily: "monospace", fontSize: ".75rem" }}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(Math.max(media.length, 1)).padStart(2, "0")}
          </Typography>
        </LiquidGlass>
        <IconButton aria-label="بازکردن تصویر پروژه" onClick={() => onOpen(activeIndex)} sx={{ color: "white", bgcolor: "rgba(5,11,18,.6)", border: "1px solid rgba(255,255,255,.18)", backdropFilter: "blur(12px)" }}>
          <OpenInFullRoundedIcon />
        </IconButton>
      </Stack>

      {media.length > 1 && (
        <>
          <IconButton aria-label="تصویر قبلی" onClick={() => move(-1)} sx={{ position: "absolute", right: 26, top: "50%", transform: "translateY(-50%)", color: "white", bgcolor: "rgba(5,11,18,.58)", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(10px)" }}>
            <ChevronRightRoundedIcon />
          </IconButton>
          <IconButton aria-label="تصویر بعدی" onClick={() => move(1)} sx={{ position: "absolute", left: 26, top: "50%", transform: "translateY(-50%)", color: "white", bgcolor: "rgba(5,11,18,.58)", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(10px)" }}>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <Stack direction="row" spacing={1} sx={{ position: "absolute", right: 26, left: 26, bottom: 24, overflowX: "auto", pb: 0.5 }}>
            {media.map((image, index) => (
              <Box
                component="button"
                type="button"
                key={image._id || image.path || index}
                aria-label={`نمایش تصویر ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                sx={{
                  width: { xs: 56, md: 72 },
                  height: { xs: 44, md: 54 },
                  flex: "0 0 auto",
                  p: 0,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: index === activeIndex ? "2px solid #00dbe7" : "1px solid rgba(255,255,255,.22)",
                  bgcolor: "rgba(5,11,18,.5)",
                  opacity: index === activeIndex ? 1 : .62,
                  transition: "opacity .25s ease, transform .25s ease",
                  transform: index === activeIndex ? "translateY(-3px)" : "none",
                }}
              >
                <Box component="img" src={setImagePath(image.path)} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
            ))}
          </Stack>
        </>
      )}
    </SpotlightGlass>
  );
}

export default function ProjectDetailsWrapper({ slug }) {
  const rootRef = useRef(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fullscreenData, setFullscreenData] = useState({ open: false, slides: [], initialIndex: 0 });

  useEffect(() => {
    let active = true;
    getProjectDetails({ slug }).then((response) => {
      if (!active) return;
      if (response?.status && response.status >= 400) {
        setError(response.message || "پروژه موردنظر پیدا نشد.");
        setProject(null);
      } else {
        setProject(response?.data || null);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!project || paused || reduceMotion || (project.media || []).length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % project.media.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, [paused, project, reduceMotion]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !project) return undefined;
    const items = root.querySelectorAll(".project-page-reveal, .project-showcase-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -5%" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [project]);

  const fullscreenImages = useMemo(
    () => (project?.media || []).map((image, index) => ({ src: setImagePath(image.path), alt: image.mediaAlt || `${project.name}، تصویر ${index + 1}` })),
    [project],
  );

  if (loading) {
    return (
      <Box sx={{ minHeight: "80vh", display: "grid", placeItems: "center", bgcolor: "#070B12" }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress size={40} thickness={2.5} />
          <Typography color="text.secondary">در حال آماده‌سازی پروژه</Typography>
        </Stack>
      </Box>
    );
  }

  if (!project || error) {
    return (
      <Box sx={{ minHeight: "80vh", display: "grid", placeItems: "center", bgcolor: "#070B12", px: 2 }}>
        <LiquidGlass intensity="strong" sx={{ maxWidth: 620, p: 5, borderRadius: 5, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 1.5 }}>پروژه پیدا نشد</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>{error || "اطلاعات این پروژه در دسترس نیست."}</Typography>
          <Button component={Link} href="/projects" variant="outlined">بازگشت به پروژه‌ها</Button>
        </LiquidGlass>
      </Box>
    );
  }

  const formattedDate = project.date
    ? toPersianNumber(moment(project.date).locale("fa").format("jMMMM jYYYY"))
    : "—";

  const openFullscreen = (index) => {
    setFullscreenData({ open: true, slides: fullscreenImages, initialIndex: index });
  };

  return (
    <Box ref={rootRef} sx={{ overflow: "hidden", bgcolor: "#070B12", color: "text.primary" }}>
      <Box component="section" sx={{ position: "relative", isolation: "isolate", minHeight: { xs: 900, md: 820 }, pt: { xs: 14, md: 14 }, pb: { xs: 9, md: 12 }, display: "flex", alignItems: "center" }}>
        <EnergyShaderBackground />
        <Box className="selected-projects-texture" aria-hidden />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(circle at 74% 45%, rgba(0,219,231,.1), transparent 30%), linear-gradient(180deg, transparent 48%, #070B12 100%)" }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs separator={<KeyboardArrowLeftRoundedIcon fontSize="small" />} className="hero-reveal hero-reveal-1" sx={{ mb: { xs: 4, md: 5 }, color: "text.secondary" }}>
            <Typography component={Link} href="/" color="inherit" sx={{ fontSize: ".82rem" }}>خانه</Typography>
            <Typography component={Link} href="/projects" color="inherit" sx={{ fontSize: ".82rem" }}>پروژه‌ها</Typography>
            <Typography sx={{ color: "primary.main", fontSize: ".82rem" }}>{project.name}</Typography>
          </Breadcrumbs>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, .9fr) minmax(500px, 1.1fr)" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
            <Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap className="hero-reveal hero-reveal-1" sx={{ mb: 3 }}>
                {(project.categories || []).map((category) => (
                  <Chip key={category._id} component={Link} href={`/projects?category=${category._id}`} clickable label={category.name} size="small" variant="outlined" sx={{ color: "primary.light", borderColor: "rgba(0,219,231,.26)", bgcolor: "rgba(0,219,231,.05)" }} />
                ))}
              </Stack>
              <Typography component="h1" variant="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "2.55rem", sm: "3.4rem", md: "4.75rem" }, lineHeight: 1.18, mb: 2.3 }}>
                {project.name}
              </Typography>
              <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ fontSize: { xs: "1rem", md: "1.14rem" }, lineHeight: 2.05, maxWidth: 690 }}>
                {project.excerpt || "اجرای تخصصی زیرساخت برق اضطراری با تمرکز بر پایداری، ایمنی و تداوم عملکرد."}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="hero-reveal hero-reveal-3" sx={{ mt: 4, alignItems: { xs: "stretch", sm: "center" } }}>
                <MagneticButton href="/contact" variant="contained" endIcon={<ArrowBackRoundedIcon />}>مشاوره پروژه مشابه</MagneticButton>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "text.secondary", px: 1 }}>
                  <VisibilityRoundedIcon sx={{ color: "primary.main", fontSize: 20 }} />
                  <Typography sx={{ fontSize: ".78rem" }}>{toPersianNumber(project.visits || 0)} بازدید</Typography>
                </Stack>
              </Stack>
            </Box>

            <ProjectGallery project={project} activeIndex={activeIndex} setActiveIndex={setActiveIndex} onOpen={openFullscreen} onPause={setPaused} />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: 2.2 }}>
            <MetadataCard icon={BusinessRoundedIcon} label="کارفرما" value={project.customer} />
            <MetadataCard icon={LocationOnRoundedIcon} label="موقعیت پروژه" value={project.location} />
            <MetadataCard icon={ScheduleRoundedIcon} label="مدت زمان تحویل" value={project.deliveryDate ? `${project.deliveryDate} روز` : "—"} />
            <MetadataCard icon={CalendarMonthRoundedIcon} label="تاریخ اجرا" value={formattedDate} />
          </Box>
        </Box>

        <Box component="section" sx={{ py: { xs: 8, md: 12 }, borderTop: "1px solid rgba(143,183,255,.07)" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" }, gap: { xs: 4, md: 8 }, alignItems: "start" }}>
            <Box className="project-page-reveal" sx={{ position: { md: "sticky" }, top: { md: 120 } }}>
              <Typography sx={{ color: "primary.main", fontFamily: "monospace", letterSpacing: ".14em", mb: 1.4 }}>PROJECT STORY</Typography>
              <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.1rem", md: "3.2rem" }, mb: 2 }}>جزئیات پروژه</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 2 }}>شرح دامنه اجرا، تصمیم‌های فنی و راهکار پیاده‌سازی‌شده در این پروژه.</Typography>
              {(project.brands?.length || project.tags?.length) > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
                  {(project.brands || []).map((brand) => <Chip key={brand._id} label={brand.name} size="small" variant="outlined" />)}
                  {(project.tags || []).map((tag) => <Chip key={tag._id} label={tag.name} size="small" />)}
                </Stack>
              )}
            </Box>
            <LiquidGlass className="project-page-reveal" intensity="medium" sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, minHeight: 260 }}>
              {project.description ? (
                <Box className="project-rich-content" dangerouslySetInnerHTML={{ __html: project.description }} />
              ) : (
                <Typography color="text.secondary" sx={{ lineHeight: 2 }}>شرح تکمیلی برای این پروژه ثبت نشده است.</Typography>
              )}
            </LiquidGlass>
          </Box>
        </Box>

        {project.relatedProjects?.length > 0 && (
          <Box component="section" sx={{ py: { xs: 8, md: 12 }, borderTop: "1px solid rgba(143,183,255,.07)" }}>
            <Box className="project-page-reveal" sx={{ mb: 5 }}>
              <Typography sx={{ color: "primary.main", fontFamily: "monospace", letterSpacing: ".14em", mb: 1.2 }}>RELATED CASES</Typography>
              <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2rem", md: "3.1rem" } }}>پروژه‌های مرتبط</Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
              {project.relatedProjects.slice(0, 3).map((item, index) => <ProjectShowcaseCard key={item._id} project={item} index={index} compact />)}
            </Box>
          </Box>
        )}

        {project.relatedProducts?.length > 0 && (
          <Box component="section" sx={{ py: { xs: 8, md: 12 }, borderTop: "1px solid rgba(143,183,255,.07)" }}>
            <Box className="project-page-reveal" sx={{ mb: 5 }}>
              <Typography sx={{ color: "primary.main", fontFamily: "monospace", letterSpacing: ".14em", mb: 1.2 }}>EQUIPMENT</Typography>
              <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2rem", md: "3.1rem" } }}>تجهیزات مرتبط با پروژه</Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
              {project.relatedProducts.slice(0, 3).map((product, index) => (
                <SpotlightGlass key={product._id} component={Link} href={`/products/${product.slug}`} className="project-page-reveal" intensity="subtle" interactive sx={{ "--project-card-delay": `${index * 80}ms`, minHeight: 310, p: 3, borderRadius: 4, color: "inherit", display: "flex", alignItems: "flex-end" }}>
                  <Box component="img" src={setImagePath(product.media?.[0]?.path)} alt={product.name} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .42, filter: "brightness(.62)" }} />
                  <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 25%, rgba(5,9,15,.96))" }} />
                  <Box sx={{ position: "relative", zIndex: 2 }}>
                    <Typography component="h3" sx={{ fontSize: "1.25rem", fontWeight: 850, mb: 1 }}>{product.name}</Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "primary.main" }}><Typography sx={{ fontSize: ".78rem", fontWeight: 800 }}>مشاهده محصول</Typography><ArrowBackRoundedIcon fontSize="small" /></Stack>
                  </Box>
                </SpotlightGlass>
              ))}
            </Box>
          </Box>
        )}

        <Box component="section" sx={{ py: { xs: 9, md: 13 } }}>
          <LiquidGlass className="project-page-reveal" intensity="strong" sx={{ p: { xs: 4, md: 7 }, borderRadius: 6, textAlign: "center", background: "linear-gradient(135deg, rgba(0,219,231,.13), rgba(10,16,25,.78))" }}>
            <GridViewRoundedIcon sx={{ color: "primary.main", fontSize: 48, mb: 2 }} />
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2rem", md: "3.25rem" }, mb: 2 }}>پروژه بعدی می‌تواند پروژه شما باشد</Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 700, mx: "auto", lineHeight: 2, mb: 4 }}>برای بررسی نیاز زیرساخت، انتخاب راهکار و برآورد اولیه اجرای پروژه با تیم مهندسی گفتگو کنید.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" useFlexGap gap={2.5}>
              <MagneticButton href="/contact" variant="contained" endIcon={<ArrowBackRoundedIcon />}>درخواست مشاوره پروژه</MagneticButton>
              <MagneticButton href="/projects" variant="outlined">بازگشت به آرشیو پروژه‌ها</MagneticButton>
            </Stack>
          </LiquidGlass>
        </Box>
      </Container>

      {fullscreenData.open && (
        <FullscreenImage
          slides={fullscreenData.slides}
          initialSlide={fullscreenData.initialIndex}
          onClose={() => setFullscreenData({ open: false, slides: [], initialIndex: 0 })}
        />
      )}
    </Box>
  );
}
