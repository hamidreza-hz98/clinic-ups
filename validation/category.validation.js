import * as yup from "yup";

export const categoryValidationSchema = yup.object({
  name: yup
    .string()
    .required("نام دسته بندی الزامی است"),

  value: yup
    .string()
    .required("مقدار دسته بندی الزامی است"),

  slug: yup
    .string()
    .required("اسلاگ الزامی است"),

  icon: yup.string().nullable(),
});
