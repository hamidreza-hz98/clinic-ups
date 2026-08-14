"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { cooperating_brands } from "@/constants/landing/brands";
import { faText, text } from "@/lib/landing/copy";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";

const values = [
  { icon: EngineeringRoundedIcon, title: "مهندسی پیش از فروش", description: "هر راهکار از شناخت دقیق بار، محیط و سطح حساسیت زیرساخت آغاز می‌شود." },
  { icon: ShieldRoundedIcon, title: "پشتیبانی مسئولانه", description: "همراهی فنی ما پس از نصب ادامه دارد تا تجهیزات در شرایط پایدار باقی بمانند." },
  { icon: VerifiedRoundedIcon, title: "تجربه چندبرندی", description: "دانش تعمیر و نگهداری طیف گسترده‌ای از برندهای اروپایی و آمریکایی." },
];

const milestones = [
  { number: "01", title: "شناخت مسئله", text: "تحلیل نیاز، شرایط شبکه و ریسک واقعی قطعی برق" },
  { number: "02", title: "طراحی راهکار", text: "انتخاب معماری و تجهیزات متناسب با توان و سطح پایداری" },
  { number: "03", title: "اجرا و پشتیبانی", text: "نصب، راه‌اندازی، پایش و نگهداری در چرخه عمر تجهیز" },
];

export default function AboutPageWrapper() {
  const rootRef = useRef(null);
  const [activeSector, setActiveSector] = useState(0);
  const activeGroup = cooperating_brands[activeSector];
  const totalPartners = useMemo(() => cooperating_brands.reduce((sum, group) => sum + group.companies.length, 0), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll(".about-page-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -5%" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={rootRef} sx={{ overflow: "hidden", bgcolor: "#070B12", color: "text.primary" }}>
      <Box component="section" sx={{ position: "relative", isolation: "isolate", minHeight: { xs: 790, md: 850 }, pt: { xs: 15, md: 17 }, pb: { xs: 9, md: 12 }, display: "flex", alignItems: "center" }}>
        <EnergyShaderBackground />
        <Box className="selected-projects-texture" aria-hidden />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(circle at 22% 44%, rgba(0,219,231,.13), transparent 30%), linear-gradient(180deg, transparent 50%, #070B12 100%)" }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
            <Box>
              <Chip icon={<HubRoundedIcon />} label="22 YEARS OF CONTINUOUS ENERGY" variant="outlined" className="hero-reveal hero-reveal-1" sx={{ mb: 3, direction: "ltr", color: "primary.light", borderColor: "rgba(0,219,231,.28)", bgcolor: "rgba(0,219,231,.055)", "& .MuiChip-icon": { color: "primary.main" } }} />
              <Typography component="h1" variant="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "3rem", sm: "4rem", md: "5.8rem" }, lineHeight: 1.12, mb: 2.5 }}>
                مهندسی اعتماد،
                <Box component="span" sx={{ display: "block", color: "primary.main" }}>پیش از روشن‌ماندن برق</Box>
              </Typography>
              <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ maxWidth: 780, fontSize: { xs: "1rem", md: "1.16rem" }, lineHeight: 2.05 }}>
                {text("about_banner_sub_text")}؛ داستان تیمی متخصص که بیش از دو دهه برای پایداری زیرساخت‌های حساس کشور کار کرده است.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} className="hero-reveal hero-reveal-3" sx={{ mt: 4 }}>
                <MagneticButton href="/contact" variant="contained" endIcon={<ArrowBackRoundedIcon />}>گفتگو با تیم ما</MagneticButton>
                <Button component={Link} href="/projects" variant="outlined">مشاهده پروژه‌ها</Button>
              </Stack>
            </Box>

            <Box className="about-orbit-stage hero-reveal hero-reveal-2">
              <Box className="about-orbit-ring is-one" aria-hidden />
              <Box className="about-orbit-ring is-two" aria-hidden />
              <Box className="about-orbit-particle is-one" aria-hidden />
              <Box className="about-orbit-particle is-two" aria-hidden />
              <SpotlightGlass intensity="strong" className="about-hero-image-shell" sx={{ borderRadius: 7, p: 1.2 }}>
                <Box sx={{ display: "contents" }}>
                  <Box component="img" src="/images/static/office_in_night.webp" alt="تیم کلینیک یو پی اس" sx={{ position: "absolute", inset: 9, width: "calc(100% - 18px)", height: "calc(100% - 18px)", objectFit: "cover", borderRadius: 6, filter: "saturate(.65) brightness(.62)" }} />
                  <Box sx={{ position: "absolute", inset: 9, borderRadius: 6, background: "linear-gradient(180deg, transparent 35%, rgba(4,8,14,.93))" }} />
                  <Box sx={{ position: "absolute", right: 28, bottom: 26 }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "3.2rem", lineHeight: 1 }}>22+</Typography><Typography color="text.secondary" sx={{ fontSize: ".78rem" }}>سال تجربه تخصصی</Typography></Box>
                </Box>
              </SpotlightGlass>
              <LiquidGlass className="about-floating-stat is-partners" intensity="strong"><Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "1.45rem" }}>{totalPartners.toLocaleString("fa-IR")}+</Typography><Typography sx={{ fontSize: ".65rem", color: "text.secondary" }}>همکاری سازمانی</Typography></LiquidGlass>
              <LiquidGlass className="about-floating-stat is-support" intensity="strong"><BoltRoundedIcon sx={{ color: "primary.main", fontSize: 22 }} /><Typography sx={{ fontSize: ".67rem", color: "text.secondary" }}>پشتیبانی سراسری</Typography></LiquidGlass>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "#0A0F17", borderTop: "1px solid rgba(143,183,255,.08)" }}>
        <Box className="about-section-grid" aria-hidden />
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" }, gap: { xs: 5, lg: 8 }, alignItems: "start" }}>
            <Box className="about-page-reveal" sx={{ position: { lg: "sticky" }, top: { lg: 120 } }}>
              <Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>OUR STORY / SINCE 2004</Typography>
              <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.45rem", md: "3.7rem" }, mb: 2 }}>{text("about_heading")}</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 2.15, textAlign: "justify" }}>{text("about_description")}</Typography>
            </Box>

            <Stack spacing={2.5}>
              {values.map(({ icon: Icon, title, description }, index) => (
                <SpotlightGlass key={title} intensity="medium" interactive className="about-page-reveal" sx={{ "--about-reveal-delay": `${index * 90}ms`, p: { xs: 3, md: 4 }, borderRadius: 5 }}>
                  <Stack direction="row" spacing={2.5} alignItems="flex-start"><Box sx={{ flex: "0 0 auto", width: 54, height: 54, display: "grid", placeItems: "center", borderRadius: 3, color: "primary.main", bgcolor: "rgba(0,219,231,.08)", border: "1px solid rgba(0,219,231,.18)" }}><Icon sx={{ fontSize: 28 }} /></Box><Box><Typography component="h3" variant="h5" sx={{ mb: 1 }}>{title}</Typography><Typography color="text.secondary" sx={{ lineHeight: 2 }}>{description}</Typography></Box></Stack>
                </SpotlightGlass>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "#070B12" }}>
        <Container maxWidth="xl">
          <Box className="about-page-reveal" sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}><Chip icon={<TimelineRoundedIcon />} label="روش کار ما" variant="outlined" sx={{ mb: 2, color: "primary.light", borderColor: "rgba(0,219,231,.25)" }} /><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.6rem" }, mb: 1.5 }}>از مسئله تا پایداری</Typography><Typography color="text.secondary">سه مرحله متصل، یک مسئولیت مشترک</Typography></Box>
          <Box className="about-process-track">
            {milestones.map((item, index) => (
              <SpotlightGlass key={item.number} intensity="medium" interactive className="about-process-card about-page-reveal" sx={{ "--about-reveal-delay": `${index * 110}ms`, p: 3.5, borderRadius: 5 }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "2.3rem", lineHeight: 1, mb: 3 }}>{item.number}</Typography><Typography component="h3" variant="h5" sx={{ mb: 1 }}>{item.title}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.95 }}>{item.text}</Typography></SpotlightGlass>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "#0A0F17", borderTop: "1px solid rgba(143,183,255,.08)" }}>
        <Box className="about-section-grid" aria-hidden />
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box className="about-page-reveal" sx={{ maxWidth: 850, mb: { xs: 5, md: 7 } }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>TRUST NETWORK</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.7rem" }, mb: 2 }}>{text("about_cooperating_brands_heading")}</Typography><Typography color="text.secondary" sx={{ lineHeight: 2 }}>{text("about_cooperating_brands_description")}</Typography></Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "330px minmax(0, 1fr)" }, gap: 3, alignItems: "stretch" }}>
            <Stack className="about-page-reveal" spacing={1.2} role="tablist" aria-label="گروه‌های همکار">
              {cooperating_brands.map((group, index) => {
                const Icon = group.icon;
                const active = activeSector === index;
                return <Button key={faText(group.category)} role="tab" aria-selected={active} onClick={() => setActiveSector(index)} startIcon={Icon ? <Icon /> : <PublicRoundedIcon />} sx={{ justifyContent: "flex-start", textAlign: "right", px: 2.2, py: 1.7, borderRadius: 3, color: active ? "primary.main" : "text.secondary", bgcolor: active ? "rgba(0,219,231,.1)" : "rgba(255,255,255,.025)", border: `1px solid ${active ? "rgba(0,219,231,.25)" : "rgba(255,255,255,.07)"}`, "&:hover": { bgcolor: "rgba(0,219,231,.07)" } }}>{faText(group.category)}</Button>;
              })}
            </Stack>

            <SpotlightGlass key={activeSector} intensity="strong" className="about-sector-panel" role="tabpanel" sx={{ p: { xs: 3, md: 4.5 }, borderRadius: 5, minHeight: 430 }}>
              <Box sx={{ display: "contents" }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 4 }}><Box><Typography component="h3" variant="h4" sx={{ mb: .6 }}>{faText(activeGroup.category)}</Typography><Typography color="text.secondary" sx={{ fontSize: ".8rem" }}>{activeGroup.companies.length.toLocaleString("fa-IR")} مجموعه همکار</Typography></Box><HubRoundedIcon sx={{ color: "primary.main", fontSize: 38 }} /></Stack>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>{activeGroup.companies.map((company, index) => <Chip key={`${faText(company)}-${index}`} label={faText(company)} variant="outlined" className="about-company-chip" />)}</Box>
              </Box>
            </SpotlightGlass>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 9, md: 13 }, bgcolor: "#070B12" }}><Container maxWidth="lg"><LiquidGlass intensity="strong" className="about-page-reveal" sx={{ p: { xs: 3.5, md: 6 }, borderRadius: 6, textAlign: "center" }}><PublicRoundedIcon sx={{ color: "primary.main", fontSize: 48, mb: 2 }} /><Typography component="h2" variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 1.5 }}>پایداری پروژه بعدی را با هم طراحی کنیم</Typography><Typography color="text.secondary" sx={{ maxWidth: 680, mx: "auto", lineHeight: 2, mb: 3.5 }}>از ارزیابی اولیه تا انتخاب، اجرا و نگهداری راهکار برق اضطراری در کنار شما هستیم.</Typography><MagneticButton href="/contact" variant="contained" endIcon={<ArrowBackRoundedIcon />}>شروع گفتگو</MagneticButton></LiquidGlass></Container></Box>
    </Box>
  );
}
