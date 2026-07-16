"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/layout/dashboard/DashboardSidebar";
import DashboardThemeProvider from "@/theme/dashboard/provider";
import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";

function DashboardShell({ children }) {
  const theme = useTheme();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
    React.useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
    React.useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setIsNavigationExpanded = React.useCallback(
    (newExpanded) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [
      isOverMdViewport,
      setIsDesktopNavigationExpanded,
      setIsMobileNavigationExpanded,
    ]
  );

  const handleToggleHeaderMenu = React.useCallback(
    (isExpanded) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded]
  );

  const layoutRef = React.useRef(null);

  return (
    <Box
        ref={layoutRef}
        sx={{
          position: "relative",
          display: "flex",
          overflow: "hidden",
          height: "100vh",
          width: "100%",
        }}
      >
        <DashboardHeader
          title="پنل مدیریتی کلینیک یو پی اس"
          logo="/images/logo/logo.svg"
          menuOpen={isNavigationExpanded}
          onToggleMenu={handleToggleHeaderMenu}
        />

        <DashboardSidebar
          expanded={isNavigationExpanded}
          setExpanded={setIsNavigationExpanded}
          // eslint-disable-next-line react-hooks/refs
          container={layoutRef?.current ?? undefined}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Toolbar sx={{ displayPrint: "none" }} />
          <Box
            component="main"
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
    </Box>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <DashboardThemeProvider>
      <NotificationsProvider>
        <DialogsProvider>
          <DashboardShell>{children}</DashboardShell>
        </DialogsProvider>
      </NotificationsProvider>
    </DashboardThemeProvider>
  );
}
