"use client";

import { useState } from "react";
import Link from "next/link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Magnet from "@/components/react-bits/Magnet";
import { landingNavigationItems } from "@/components/layout/landing/navigation";

const glassSurface = (theme) => ({
  background: `linear-gradient(180deg, ${alpha("#121923", 0.84)} 0%, ${alpha(
    "#0c1119",
    0.74
  )} 100%)`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  boxShadow: `0 24px 70px ${alpha("#02050a", 0.45)}`,
  backdropFilter: "blur(22px)",
});

const actionButton = (theme) => ({
  width: 44,
  height: 44,
  borderRadius: "14px",
  color: alpha(theme.palette.common.white, 0.82),
  border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
  bgcolor: alpha(theme.palette.common.white, 0.05),
  backdropFilter: "blur(18px)",
});

const logoSquare = (theme) => ({
  width: 34,
  height: 34,
  borderRadius: "10px",
  display: "grid",
  placeItems: "center",
  color: theme.palette.primary.contrastText,
  background: `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.primary.main} 100%)`,
});

function MobileNavItem({ href, label, onNavigate }) {
  return (
    <Box component={Link} href={href} onClick={onNavigate}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" py={1.25}>
        <Typography variant="h6" sx={{ color: "common.white", fontWeight: 500 }}>
          {label}
        </Typography>
        <WestRoundedIcon sx={{ color: "info.light", fontSize: 24 }} />
      </Stack>
    </Box>
  );
}

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Container maxWidth="xl" sx={{ pt: 2 }}>
          <Box
            sx={(theme) => ({
              ...glassSurface(theme),
              px: 1.5,
              py: 1.25,
              borderRadius: "24px",
            })}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center">
                <Magnet magnetStrength={12} padding={44}>
                  <IconButton sx={actionButton} onClick={() => setOpen(true)} aria-label="باز کردن منو">
                    <MenuRoundedIcon />
                  </IconButton>
                </Magnet>
                <Magnet magnetStrength={12} padding={44}>
                  <IconButton component={Link} href="/search" sx={actionButton} aria-label="جستجو">
                    <SearchRoundedIcon />
                  </IconButton>
                </Magnet>
              </Stack>

              <Stack
                component={Link}
                href="/"
                direction="row"
                alignItems="center"
                spacing={1.25}
              >
                <Typography variant="h6" sx={{ color: "common.white", fontWeight: 800 }}>
                  Clinic UPS
                </Typography>
                <Box sx={logoSquare}>
                  <BoltRoundedIcon sx={{ fontSize: 20 }} />
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: (theme) => ({
            width: "100%",
            maxWidth: 340,
            p: 3,
            background: `
              radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.18)}, transparent 28%),
              linear-gradient(180deg, #090d14 0%, #06090f 100%)
            `,
            color: theme.palette.common.white,
          }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pb: 4 }}>
          <Typography variant="h5" sx={{ color: "info.light", fontWeight: 800 }}>
            Clinic UPS
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            aria-label="بستن منو"
            sx={(theme) => ({
              width: 42,
              height: 42,
              color: theme.palette.common.white,
              border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
            })}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Stack spacing={1}>
          {landingNavigationItems
            .slice()
            .reverse()
            .map((item) => (
              <Box key={item.label}>
                <MobileNavItem
                  href={item.href}
                  label={item.label}
                  onNavigate={() => setOpen(false)}
                />
                <Divider sx={{ borderColor: alpha("#ffffff", 0.12) }} />
              </Box>
            ))}
        </Stack>
      </Drawer>
    </>
  );
}
