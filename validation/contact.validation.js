import * as yup from "yup";

export const contactValidationSchema = yup.object({
  fullName: yup
    .string()
    .required("نام و نام خانوادگی الزامی است"),

  mobile: yup
    .string()
    .required("شماره موبایل الزامی است"),

  message: yup
    .string()
    .required("پیام الزامی است"),
});