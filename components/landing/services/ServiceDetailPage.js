"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import EnergyShaderBackground from "../ui/EnergyShaderBackground";
import LiquidGlass from "../ui/LiquidGlass";
import MagneticButton from "../ui/MagneticButton";
import SpotlightGlass from "../ui/SpotlightGlass";
import { serviceCatalog } from "./serviceCatalog";

function ServiceIcon({ icon: Icon, sx }) {
  if (!Icon) return <CheckCircleRoundedIcon sx={sx} />;
  return <Box component={Icon} sx={sx} />;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <Box className="service-page-reveal" sx={{ maxWidth: 760, mb: { xs: 4, md: 6 } }}>
      {eyebrow && (
        <Typography
          sx={{
            color: "var(--page-accent)",
            direction: "ltr",
            textAlign: "right",
            fontFamily: "monospace",
            fontSize: ".76rem",
            fontWeight: 800,
            letterSpacing: ".14em",
            mb: 1.4,
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography
        component="h2"
        variant="h2"
        sx={{ fontSize: { xs: "2rem", md: "3.15rem" }, mb: description ? 1.8 : 0 }}
      >
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ fontSize: { md: "1.06rem" }, lineHeight: 2 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

const serviceCtaImages = {
  design: {
    src: "/images/services/design-service-cta.png",
    alt: "میز طراحی سامانه برق و نقشه‌های مهندسی",
  },
  sales: {
    src: "/images/services/sales-service-cta.png",
    alt: "مشاوره و تأمین تجهیزات برق اضطراری",
  },
  repair: {
    src: "/images/services/repair-service-cta.png",
    alt: "تعمیر تخصصی و عیب‌یابی تجهیزات برق اضطراری",
  },
  "after-sales": {
    src: "/images/services/after-sales-service-cta.png",
    alt: "بازدید و پشتیبانی پس از فروش تجهیزات برق اضطراری",
  },
};

function CardsSection({ section }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" },
        gap: 3,
      }}
    >
      {section.items.map((item, index) => (
        <SpotlightGlass
          key={`${item.title}-${index}`}
          className="service-page-reveal"
          intensity="medium"
          sx={{
            "--service-reveal-delay": `${Math.min(index, 5) * 90}ms`,
            minHeight: 235,
            p: { xs: 3, md: 3.5 },
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              display: "grid",
              placeItems: "center",
              borderRadius: 2.5,
              mb: 3,
              color: "var(--page-accent)",
              bgcolor: "color-mix(in srgb, var(--page-accent) 9%, transparent)",
              border: "1px solid color-mix(in srgb, var(--page-accent) 22%, transparent)",
            }}
          >
            <ServiceIcon icon={item.icon} sx={{ fontSize: 28 }} />
          </Box>
          <Typography component="h3" sx={{ fontSize: "1.18rem", fontWeight: 800, mb: 1.2 }}>
            {item.title}
          </Typography>
          {item.description && (
            <Typography color="text.secondary" sx={{ lineHeight: 1.95 }}>
              {item.description}
            </Typography>
          )}
        </SpotlightGlass>
      ))}
    </Box>
  );
}

function StepsSection({ section }) {
  return (
    <Box sx={{ position: "relative", display: "grid", gap: 2.2 }}>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 28,
          bottom: 28,
          right: { xs: 25, md: "calc(16.666% - 1px)" },
          width: 1,
          bgcolor: "color-mix(in srgb, var(--page-accent) 24%, transparent)",
        }}
      />
      {section.items.map((item, index) => (
        <LiquidGlass
          key={`${item.title}-${index}`}
          className="service-page-reveal"
          intensity="subtle"
          sx={{
            "--service-reveal-delay": `${Math.min(index, 6) * 85}ms`,
            display: "grid",
            gridTemplateColumns: { xs: "52px minmax(0, 1fr)", md: "2fr 10fr" },
            gap: { xs: 2, md: 4 },
            alignItems: "center",
            p: { xs: 2.2, md: 3 },
            borderRadius: 3.5,
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: 48,
              height: 48,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              color: "#061015",
              bgcolor: "var(--page-accent)",
              fontFamily: "monospace",
              fontWeight: 900,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </Box>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 0.8 }}>
              <ServiceIcon icon={item.icon} sx={{ color: "var(--page-accent)", fontSize: 23 }} />
              <Typography component="h3" sx={{ fontSize: "1.08rem", fontWeight: 800 }}>
                {item.title}
              </Typography>
            </Stack>
            {item.description && (
              <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
                {item.description}
              </Typography>
            )}
          </Box>
        </LiquidGlass>
      ))}
    </Box>
  );
}

function ListSection({ section }) {
  return (
    <LiquidGlass
      className="service-page-reveal"
      intensity="strong"
      sx={{ p: { xs: 3, md: 5 }, borderRadius: 5 }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {section.items.map((item, index) => {
          const label = typeof item === "string" ? item : item.title || item.description;
          return (
            <Stack key={`${label}-${index}`} direction="row" alignItems="flex-start" spacing={1.4}>
              <CheckCircleRoundedIcon sx={{ mt: 0.35, flex: "0 0 auto", color: "var(--page-accent)", fontSize: 20 }} />
              <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
                {label}
              </Typography>
            </Stack>
          );
        })}
      </Box>
    </LiquidGlass>
  );
}

function ServiceContentSection({ section, index }) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        borderTop: index ? "1px solid rgba(var(--landing-secondary-rgb),.07)" : "none",
      }}
    >
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
      />
      {section.type === "steps" ? (
        <StepsSection section={section} />
      ) : section.type === "list" ? (
        <ListSection section={section} />
      ) : (
        <CardsSection section={section} />
      )}
    </Box>
  );
}

export default function ServiceDetailPage({ service, content }) {
  const rootRef = useRef(null);
  const { Icon } = service;
  const isDesignService = service.slug === "design";
  const serviceCtaImage = serviceCtaImages[service.slug];
  const relatedServices = serviceCatalog.filter((item) => item.slug !== service.slug);

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
    <Box
      ref={rootRef}
      sx={{
        "--page-accent": service.color,
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Box
        component="section"
        sx={{
          position: "relative",
          isolation: "isolate",
          minHeight: { xs: 760, md: 790 },
          pt: { xs: 14, md: 15 },
          pb: { xs: 9, md: 12 },
          display: "flex",
          alignItems: "center",
        }}
      >
        {isDesignService ? (
          <Box component="img" src="/images/services/design-service-hero.png" alt="مهندسان در حال طراحی زیرساخت برق پایدار" className="service-design-hero-background" />
        ) : (
          <EnergyShaderBackground />
        )}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: isDesignService
              ? "linear-gradient(90deg, rgba(4,10,18,.34), rgba(4,10,18,.82) 66%, rgba(4,10,18,.94)), linear-gradient(180deg, rgba(4,10,18,.14), rgba(4,10,18,.72))"
              : "linear-gradient(180deg, rgba(7,11,18,.2), var(--landing-bg) 96%), radial-gradient(circle at 75% 45%, color-mix(in srgb, var(--page-accent) 11%, transparent), transparent 34%)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs
            separator={<KeyboardArrowLeftRoundedIcon fontSize="small" />}
            className="hero-reveal hero-reveal-1"
            sx={{ mb: { xs: 4, md: 6 }, color: "text.secondary" }}
          >
            <Typography component={Link} href="/" color="inherit" sx={{ fontSize: ".83rem" }}>
              خانه
            </Typography>
            <Typography component={Link} href="/services" color="inherit" sx={{ fontSize: ".83rem" }}>
              خدمات
            </Typography>
            <Typography sx={{ color: "var(--page-accent)", fontSize: ".83rem" }}>
              {service.title}
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.04fr) minmax(420px, .96fr)" },
              alignItems: "center",
              gap: { xs: 6, md: 8 },
            }}
          >
            <Box className={isDesignService ? "service-design-hero-copy" : undefined}>
              <Chip
                icon={<Icon />}
                label={service.eyebrow}
                variant="outlined"
                className="hero-reveal hero-reveal-1"
                sx={{
                  mb: 3,
                  direction: "ltr",
                  color: "var(--page-accent)",
                  borderColor: "color-mix(in srgb, var(--page-accent) 30%, transparent)",
                  bgcolor: "color-mix(in srgb, var(--page-accent) 6%, transparent)",
                  "& .MuiChip-icon": { color: "var(--page-accent)" },
                }}
              />
              <Typography
                component="h1"
                variant="h1"
                className="hero-reveal hero-reveal-2"
                sx={{ fontSize: { xs: "2.65rem", sm: "3.55rem", md: "5.1rem" }, lineHeight: 1.16, mb: 2.5 }}
              >
                {content.heroTitle || service.title}
              </Typography>
              <Typography
                color="text.secondary"
                className="hero-reveal hero-reveal-3"
                sx={{ maxWidth: 720, fontSize: { xs: "1rem", md: "1.16rem" }, lineHeight: 2.05 }}
              >
                {content.heroDescription || service.description}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                useFlexGap
                gap={2.5}
                className="hero-reveal hero-reveal-3"
                sx={{ mt: 4.5, alignItems: { xs: "stretch", sm: "center" } }}
              >
                <MagneticButton
                  href="/contact"
                  variant="contained"
                  endIcon={<ArrowBackRoundedIcon />}
                  sx={{ bgcolor: "var(--page-accent)", color: (theme) => theme.palette.mode === "light" ? "#fff" : "#061015", boxShadow: "0 16px 42px color-mix(in srgb, var(--page-accent) 20%, transparent)" }}
                >
                  {content.ctaLabel || "درخواست مشاوره تخصصی"}
                </MagneticButton>
                <MagneticButton href="/products" variant="outlined" sx={{ borderColor: "rgba(var(--landing-contrast-rgb),.18)", color: "text.primary" }}>
                  مشاهده محصولات
                </MagneticButton>
              </Stack>
            </Box>

            <SpotlightGlass
              intensity="strong"
              className="hero-reveal hero-reveal-2"
              sx={{ minHeight: { xs: 330, md: 510 }, borderRadius: 6, p: 1.4 }}
            >
              <Box
                component="img"
                src={service.secondaryImage || service.image}
                alt={content.imageAlt || service.title}
                className="landing-top-banner-image"
                sx={{ width: "100%", height: "100%", minHeight: { xs: 305, md: 482 }, objectFit: "cover", borderRadius: 5 }}
              />
              <Box className="landing-top-banner-overlay" sx={{ position: "absolute", inset: 0 }} />
              <Stack direction="row" spacing={1.2} sx={{ position: "absolute", right: 28, left: 28, bottom: 26, flexWrap: "wrap", gap: 1 }}>
                {(content.metrics || []).map((metric) => (
                  <Chip className="service-image-metric" key={metric} label={metric} size="small" sx={{ bgcolor: "rgba(5,12,20,.72)", color: "#f7fbff", border: "1px solid rgba(255,255,255,.18)", backdropFilter: "blur(12px)" }} />
                ))}
              </Stack>
            </SpotlightGlass>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "4fr 8fr" }, gap: { xs: 4, md: 8 } }}>
            <Box className="service-page-reveal">
              <Typography sx={{ color: "var(--page-accent)", fontFamily: "monospace", letterSpacing: ".14em", mb: 1.5 }}>
                SERVICE BRIEF
              </Typography>
              <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
                {content.introTitle}
              </Typography>
            </Box>
            <LiquidGlass className="service-page-reveal" intensity="medium" sx={{ p: { xs: 3, md: 5 }, borderRadius: 5 }}>
              <Stack spacing={2.3}>
                {content.introParagraphs.map((paragraph) => (
                  <Typography key={paragraph} color="text.secondary" sx={{ fontSize: { md: "1.05rem" }, lineHeight: 2.05 }}>
                    {paragraph}
                  </Typography>
                ))}
              </Stack>
            </LiquidGlass>
          </Box>
        </Box>

        {content.sections.map((section, index) => (
          <ServiceContentSection key={`${section.title}-${index}`} section={section} index={index} />
        ))}

        <Box component="section" sx={{ py: { xs: 9, md: 13 } }}>
          <LiquidGlass
            className={`service-page-reveal${serviceCtaImage ? " on-image-panel service-image-cta" : ""}`}
            intensity="strong"
            sx={{
              position: "relative",
              overflow: "hidden",
              p: { xs: 4, md: 7 },
              borderRadius: 6,
              textAlign: "center",
              background: serviceCtaImage ? "#08111b" : "linear-gradient(135deg, color-mix(in srgb, var(--page-accent) 14%, #0b111a), rgba(10,16,25,.74))",
            }}
          >
            {serviceCtaImage && <Box component="img" src={serviceCtaImage.src} alt={serviceCtaImage.alt} className="panel-background-image" />}
            {serviceCtaImage && <Box className="panel-background-shade service-cta-shade" aria-hidden />}
            <ContactSupportRoundedIcon sx={{ position: "relative", zIndex: 2, color: serviceCtaImage ? "#8fdcff" : "var(--page-accent)", fontSize: 48, mb: 2 }} />
            <Typography component="h2" variant="h2" sx={{ position: "relative", zIndex: 2, fontSize: { xs: "2rem", md: "3.3rem" }, mb: 2 }}>
              {content.ctaTitle || "برای یک راهکار مطمئن آماده‌اید؟"}
            </Typography>
            <Typography color="text.secondary" sx={{ position: "relative", zIndex: 2, maxWidth: 680, mx: "auto", lineHeight: 2, mb: 4 }}>
              {content.ctaDescription || "کارشناسان ما آماده‌اند نیاز پروژه شما را بررسی کنند و مسیر فنی مناسب را پیشنهاد دهند."}
            </Typography>
            <Box sx={{ position: "relative", zIndex: 2 }}><MagneticButton href="/contact" variant="contained" endIcon={<ArrowBackRoundedIcon />} sx={{ bgcolor: "var(--page-accent)", color: (theme) => theme.palette.mode === "light" ? "#fff" : "#061015" }}>
              {content.ctaLabel || "شروع گفتگو با کارشناس"}
            </MagneticButton></Box>
          </LiquidGlass>
        </Box>

        <Box component="section" sx={{ pb: { xs: 10, md: 14 } }}>
          <Typography className="service-page-reveal" component="h2" variant="h3" sx={{ mb: 4 }}>
            دیگر خدمات تخصصی
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5 }}>
            {relatedServices.map((item, index) => (
              <SpotlightGlass
                key={item.href}
                component={Link}
                href={item.href}
                className="service-page-reveal"
                intensity="subtle"
                interactive
                sx={{ "--service-reveal-delay": `${index * 90}ms`, p: 3, borderRadius: 4, color: "inherit" }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <ServiceIcon icon={item.Icon} sx={{ color: item.color, fontSize: 30 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 800 }}>{item.title}</Typography>
                      <Typography sx={{ color: item.color, fontFamily: "monospace", fontSize: ".68rem", letterSpacing: ".08em" }}>
                        {item.eyebrow}
                      </Typography>
                    </Box>
                  </Stack>
                  <ArrowBackRoundedIcon sx={{ color: item.color }} />
                </Stack>
              </SpotlightGlass>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
