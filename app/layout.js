import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
import "./globals.css";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";

export const metadata = {
  title: {
    default: "کلینیک یو پی اس",
    template: "%s | کلینیک یو پی اس",
  },
  description:
    "تأمین، نصب و پشتیبانی تخصصی یو پی اس، باتری، استابیلایزر و دیزل ژنراتور",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-full flex flex-col">
        <NotificationsProvider>
          <DialogsProvider>{children}</DialogsProvider>
        </NotificationsProvider>
      </body>
    </html>
  );
}
