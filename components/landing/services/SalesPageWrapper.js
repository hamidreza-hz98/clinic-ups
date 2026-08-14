"use client";

import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import ElectricalServicesRoundedIcon from "@mui/icons-material/ElectricalServicesRounded";
import { providedProducts, salesBenefits, salesProcess } from "@/constants/landing/general";
import { faText, text } from "@/lib/landing/copy";
import ServiceDetailPage from "./ServiceDetailPage";
import { getServiceBySlug } from "./serviceCatalog";

const productIcons = [ElectricalServicesRoundedIcon, BatteryChargingFullRoundedIcon, PrecisionManufacturingRoundedIcon];
const benefitIcons = [WorkspacePremiumRoundedIcon, SupportAgentRoundedIcon, VerifiedRoundedIcon];

export default function SalesPageWrapper() {
  const service = getServiceBySlug("sales");
  const content = {
    heroTitle: text("sales_heading"),
    heroDescription: text("sales_description"),
    imageAlt: "مشاوره و تأمین تجهیزات برق اضطراری",
    metrics: ["تضمین اصالت", "انتخاب مهندسی", "تحویل پروژه‌ای"],
    introTitle: text("sales_banner_header"),
    introParagraphs: [text("sales_description")],
    sections: [
      {
        type: "cards",
        eyebrow: "PRODUCT RANGE",
        title: text("sales_available_products"),
        description: "سبد تجهیزات برای کاربری‌های خانگی، تجاری و صنعتی با امکان انتخاب دقیق بر اساس توان و شرایط بهره‌برداری.",
        items: providedProducts.map((item, index) => ({
          title: faText(item.name),
          description: faText(item.description),
          icon: productIcons[index % productIcons.length],
        })),
      },
      {
        type: "cards",
        eyebrow: "WHY CLINIC UPS",
        title: text("sales_purchase_benefits"),
        items: salesBenefits.map((item, index) => ({
          title: faText(item.name),
          description: faText(item.description),
          icon: benefitIcons[index % benefitIcons.length],
        })),
      },
      {
        type: "steps",
        eyebrow: "PROCUREMENT FLOW",
        title: text("sales_process"),
        description: "مسیر شفاف از بررسی محصول و دریافت مشاوره تا ثبت سفارش و تحویل در محل.",
        items: salesProcess.map((item) => ({
          title: faText(item.name),
          description: faText(item.description),
          icon: item.icon,
        })),
      },
    ],
    ctaTitle: "انتخاب تجهیزات را به حدس واگذار نکنید",
    ctaDescription: "توان مصرفی، زمان پشتیبانی و شرایط محیطی پروژه شما را بررسی می‌کنیم تا گزینه‌ای دقیق و اقتصادی پیشنهاد شود.",
    ctaLabel: "درخواست مشاوره خرید",
  };

  return <ServiceDetailPage service={service} content={content} />;
}
