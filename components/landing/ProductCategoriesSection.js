import Image from "next/image";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { alpha } from "@mui/material/styles";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/react-bits/Reveal";
import Magnet from "@/components/react-bits/Magnet";
import { products } from "./landingData";

export default function ProductCategoriesSection() {
  return (
    <Box component="section" id="products" sx={{ position: "relative", py: { xs: 10, md: 16 }, background: "#0b0f16", overflow: "hidden" }}>
      <Box sx={{ position: "absolute", inset: 0, opacity: .38, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(121,174,248,.18) 1px, transparent 0)", backgroundSize: "38px 38px" }} />
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <SectionHeading eyebrow="PRODUCT ECOSYSTEM" title="دسته‌بندی" accent="محصولات" description="راهکارهای یکپارچه تأمین، تثبیت و ذخیره انرژی برای هر مقیاس عملیاتی" />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(6, 1fr)" }, gap: 3 }}>
          {products.map((product, index) => {
            const Icon = product.icon;
            const isWide = index > 2;
            return (
              <Reveal key={product.title} delay={index * 90} sx={{ gridColumn: { md: `span ${isWide ? 3 : 2}` } }}>
                <GlassCard
                  sx={{
                    minHeight: isWide ? 370 : 430,
                    borderRadius: 1,
                    clipPath: "polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)",
                    transition: "transform .55s cubic-bezier(.2,.8,.2,1), border-color .4s",
                    "&:hover": { transform: "translateY(-10px)", borderColor: alpha(product.color, .55) },
                    "&:hover .product-image": { transform: "scale(1.07)", filter: "grayscale(0)" },
                  }}
                >
                  <Image className="product-image" src={product.image} alt={product.title} fill sizes={isWide ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 33vw"} style={{ objectFit: "cover", transition: "transform .8s, filter .8s", filter: "grayscale(.45)" }} />
                  <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,8,13,.08) 10%, rgba(5,8,13,.94) 88%)" }} />
                  <Stack sx={{ position: "absolute", inset: "auto 0 0", p: { xs: 3, md: 4 } }} spacing={1.2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ color: product.color, fontSize: 11, fontWeight: 800, letterSpacing: 1.6 }}>{product.label}</Typography>
                      <Icon sx={{ color: product.color }} />
                    </Stack>
                    <Typography variant="h3" sx={{ color: "white", fontWeight: 800 }}>{product.title}</Typography>
                    <Typography sx={{ color: "rgba(226,232,240,.7)", lineHeight: 1.9 }}>{product.description}</Typography>
                    <Box sx={{ pt: 1 }}>
                      <Magnet padding={30} magnetStrength={12}>
                        <Button endIcon={<ArrowBackRounded />} sx={{ color: product.color, px: 0 }}>جزئیات فنی</Button>
                      </Magnet>
                    </Box>
                  </Stack>
                </GlassCard>
              </Reveal>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
