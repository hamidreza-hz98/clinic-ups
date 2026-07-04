import * as yup from "yup";
import { seoValidationSchema } from "./seo.validation";

export const blogValidationSchema = yup.object({
  title: yup
    .string()
    .required("عنوان مقاله الزامی است"),

  slug: yup
    .string()
    .required("اسلاگ الزامی است"),

  // author: yup.string(),

  // categories: yup
  //   .array()
  //   .of(yup.string())
  //   .min(1, "حداقل یک دسته بندی انتخاب کنید"),

  // thumbnail: yup
  //   .array()
  //   .of(yup.string())
  //   .min(1, "تصویر شاخص الزامی است"),

  // relatedBlogs: yup.array().of(yup.string()),

  // tags: yup.array().of(yup.string()),

  // relatedProducts: yup.array().of(yup.string()),

  isSelected: yup.boolean(),

  readTime: yup.string(),

  content: yup
    .string()
    .required("محتوای مقاله الزامی است"),

  seo: seoValidationSchema,
});
