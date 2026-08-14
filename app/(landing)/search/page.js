import SearchResultPageWrapper from "@/components/landing/search/SearchResultPageWrapper";

export const metadata = {
  title: "جستجوی محصولات، پروژه‌ها و مقالات",
  description: "جستجوی یکپارچه در محصولات برق اضطراری، پروژه‌های اجراشده و مقالات تخصصی کلینیک یو پی اس.",
};

export default async function Page({ searchParams }) {
  const query = await searchParams;
  return <SearchResultPageWrapper initialQuery={typeof query?.q === "string" ? query.q : ""} />;
}
