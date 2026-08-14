"use client";

import {
  afterSaleBenefits,
  afterSaleContracts,
  engineeringServices,
} from "@/constants/landing/general";
import { faText, text } from "@/lib/landing/copy";
import ServiceDetailPage from "./ServiceDetailPage";
import { getServiceBySlug } from "./serviceCatalog";

export default function AfterSalesServicesWrapper() {
  const service = getServiceBySlug("after-sales");
  const content = {
    heroTitle: text("after_sale_heading"),
    heroDescription: text("after_sale_description"),
    imageAlt: "پشتیبانی شبانه‌روزی تجهیزات یو پی اس",
    metrics: ["یک سال گارانتی", "ده سال خدمات", "پشتیبانی عملیاتی"],
    introTitle: text("after_sale_banner_header"),
    introParagraphs: [text("after_sale_description")],
    sections: [
      {
        type: "cards",
        eyebrow: "LIFECYCLE SUPPORT",
        title: text("after_sale_benefits"),
        description: "پوشش کامل نیازهای فنی پس از خرید برای حفظ آماده‌به‌کاری تجهیزات در تمام چرخه عمر.",
        items: afterSaleBenefits.map((item) => ({
          title: faText(item.name),
          description: faText(item.description),
          icon: item.icon,
        })),
      },
      {
        type: "list",
        eyebrow: "TRUSTED PARTNERS",
        title: text("after_sale_contracts_heading"),
        description: text("after_sale_contracts_description"),
        items: afterSaleContracts.map((item) => faText(item.description)),
      },
      {
        type: "list",
        eyebrow: "ENGINEERING SERVICES",
        title: text("after_sale_engineering"),
        description: text("after_sale_engineering_description"),
        items: engineeringServices.map((item) => faText(item.description)),
      },
    ],
    ctaTitle: "پشتیبانی، بعد از تحویل تازه شروع می‌شود",
    ctaDescription: "برای بررسی شرایط گارانتی، قرارداد نگهداری یا اعزام کارشناس با تیم خدمات پس از فروش گفتگو کنید.",
    ctaLabel: "ارتباط با پشتیبانی",
  };

  return <ServiceDetailPage service={service} content={content} />;
}
