"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmergencyRoundedIcon from "@mui/icons-material/EmergencyRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { contactItems } from "@/constants/landing/general";
import { faText } from "@/lib/landing/copy";
import { setImagePath } from "@/lib/landing/general";
import ProjectShowcaseCard from "../projects/ProjectShowcaseCard";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";

const audiences = [
  { icon: LocalHospitalRoundedIcon, title: "بیمارستان‌ها", text: "تداوم برق تجهیزات حیاتی، اتاق عمل و زیرساخت درمان" },
  { icon: MedicalServicesRoundedIcon, title: "کلینیک‌ها", text: "حفاظت از تجهیزات تشخیصی و تداوم خدمت‌رسانی" },
  { icon: ScienceRoundedIcon, title: "آزمایشگاه‌ها", text: "پایداری دستگاه‌های حساس و جلوگیری از توقف فرآیند" },
  { icon: BiotechRoundedIcon, title: "مراکز تحقیقاتی", text: "برق پاک و قابل‌اعتماد برای سامانه‌های دقیق و داده‌ها" },
];

const accents = ["var(--landing-accent)", "#ff9c87", "var(--landing-secondary)", "#57e39b", "#ffd06f", "#c8a7ff"];

function ExhibitionCategoryCard({ category, index }) {
  const accent = accents[index % accents.length];
  return (
    <SpotlightGlass component={Link} href={`/products?category=${category._id}`} interactive intensity="medium" className="exhibition-page-reveal exhibition-category-card" sx={{ "--exhibition-delay": `${index * 80}ms`, minHeight: 360, borderRadius: 5, color: "inherit", display: "flex", alignItems: "flex-end" }}>
      <Box sx={{ display: "contents" }}>
        <Box component="img" src={setImagePath(category.icon?.path)} alt={category.icon?.mediaAlt || category.name} loading="lazy" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .54, filter: "grayscale(.55) brightness(.62) saturate(.78)", transition: "transform .8s ease, filter .5s ease, opacity .5s ease" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 20%, rgba(5,9,15,.98) 90%)" }} />
        <Box className="exhibition-category-scan" aria-hidden style={{ "--category-accent": accent }} />
        <Box sx={{ position: "relative", zIndex: 2, width: "100%", p: 3 }}><Typography sx={{ color: accent, direction: "ltr", fontFamily: "monospace", fontSize: ".68rem", letterSpacing: ".1em", mb: 1 }}>MEDICAL POWER / 0{index + 1}</Typography><Typography component="h3" variant="h4" sx={{ fontSize: "1.55rem", mb: 1 }}>{category.name}</Typography><Typography color="text.secondary" sx={{ fontSize: ".8rem", lineHeight: 1.85, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{category.excerpt || "راهکار تخصصی برای پایداری انرژی تجهیزات حساس مراکز درمانی"}</Typography><Stack direction="row" alignItems="center" spacing={.8} sx={{ color: accent, mt: 2.2 }}><Typography sx={{ fontSize: ".72rem" }}>مشاهده محصولات</Typography><ArrowBackRoundedIcon sx={{ fontSize: 18 }} /></Stack></Box>
      </Box>
    </SpotlightGlass>
  );
}

export default function TehranExhibitionPage({ categories = [], projects = [] }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll(".exhibition-page-reveal, .project-showcase-card");
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

  const directContacts = [contactItems.find((item) => item.id === "mobile"), contactItems.find((item) => item.id === "whatsapp_chat"), contactItems.find((item) => item.id === "telegram_chat"), contactItems.find((item) => item.id === "email")].filter(Boolean);

  return (
    <Box ref={rootRef} className="tehran-exhibition-page" sx={{ overflow: "hidden", bgcolor: "background.default", color: "text.primary" }}>
      <Box component="section" sx={{ position: "relative", isolation: "isolate", minHeight: { xs: 900, md: 920 }, pt: { xs: 15, md: 17 }, pb: { xs: 10, md: 13 }, display: "flex", alignItems: "center" }}>
        <EnergyShaderBackground />
        <Box className="exhibition-hero-aurora" aria-hidden />
        <Box className="exhibition-medical-grid" aria-hidden />
        <Box className="exhibition-heartbeat" aria-hidden>
          <Box component="svg" viewBox="0 0 1200 180" preserveAspectRatio="none">
            <path className="phase-blue" d="M0 48 H260 L292 48 L320 10 L350 82 L382 30 L410 48 H1200" />
            <path className="phase-red" d="M0 92 H430 L462 92 L490 50 L522 126 L554 72 L584 92 H1200" />
            <path className="phase-yellow" d="M0 136 H610 L642 136 L670 96 L702 170 L734 116 L764 136 H1200" />
          </Box>
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" }, gap: { xs: 7, lg: 8 }, alignItems: "center" }}>
            <Box>
              <Stack direction="row" alignItems="center" useFlexGap gap={2} className="hero-reveal hero-reveal-1" sx={{ mb: 3 }}>
                <Box component="img" src="/images/exhibition/congress-quality-logo.png" alt="لوگوی کنگره ارتقای کیفیت خدمات آزمایشگاهی تشخیص پزشکی ایران" sx={{ width: { xs: 82, md: 108 }, aspectRatio: "1", objectFit: "contain", filter: "drop-shadow(0 12px 28px rgba(18,118,217,.3))" }} />
                <Chip icon={<HealthAndSafetyRoundedIcon />} label="17th INTERNATIONAL / 23rd NATIONAL CONGRESS" className="exhibition-live-chip" sx={{ direction: "ltr" }} />
              </Stack>
              <Typography component="h1" variant="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "3.2rem", sm: "4.4rem", md: "6.1rem" }, lineHeight: 1.08, mb: 2.6 }}>
                ارتقای کیفیت خدمات
                <Box component="span" sx={{ display: "block", color: "primary.main" }}>آزمایشگاهی تشخیص پزشکی ایران</Box>
              </Typography>
              <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ maxWidth: 820, fontSize: { xs: "1rem", md: "1.18rem" }, lineHeight: 2.08 }}>کلینیک یو پی اس در کنگره ارتقای کیفیت خدمات آزمایشگاهی تشخیص پزشکی ایران، راهکارهای برق اضطراری و حفاظت انرژی را برای آزمایشگاه‌ها، بیمارستان‌ها و مراکز تشخیصی معرفی می‌کند.</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={2.5} className="hero-reveal hero-reveal-3" sx={{ mt: 4.5 }}><MagneticButton href="#exhibition-solutions" variant="contained" endIcon={<ArrowBackRoundedIcon />}>کشف راهکارها</MagneticButton><Button component="a" href={contactItems[0]?.address} variant="outlined" startIcon={<CallRoundedIcon />}>ارتباط با تیم کنگره</Button></Stack>
              <Stack direction="row" spacing={2.5} useFlexGap flexWrap="wrap" className="hero-reveal hero-reveal-3" sx={{ mt: 4.5 }}>{["برق بدون وقفه", "حفاظت تجهیزات", "پشتیبانی تخصصی"].map((label) => <Stack key={label} direction="row" spacing={.8} alignItems="center"><Box className="exhibition-status-dot" /><Typography color="text.secondary" sx={{ fontSize: ".78rem" }}>{label}</Typography></Stack>)}</Stack>
            </Box>

            <Box className="exhibition-visual-stage hero-reveal hero-reveal-2">
              <Box className="exhibition-visual-orbit" aria-hidden />
              <SpotlightGlass intensity="strong" className="exhibition-main-frame" sx={{ borderRadius: 7, p: 1.1 }}><Box sx={{ display: "contents" }}><Box component="img" className="landing-top-banner-image" src="/images/exhibition/diagnostic-laboratory-hero.webp" alt="آزمایشگاه مدرن تشخیص پزشکی مجهز به سامانه برق پایدار" sx={{ position: "absolute", inset: 8, width: "calc(100% - 16px)", height: "calc(100% - 16px)", objectFit: "cover", borderRadius: 6 }} /><Box className="landing-top-banner-overlay" sx={{ position: "absolute", inset: 8, borderRadius: 6 }} /><Stack direction="row" alignItems="center" spacing={1} sx={{ position: "absolute", right: 27, bottom: 24 }}><EmergencyRoundedIcon sx={{ color: "primary.main" }} /><Box><Typography sx={{ fontWeight: 850 }}>توان اضطراری مراکز آزمایشگاهی</Typography><Typography color="text.secondary" sx={{ fontSize: ".68rem" }}>MISSION CRITICAL POWER</Typography></Box></Stack></Box></SpotlightGlass>
              <SpotlightGlass intensity="medium" className="exhibition-float-frame is-lab" sx={{ borderRadius: 4, p: .7 }}><Box component="img" src="/images/emergency-electricity/project-pooyesh-lab-aligoudarz/project-pooyesh-lab-aligoudarz-01.webp" alt="پروژه آزمایشگاهی کلینیک یو پی اس" /></SpotlightGlass>
              <LiquidGlass intensity="strong" className="exhibition-float-badge"><BoltRoundedIcon /><Box><Typography sx={{ fontWeight: 900, fontSize: ".8rem" }}>CLINIC UPS</Typography><Typography sx={{ color: "text.secondary", fontSize: ".58rem" }}>POWERING HEALTHCARE</Typography></Box></LiquidGlass>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "background.paper" }}><Box className="exhibition-medical-grid" aria-hidden /><Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" }, gap: { xs: 5, lg: 8 }, alignItems: "start" }}><Box className="exhibition-page-reveal" sx={{ position: { lg: "sticky" }, top: { lg: 120 } }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>WHO WE ARE / WHAT WE PROTECT</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.5rem", md: "3.8rem" }, mb: 2 }}>کلینیک یو پی اس؛ شریک پایداری مراکز آزمایشگاهی</Typography></Box><SpotlightGlass intensity="strong" className="exhibition-page-reveal" sx={{ p: { xs: 3, md: 5 }, borderRadius: 6 }}><Box sx={{ display: "contents" }}><Typography color="text.secondary" sx={{ fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 2.2, textAlign: "justify" }}>کلینیک یو پی اس با بیش از دو دهه تجربه تخصصی، در زمینه مشاوره، تأمین، نصب، راه‌اندازی و تعمیر سامانه‌های برق اضطراری فعالیت می‌کند. تمرکز ما بر طراحی راهکارهایی است که تجهیزات حساس پزشکی، آزمایشگاهی و فناوری اطلاعات را در برابر قطعی، افت ولتاژ و اختلالات شبکه محافظت کنند.</Typography><Typography color="text.secondary" sx={{ fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 2.2, textAlign: "justify", mt: 2.5 }}>در کنگره ارتقای کیفیت خدمات آزمایشگاهی تشخیص پزشکی ایران، مجموعه‌ای از یو پی اس‌ها، باتری‌ها، استابلایزرها و سامانه‌های مولد اضطراری را برای کاربردهای آزمایشگاهی و تشخیصی معرفی می‌کنیم؛ راهکارهایی که از ارزیابی نیاز تا اجرا و پشتیبانی فنی، متناسب با الزامات هر مرکز طراحی می‌شوند.</Typography></Box></SpotlightGlass></Box></Container></Box>

      <Box component="section" sx={{ py: { xs: 9, md: 14 }, bgcolor: "background.default" }}><Container maxWidth="xl"><Box className="exhibition-page-reveal" sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}><Typography sx={{ color: "#ff9c87", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>DESIGNED FOR HEALTHCARE</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.45rem", md: "3.7rem" }, mb: 1.5 }}>برای هر فضای حیاتی</Typography><Typography color="text.secondary">راهکارهایی متناسب با حساسیت، توان و فرآیند هر مرکز</Typography></Box><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 2.5 }}>{audiences.map(({ icon: Icon, title, text }, index) => <SpotlightGlass key={title} intensity="medium" interactive className="exhibition-page-reveal" sx={{ "--exhibition-delay": `${index * 90}ms`, p: 3.5, minHeight: 250, borderRadius: 5 }}><Box sx={{ width: 55, height: 55, display: "grid", placeItems: "center", borderRadius: 3, bgcolor: "rgba(var(--landing-accent-rgb),.08)", border: "1px solid rgba(var(--landing-accent-rgb),.18)", color: "primary.main", mb: 3 }}><Icon sx={{ fontSize: 29 }} /></Box><Typography component="h3" variant="h5" sx={{ mb: 1 }}>{title}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.95 }}>{text}</Typography></SpotlightGlass>)}</Box></Container></Box>

      <Box id="exhibition-solutions" component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "background.paper", scrollMarginTop: 100 }}><Box className="exhibition-medical-grid" aria-hidden /><Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "end" }} spacing={2} className="exhibition-page-reveal" sx={{ mb: { xs: 5, md: 7 } }}><Box><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>SOLUTION CATEGORIES</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.45rem", md: "3.7rem" }, mb: 1.5 }}>دسته‌بندی محصولات</Typography><Typography color="text.secondary">برای مشاهده مدل‌ها و مشخصات فنی، دسته موردنظر را انتخاب کنید</Typography></Box><Button component={Link} href="/products" endIcon={<ArrowBackRoundedIcon />}>همه محصولات</Button></Stack>{categories.length ? <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 2.5 }}>{categories.map((category, index) => <ExhibitionCategoryCard key={category._id} category={category} index={index} />)}</Box> : <LiquidGlass sx={{ p: 5, borderRadius: 5, textAlign: "center" }}><Button component={Link} href="/categories" variant="contained">مشاهده دسته‌بندی‌ها</Button></LiquidGlass>}</Container></Box>

      {projects.length > 0 && <Box component="section" sx={{ py: { xs: 9, md: 14 }, bgcolor: "background.default" }}><Container maxWidth="xl"><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "end" }} spacing={2} className="exhibition-page-reveal" sx={{ mb: { xs: 5, md: 7 } }}><Box><Typography sx={{ color: "#57e39b", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>LATEST DELIVERIES</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.45rem", md: "3.7rem" }, mb: 1.5 }}>آخرین پروژه‌های تحویل‌شده</Typography><Typography color="text.secondary">نمونه‌هایی از تجربه واقعی تیم در مراکز حساس</Typography></Box><Button component={Link} href="/projects" endIcon={<ArrowBackRoundedIcon />}>آرشیو پروژه‌ها</Button></Stack><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{projects.map((project, index) => <ProjectShowcaseCard key={project._id} project={project} index={index} compact />)}</Box></Container></Box>}

      <Box component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "background.paper" }}><Box className="exhibition-medical-grid" aria-hidden /><Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}><Box className="exhibition-page-reveal" sx={{ textAlign: "center", mb: 5 }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>DIRECT CONNECTION</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.6rem" }, mb: 1.5 }}>در نمایشگاه با ما در ارتباط باشید</Typography><Typography color="text.secondary">برای مشاوره، هماهنگی جلسه یا دریافت اطلاعات فنی</Typography></Box><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>{directContacts.map((item, index) => { const Icon = item.id === "whatsapp_chat" ? WhatsAppIcon : item.icon; return <SpotlightGlass key={item.id} component="a" href={item.address} target={item.target} rel="noreferrer" interactive className="exhibition-page-reveal" sx={{ "--exhibition-delay": `${index * 70}ms`, p: 3, minHeight: 170, borderRadius: 4.5, color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}><Box sx={{ display: "contents" }}><Icon size={26} sx={{ color: "primary.main", fontSize: 28 }} /><Box><Typography sx={{ fontWeight: 850, overflowWrap: "anywhere" }}>{faText(item.name)}</Typography><Typography sx={{ color: "primary.main", fontSize: ".68rem", mt: 1 }}>ارتباط مستقیم ←</Typography></Box></Box></SpotlightGlass>; })}</Box></Container></Box>

      <Box component="section" sx={{ py: { xs: 9, md: 14 }, bgcolor: "background.default" }}><Container maxWidth="xl"><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" }, gap: 3 }}><SpotlightGlass intensity="strong" className="exhibition-page-reveal exhibition-link-panel" sx={{ minHeight: 430, borderRadius: 6, p: { xs: 3.5, md: 5 }, display: "flex", alignItems: "flex-end" }}><Box sx={{ display: "contents" }}><Box component="img" src="/images/emergency-electricity/project-generator-swap-70kva/project-generator-swap-70kva-04.webp" alt="پروژه‌های موتور برق و ژنراتور" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .48, filter: "brightness(.55) saturate(.7)" }} /><Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent, rgba(4,8,14,.98))" }} /><Box sx={{ position: "relative", zIndex: 2 }}><Typography sx={{ color: "#ffb4a9", fontFamily: "monospace", direction: "ltr", fontSize: ".7rem", letterSpacing: ".1em", mb: 1 }}>GENERATOR FIELD ARCHIVE</Typography><Typography component="h2" variant="h3" sx={{ mb: 1.5 }}>پروژه‌های موتور برق و ژنراتور</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 3 }}>آرشیو تصویری نصب و اجرای سامانه‌های مولد اضطراری در مراکز درمانی و آزمایشگاهی.</Typography><Button component={Link} href="/generators-projects" variant="contained" endIcon={<ArrowBackRoundedIcon />}>مشاهده پروژه‌ها</Button></Box></Box></SpotlightGlass><SpotlightGlass intensity="strong" className="exhibition-page-reveal exhibition-link-panel" sx={{ minHeight: 430, borderRadius: 6, p: { xs: 3.5, md: 5 }, display: "flex", alignItems: "flex-end" }}><Box sx={{ display: "contents" }}><Box component="img" src="/images/static/office_in_night.webp" alt="درباره کلینیک یو پی اس" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .44, filter: "brightness(.55) saturate(.65)" }} /><Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent, rgba(4,8,14,.98))" }} /><Box sx={{ position: "relative", zIndex: 2 }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", fontSize: ".7rem", letterSpacing: ".1em", mb: 1 }}>22 YEARS OF EXPERIENCE</Typography><Typography component="h2" variant="h3" sx={{ mb: 1.5 }}>بیشتر درباره ما</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.9, mb: 3 }}>با تجربه، مسیر و شبکه همکاری کلینیک یو پی اس در سراسر کشور آشنا شوید.</Typography><Button component={Link} href="/about" variant="outlined" endIcon={<ArrowBackRoundedIcon />}>درباره کلینیک یو پی اس</Button></Box></Box></SpotlightGlass></Box></Container></Box>

      <Box component="section" sx={{ position: "relative", py: { xs: 10, md: 15 }, bgcolor: "background.paper", textAlign: "center" }}><Box className="exhibition-final-glow" aria-hidden /><Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}><HealthAndSafetyRoundedIcon className="exhibition-final-icon" sx={{ color: "primary.main", fontSize: 58, mb: 2 }} /><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.6rem", md: "4.4rem" }, mb: 2 }}>سلامت، به برق پایدار وابسته است</Typography><Typography color="text.secondary" sx={{ maxWidth: 720, mx: "auto", lineHeight: 2, mb: 4 }}>کلینیک یو پی اس؛ همراه مراکز درمانی برای حفاظت از تجهیزات، داده‌ها و تداوم خدمات حیاتی.</Typography><MagneticButton href="/contact" variant="contained" size="large" endIcon={<ArrowBackRoundedIcon />}>شروع یک گفتگوی تخصصی</MagneticButton></Container></Box>
    </Box>
  );
}
