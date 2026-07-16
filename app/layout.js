import "./globals.css";

export const metadata = {
  title: { default: "کلینیک یو پی اس", template: "%s | کلینیک یو پی اس" },
  description: "تأمین و پشتیبانی تخصصی برق اضطراری، یو پی اس، باتری و ژنراتور",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
