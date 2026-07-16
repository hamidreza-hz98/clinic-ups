import { alpha } from "@mui/material/styles";
import { Box, Container, Stack, Typography } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ElectricBoltRounded from "@mui/icons-material/ElectricBoltRounded";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/react-bits/Reveal";
import { services } from "./landingData";

const advantages = ["ارزیابی دقیق نیاز واقعی پروژه", "طراحی مستقل از برند و مبتنی بر استاندارد", "تأمین تجهیزات با اصالت قابل رهگیری", "پشتیبانی فنی در تمام چرخه عمر"];

export default function ServicesSection() {
  return (
    <>
      <Box component="section" id="services" sx={{ py: { xs: 10, md: 17 }, background: "linear-gradient(180deg,#080c12,#10151e)", position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0, opacity: .5, backgroundImage: "linear-gradient(rgba(0,219,231,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,219,231,.04) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          <SectionHeading align="right" eyebrow="04 / CORE SERVICES" title="خدمات تخصصی" accent="کلینیک انرژی" description="فراتر از فروش، در تمام مراحل طراحی، اجرا و پایداری شبکه توزیع انرژی همراه شما هستیم." />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 100} direction={index % 2 ? "left" : "right"}>
                  <GlassCard sx={{ p: { xs: 3.5, md: 5 }, minHeight: 300, borderRadius: 1, clipPath: "polygon(30px 0,100% 0,100% calc(100% - 30px),calc(100% - 30px) 100%,0 100%,0 30px)", transition: ".5s", "&:hover": { transform: "translateY(-8px)", borderColor: "rgba(0,219,231,.4)" }, "&:hover .service-icon": { transform: "rotate(-8deg) scale(1.12)" } }}>
                    <Icon className="service-icon" sx={{ fontSize: 52, color: index % 2 ? "#79aef8" : "#00dbe7", transition: ".45s" }} />
                    <Typography variant="h3" sx={{ color: "white", mt: 3, mb: 2, fontWeight: 800 }}>{service.title}</Typography>
                    <Typography sx={{ color: "rgba(226,232,240,.66)", lineHeight: 2 }}>{service.description}</Typography>
                    <Typography sx={{ mt: 4, color: "#00dbe7", fontSize: 12, fontWeight: 800, letterSpacing: 1.5 }}>LEARN MORE ←</Typography>
                  </GlassCard>
                </Reveal>
              );
            })}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: "#0b0f16", position: "relative", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.15fr" }, gap: { xs: 7, md: 12 }, alignItems: "center", direction: "ltr" }}>
            <Reveal direction="right">
              <Box sx={{ position: "relative", width: { xs: 280, md: 430 }, height: { xs: 280, md: 430 }, mx: "auto", display: "grid", placeItems: "center" }}>
                {[0, 1, 2].map((ring) => <Box key={ring} sx={{ position: "absolute", inset: ring * 46, borderRadius: "50%", border: `1px ${ring === 1 ? "dashed" : "solid"} ${alpha(ring === 2 ? "#00dbe7" : "#79aef8", .28)}`, animation: `spin ${18 + ring * 8}s linear infinite ${ring % 2 ? "reverse" : "normal"}`, "@keyframes spin": { to: { transform: "rotate(360deg)" } }, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }} />)}
                <GlassCard sx={{ width: 150, height: 150, borderRadius: "50%", display: "grid", placeItems: "center", boxShadow: "0 0 80px rgba(0,219,231,.18)" }}><ElectricBoltRounded sx={{ fontSize: 70, color: "#00dbe7" }} /></GlassCard>
              </Box>
            </Reveal>
            <Reveal direction="left" sx={{ direction: "rtl" }}>
              <Typography sx={{ color: "#00dbe7", fontWeight: 800, letterSpacing: 2, mb: 2 }}>WHY CLINIC UPS</Typography>
              <Typography variant="h2" sx={{ color: "white", fontSize: { xs: "2.2rem", md: "3.8rem" }, fontWeight: 800, mb: 3 }}>پایداری، نتیجه یک انتخاب مهندسی است</Typography>
              <Typography sx={{ color: "rgba(226,232,240,.7)", fontSize: 18, lineHeight: 2, mb: 4 }}>ما فقط یک دستگاه تحویل نمی‌دهیم؛ یک معماری قابل اتکا برای ادامه فعالیت کسب‌وکار شما می‌سازیم.</Typography>
              <Stack spacing={2.2}>{advantages.map((item) => <Stack key={item} direction="row" spacing={1.5} alignItems="center"><CheckCircleRounded sx={{ color: "#79aef8" }} /><Typography sx={{ color: "rgba(255,255,255,.85)" }}>{item}</Typography></Stack>)}</Stack>
            </Reveal>
          </Box>
        </Container>
      </Box>
    </>
  );
}
