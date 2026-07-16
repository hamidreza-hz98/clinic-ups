import DashboardThemeProvider from "@/theme/dashboard/provider";
import React from "react";
import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";

const AuthLayout = ({ children }) => {
  return (
    <DashboardThemeProvider>
      <NotificationsProvider>
        <DialogsProvider>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: "url('/images/background/shape-01.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }}
          >
            {children}
          </div>
        </DialogsProvider>
      </NotificationsProvider>
    </DashboardThemeProvider>
  );
};

export default AuthLayout;
