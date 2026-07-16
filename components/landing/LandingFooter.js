"use client";

import Link from "next/link";
import CallRounded from "@mui/icons-material/CallRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import MailRounded from "@mui/icons-material/MailRounded";
import { Box, Button, Container, Divider, Stack, TextField, Typography } from "@mui/material";

const footerLinks = [
  { label: "محصولات", href: "/products" },
  { label: "پروژه‌ها", href: "/projects" },
  { label: "خدمات تخصصی", href: "/services" },
  { label: "وبلاگ فنی و آموزشی", href: "/blog" },
];

export default function LandingFooter() {
  return (
    <Box component="footer" id="contact" sx={{ bgcolor: "#070a0f", borderTop: "1px solid rgba(255,255,255,.08)" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "1.4fr 1fr 1.2fr 1.2fr" }, gap: 6 }}>
          <Stack spacing={2}><Typography variant="h4" sx={{ color: "white", fontWeight: 900 }}>Clinic UPS</Typography><Typography sx={{ color: "rgba(226,232,240,.6)", lineHeight: 2 }}>مرجع تخصصی راهکارهای تأمین و پایداری انرژی الکتریکی برای صنایع حساس و زیرساخت‌های ملی.</Typography></Stack>
          <Stack spacing={2}><Typography sx={{ color: "#00dbe7", fontWeight: 800 }}>محصولات و خدمات</Typography>{footerLinks.map((item) => <Typography component={Link} href={item.href} key={item.href} sx={{ color: "rgba(226,232,240,.62)", "&:hover": { color: "white" } }}>{item.label}</Typography>)}</Stack>
          <Stack spacing={2}><Typography sx={{ color: "#00dbe7", fontWeight: 800 }}>ارتباط با ما</Typography><Stack direction="row" spacing={1.5}><LocationOnRounded sx={{ color: "#79aef8" }} /><Typography sx={{ color: "rgba(226,232,240,.62)" }}>تهران، پارک فناوری پردیس</Typography></Stack><Stack direction="row" spacing={1.5}><CallRounded sx={{ color: "#79aef8" }} /><Typography dir="ltr" sx={{ color: "rgba(226,232,240,.62)" }}>021-88888888</Typography></Stack><Stack direction="row" spacing={1.5}><MailRounded sx={{ color: "#79aef8" }} /><Typography sx={{ color: "rgba(226,232,240,.62)" }}>info@clinicups.com</Typography></Stack></Stack>
          <Stack spacing={2}><Typography sx={{ color: "#00dbe7", fontWeight: 800 }}>خبرنامه فنی</Typography><Typography sx={{ color: "rgba(226,232,240,.62)" }}>آخرین مطالب و بروزرسانی‌های فناوری انرژی را دریافت کنید.</Typography><TextField placeholder="ایمیل شما" size="small" sx={{ "& .MuiOutlinedInput-root": { color: "white", bgcolor: "rgba(255,255,255,.04)" } }} /><Button variant="contained">عضویت</Button></Stack>
        </Box>
        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,.07)" }} />
        <Typography textAlign="center" sx={{ color: "rgba(226,232,240,.38)", fontSize: 13 }}>© ۲۰۲۶ کلینیک یو پی اس. تمامی حقوق محفوظ است.</Typography>
      </Container>
    </Box>
  );
}
