import { Box } from "@mui/material";

export default function NeonLogo({ animated = false, alt = "کلینیک یو پی اس", sx }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "block",
        flexShrink: 0,
        ...sx,
        "@keyframes neonLogoPulse": {
          "0%, 100%": { opacity: .46, filter: "blur(7px) drop-shadow(0 0 8px rgba(var(--landing-accent-rgb),.8))" },
          "50%": { opacity: .78, filter: "blur(10px) drop-shadow(0 0 16px rgba(255,48,64,.9))" },
        },
      }}
    >
      <Box
        component="img"
        src="/images/logo/logo.svg"
        alt={alt}
        sx={{ position: "relative", zIndex: 1, display: "block", width: "100%", height: "auto", filter: "brightness(2.15) saturate(1.18) contrast(.92) drop-shadow(0 0 7px rgba(101,241,255,.95)) drop-shadow(0 0 5px rgba(255,92,108,.82))" }}
      />
      <Box
        component="img"
        src={animated ? "/images/logo/logo-neon-animated.svg" : "/images/logo/logo-neon.svg"}
        alt=""
        aria-hidden
        sx={{ position: "absolute", zIndex: 2, inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: .82, mixBlendMode: "screen", filter: "brightness(1.55) saturate(1.1)", pointerEvents: "none" }}
      />
      <Box
        component="img"
        src="/images/logo/logo.svg"
        alt=""
        aria-hidden
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: .72, mixBlendMode: "screen", filter: "brightness(1.9) blur(7px) drop-shadow(0 0 12px rgba(75,236,255,.95))", animation: animated ? "neonLogoPulse 3.4s ease-in-out infinite" : "none", pointerEvents: "none" }}
      />
    </Box>
  );
}
