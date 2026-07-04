import * as yup from "yup";

export const tagValidationSchema = yup.object({
  name: yup
    .string()
    .required("نام برچسب الزامی است"),

  slug: yup.string(),
});