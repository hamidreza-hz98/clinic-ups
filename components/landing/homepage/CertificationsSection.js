"use client";

import { useState } from "react";
import { Box, Chip, Container, Stack, Typography, useMediaQuery } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import FullscreenImage from "../FullscreenImage";
import LiquidGlass from "../ui/LiquidGlass";

const ENAMAD_URL = "https://trustseal.enamad.ir/?id=609892&Code=phEhwYC4lQ1MKfafUix4t5xoyC9bDpe3";

const certifications = [
  {
    title: "گواهینامه ISO 9001",
    subtitle: "سیستم مدیریت کیفیت",
    image: "/images/certifications/iso-placeholder.svg",
    accent: "#a7c8ff",
    rotation: -13,
    x: -112,
  },
  {
    title: "گواهینامه ISO 14001",
    subtitle: "مدیریت زیست‌محیطی",
    image: "/images/certifications/iso-placeholder.svg",
    accent: "#ffb4a9",
    rotation: 0,
    x: 0,
  },
  {
    title: "نماد اعتماد الکترونیکی",
    subtitle: "تأیید هویت کسب‌وکار دیجیتال",
    image: "/images/enamad.png",
    accent: "var(--landing-accent)",
    rotation: 13,
    x: 112,
    href: ENAMAD_URL,
    linkLabel: "استعلام در سامانه اینماد",
    fullscreenWidth: 360,
  },
];

export default function CertificationsSection() {
  const isMobile = useMediaQuery("(max-width:599px)");
  const [activeCard, setActiveCard] = useState(1);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const fullscreenSlides = certifications.map((item) => ({
    src: item.image,
    alt: item.title,
    title: item.title,
    href: item.href,
    linkLabel: item.linkLabel,
    fullscreenWidth: item.fullscreenWidth,
  }));

  return (
    <Box
      component="section"
      id="certifications"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        py: { xs: 10, md: 14 },
        borderTop: "1px solid rgba(var(--landing-secondary-rgb),.08)",
      }}
    >
      <Box className="certifications-grid" aria-hidden />
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 7, lg: 5 }}
        >
          <Box sx={{ width: { xs: "100%", lg: "42%" }, textAlign: { xs: "center", lg: "right" } }}>
            <Chip
              icon={<VerifiedRoundedIcon />}
              label="اعتماد مبتنی بر استاندارد"
              variant="outlined"
              color="primary"
              sx={{ mb: 2.5, bgcolor: "rgba(var(--landing-accent-rgb),.05)", borderColor: "rgba(var(--landing-accent-rgb),.24)" }}
            />
            <Typography component="h2" variant="h2" sx={{ fontSize: { xs: "2.35rem", md: "3.65rem" }, mb: 2 }}>
              گواهینامه‌ها و <Box component="span" sx={{ color: "primary.main" }}>مجوزهای معتبر</Box>
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 650, mx: { xs: "auto", lg: 0 }, lineHeight: 2 }}>
              بازتاب تعهد ما به کیفیت، پایداری و اعتماد؛ برای مشاهده تمام‌صفحه هر مدرک، کارت آن را انتخاب کنید.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent={{ xs: "center", lg: "flex-start" }} sx={{ mt: 4 }}>
              <Box className="certification-status-pip" />
              <Typography sx={{ color: "text.secondary", fontSize: ".8rem" }}>اسناد قابل استعلام و مشاهده</Typography>
            </Stack>
          </Box>

          <Box className="certification-fan" role="list" aria-label="گواهینامه‌ها و مجوزها">
            <Box className="certification-fan-orbit" aria-hidden />
            {certifications.map((certificate, index) => {
              const selected = activeCard === index;
              return (
                <Box
                  key={certificate.title}
                  component="button"
                  type="button"
                  role="listitem"
                  aria-label={`نمایش ${certificate.title}`}
                  className={`certification-bounce-card${selected ? " is-active" : ""}`}
                  onPointerEnter={() => setActiveCard(index)}
                  onFocus={() => setActiveCard(index)}
                  onClick={() => setFullscreenIndex(index)}
                  style={{
                    "--certificate-accent": certificate.accent,
                    zIndex: selected ? 10 : index + 1,
                    transform: `translate3d(${certificate.x * (isMobile ? .58 : 1)}px, ${selected ? -26 : 0}px, 0) rotate(${certificate.rotation * (isMobile ? .72 : 1)}deg) scale(${selected ? 1.055 : 1})`,
                  }}
                >
                  <LiquidGlass intensity="strong" className="certification-card-glass">
                    <Box className="certification-reflection" aria-hidden />
                    <Box className="certification-card-index">0{index + 1}</Box>
                    <Box className="certification-image-shell">
                      <Box component="img" src={certificate.image} alt={certificate.title} />
                    </Box>
                    <Box className="certification-card-copy">
                      <WorkspacePremiumRoundedIcon sx={{ color: certificate.accent, fontSize: 30 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 900, fontSize: ".95rem" }}>{certificate.title}</Typography>
                        <Typography color="text.secondary" sx={{ fontSize: ".68rem", mt: .4 }}>{certificate.subtitle}</Typography>
                      </Box>
                    </Box>
                  </LiquidGlass>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Container>

      {fullscreenIndex !== null && (
        <FullscreenImage
          slides={fullscreenSlides}
          initialSlide={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
        />
      )}
    </Box>
  );
}
