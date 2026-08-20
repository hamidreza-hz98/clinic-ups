"use client";

import Link from "next/link";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LiquidGlass from "../ui/LiquidGlass";

const sections = [
  { title: "دسترسی سریع", links: [["صفحه اصلی", "/"], ["محصولات", "/categories"], ["پروژه‌ها", "/projects"], ["درباره ما", "/about"]] },
  { title: "خدمات", links: [["فروش و مشاوره", "/services/sales"], ["تعمیر تخصصی", "/services/repair"], ["خدمات پس از فروش", "/services/after-sales"], ["وبلاگ", "/blog"]] },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ position: "relative", bgcolor: "background.default", pb: { xs: 12, md: 0 }, borderTop: "1px solid", borderColor: "divider" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1.25fr 1fr", md: "1.6fr .8fr .8fr 1.2fr" }, gap: 5 }}>
          <Box>
            <Stack component={Link} href="/" direction="row" alignItems="center" spacing={1.5} sx={{ width: "fit-content" }}>
              <Box component="img" src="/images/logo/logo.svg" alt="کلینیک یو پی اس" sx={{ width: 164, height: "auto", objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(var(--landing-accent-rgb),.55)) drop-shadow(0 0 4px rgba(255,48,64,.4))" }} />
              <Box><Typography variant="h5">کلینیک یو پی اس</Typography><Typography variant="caption" color="primary.main" sx={{ direction: "ltr", display: "block" }}>CLINIC UPS</Typography></Box>
            </Stack>
            <Typography color="text.secondary" sx={{ mt: 2.5, maxWidth: 430, lineHeight: 2 }}>بیش از ۲۲ سال تجربه در طراحی، تأمین و پشتیبانی راهکارهای برق اضطراری برای مراکز درمانی، صنعتی و زیرساخت‌های حساس.</Typography>
          </Box>
          {sections.map((section) => <Box key={section.title}><Typography color="primary.main" sx={{ mb: 2, fontWeight: 700 }}>{section.title}</Typography><Stack spacing={1.25}>{section.links.map(([label, href]) => <Typography component={Link} href={href} key={href} variant="body2" color="text.secondary" sx={{ width: "fit-content", "&:hover": { color: "text.primary" } }}>{label}</Typography>)}</Stack></Box>)}
          <Box>
            <Typography color="primary.main" sx={{ mb: 2, fontWeight: 700 }}>ارتباط با ما</Typography>
            <LiquidGlass intensity="subtle" sx={{ borderRadius: 4, p: 2 }}>
              <Stack spacing={1.6} color="text.secondary">
                <Stack direction="row" spacing={1.2} alignItems="flex-start"><LocationOnRoundedIcon color="primary" fontSize="small" /><Typography variant="body2">تهران، ایران</Typography></Stack>
                <Stack direction="row" spacing={1.2} alignItems="center"><PhoneRoundedIcon color="primary" fontSize="small" /><Typography component={Link} href="tel:+989122201160" variant="body2" sx={{ direction: "ltr" }}>+98 912 220 1160</Typography></Stack>
                <Stack direction="row" spacing={1.2} alignItems="center"><EmailRoundedIcon color="primary" fontSize="small" /><Typography component={Link} href="mailto:info@clinicups.com" variant="body2">info@clinicups.com</Typography></Stack>
              </Stack>
            </LiquidGlass>
          </Box>
        </Box>
      </Container>
      <Divider sx={{ borderColor: "divider" }} />
      <Container maxWidth="xl" sx={{ py: 2.5 }}><Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} کلینیک یو پی اس؛ تمامی حقوق محفوظ است.</Typography></Container>
    </Box>
  );
}
