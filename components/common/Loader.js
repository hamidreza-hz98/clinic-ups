import React from "react";
import { styled } from "@mui/material/styles";

const LoaderRoot = styled("div")(() => ({
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& .light": {
    position: "absolute",
    left: "22px",
    fill: "rgba(37, 37, 37, 0.774)",
  },

  "& .loader": {
    width: "80px",
    height: "40px",
    border: "2px solid #22f49e",
    borderRightColor: "transparent",
    padding: "3px",
    position: "relative",

    background:
      "repeating-linear-gradient(90deg, #22f49e 0 10px, transparent 0 15px) left/0% 100% no-repeat content-box content-box",

    animation: "p5 2s infinite steps(6)",

    "&::before": {
      content: '""',
      position: "absolute",
      top: "-2px",
      bottom: "-2px",
      left: "100%",
      width: "10px",

      background: `
        linear-gradient(
          transparent calc(50% - 7px),
          #22f49e 0 calc(50% - 5px),
          transparent 0 calc(50% + 5px),
          #22f49e 0 calc(50% + 7px),
          transparent 0
        ) left / 100% 100%,

        linear-gradient(
          #22f49e calc(50% - 5px),
          transparent 0 calc(50% + 5px),
          #22f49e 0
        ) left / 2px 100%,

        linear-gradient(
          transparent calc(50% - 5px),
          #22f49e 0 calc(50% + 5px),
          transparent 0
        ) right / 2px 100%
      `,

      backgroundRepeat: "no-repeat",
    },
  },

  "@keyframes p5": {
    "100%": {
      backgroundSize: "120% 100%",
    },
  },
}));

const Loader = () => {
  return (
    <LoaderRoot>
      <div className="loader">
        <svg
          viewBox="0 0 16 16"
          className="light"
          fill="currentColor"
          width={28}
          height={28}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
        </svg>
      </div>
    </LoaderRoot>
  );
};

export default Loader;
