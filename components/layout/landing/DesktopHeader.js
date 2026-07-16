"use client";

import Link from "next/link";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { alpha } from "@mui/material/styles";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Magnet from "@/components/react-bits/Magnet";
import {
  landingNavigationItems,
  landingPrimaryAction,
} from "@/components/layout/landing/navigation";
import Image from "next/image";

const glassSurface = (theme) => ({
  background: `linear-gradient(180deg, ${alpha("#121923", 0.82)} 0%, ${alpha(
    "#0c1119",
    0.74,
  )} 100%)`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  boxShadow: `0 28px 90px ${alpha("#02050a", 0.4)}`,
  backdropFilter: "blur(16px)",
});

const logoSquare = (theme) => ({
  width: 128,
  height: 64,
  display: "grid",
  placeItems: "center",
  boxShadow: `0 10px 28px ${alpha(theme.palette.primary.main, 0.3)}`,
});

function DesktopNavLink({ item }) {
  return (
    <Magnet magnetStrength={16} padding={54}>
      <Box
        component={Link}
        href={item.href}
        sx={(theme) => ({
          height: 46,
          px: 1.8,
          borderRadius: "16px",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.25,
          color: item.hasMenu
            ? theme.palette.info.light
            : alpha(theme.palette.common.white, 0.86),
          transition: "all 180ms ease",
          "&:hover": {
            color: theme.palette.common.white,
            bgcolor: alpha(theme.palette.common.white, 0.06),
          },
        })}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {item.label}
        </Typography>

        {item.hasMenu ? (
          <KeyboardArrowDownRoundedIcon sx={{ fontSize: 19 }} />
        ) : null}
      </Box>
    </Magnet>
  );
}

export default function DesktopHeader() {
  return (
    <Box  sx={{ display: { xs: "none", md: "block" }, position: "fixed", width: '100%' }}>
      <Container maxWidth="xl" sx={{ pt: 2.5 }}>
        <Box
          sx={(theme) => ({
            ...glassSurface(theme),
            px: 2,
            py: 1.25,
            borderRadius: "28px",
          })}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Stack
              component={Link}
              href="/"
              direction="row"
              alignItems="center"
              spacing={1.5}
              gap={1}
              sx={{ minWidth: 188, justifyContent: "flex-end" }}
            >
              <Box sx={logoSquare}>
                <Image
                  src="/images/logo/logo.svg"
                  alt="Logo"
                  width={128}
                  height={64}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  color: "common.white",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                کلینیک یو پی اس
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              sx={{ flex: 1 }}
            >
              {landingNavigationItems.map((item) => (
                <DesktopNavLink key={item.label} item={item} />
              ))}
            </Stack>

            <Magnet magnetStrength={18} padding={70}>
              <Button
                component={Link}
                href={landingPrimaryAction.href}
                variant="outlined"
                color="info"
                sx={(theme) => ({
                  minWidth: 148,
                  height: 48,
                  px: 3,
                  borderRadius: "16px",
                  borderWidth: 1.5,
                  color: theme.palette.info.light,
                  borderColor: alpha(theme.palette.info.light, 0.52),
                  bgcolor: alpha(theme.palette.info.light, 0.08),
                  boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.08)}`,
                })}
              >
                {landingPrimaryAction.label}
              </Button>
            </Magnet>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
