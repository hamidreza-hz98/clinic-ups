import * as yup from "yup";
import { seoValidationSchema } from "./seo.validation";

export const projectValidationSchema = yup.object({
  name: yup
    .string()
    .required("نام پروژه الزامی است"),

  excerpt: yup.string(),

  slug: yup
    .string()
    .required("اسلاگ الزامی است"),

  // brands: yup.array().of(yup.string()),

  // media: yup.array().of(yup.string()),

  deliveryDate: yup
    .string()
    .required("تاریخ تحویل الزامی است"),

  // date: yup
  //   .date()
  //   .required("تاریخ پروژه الزامی است"),

  customer: yup.string(),

  location: yup.string(),

  // categories: yup.array().of(yup.string()),

  // tags: yup.array().of(yup.string()),

  description: yup.string(),

  // relatedProjects: yup.array().of(yup.string()),

  seo: seoValidationSchema,
});