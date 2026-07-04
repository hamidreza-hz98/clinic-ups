import * as yup from "yup";

export const seoValidationSchema = yup.object({
  title: yup.string(),

  description: yup.string(),

  keywords: yup.string(),

  ogTitle: yup.string(),

  ogDescription: yup.string(),

  ogImage: yup.string().nullable(),

  twitterTitle: yup.string(),

  twitterDescription: yup.string(),

  twitterImage: yup.string().nullable(),

  canonical: yup.string(),

  robots: yup.string(),

  additionalMetaTags: yup.string(),
});
