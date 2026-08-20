import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

export const serviceCatalog = [
  {
    number: "01",
    slug: "design",
    title: "مهندسی و طراحی",
    eyebrow: "ENGINEERING",
    description:
      "تحلیل فنی بار، طراحی دیاگرام‌های تک‌خطی و تدوین نقشه‌های اجرایی برای زیرساخت‌های برق اضطراری و شبکه‌های حساس.",
    href: "/services/design",
    image: "/images/static/electric_wiring.webp",
    secondaryImage: "/images/static/datacenter_systems.webp",
    Icon: EngineeringRoundedIcon,
    color: "var(--landing-accent)",
    gridColumn: "1 / span 5",
  },
  {
    number: "02",
    slug: "sales",
    title: "تأمین و فروش",
    eyebrow: "PROCUREMENT",
    description:
      "عرضه یو‌پی‌اس، باتری و تجهیزات برق از برندهای معتبر همراه با مشاوره تخصصی برای انتخاب راهکار متناسب با نیاز پروژه.",
    href: "/services/sales",
    image: "/images/static/sales.webp",
    secondaryImage: "/images/static/airplanes_in_night.webp",
    Icon: ShoppingCartCheckoutRoundedIcon,
    color: "#a7c8ff",
    gridColumn: "8 / span 5",
  },
  {
    number: "03",
    slug: "repair",
    title: "تعمیرات تخصصی",
    eyebrow: "TECHNICAL REPAIR",
    description:
      "عیب‌یابی پیشرفته و تعمیر تخصصی یو‌پی‌اس، باتری و تجهیزات قدرت با قطعات اصلی، تست فنی و تیم مجرب.",
    href: "/services/repair",
    image: "/images/static/repair_electronics.webp",
    secondaryImage: "/images/static/repairing_electricity.webp",
    Icon: HandymanRoundedIcon,
    color: "#ff9c87",
    gridColumn: "2 / span 6",
  },
  {
    number: "04",
    slug: "after-sales",
    title: "خدمات پس از فروش",
    eyebrow: "LIFECYCLE SUPPORT",
    description:
      "گارانتی، پشتیبانی فنی، اعزام تیم عملیاتی و قراردادهای نگهداری پیشگیرانه برای تداوم عملکرد تجهیزات.",
    href: "/services/after-sales",
    image: "/images/static/after_sales.webp",
    secondaryImage: "/images/static/24hour_atm.webp",
    Icon: VerifiedUserRoundedIcon,
    color: "var(--landing-accent)",
    gridColumn: "7 / span 5",
  },
];

export function getServiceBySlug(slug) {
  return serviceCatalog.find((service) => service.slug === slug);
}
