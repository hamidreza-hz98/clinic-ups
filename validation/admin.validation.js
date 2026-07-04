import * as yup from "yup";

export const adminValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("نام الزامی است"),

  lastName: yup
    .string()
    .required("نام خانوادگی الزامی است"),

  username: yup
    .string()
    .required("نام کاربری الزامی است"),

  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});


export const adminLoginValidationSchema = yup.object({
  username: yup
    .string()
    .required("نام کاربری الزامی است"),

  password: yup
    .string()
    .required("رمز عبور الزامی است"),
});
