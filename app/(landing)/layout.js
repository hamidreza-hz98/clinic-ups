import Header from "@/components/landing/layout/Header";
import Footer from "@/components/landing/layout/Footer";
import LandingThemeProvider from "@/theme/landing/provider";

export default function LandingLayout({ children }) {
  return (
    <LandingThemeProvider>
      <Header />
      <main className="landing-grid-surface">{children}</main>
      <Footer />
    </LandingThemeProvider>
  );
}
