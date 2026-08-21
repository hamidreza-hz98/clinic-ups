"use client";

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { SocialIcon } from "react-social-icons";
import { contactItems, socialMediaItems } from "@/constants/landing/general";
import { faText, text } from "@/lib/landing/copy";
import { submitContact } from "@/app/actions/contact";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import SpotlightGlass from "../ui/SpotlightGlass";

const initialForm = { fullName: "", mobile: "", message: "" };

export default function ContactPageWrapper() {
  const rootRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll(".contact-page-reveal");
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

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (status) setStatus(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    const response = await submitContact(form);
    const hasError = Boolean(response?.status);
    setStatus({ error: hasError, message: response?.message || (hasError ? "ارسال پیام ممکن نشد." : "پیام شما ثبت شد.") });
    if (!hasError) setForm(initialForm);
    setLoading(false);
  };

  return (
    <Box ref={rootRef} sx={{ overflow: "hidden", bgcolor: "background.default", color: "text.primary" }}>
      <Box component="section" sx={{ position: "relative", isolation: "isolate", minHeight: { xs: 800, md: 850 }, pt: { xs: 15, md: 17 }, pb: { xs: 9, md: 12 }, display: "flex", alignItems: "center" }}>
        <EnergyShaderBackground />
        <Box className="selected-projects-texture" aria-hidden />
        <Box aria-hidden sx={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(circle at 72% 46%, rgba(var(--landing-accent-rgb),.13), transparent 31%), linear-gradient(180deg, transparent 50%, var(--landing-bg) 100%)" }} />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" }, gap: { xs: 6, md: 8 }, alignItems: "center" }}>
            <Box>
              <Chip icon={<SupportAgentRoundedIcon />} label="HUMAN SUPPORT / REAL ENGINEERS" variant="outlined" className="hero-reveal hero-reveal-1" sx={{ mb: 3, direction: "ltr", color: "primary.light", borderColor: "rgba(var(--landing-accent-rgb),.28)", bgcolor: "rgba(var(--landing-accent-rgb),.055)", "& .MuiChip-icon": { color: "primary.main" } }} />
              <Typography component="h1" variant="h1" className="hero-reveal hero-reveal-2" sx={{ fontSize: { xs: "3rem", sm: "4rem", md: "5.8rem" }, lineHeight: 1.13, mb: 2.5 }}>
                یک ارتباط،
                <Box component="span" sx={{ display: "block", color: "primary.main" }}>تا راهکار پایدار</Box>
              </Typography>
              <Typography color="text.secondary" className="hero-reveal hero-reveal-3" sx={{ maxWidth: 760, fontSize: { xs: "1rem", md: "1.16rem" }, lineHeight: 2.05 }}>{text("contact_banner_sub_text")} {text("contact_description")}</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={{ xs: 2, sm: 3 }} className="hero-reveal hero-reveal-3" sx={{ mt: 4 }}>
                <Button component="a" href={contactItems[0]?.address} variant="contained" startIcon={<CallRoundedIcon />}>تماس فوری با کارشناس</Button>
                <Button component="a" href="#contact-form" variant="outlined" endIcon={<ArrowBackRoundedIcon />}>ارسال درخواست</Button>
              </Stack>
            </Box>

            <Box className="contact-signal-stage hero-reveal hero-reveal-2">
              <Box className="contact-signal-orbit is-one" aria-hidden />
              <Box className="contact-signal-orbit is-two" aria-hidden />
              <Box className="contact-signal-line is-one" aria-hidden />
              <Box className="contact-signal-line is-two" aria-hidden />
              <Box className="contact-signal-line is-three" aria-hidden />
              <LiquidGlass intensity="strong" className="contact-signal-core"><Box className="contact-signal-core-glow" aria-hidden /><SupportAgentRoundedIcon sx={{ fontSize: 54, color: "primary.main", position: "relative", zIndex: 1 }} /><Typography sx={{ position: "relative", zIndex: 1, fontWeight: 850, mt: 1 }}>مرکز ارتباط</Typography><Typography sx={{ position: "relative", zIndex: 1, color: "text.secondary", fontSize: ".7rem" }}>ONLINE / 24H</Typography></LiquidGlass>
              {contactItems.slice(0, 5).map((item, index) => {
                const Icon = item.icon;
                return <SpotlightGlass key={item.id} component="a" href={item.address} target={item.target} rel="noreferrer" interactive intensity="medium" className={`contact-signal-node is-${index + 1}`} aria-label={faText(item.name)} sx={{ borderRadius: 3.5, color: "inherit" }}><Box sx={{ display: "contents" }}><Icon size={22} /><Typography sx={{ fontSize: ".67rem", color: "text.secondary", mt: .7, whiteSpace: "nowrap" }}>{faText(item.name)}</Typography></Box></SpotlightGlass>;
              })}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "background.paper", borderTop: "1px solid rgba(var(--landing-secondary-rgb),.08)" }}>
        <Box className="contact-section-grid" aria-hidden />
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box className="contact-page-reveal" sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>CHOOSE YOUR CHANNEL</Typography><Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.7rem" }, mb: 1.5 }}>{text("contact_contact_info")}</Typography><Typography color="text.secondary">از سریع‌ترین مسیر مناسب خود با تیم ما در تماس باشید</Typography></Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return <SpotlightGlass key={item.id} component="a" href={item.address} target={item.target} rel="noreferrer" intensity="medium" interactive className="contact-page-reveal" sx={{ "--contact-reveal-delay": `${index * 70}ms`, p: 3, minHeight: 190, borderRadius: 4.5, color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}><Box sx={{ display: "contents" }}><Box sx={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 3, color: "primary.main", bgcolor: "rgba(var(--landing-accent-rgb),.08)", border: "1px solid rgba(var(--landing-accent-rgb),.18)" }}><Icon size={24} /></Box><Box><Typography sx={{ fontWeight: 800, overflowWrap: "anywhere" }}>{faText(item.name)}</Typography><Stack direction="row" alignItems="center" spacing={.6} sx={{ color: "primary.main", mt: 1 }}><Typography sx={{ fontSize: ".68rem" }}>اتصال مستقیم</Typography><ArrowBackRoundedIcon sx={{ fontSize: 16 }} /></Stack></Box></Box></SpotlightGlass>;
            })}
          </Box>

          <Stack direction="row" justifyContent="center" useFlexGap gap={2.5} flexWrap="wrap" className="contact-page-reveal" sx={{ mt: 4 }}>
            {socialMediaItems.map((social) => <LiquidGlass key={social.id} component="a" href={social.address} target="_blank" rel="noreferrer" interactive intensity="subtle" sx={{ minWidth: { xs: "min(100%, 210px)", sm: 210 }, px: 2.5, py: 1.5, borderRadius: 99, color: "inherit", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}><SocialIcon network={social.id} style={{ width: 28, height: 28 }} as="span" /><Typography sx={{ fontSize: ".8rem" }}>{faText(social.name)}</Typography></LiquidGlass>)}
          </Stack>
        </Container>
      </Box>

      <Box component="section" id="contact-form" sx={{ position: "relative", py: { xs: 9, md: 14 }, bgcolor: "background.default", scrollMarginTop: 100 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" }, gap: { xs: 5, lg: 6 }, alignItems: "stretch" }}>
            <Box className="contact-page-reveal">
              <Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".12em", fontSize: ".7rem", mb: 1 }}>START A CONVERSATION</Typography>
              <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.45rem", md: "3.75rem" }, mb: 2 }}>مسئله را برای ما تعریف کنید</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 2, mb: 4 }}>کارشناسان ما پس از بررسی درخواست، برای تکمیل اطلاعات و پیشنهاد مسیر مناسب با شما تماس می‌گیرند.</Typography>
              <Stack spacing={2}>
                {[{ icon: SmartphoneRoundedIcon, title: "پاسخ‌گویی سریع", text: "هماهنگی اولیه از طریق شماره موبایل شما" }, { icon: BoltRoundedIcon, title: "بررسی تخصصی", text: "تحلیل درخواست توسط کارشناسان برق اضطراری" }, { icon: ForumRoundedIcon, title: "گفتگوی شفاف", text: "ارائه مسیر پیشنهادی متناسب با نیاز واقعی" }].map(({ icon: Icon, title, text: itemText }) => <LiquidGlass key={title} intensity="subtle" sx={{ p: 2.2, borderRadius: 3.5 }}><Stack direction="row" spacing={2} alignItems="center"><Icon sx={{ color: "primary.main" }} /><Box><Typography sx={{ fontWeight: 800, mb: .3 }}>{title}</Typography><Typography color="text.secondary" sx={{ fontSize: ".78rem" }}>{itemText}</Typography></Box></Stack></LiquidGlass>)}
              </Stack>
            </Box>

            <SpotlightGlass component="form" onSubmit={submit} intensity="strong" className="contact-page-reveal contact-form-panel" sx={{ p: { xs: 3, sm: 4, md: 5 }, borderRadius: 6 }}>
              <Box sx={{ display: "contents" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}><Box><Typography sx={{ color: "primary.main", fontFamily: "monospace", direction: "ltr", letterSpacing: ".11em", fontSize: ".67rem" }}>MESSAGE TERMINAL</Typography><Typography component="h3" variant="h4" sx={{ mt: .8 }}>ارسال پیام</Typography></Box><SendRoundedIcon sx={{ color: "primary.main", fontSize: 34 }} /></Stack>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 2.2 }}>
                  <TextField className="contact-form-field" required fullWidth label="نام و نام خانوادگی" value={form.fullName} onChange={updateField("fullName")} autoComplete="name" slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonOutlineRoundedIcon color="primary" /></InputAdornment> } }} />
                  <TextField className="contact-form-field" required fullWidth label="شماره موبایل" value={form.mobile} onChange={updateField("mobile")} type="tel" inputMode="tel" autoComplete="tel" slotProps={{ input: { startAdornment: <InputAdornment position="start"><SmartphoneRoundedIcon color="primary" /></InputAdornment> } }} />
                  <TextField className="contact-form-field" required fullWidth multiline minRows={6} label="پیام شما" value={form.message} onChange={updateField("message")} sx={{ gridColumn: { sm: "span 2" } }} slotProps={{ input: { startAdornment: <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}><AlternateEmailRoundedIcon color="primary" /></InputAdornment> } }} />
                </Box>
                {status?.message && <Alert severity={status.error ? "error" : "success"} variant="outlined" sx={{ mt: 2.5, borderRadius: 3 }}>{status.message}</Alert>}
                <Button type="submit" variant="contained" size="large" disabled={loading} endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />} sx={{ mt: 3, minWidth: 190 }}>{loading ? "در حال ارسال" : "ارسال پیام"}</Button>
              </Box>
            </SpotlightGlass>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ position: "relative", pb: { xs: 10, md: 14 }, bgcolor: "background.default" }}>
        <Container maxWidth="xl">
          <SpotlightGlass intensity="strong" className="contact-map-shell contact-page-reveal" sx={{ p: 1.2, borderRadius: 6 }}>
            <Box sx={{ display: "contents" }}>
              <Box component="iframe" src="https://www.google.com/maps?q=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D9%85%DB%8C%D8%B1%D8%B2%D8%A7%DB%8C%20%D8%B4%DB%8C%D8%B1%D8%A7%D8%B2%DB%8C%D8%8C%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D8%B9%D8%B1%D9%81%D8%A7%D9%86%D8%8C%20%D9%BE%D9%84%D8%A7%DA%A9%209%D8%8C%20%D9%88%D8%A7%D8%AD%D8%AF%202&output=embed" title="موقعیت شرکت کلینیک یو پی اس در خیابان میرزای شیرازی" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" sx={{ width: "100%", height: { xs: 420, md: 560 }, display: "block", border: 0, borderRadius: 5, filter: "grayscale(.72) invert(.9) hue-rotate(165deg) brightness(.72) contrast(1.15)" }} />
              <LiquidGlass intensity="strong" sx={{ position: "absolute", right: { xs: 22, md: 34 }, left: { xs: 22, md: "auto" }, bottom: { xs: 22, md: 34 }, width: { md: 390 }, p: 3, borderRadius: 4.5 }}><Stack direction="row" spacing={2} alignItems="flex-start"><Box sx={{ width: 48, height: 48, flex: "0 0 auto", display: "grid", placeItems: "center", borderRadius: 3, bgcolor: "rgba(var(--landing-accent-rgb),.09)", color: "primary.main" }}><LocationOnRoundedIcon /></Box><Box><Typography component="h2" variant="h5" sx={{ mb: 1 }}>{text("contact_company_location")}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>{text("contact_address")}</Typography></Box></Stack></LiquidGlass>
            </Box>
          </SpotlightGlass>
        </Container>
      </Box>
    </Box>
  );
}
