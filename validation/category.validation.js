import * as yup from "yup";

export const categoryValidationSchema = yup.object({
  name: yup.string().trim().required("نام دسته‌بندی الزامی است"),
  englishName: yup.string().trim().required("نام انگلیسی دسته‌بندی الزامی است"),
  excerpt: yup
    .string()
    .trim()
    .max(220, "توضیح مختصر باید حداکثر ۲۲۰ کاراکتر باشد")
    .required("توضیح مختصر دسته‌بندی الزامی است"),
  value: yup.string().trim().required("مقدار دسته‌بندی الزامی است"),
  slug: yup.string().trim().required("اسلاگ الزامی است"),
  icon: yup.string().nullable(),
});
