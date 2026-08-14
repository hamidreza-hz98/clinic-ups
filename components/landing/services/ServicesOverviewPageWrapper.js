"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { chooseReasons } from "@/constants/landing/general";
import { faText, text } from "@/lib/landing/copy";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";
import { serviceCatalog } from "./serviceCatalog";

export default function ServicesOverviewPageWrapper() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = root.querySelectorAll(".service-page-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6%" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={rootRef} sx={{ overflow: "hidden", bgcolor: "#070B12", color: "text.primary" }}>
      <Box
        component="section"
        sx={{
          position: "relative",
          isolation: "isolate",
          minHeight: { xs: 690, md: 740 },
          pt: { xs: 15, md: 18 },
          pb: { xs: 10, md: 13 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <EnergyShaderBackground />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "radial-gradient(circle at 77% 46%, rgba(0,219,231,.12), transparent 30%), linear-gradient(180deg, transparent 45%, #070B12 100%)",
          }}
        />
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "8fr 4fr" }, gap: { xs: 5, md: 9 }, alignItems: "end" }}>
            <Box>
              <Chip
                icon={<HubRoundedIcon />}
                label="چرخه کامل خدمات انرژی"
                variant="outlined"
                className="hero-reveal hero-reveal-1"
                sx={{ mb: 3, color: "primary.light", borderColor: "rgba(0,219,231,.28)", bgcolor: "rgba(0,219,231,.055)", "& .MuiChip-icon": { color: "primary.main" } }}
              />
              <Typography
                component="h1"
                variant="h1"
                className="hero-reveal hero-reveal-2"
                sx={{ fontSize: { xs: "2.75rem", sm: "3.6rem", md: "5.6rem" }, lineHeight: 1.14, mb: 2.5 }}
              >
                خدمات تخصصی برای
                <Box component="span" sx={{ display: "block", color: "primary.main" }}>
                  پایداری بی‌وقفه انرژی
                </Box>
              </Typography>
              <Typography
                color="text.secondary"
                className="hero-reveal hero-reveal-3"
                sx={{ maxWidth: 760, fontSize: { xs: "1rem", md: "1.16rem" }, lineHeight: 2.05 }}
              >
                {text("services_description")}
              </Typography>
            </Box>

            <LiquidGlass
              className="hero-reveal hero-reveal-3"
              intensity="strong"
              sx={{ p: { xs: 3, md: 4 }, borderRadius: 5 }}
            >
              <Typography sx={{ color: "primary.main", fontFamily: "monospace", fontSize: "3.5rem", lineHeight: 1 }}>
                04
              </Typography>
              <Typography sx={{ fontWeight: 800, mt: 1 }}>خدمت محوری، یک چرخه کامل</Typography>
              <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.9 }}>
                از تحلیل و طراحی تا تأمین، تعمیر و پشتیبانی بلندمدت زیرساخت شما.
              </Typography>
            </LiquidGlass>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box component="section" sx={{ py: { xs: 8, md: 13 } }}>
          <Box className="service-page-reveal" sx={{ maxWidth: 760, mb: { xs: 5, md: 8 } }}>
            <Typography sx={{ color: "primary.main", fontFamily: "monospace", letterSpacing: ".14em", mb: 1.4 }}>
              CORE SERVICES
            </Typography>
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.6rem" }, mb: 1.5 }}>
              {text("services_heading")}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 2 }}>
              چهار مسیر تخصصی که در کنار هم، چرخه عمر کامل سیستم‌های برق اضطراری را پوشش می‌دهند.
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 3 }}>
            {serviceCatalog.map((service, index) => {
              const { Icon } = service;
              return (
                <SpotlightGlass
                  key={service.href}
                  component={Link}
                  href={service.href}
                  className="service-page-reveal"
                  intensity="medium"
                  interactive
                  sx={{
                    "--service-reveal-delay": `${index * 100}ms`,
                    minHeight: { xs: 430, md: 500 },
                    borderRadius: 5,
                    color: "inherit",
                    display: "flex",
                    alignItems: "flex-end",
                    p: { xs: 3, md: 4.5 },
                  }}
                >
                  <Box component="img" src={service.image} alt={service.title} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .42, filter: "grayscale(.65) brightness(.65)", transition: "transform .9s cubic-bezier(.2,.8,.2,1), filter .6s ease", ".MuiBox-root:hover > &": { transform: "scale(1.055)", filter: "grayscale(0) brightness(.72)" } }} />
                  <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,10,16,.1), rgba(6,10,16,.38) 42%, rgba(6,10,16,.98) 92%)" }} />
                  <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
                    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 4 }}>
                      <Box sx={{ width: 58, height: 58, display: "grid", placeItems: "center", borderRadius: 3, color: service.color, bgcolor: "rgba(5,11,18,.62)", border: `1px solid color-mix(in srgb, ${service.color} 30%, transparent)`, backdropFilter: "blur(12px)" }}>
                        <Icon sx={{ fontSize: 34 }} />
                      </Box>
                      <Box sx={{ textAlign: "left" }}>
                        <Typography sx={{ color: service.color, fontFamily: "monospace", fontSize: "2rem", lineHeight: 1 }}>
                          {service.number}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: ".67rem", letterSpacing: ".1em" }}>
                          {service.eyebrow}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography component="h3" sx={{ fontSize: { xs: "1.7rem", md: "2.1rem" }, fontWeight: 900, mb: 1.5 }}>
                      {service.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 610, lineHeight: 2 }}>
                      {service.description}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 3, color: service.color }}>
                      <Typography sx={{ fontSize: ".84rem", fontWeight: 800 }}>مشاهده جزئیات خدمت</Typography>
                      <ArrowBackRoundedIcon fontSize="small" />
                    </Stack>
                  </Box>
                </SpotlightGlass>
              );
            })}
          </Box>
        </Box>

        <Box component="section" sx={{ py: { xs: 8, md: 12 }, borderTop: "1px solid rgba(143,183,255,.07)" }}>
          <Box className="service-page-reveal" sx={{ textAlign: "center", maxWidth: 740, mx: "auto", mb: 7 }}>
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.15rem", md: "3.45rem" }, mb: 1.5 }}>
              {text("services_why_choose_us")}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 2 }}>
              ترکیب تجربه فنی، پشتیبانی واقعی و تجهیزات معتبر برای کاهش ریسک زیرساخت‌های حساس.
            </Typography>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
            {chooseReasons.map((item, index) => (
              <SpotlightGlass key={faText(item.title)} className="service-page-reveal" intensity="subtle" sx={{ "--service-reveal-delay": `${index * 100}ms`, p: 4, borderRadius: 4, textAlign: "center" }}>
                <Box component={item.icon} sx={{ color: "primary.main", fontSize: 42, mb: 2 }} />
                <Typography component="h3" sx={{ fontSize: "1.2rem", fontWeight: 800, mb: 1.2 }}>
                  {faText(item.title)}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
                  {faText(item.description)}
                </Typography>
              </SpotlightGlass>
            ))}
          </Box>
        </Box>

        <Box component="section" sx={{ py: { xs: 9, md: 13 } }}>
          <LiquidGlass className="service-page-reveal" intensity="strong" sx={{ p: { xs: 4, md: 7 }, borderRadius: 6, textAlign: "center", background: "linear-gradient(135deg, rgba(0,219,231,.13), rgba(10,16,25,.78))" }}>
            <SupportAgentRoundedIcon sx={{ color: "primary.main", fontSize: 52, mb: 2 }} />
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2rem", md: "3.3rem" }, mb: 2 }}>
              از کدام مسیر شروع کنیم؟
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 700, mx: "auto", lineHeight: 2, mb: 4 }}>
              {text("services_contact")}
            </Typography>
            <MagneticButton href="/contact" variant="contained" endIcon={<ArrowBackRoundedIcon />}>
              دریافت مشاوره رایگان
            </MagneticButton>
          </LiquidGlass>
        </Box>
      </Container>
    </Box>
  );
}
