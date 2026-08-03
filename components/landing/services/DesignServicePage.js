import Link from "next/link";
import { Box, Container, Stack, Typography } from "@mui/material";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import LiquidGlass from "../ui/LiquidGlass";

const capabilities = [
  ["تحلیل بار و ظرفیت‌سنجی", "محاسبه دقیق ظرفیت موردنیاز و پیش‌بینی توسعه آینده.", SpeedRoundedIcon],
  ["طراحی دیاگرام تک‌خطی", "طراحی معماری الکتریکی، مسیرهای بای‌پس و افزونگی سیستم.", SchemaRoundedIcon],
  ["کنترل و تأیید فنی", "بازبینی نقشه‌ها و تطبیق تجهیزات با الزامات پروژه.", VerifiedRoundedIcon],
];

export default function DesignServicePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#080C14", py: { xs: 14, md: 20 }, backgroundImage: "linear-gradient(rgba(143,189,255,.035) 1px, transparent 1px),linear-gradient(90deg,rgba(143,189,255,.035) 1px,transparent 1px)", backgroundSize: "44px 44px" }}>
      <Container maxWidth="lg">
        <Stack alignItems="flex-start" spacing={3} sx={{ maxWidth: 820, mb: 8 }}>
          <EngineeringRoundedIcon sx={{ color: "primary.main", fontSize: 64 }} />
          <Typography component="h1" variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4.5rem" } }}>مهندسی و طراحی</Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, lineHeight: 2 }}>
            طراحی یکپارچه سیستم‌های برق اضطراری از تحلیل بار و انتخاب توپولوژی تا تهیه نقشه‌های اجرایی و نظارت فنی.
          </Typography>
        </Stack>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 3 }}>
          {capabilities.map(([title, description, Icon]) => (
            <LiquidGlass key={title} intensity="medium" sx={{ p: 4, borderRadius: 4 }}>
              <Icon sx={{ color: "primary.main", fontSize: 38, mb: 2 }} />
              <Typography component="h2" sx={{ fontSize: "1.2rem", fontWeight: 800, mb: 1.5 }}>{title}</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>{description}</Typography>
            </LiquidGlass>
          ))}
        </Box>
        <Link href="/contact" style={{ display: "inline-block", marginTop: 48, textDecoration: "none" }}>
          <Typography component="span" sx={{ color: "primary.main", fontWeight: 800 }}>
            درخواست مشاوره طراحی ←
          </Typography>
        </Link>
      </Container>
    </Box>
  );
}
