import Image from "next/image";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ElectricBoltRounded from "@mui/icons-material/ElectricBoltRounded";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/react-bits/Reveal";
import Magnet from "@/components/react-bits/Magnet";
import { projects } from "./landingData";

export default function ProjectsSection() {
  return (
    <Box component="section" id="projects" sx={{ py: { xs: 10, md: 17 }, bgcolor: "#090d14", position: "relative", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <SectionHeading align="right" eyebrow="SELECTED PROJECTS" title="پروژه‌های" accent="منتخب" description="نمونه‌ای از تخصص فنی و راهکارهای اجراشده برای زیرساخت‌های حساس کشور" />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(12,1fr)" }, gap: 3 }}>
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 130} sx={{ gridColumn: { md: `span ${project.wide ? 8 : index === 1 ? 4 : 6}` }, mt: { md: index === 2 ? -10 : 0 } }}>
              <GlassCard sx={{ height: { xs: 430, md: project.wide ? 520 : index === 1 ? 650 : 460 }, borderRadius: 2, "&:hover .project-image": { transform: "scale(1.06)" }, "&:hover .project-overlay": { background: "linear-gradient(180deg,transparent 15%,rgba(4,8,14,.97) 88%)" } }}>
                <Image className="project-image" src={project.image} alt={project.title} fill sizes={project.wide ? "(max-width:900px) 100vw, 66vw" : "(max-width:900px) 100vw, 40vw"} style={{ objectFit: "cover", transition: "transform .9s cubic-bezier(.2,.8,.2,1)" }} />
                <Box className="project-overlay" sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 25%,rgba(4,8,14,.95) 88%)", transition: ".6s" }} />
                <Stack sx={{ position: "absolute", inset: "auto 0 0", p: { xs: 3, md: 4 } }} spacing={2}>
                  <Stack direction="row" spacing={1}><Chip size="small" label={project.category} sx={{ color: "#00dbe7", bgcolor: "rgba(0,219,231,.1)", border: "1px solid rgba(0,219,231,.25)" }} /><Chip size="small" label={project.meta} sx={{ color: "white", bgcolor: "rgba(255,255,255,.08)" }} /></Stack>
                  <Typography variant="h3" sx={{ color: "white", fontSize: { xs: 25, md: 32 }, fontWeight: 800 }}>{project.title}</Typography>
                  <Typography sx={{ color: "rgba(226,232,240,.66)", maxWidth: 620 }}>طراحی و اجرای سامانه توان پشتیبان با معماری افزونه و قابلیت پایش لحظه‌ای.</Typography>
                </Stack>
              </GlassCard>
            </Reveal>
          ))}
          <Reveal sx={{ gridColumn: { md: "7 / span 6" }, display: "flex", alignItems: "center", p: { xs: 2, md: 7 } }}>
            <Stack spacing={3} alignItems="flex-start">
              <ElectricBoltRounded sx={{ fontSize: 60, color: "rgba(121,174,248,.3)" }} />
              <Typography variant="h3" sx={{ color: "white", fontWeight: 800 }}>استانداردهای مهندسی در کلاس جهانی</Typography>
              <Typography sx={{ color: "rgba(226,232,240,.68)", lineHeight: 2 }}>با تکیه بر استانداردهای IEC و IEEE، سامانه‌هایی طراحی می‌کنیم که در سخت‌ترین شرایط نیز بدون وقفه ادامه می‌دهند.</Typography>
              <Magnet padding={50} magnetStrength={18}><Button variant="outlined" endIcon={<ArrowBackRounded />} sx={{ color: "#79aef8", borderColor: "rgba(121,174,248,.4)", borderRadius: 99, px: 3 }}>مشاهده همه پروژه‌ها</Button></Magnet>
            </Stack>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
