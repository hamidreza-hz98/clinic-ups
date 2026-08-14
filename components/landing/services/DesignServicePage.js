"use client";

import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import CableRoundedIcon from "@mui/icons-material/CableRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ServiceDetailPage from "./ServiceDetailPage";
import { getServiceBySlug } from "./serviceCatalog";

const capabilities = [
  {
    title: "تحلیل بار و ظرفیت‌سنجی",
    description: "محاسبه بارهای بحرانی، جریان راه‌اندازی، ضریب هم‌زمانی و ظرفیت توسعه آینده برای انتخاب توان واقعی سیستم.",
    icon: SpeedRoundedIcon,
  },
  {
    title: "طراحی معماری و افزونگی",
    description: "انتخاب توپولوژی مناسب مانند N، N+1 یا 2N و تعریف مسیرهای بای‌پس برای دستیابی به سطح دسترس‌پذیری هدف.",
    icon: SchemaRoundedIcon,
  },
  {
    title: "هماهنگی حفاظتی",
    description: "محاسبه و انتخاب کابل، کلید و حفاظت‌ها با هدف ایزوله‌شدن خطا و جلوگیری از خاموشی زنجیره‌ای تجهیزات حساس.",
    icon: CableRoundedIcon,
  },
  {
    title: "مدارک اجرایی و برآورد",
    description: "تدوین نقشه‌ها، مشخصات فنی، لیست مقادیر و برآورد اجرایی برای خرید شفاف و اجرای کنترل‌شده پروژه.",
    icon: ArchitectureRoundedIcon,
  },
];

const workflow = [
  ["برداشت و شناخت سایت", "بازدید، دریافت نقشه‌های موجود و شناسایی محدودیت‌های الکتریکی، معماری و بهره‌برداری."],
  ["مدل‌سازی بارهای بحرانی", "تفکیک بارهای حیاتی و غیربحرانی و تحلیل سناریوهای قطع برق و توسعه آینده."],
  ["انتخاب راهکار مفهومی", "مقایسه گزینه‌های یو‌پی‌اس، ژنراتور، باتری، تابلو و بای‌پس بر اساس ریسک، هزینه و دسترس‌پذیری."],
  ["طراحی تفصیلی", "تهیه دیاگرام تک‌خطی، جانمایی، مسیر کابل، محاسبات حفاظت و اسناد فنی قابل اجرا."],
  ["نظارت و تحویل فنی", "کنترل اجرا، تست‌های راه‌اندازی، ثبت مغایرت‌ها و تحویل مستندات نهایی پروژه."],
];

export default function DesignServicePage() {
  const service = getServiceBySlug("design");
  const content = {
    heroTitle: "مهندسی زیرساخت برق اضطراری",
    heroDescription:
      "از مدل‌سازی بارهای بحرانی تا طراحی تفصیلی و نظارت بر اجرا، یک معماری انرژی قابل اتکا، توسعه‌پذیر و متناسب با ریسک عملیاتی پروژه تدوین می‌کنیم.",
    imageAlt: "طراحی مهندسی دیتاسنتر و زیرساخت برق اضطراری",
    metrics: ["طراحی N+1 و 2N", "اسناد اجرایی", "نظارت فنی"],
    introTitle: "طراحی قبل از خرید تجهیزات آغاز می‌شود",
    introParagraphs: [
      "در زیرساخت‌های حساس، انتخاب صرفاً بر اساس توان نامی می‌تواند باعث اضافه‌هزینه، کاهش زمان پشتیبانی یا ایجاد نقطه شکست پنهان شود. طراحی مهندسی، رفتار واقعی بار و سناریوهای خطا را پیش از اجرا روشن می‌کند.",
      "خروجی این خدمت یک نقشه راه فنی قابل اجراست؛ از معماری توزیع انرژی و ظرفیت یو‌پی‌اس و باتری تا حفاظت، بای‌پس، کابل‌کشی، جانمایی و الزامات تست و راه‌اندازی.",
    ],
    sections: [
      {
        type: "cards",
        eyebrow: "ENGINEERING SCOPE",
        title: "دامنه خدمات طراحی",
        description: "تصمیم‌های کلیدی پروژه با محاسبات مستند، سناریوهای روشن و درنظرگرفتن چرخه عمر تجهیزات اتخاذ می‌شوند.",
        items: capabilities,
      },
      {
        type: "steps",
        eyebrow: "DESIGN WORKFLOW",
        title: "فرآیند مهندسی پروژه",
        description: "فرآیندی مرحله‌ای که از شناخت سایت شروع می‌شود و تا تحویل فنی و مستندات نهایی ادامه دارد.",
        items: workflow.map(([title, description], index) => ({
          title,
          description,
          icon: [InsightsRoundedIcon, SpeedRoundedIcon, SchemaRoundedIcon, FactCheckRoundedIcon, VerifiedRoundedIcon][index],
        })),
      },
      {
        type: "list",
        eyebrow: "PROJECT DELIVERABLES",
        title: "خروجی‌های قابل تحویل",
        description: "بسته مدارک متناسب با مقیاس و مرحله پروژه تنظیم می‌شود و می‌تواند شامل موارد زیر باشد.",
        items: [
          "گزارش محاسبات بار و ظرفیت پیشنهادی تجهیزات",
          "دیاگرام تک‌خطی توزیع برق اصلی، اضطراری و بای‌پس",
          "محاسبات زمان پشتیبانی و ظرفیت بانک باتری",
          "سایزینگ کابل‌ها، کلیدها و هماهنگی حفاظت‌ها",
          "مشخصات فنی تجهیزات و لیست مقادیر اجرایی",
          "نقشه جانمایی، مسیرها و الزامات تهویه و دسترسی سرویس",
          "پروتکل تست کارخانه، راه‌اندازی و آزمون بار",
          "گزارش نظارت و مستندات چون‌ساخت پروژه",
        ],
      },
    ],
    ctaTitle: "پروژه را با یک تصمیم مهندسی شروع کنید",
    ctaDescription: "اطلاعات اولیه بار، نقشه یا محدودیت‌های سایت را با ما در میان بگذارید تا دامنه طراحی و مسیر مناسب پروژه مشخص شود.",
    ctaLabel: "درخواست جلسه طراحی",
  };

  return <ServiceDetailPage service={service} content={content} />;
}
