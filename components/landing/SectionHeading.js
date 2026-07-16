import { Box, Stack, Typography } from "@mui/material";
import Reveal from "@/components/react-bits/Reveal";

export default function SectionHeading({ eyebrow, title, accent, description, align = "center" }) {
  return (
    <Reveal sx={{ mb: { xs: 6, md: 10 }, textAlign: align }}>
      <Stack spacing={2} alignItems={align === "center" ? "center" : "flex-start"}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ width: 34, height: 1, bgcolor: "#00dbe7" }} />
          <Typography sx={{ color: "#00dbe7", fontSize: 12, fontWeight: 800, letterSpacing: 2 }}>{eyebrow}</Typography>
        </Stack>
        <Typography variant="h2" sx={{ color: "white", fontSize: { xs: "2.15rem", md: "3.65rem" }, fontWeight: 800, lineHeight: 1.2 }}>
          {title} {accent && <Box component="span" sx={{ color: "#79aef8" }}>{accent}</Box>}
        </Typography>
        {description && <Typography sx={{ color: "rgba(226,232,240,.68)", maxWidth: 720, fontSize: { xs: 16, md: 19 }, lineHeight: 2 }}>{description}</Typography>}
      </Stack>
    </Reveal>
  );
}
