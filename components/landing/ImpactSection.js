import { alpha } from "@mui/material/styles";
import { Box, Container, Stack, Typography } from "@mui/material";
import ElectricBoltRounded from "@mui/icons-material/ElectricBoltRounded";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/react-bits/Reveal";
import { industries } from "./landingData";

const metrics = [
  { value: "+۱۵", label: "سال تجربه تخصصی" },
  { value: "+۴۲۰", label: "پروژه اجرا شده" },
  { value: "۲۴/۷", label: "پشتیبانی اضطراری" },
  { value: "۹۹.۹٪", label: "پایداری سیستم‌ها" },
];

export default function ImpactSection() {
  return (
    <>
      <Box component="section" id="industries" sx={{ py: { xs: 10, md: 16 }, background: "linear-gradient(180deg,#090d14,#111722)", position: "relative", overflow: "hidden" }}>
        <Container maxWidth="xl">
          <SectionHeading eyebrow="INDUSTRY NETWORK" title="انرژی مطمئن برای" accent="صنایع حساس" description="هر صنعت، ریسک‌ها و الزامات خاص خود را دارد. راهکار ما متناسب با همان واقعیت طراحی می‌شود." />
          <Box sx={{ position: "relative", minHeight: { md: 600 }, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(5,1fr)" }, gap: 2.5, alignItems: "center" }}>
            <Box sx={{ display: { xs: "none", md: "block" }, position: "absolute", left: "8%", right: "8%", top: "50%", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,219,231,.45),transparent)", boxShadow: "0 0 16px rgba(0,219,231,.25)" }} />
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Reveal key={industry.title} delay={index * 110} sx={{ transform: { md: `translateY(${index % 2 ? 82 : -82}px)` } }}>
                  <GlassCard sx={{ p: 3, minHeight: 220, borderRadius: 3, transition: ".45s", "&:hover": { transform: "translateY(-8px)", borderColor: "rgba(0,219,231,.4)" } }}>
                    <Box sx={{ width: 52, height: 52, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: alpha(index % 2 ? "#79aef8" : "#00dbe7", .12), mb: 3 }}><Icon sx={{ color: index % 2 ? "#79aef8" : "#00dbe7" }} /></Box>
                    <Typography variant="h5" sx={{ color: "white", fontWeight: 800, mb: 1.5 }}>{industry.title}</Typography>
                    <Typography sx={{ color: "rgba(226,232,240,.62)", lineHeight: 1.9, fontSize: 14 }}>{industry.text}</Typography>
                  </GlassCard>
                </Reveal>
              );
            })}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#0b0f16", borderBlock: "1px solid rgba(255,255,255,.07)" }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(4,1fr)" }, gap: 2 }}>
            {metrics.map((metric, index) => <Reveal key={metric.label} delay={index * 90}><Stack alignItems="center" sx={{ py: 4, position: "relative", "&::after": { content: '""', display: { xs: index % 2 ? "none" : "block", md: index === 3 ? "none" : "block" }, position: "absolute", insetInlineEnd: -8, top: "25%", height: "50%", width: 1, bgcolor: "rgba(255,255,255,.08)" } }}><Typography sx={{ color: "#00dbe7", fontSize: { xs: 34, md: 54 }, fontWeight: 900, fontFamily: "monospace" }}>{metric.value}</Typography><Typography sx={{ color: "rgba(226,232,240,.65)", mt: 1 }}>{metric.label}</Typography></Stack></Reveal>)}
          </Box>
        </Container>
      </Box>
    </>
  );
}
