"use client";

import { repairBenefits, repairSteps } from "@/constants/landing/general";
import { faText, text } from "@/lib/landing/copy";
import ServiceDetailPage from "./ServiceDetailPage";
import { getServiceBySlug } from "./serviceCatalog";

export default function RepairPageWrapper() {
  const service = getServiceBySlug("repair");
  const content = {
    heroTitle: text("repair_heading"),
    heroDescription: text("repair_description"),
    imageAlt: "تعمیر تخصصی تجهیزات برق اضطراری",
    metrics: ["عیب‌یابی دقیق", "قطعات اصلی", "تست عملکرد"],
    introTitle: text("repair_banner_header"),
    introParagraphs: [
      text("repair_description"),
      text("repair_description_2"),
      text("repair_description_3"),
      text("repair_description_4"),
    ],
    sections: [
      {
        type: "steps",
        eyebrow: "REPAIR WORKFLOW",
        title: text("repair_steps"),
        description: "هر دستگاه از ثبت درخواست تا تست نهایی، یک مسیر کنترل‌شده و قابل پیگیری را طی می‌کند.",
        items: repairSteps.map((item) => ({
          title: faText(item.name),
          description: faText(item.description),
          icon: item.icon,
        })),
      },
      {
        type: "cards",
        eyebrow: "TECHNICAL ADVANTAGES",
        title: text("repair_benefits"),
        items: repairBenefits.map((item) => ({
          title: faText(item.description),
          description: "استاندارد ثابت تیم فنی ما در تمام مراحل پذیرش، تعمیر و تحویل دستگاه.",
          icon: item.icon,
        })),
      },
    ],
    ctaTitle: "تجهیزات شما دوباره به مدار بازمی‌گردد",
    ctaDescription: "برای ثبت درخواست تعمیر، اعلام علائم خرابی و دریافت برآورد اولیه با واحد فنی در ارتباط باشید.",
    ctaLabel: "ثبت درخواست تعمیر",
  };

  return <ServiceDetailPage service={service} content={content} />;
}
