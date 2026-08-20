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
          "0%, 100%": { opacity: .46, filter: "blur(7px) drop-shadow(0 0 8px rgba(0,219,231,.8))" },
          "50%": { opacity: .78, filter: "blur(10px) drop-shadow(0 0 16px rgba(255,48,64,.9))" },
        },
      }}
    >
      <Box
        component="img"
        src="/images/logo/logo.svg"
        alt={alt}
        sx={{ position: "relative", zIndex: 1, display: "block", width: "100%", height: "auto", filter: "drop-shadow(0 0 5px rgba(0,219,231,.76)) drop-shadow(0 0 4px rgba(255,48,64,.58))" }}
      />
      <Box
        component="img"
        src={animated ? "/images/logo/logo-neon-animated.svg" : "/images/logo/logo-neon.svg"}
        alt=""
        aria-hidden
        sx={{ position: "absolute", zIndex: 2, inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
      />
      <Box
        component="img"
        src="/images/logo/logo.svg"
        alt=""
        aria-hidden
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: .5, filter: "blur(8px) drop-shadow(0 0 10px rgba(0,219,231,.8))", animation: animated ? "neonLogoPulse 3.4s ease-in-out infinite" : "none", pointerEvents: "none" }}
      />
    </Box>
  );
}
