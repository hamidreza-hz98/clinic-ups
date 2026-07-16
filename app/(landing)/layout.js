import Header from "@/components/landing/layout/Header";
import Footer from "@/components/landing/layout/Footer";
import FloatingActionButton from "@/components/landing/layout/FloatingActionButton";

export default function LandingLayout({ children }) {
  return <><Header /><main>{children}</main><FloatingActionButton /><Footer /></>;
}
