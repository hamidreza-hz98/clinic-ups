import BatteryChargingFullRounded from "@mui/icons-material/BatteryChargingFullRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import DnsRounded from "@mui/icons-material/DnsRounded";
import EngineeringRounded from "@mui/icons-material/EngineeringRounded";
import FactoryRounded from "@mui/icons-material/FactoryRounded";
import HandymanRounded from "@mui/icons-material/HandymanRounded";
import LocalHospitalRounded from "@mui/icons-material/LocalHospitalRounded";
import MonitorHeartRounded from "@mui/icons-material/MonitorHeartRounded";
import PowerRounded from "@mui/icons-material/PowerRounded";
import PrecisionManufacturingRounded from "@mui/icons-material/PrecisionManufacturingRounded";
import SettingsInputComponentRounded from "@mui/icons-material/SettingsInputComponentRounded";
import SupportAgentRounded from "@mui/icons-material/SupportAgentRounded";

export const products = [
  { title: "یو پی اس", label: "POWER SOLUTIONS", description: "تأمین برق بدون وقفه برای مراکز حساس و زیرساخت‌های حیاتی", image: "/images/static/ups-system.png", icon: PowerRounded, color: "#00dbe7" },
  { title: "باتری", label: "ENERGY STORAGE", description: "ذخیره‌سازهای انرژی مطمئن با فناوری لیتیوم و طول عمر بالا", image: "/images/static/portable-power-station.png", icon: BatteryChargingFullRounded, color: "#79aef8" },
  { title: "استابلایزر", label: "VOLTAGE PROTECTION", description: "تثبیت دقیق ولتاژ و حفاظت از تجهیزات حساس الکترونیکی", image: "/images/static/voltage-stabilizer.png", icon: BoltRounded, color: "#ff767b" },
  { title: "دیزل ژنراتور", label: "BACKUP POWER", description: "برق پشتیبان قدرتمند برای پروژه‌های صنعتی و مقیاس‌های بزرگ", image: "/images/static/diesel-generator.png", icon: FactoryRounded, color: "#00dbe7" },
  { title: "ذخیره‌ساز صنعتی", label: "INDUSTRIAL SCALE", description: "سامانه‌های ماژولار برای دیتاسنترها، کارخانه‌ها و شبکه‌های بزرگ", image: "/images/static/industrial-energy-storage.png", icon: DnsRounded, color: "#79aef8" },
];

export const services = [
  { title: "مهندسی و طراحی", description: "تحلیل فنی بار، طراحی دیاگرام تک‌خطی و نقشه اجرایی برای زیرساخت‌های پیچیده.", icon: EngineeringRounded },
  { title: "تأمین و اجرا", description: "انتخاب، تأمین و راه‌اندازی تجهیزات معتبر متناسب با ظرفیت و حساسیت پروژه.", icon: PrecisionManufacturingRounded },
  { title: "نگهداری پیشگیرانه", description: "بازدید دوره‌ای، تست سلامت و جلوگیری از توقف‌های ناخواسته پیش از وقوع بحران.", icon: HandymanRounded },
  { title: "پشتیبانی اضطراری", description: "تیم فنی آماده پاسخ‌گویی و اعزام برای بازگرداندن سریع پایداری شبکه برق.", icon: SupportAgentRounded },
];

export const industries = [
  { title: "مراکز درمانی", text: "حفاظت از اتاق عمل و تجهیزات حساس پزشکی.", icon: LocalHospitalRounded },
  { title: "دیتاسنترها", text: "تداوم سرویس برای سرورها و شبکه‌های حیاتی.", icon: DnsRounded },
  { title: "کارخانه‌ها", text: "جلوگیری از توقف خطوط تولید و خسارت تجهیزات.", icon: FactoryRounded },
  { title: "مراکز کنترل", text: "پایش و تأمین پایدار سامانه‌های عملیاتی.", icon: MonitorHeartRounded },
  { title: "تجهیزات دقیق", text: "کنترل نوسان و حفاظت از ابزارهای حساس.", icon: SettingsInputComponentRounded },
];

export const projects = [
  { title: "توسعه زیرساخت برق دیتاسنتر", category: "مرکز داده", meta: "2.4MW", image: "/images/static/data-center-project.png", wide: true },
  { title: "برق اضطراری مجموعه صنعتی", category: "ژنراتور صنعتی", meta: "500kVA", image: "/images/static/generator-project.png" },
  { title: "ذخیره‌سازی ماژولار انرژی", category: "باتری صنعتی", meta: "Tier IV", image: "/images/static/battery-storage-project.png" },
];
