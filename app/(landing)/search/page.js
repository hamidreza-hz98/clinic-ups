import SearchPage from "@/components/landing-pages/SearchPage";
export const metadata = { title: "جستجو" };
export default async function Page({ searchParams }) { const query = await searchParams; return <SearchPage initialSearch={query?.q || ""} />; }
