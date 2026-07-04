export const seoDefaultValues = (data) => ({
  title: data?.seo?.title || "",
  description: data?.seo?.description || "",
  keywords: data?.seo?.keywords || "",
  ogTitle: data?.seo?.ogTitle || "",
  ogDescription: data?.seo?.ogDescription || "",
  ogImage: data?.seo?.ogImage || "",
  twitterTitle: data?.seo?.twitterTitle || "",
  twitterDescription: data?.seo?.twitterDescription || "",
  twitterImage: data?.seo?.twitterImage || "",
  canonical: data?.seo?.canonical || "",
  robots: data?.seo?.robots || "",
  additionalMetaTags: data?.seo?.additionalMetaTags || "",
});

export const mediaDefaultValues = (data) => ({
  _id: data?._id || null,

  file: data
    ? { path: data?.path, type: data?.type, mimeType: data?.mimeType }
    : null,

  title: data?.title || "",
  description: data?.description || "",

  seoTitle: data?.seoTitle || "",
  seoDescription: data?.seoDescription || "",
  seoKeywords: data?.seoKeywords?.split?.(",")?.map((k) => k.trim()) || [],

  mediaAlt: data?.mediaAlt || "",
  mediaTitle: data?.mediaTitle || "",
  mediaCaption: data?.mediaCaption || "",
  mediaTranscript: data?.mediaTranscript || "",
});


export const defaultCategoryValues = (data) => ({
  _id: data?._id || null,
  name: data?.name || "",
  slug: data?.slug || "",
  excerpt: data?.excerpt || "",
  image: data?.image || null,
});

export const defaultProductValues = (data) => ({
  _id: data?._id || null,
  name: data?.name || "",
  code: data?.code || "",
  slug: data?.slug || "",
  excerpt: data?.excerpt || "",
  description: data?.description || "",
  price: data?.price || null,
  category: data?.category || "",
  relatedProducts: data?.relatedProducts || [],
  media: data?.media || [],
  seo: { ...seoDefaultValues(data) },
});

export const defaultServiceValues = (data) => ({
  _id: data?._id || null,
  name: data?.name || "",
  slug: data?.slug || "",
  excerpt: data?.excerpt || "",
  description: data?.description || "",
  category: data?.category || "",
  readTime: data?.readTime || "",
  relatedProducts: data?.relatedProducts || [],
  icon: data?.icon || "",
  banner: data?.banner || "",
  seo: { ...seoDefaultValues(data) },
});

export const defaultPortfolioValues = (data) => ({
  _id: data?._id || null,
  name: data?.name || "",
  description: data?.description || "",
  media: data?.media || [],
  service: data?.service || "",
});

export const defaultGeneralSettingsValues = (data) => ({
  _id: data?._id || null,
  logo: data?.logo || "",
  name: data?.name || "",
  footerText: data?.footerText || "",
  contactInfo: data?.contactInfo || {
    mobile_01: "",
    mobile_02: "",
    mobile_03: "",
    mobile_04: "",
    phone_01: "",
    phone_02: "",
    email: "",
    address_01: "",
    mapIframe_01: "",
    address_02: "",
    mapIframe_02: "",
    address_03: "",
    mapIframe_03: "",
    address_04: "",
    mapIframe_04: "",
  },
  social: data?.social || {
    rubika: "",
    rubikaChannel: "",
    bale: "",
    baleChannel: "",
    soroush: "",
    eita: "",
    iGap: "",
    instagram: "",
    telegram_01: "",
    telegram_02: "",
    telegram_03: "",
    whatsapp_1: "",
    whatsapp_2: "",
    whatsapp_3: "",
    telegramChannel: "",
    whatsappChannel: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    x: "",
  },
  homepageSlider: data?.homepageSlider || [],
});

export const seoSettingsDefaultValues = (data) => ({
  title: data?.title || "",
  description: data?.description || "",
  keywords: data?.keywords || "",
  ogTitle: data?.ogTitle || "",
  ogDescription: data?.ogDescription || "",
  ogImage: data?.ogImage || "",
  twitterTitle: data?.twitterTitle || "",
  twitterDescription: data?.twitterDescription || "",
  twitterImage: data?.twitterImage || "",
  canonical: data?.canonical || "",
  robots: data?.robots || "",
  additionalMetaTags: data?.additionalMetaTags || "",
});

export const aboutSettingsDefaultValues = (data) => ({
  description: data?.description || "",
  image: data?.image || "",
});

export const faqSettingsDefaultValues = (data) =>
  data || [{ question: "", answer: "" }];

export const termsSettingsDefaultValues = (data) =>
  data || [{ title: "", description: "" }];
