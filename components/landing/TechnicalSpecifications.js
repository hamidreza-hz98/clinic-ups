"use client";

import { Box, Stack, Typography } from "@mui/material";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import SpotlightGlass from "./ui/SpotlightGlass";

export default function TechnicalSpecifications({ specifications = [] }) {
  if (!specifications.length) {
    return (
      <SpotlightGlass intensity="subtle" sx={{ borderRadius: 3, p: 4, textAlign: "center" }}>
        <DataObjectRoundedIcon sx={{ color: "primary.main", fontSize: 42, opacity: .7 }} />
        <Typography color="text.secondary" sx={{ mt: 1 }}>مشخصات فنی برای این محصول ثبت نشده است.</Typography>
      </SpotlightGlass>
    );
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: 1.25 }}>
      {specifications.map((item, index) => (
        <SpotlightGlass
          key={item?._id || `${item?.key}-${index}`}
          intensity="subtle"
          sx={{
            minHeight: 78,
            borderRadius: 2.5,
            p: 2,
            transition: "border-color .3s ease, transform .3s ease",
            "&:hover": { borderColor: "rgba(0,219,231,.3)", transform: "translateY(-2px)" },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Box sx={{ minWidth: 0 }}>
              <Typography color="text.secondary" sx={{ fontSize: ".68rem", mb: .55 }}>{item?.key || "مشخصه"}</Typography>
              <Typography sx={{ fontSize: ".86rem", fontWeight: 800, lineHeight: 1.8 }}>{item?.value || "—"}</Typography>
            </Box>
            <Typography sx={{ flex: "0 0 auto", fontFamily: "monospace", fontSize: ".62rem", color: "primary.main", opacity: .65 }}>
              {String(index + 1).padStart(2, "0")}
            </Typography>
          </Stack>
        </SpotlightGlass>
      ))}
    </Box>
  );
}
