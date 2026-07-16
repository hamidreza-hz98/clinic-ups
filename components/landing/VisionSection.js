import Image from "next/image";
import { alpha } from "@mui/material/styles";
import { Box, Container, Stack, Typography } from "@mui/material";
import MonitorHeartRounded from "@mui/icons-material/MonitorHeartRounded";
import SupportAgentRounded from "@mui/icons-material/SupportAgentRounded";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/react-bits/Reveal";

export default function VisionSection() {
  return (
    <Box component="section" id="about" sx={{ py: { xs: 10, md: 16 }, bgcolor: "#0b0f16" }}>
      <Container maxWidth="xl">
        <SectionHeading eyebrow="OUR VISION" title="چشم‌انداز" accent="کلینیک یو پی اس" description="ساخت زیرساخت‌های پیشرفته تأمین برق و حفاظت از تجهیزات صنعتی با فناوری روز دنیا" />
        <Reveal>
          <GlassCard sx={{ height: { xs: 420, md: 600 }, borderRadius: 4, mb: 3 }}>
            <Image src="/images/static/power-vision.png" alt="مرکز کنترل توان صنعتی" fill sizes="(max-width:900px) 100vw, 1200px" style={{ objectFit: "cover" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(5,9,15,.88),rgba(5,9,15,.14))" }} />
            <Stack sx={{ position: "absolute", inset: "auto auto 0 0", p: { xs: 4, md: 7 }, maxWidth: 660 }} spacing={2}>
              <Typography sx={{ color: "#00dbe7", fontWeight: 800, letterSpacing: 2 }}>ENGINEERED CONTINUITY</Typography>
              <Typography variant="h3" sx={{ color: "white", fontSize: { xs: 28, md: 42 }, fontWeight: 800 }}>زیرساختی که پیش از بحران آماده است</Typography>
              <Typography sx={{ color: "rgba(226,232,240,.72)", lineHeight: 2 }}>از نخستین محاسبه تا پایش آنلاین، تمام اجزای سیستم برای یک هدف طراحی می‌شوند: ادامه بی‌وقفه عملیات شما.</Typography>
            </Stack>
          </GlassCard>
        </Reveal>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" }, gap: 3 }}>
          <Reveal delay={80}><GlassCard sx={{ p: 4, minHeight: 230, borderRadius: 3 }}><MonitorHeartRounded sx={{ color: "#00dbe7", fontSize: 46 }} /><Typography variant="h4" sx={{ color: "white", mt: 5, fontWeight: 800 }}>پایش لحظه‌ای</Typography><Typography sx={{ color: "rgba(226,232,240,.62)", mt: 1 }}>دید کامل روی سلامت، بار و عملکرد سامانه</Typography></GlassCard></Reveal>
          <Reveal delay={160}><GlassCard sx={{ p: 4, minHeight: 230, borderRadius: 3 }}><Typography sx={{ color: "#79aef8", fontSize: 42, fontWeight: 900 }}>۹۹.۹٪</Typography><Typography variant="h5" sx={{ color: "white", mt: 5, fontWeight: 800 }}>راندمان بالا</Typography></GlassCard></Reveal>
          <Reveal delay={240}><GlassCard sx={{ p: 4, minHeight: 230, borderRadius: 3, borderColor: alpha("#00dbe7", .25) }}><SupportAgentRounded sx={{ color: "#00dbe7", fontSize: 46 }} /><Typography variant="h5" sx={{ color: "white", mt: 5, fontWeight: 800 }}>پشتیبانی ۲۴/۷</Typography></GlassCard></Reveal>
        </Box>
      </Container>
    </Box>
  );
}
