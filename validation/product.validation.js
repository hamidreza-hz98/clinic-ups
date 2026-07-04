import * as yup from "yup";
import { seoValidationSchema } from "./seo.validation";

export const productValidationSchema = yup.object({
  name: yup
    .string()
    .required("نام محصول الزامی است"),

  slug: yup.string(),

  excerpt: yup.string(),

  brands: yup
    .array()
    .of(yup.string())
    .min(1, "حداقل یک برند انتخاب کنید"),

  productMainImage: yup
    .string()
    .required("تصویر اصلی محصول الزامی است"),

  media: yup.array().of(yup.string()),

  datasheet: yup.array().of(
    yup.object({
      key: yup
        .string()
        .required("کلید مشخصات الزامی است"),

      value: yup
        .string()
        .required("مقدار مشخصات الزامی است"),
    })
  ),

  specifications: yup.string(),

  categories: yup
    .array()
    .of(yup.string())
    .min(1, "حداقل یک دسته بندی انتخاب کنید"),

  tags: yup.array().of(yup.string()),

  price: yup.object({
    fa: yup.string(),

    ar: yup.string(),

    en: yup.string(),
  }),

  description: yup.object({
    fa: yup.string(),

    ar: yup.string(),

    en: yup.string(),
  }),

  relatedProducts: yup.array().of(yup.string()),

  seo: seoValidationSchema,
});