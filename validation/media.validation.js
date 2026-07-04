import * as yup from "yup";

export const mediaValidationSchema = yup.object({
  filename: yup
    .string()
    .required("نام فایل الزامی است"),

  path: yup.string(),

  originalName: yup.string(),

  extension: yup.string(),

  mimeType: yup
    .string()
    .required("نوع فایل الزامی است"),

  size: yup
    .number()
    .required("حجم فایل الزامی است"),

  title: yup.string(),

  description: yup.string(),

  seoTitle: yup.string(),

  seoDescription: yup.string(),

  seoKeywords: yup.string(),

  mediaAlt: yup.string(),

  mediaTitle: yup.string(),

  mediaCaption: yup.string(),

  mediaTranscript: yup.string(),
});

export const uploadSchema = yup.object({
  title: yup.string().optional(),
  alt: yup.string().optional(),
  description: yup.string().optional(),
});

export const updateSchema = yup.object({
  title: yup.string().optional(),
  alt: yup.string().optional(),
  description: yup.string().optional(),
});