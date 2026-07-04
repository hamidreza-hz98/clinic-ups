import * as yup from "yup";

export const brandValidationSchema = yup.object({
  name: yup
    .string()
    .required("نام برند الزامی است"),

  key: yup
    .string()
    .required("کلید برند الزامی است"),

  // categories: yup.array().of(yup.string()),

  // logo: yup
  //   .string()
  //   .required("لوگوی برند الزامی است"),
});
