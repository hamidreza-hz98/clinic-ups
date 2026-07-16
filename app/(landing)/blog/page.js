import EntityListPage from "@/components/landing-pages/EntityListPage";
export const metadata = { title: "وبلاگ" };
export default async function BlogPage({ searchParams }) { const query = await searchParams; return <EntityListPage entity="blogs" initialSearch={query?.search || ""} initialCategory={query?.category || ""} />; }
