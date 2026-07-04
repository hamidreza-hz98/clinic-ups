import * as yup from "yup";
import { seoValidationSchema } from "./seo.validation";

export const faqValidationSchema = yup.object({
  question: yup
    .string()
    .required("وارد کردن سوال الزامی است"),

  answer: yup
    .string()
    .required("وارد کردن پاسخ الزامی است"),
});


export const termsValidationSchema = yup.object({
  title: yup
    .string()
    .required("عنوان الزامی است"),

  description: yup
    .string()
    .required("توضیحات الزامی است"),
});


export const socialValidationSchema = yup.object({
  instagram: yup.string(),

  telegram: yup.string(),

  whatsapp: yup.string(),

  facebook: yup.string(),

  youtube: yup.string(),

  linkedin: yup.string(),

  x: yup.string(),
});


export const contactInfoValidationSchema = yup.object({
  mobile: yup.string(),

  phone: yup.string(),

  email: yup
    .string()
    .email("ایمیل وارد شده معتبر نیست"),

  address: yup.string(),

  mapIframe: yup.string(),
});

export const settingsValidationSchema = yup.object({

  ["default-seo"]: seoValidationSchema,

  general: yup.object({

    logo: yup.string(),

    name: yup.string(),

    footerText: yup.string(),

    contactInfo: contactInfoValidationSchema,

    social: socialValidationSchema,

    homepageSlider: yup.array().of(yup.string()),

  }),

  faq: yup.array().of(faqValidationSchema),

  terms: yup.array().of(termsValidationSchema),

  about: yup.object({

    image: yup.string(),

    description: yup.string(),

  }),

});