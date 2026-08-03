export const navLinks = [
  { href: "/", title: "صفحه اصلی", children: [] },
  { href: "/categories", title: "محصولات", children: [] },
  { href: "/projects", title: "پروژه‌ها", children: [] },
  {
    href: "/services",
    title: "خدمات",
    children: [
      { href: "/services/sales", title: "فروش" },
      { href: "/services/repair", title: "تعمیر" },
      { href: "/services/after-sales", title: "خدمات پس از فروش" },
    ],
  },
  { href: "/blog", title: "وبلاگ", children: [] },
  { href: "/about", title: "درباره ما", children: [] },
  { href: "/contact", title: "تماس با ما", children: [] },
];

const routes = {
  home: navLinks[0], products: navLinks[1], projects: navLinks[2], services: navLinks[3], blog: navLinks[4], about: navLinks[5], contact: navLinks[6],
};

export default routes;
