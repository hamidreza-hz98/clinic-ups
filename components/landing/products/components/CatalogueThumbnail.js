"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import SpotlightGlass from "../../ui/SpotlightGlass";

export default function CatalogueThumbnail({ heading = "", downloadLink = "", images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SpotlightGlass intensity="medium" sx={{ mt: 3, borderRadius: 4, p: { xs: 2.25, md: 3 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2.5}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 2.5, bgcolor: "rgba(240,75,79,.1)", border: "1px solid rgba(240,75,79,.25)" }}>
            <PictureAsPdfRoundedIcon sx={{ color: "error.light" }} />
          </Box>
          <Box>
            <Typography color="primary.main" sx={{ fontFamily: "monospace", fontSize: ".62rem", letterSpacing: ".12em" }}>PRODUCT CATALOGUE</Typography>
            <Typography sx={{ mt: .4, fontWeight: 900 }}>{heading}</Typography>
          </Box>
        </Stack>
        <Button
          component="a"
          href={downloadLink}
          target="_blank"
          download
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<DownloadRoundedIcon />}
          sx={{ borderRadius: 99 }}
        >
          دانلود فایل PDF
        </Button>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }, gap: 1.25, mt: 2.5 }}>
        {images.map((image, index) => (
          <Box
            component="button"
            type="button"
            key={image}
            onClick={() => setSelectedImage(image)}
            aria-label={`بزرگ‌نمایی صفحه ${index + 1} کاتالوگ`}
            sx={{
              position: "relative",
              aspectRatio: "4 / 5",
              p: 0,
              overflow: "hidden",
              cursor: "zoom-in",
              borderRadius: 2.5,
              border: "1px solid rgba(var(--landing-contrast-rgb),.12)",
              bgcolor: "rgba(var(--landing-contrast-rgb),.03)",
              "&:hover img": { transform: "scale(1.06)", filter: "brightness(.72)" },
              "&:hover .catalogue-zoom": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
            }}
          >
            <Box component="img" src={image} alt={`صفحه ${index + 1} کاتالوگ`} sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .65s cubic-bezier(.2,.8,.2,1), filter .35s ease" }} />
            <Box className="catalogue-zoom" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(.78)", display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: "50%", bgcolor: "rgba(3,10,16,.78)", color: "primary.main", opacity: 0, transition: ".3s ease", backdropFilter: "blur(12px)" }}><ZoomInRoundedIcon /></Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        slotProps={{
          backdrop: { sx: { bgcolor: "rgba(2,6,12,.88)", backdropFilter: "blur(18px)" } },
          paper: { sx: { position: "relative", overflow: "visible", bgcolor: "transparent", backgroundImage: "none", boxShadow: "none" } },
        }}
      >
        <IconButton aria-label="بستن تصویر کاتالوگ" onClick={() => setSelectedImage(null)} sx={{ position: "absolute", zIndex: 2, top: -18, right: -18, color: "white", bgcolor: "rgba(8,14,22,.9)", border: "1px solid rgba(var(--landing-contrast-rgb),.18)", "&:hover": { bgcolor: "rgba(16,25,38,.95)" } }}>
          <CloseRoundedIcon />
        </IconButton>
        {selectedImage && <Box component="img" src={selectedImage} alt="صفحه انتخاب‌شده کاتالوگ" sx={{ display: "block", maxWidth: "min(88vw, 820px)", maxHeight: "88vh", objectFit: "contain", borderRadius: 3, boxShadow: "0 35px 100px rgba(0,0,0,.7)" }} />}
      </Dialog>
    </SpotlightGlass>
  );
}
